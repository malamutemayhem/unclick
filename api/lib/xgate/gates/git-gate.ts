// GitGate: blocks dangerous git operations BEFORE they run.
//
// Part of the XGate pre-execution guardrail family (the mirror of XPass). This
// gate parses the raw git command into argv with a small dependency-free
// tokenizer, then decides whether a force-push, branch deletion, history
// rewrite, or destructive reset/clean is allowed, escalated, or denied.
//
// Load-bearing principles from the XGate research, applied here:
//   - Allowlist + parse to structure, never a regex blocklist of "bad strings".
//     We tokenize to argv and reason about the parsed shape.
//   - Fail closed. On any tokenize failure, unresolved shell expansion, or
//     doubt, return "ask" (never silently allow).
//   - Environment + autonomy axes. dev/staging interactive can prompt ("ask");
//     prod or unattended hard-denies destructive ops by default.
//   - Prefer server-side platform controls. The durable fix for force-push
//     danger is GitHub branch protection; recommendBranchProtection() returns
//     the settings UnClick should also apply. This gate is defense-in-depth.
//
// The gate is a pure function and MUST NEVER THROW. The whole body is wrapped
// so any unexpected error degrades to "ask".
//
// Contract types are imported type-only so this file carries no runtime
// dependency on the Part 1 module (verdict combination across gates is the
// policy engine's job, not a single gate's).

import type { Gate, GateContext, GateResult, GateVerdict } from "../types.js";

const GATE_NAME = "GitGate";

// Local verdict ranking, used ONLY to pick the most restrictive result among
// the segments of a single chained command (e.g. "a && git push --force").
// This mirrors the frozen VERDICT_PRECEDENCE but is kept local so the gate has
// no runtime import. Combining verdicts across gates remains Part 1's job.
const RANK: Record<GateVerdict, number> = { deny: 3, ask: 2, rewrite: 1, allow: 0 };

// Branches treated as protected. main and master are exact; release/* is a
// prefix family. Keep this aligned with recommendBranchProtection() below.
const PROTECTED_EXACT = new Set(["main", "master"]);
const PROTECTED_PREFIXES = ["release/"];

// Git global options that consume the following token as their value, so the
// real subcommand can be found (e.g. "git -C /repo -c k=v push ...").
const GIT_GLOBAL_VALUE_OPTS = new Set([
  "-C",
  "-c",
  "--git-dir",
  "--work-tree",
  "--namespace",
  "--exec-path",
  "--super-prefix",
]);

// git push options that consume the following token as a value (space form).
const PUSH_VALUE_OPTS = new Set(["--repo", "-o", "--push-option", "--receive-pack", "--exec"]);

// Tokens that separate one shell command from the next. We split on these and
// evaluate each git command independently.
const SEGMENT_SEPARATORS = new Set([";", "&&", "||", "|", "&", "(", ")"]);

// Command wrappers we transparently step past to find the real "git".
const COMMAND_PREFIXES = new Set(["sudo", "command", "nice", "ionice", "time", "env"]);

export function isProtectedBranch(ref: string): boolean {
  const b = normalizeBranchRef(ref);
  if (b === "") return false;
  if (PROTECTED_EXACT.has(b)) return true;
  for (const prefix of PROTECTED_PREFIXES) {
    if (b.startsWith(prefix)) return true;
  }
  return false;
}

function normalizeBranchRef(ref: string): string {
  let b = (ref ?? "").trim();
  if (b.startsWith("+")) b = b.slice(1);
  if (b.startsWith("refs/heads/")) b = b.slice("refs/heads/".length);
  else if (b.startsWith("heads/")) b = b.slice("heads/".length);
  return b;
}

// Tokenize a shell-ish command into argv-style tokens. Returns null when the
// input cannot be tokenized (unterminated quote, dangling escape) so the caller
// can fail closed to "ask". Shell control operators are emitted as their own
// tokens so the caller can split into command segments.
export function tokenizeShellCommand(raw: string): string[] | null {
  if (typeof raw !== "string") return null;
  const tokens: string[] = [];
  let current = "";
  let hasCurrent = false;
  let i = 0;
  const n = raw.length;

  const flush = () => {
    if (hasCurrent) {
      tokens.push(current);
      current = "";
      hasCurrent = false;
    }
  };

  while (i < n) {
    const ch = raw[i];

    // Backslash escape outside single quotes: take the next char literally.
    if (ch === "\\") {
      if (i + 1 >= n) return null; // dangling escape, cannot tokenize
      current += raw[i + 1];
      hasCurrent = true;
      i += 2;
      continue;
    }

    // Single quotes: everything is literal until the next single quote.
    if (ch === "'") {
      const end = raw.indexOf("'", i + 1);
      if (end === -1) return null; // unterminated
      current += raw.slice(i + 1, end);
      hasCurrent = true;
      i = end + 1;
      continue;
    }

    // Double quotes: literal until the next unescaped double quote.
    if (ch === '"') {
      i++;
      let closed = false;
      while (i < n) {
        const c = raw[i];
        if (c === "\\") {
          if (i + 1 >= n) return null;
          current += raw[i + 1];
          i += 2;
          continue;
        }
        if (c === '"') {
          closed = true;
          i++;
          break;
        }
        current += c;
        i++;
      }
      if (!closed) return null; // unterminated
      hasCurrent = true;
      continue;
    }

    // Whitespace separates tokens.
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      flush();
      i++;
      continue;
    }

    // Backtick command substitution: keep the whole `...` attached to the
    // current token so callers can flag it as an unresolved expansion.
    if (ch === "`") {
      const end = raw.indexOf("`", i + 1);
      if (end === -1) return null; // unterminated substitution
      current += raw.slice(i, end + 1);
      hasCurrent = true;
      i = end + 1;
      continue;
    }

    // $(...) command substitution and ${...} expansion: consume the whole span
    // (balanced for parens) so it stays part of the token rather than being
    // split on the inner parentheses.
    if (ch === "$" && raw[i + 1] === "(") {
      let depth = 0;
      let end = -1;
      for (let j = i + 1; j < n; j++) {
        if (raw[j] === "(") depth++;
        else if (raw[j] === ")") {
          depth--;
          if (depth === 0) {
            end = j;
            break;
          }
        }
      }
      if (end === -1) return null; // unterminated substitution
      current += raw.slice(i, end + 1);
      hasCurrent = true;
      i = end + 1;
      continue;
    }
    if (ch === "$" && raw[i + 1] === "{") {
      const end = raw.indexOf("}", i + 2);
      if (end === -1) return null; // unterminated expansion
      current += raw.slice(i, end + 1);
      hasCurrent = true;
      i = end + 1;
      continue;
    }

    // Shell control operators become standalone tokens.
    if (ch === ";" || ch === "|" || ch === "&" || ch === "(" || ch === ")" || ch === "<" || ch === ">") {
      flush();
      if ((ch === "&" || ch === "|") && raw[i + 1] === ch) {
        tokens.push(ch + ch);
        i += 2;
      } else {
        tokens.push(ch);
        i += 1;
      }
      continue;
    }

    current += ch;
    hasCurrent = true;
    i++;
  }

  flush();
  return tokens;
}

// True when a token contains an unresolved shell expansion whose value we
// cannot see statically (command substitution or variable). When such a token
// sits in a position that decides a target branch, we fail closed.
function hasUnresolvedExpansion(token: string): boolean {
  return token.includes("$(") || token.includes("${") || token.includes("`") || /(^|[^\\])\$\w/.test(token);
}

function makeResult(
  verdict: GateVerdict,
  ruleId: string,
  reason: string,
  evidence: string[],
): GateResult {
  return {
    gate: GATE_NAME,
    verdict,
    ruleId,
    reason,
    evidence: evidence.map((e) => truncate(maskSensitive(e), 240)),
  };
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 3) + "...";
}

// Mask credential shapes that can hide inside a git command (most often a token
// embedded in a remote URL). Evidence must never carry a raw secret.
function maskSensitive(text: string): string {
  let t = text;
  t = t.replace(/([a-z][a-z0-9+.-]*:\/\/)[^/\s:@]+:[^/\s@]+@/gi, "$1***:***@");
  t = t.replace(/\b(github_pat|ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{10,}/g, "$1_***");
  t = t.replace(/\bxox[baprs]-[A-Za-z0-9-]{6,}/g, "xox***");
  t = t.replace(/\b(AKIA|ASIA)[A-Z0-9]{12,}/g, "$1***");
  t = t.replace(/\bBearer\s+[A-Za-z0-9._-]{8,}/gi, "Bearer ***");
  t = t.replace(/-----BEGIN [A-Z ]*PRIVATE KEY-----/g, "-----BEGIN PRIVATE KEY (redacted)-----");
  return t;
}

function moreRestrictive(a: GateResult, b: GateResult): GateResult {
  return RANK[b.verdict] > RANK[a.verdict] ? b : a;
}

// Destructive-but-recoverable operations escalate by environment and autonomy:
// prod or unattended hard-denies; interactive dev/staging asks.
function destructiveVerdict(ctx: GateContext): GateVerdict {
  if (ctx.environment === "prod" || ctx.autonomyLevel === "unattended") return "deny";
  return "ask";
}

interface ShortFlags {
  force: boolean;
  delete: boolean;
  dryRun: boolean;
}

// Decode a bundled short-flag token like "-fdn" into the flags we care about.
function decodeShortFlags(token: string): ShortFlags {
  const flags: ShortFlags = { force: false, delete: false, dryRun: false };
  if (!/^-[A-Za-z]+$/.test(token)) return flags;
  for (const ch of token.slice(1)) {
    if (ch === "f") flags.force = true;
    else if (ch === "d") flags.delete = true;
    else if (ch === "D") {
      flags.delete = true;
      flags.force = true;
    } else if (ch === "n") flags.dryRun = true;
  }
  return flags;
}

export const gitGate: Gate = (ctx: GateContext): GateResult => {
  try {
    const action = ctx?.action;
    const raw = typeof action?.raw === "string" ? action.raw : "";

    // Prefer a pre-parsed argv if the caller supplied one (contract allows
    // ctx.action.parsed to be a gate-specific parsed form). Otherwise tokenize.
    let segments: string[][];
    if (Array.isArray(action?.parsed) && action.parsed.every((t) => typeof t === "string")) {
      segments = [action.parsed as string[]];
    } else {
      const tokens = tokenizeShellCommand(raw);
      if (tokens === null) {
        return makeResult(
          "ask",
          "git.unparseable",
          "could not tokenize the command (unterminated quote or dangling escape); failing closed",
          [raw],
        );
      }
      segments = splitSegments(tokens);
    }

    let combined: GateResult | null = null;
    for (const segment of segments) {
      const seg = stripCommandPrefixes(segment);
      if (seg.length === 0 || seg[0] !== "git") continue; // not a git command; abstain
      const result = analyzeGitCommand(seg.slice(1), ctx);
      combined = combined === null ? result : moreRestrictive(combined, result);
    }

    if (combined === null) {
      return makeResult(
        "allow",
        "git.not_git_command",
        "no git operation detected; GitGate abstains",
        [raw],
      );
    }
    return combined;
  } catch {
    // Defense-in-depth: a gate must never throw. Any unexpected error -> ask.
    return makeResult("ask", "git.internal_error", "GitGate hit an unexpected error; failing closed", []);
  }
};

function splitSegments(tokens: string[]): string[][] {
  const segments: string[][] = [];
  let current: string[] = [];
  for (const tok of tokens) {
    if (SEGMENT_SEPARATORS.has(tok)) {
      if (current.length) segments.push(current);
      current = [];
    } else {
      current.push(tok);
    }
  }
  if (current.length) segments.push(current);
  return segments;
}

// Drop leading env-assignments (FOO=bar) and command wrappers (sudo, env, ...)
// so we land on the real "git" token.
function stripCommandPrefixes(segment: string[]): string[] {
  let i = 0;
  while (i < segment.length) {
    const tok = segment[i];
    if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(tok)) {
      i++;
      continue;
    }
    if (COMMAND_PREFIXES.has(tok)) {
      i++;
      continue;
    }
    break;
  }
  return segment.slice(i);
}

// args = tokens after the "git" token. Locate the subcommand (skipping git
// global options) and dispatch.
function analyzeGitCommand(args: string[], ctx: GateContext): GateResult {
  let idx = 0;
  while (idx < args.length) {
    const a = args[idx];
    if (a.startsWith("-")) {
      if (GIT_GLOBAL_VALUE_OPTS.has(a)) idx += 2;
      else idx += 1;
      continue;
    }
    break;
  }

  const sub = args[idx];
  const rest = args.slice(idx + 1);
  const evidence = ["git " + args.join(" ")];

  if (sub === undefined) {
    return makeResult("allow", "git.allowed", "no git subcommand to evaluate", evidence);
  }

  switch (sub) {
    case "push":
      return analyzePush(rest, ctx, evidence);
    case "reset":
      return analyzeReset(rest, ctx, evidence);
    case "clean":
      return analyzeClean(rest, ctx, evidence);
    case "branch":
      return analyzeBranch(rest, ctx, evidence);
    case "filter-branch":
    case "filter-repo":
      return makeResult(
        destructiveVerdict(ctx),
        "git.history_rewrite",
        "whole-history rewrite (" + sub + ") is destructive on shared branches",
        evidence,
      );
    case "update-ref":
      return analyzeUpdateRef(rest, evidence);
    default:
      return makeResult(
        "allow",
        "git.allowed",
        "non-destructive or unrecognized git operation (" + sub + ")",
        evidence,
      );
  }
}

function analyzeReset(rest: string[], ctx: GateContext, evidence: string[]): GateResult {
  const hard = rest.includes("--hard");
  if (!hard) {
    return makeResult("allow", "git.allowed", "git reset without --hard does not discard working tree", evidence);
  }
  return makeResult(
    destructiveVerdict(ctx),
    "git.reset_hard",
    "git reset --hard discards uncommitted work and rewrites the working tree",
    evidence,
  );
}

function analyzeClean(rest: string[], ctx: GateContext, evidence: string[]): GateResult {
  const dryRun = rest.some((t) => t === "--dry-run" || t === "-n" || decodeShortFlags(t).dryRun);
  if (dryRun) {
    return makeResult("allow", "git.allowed", "git clean dry-run makes no changes", evidence);
  }
  const force = rest.some((t) => t === "--force" || decodeShortFlags(t).force);
  if (!force) {
    // git clean refuses to delete without -f (unless clean.requireForce=false);
    // treat the explicit-force case as the destructive one.
    return makeResult("allow", "git.allowed", "git clean without --force does not delete files", evidence);
  }
  return makeResult(
    destructiveVerdict(ctx),
    "git.clean_force",
    "git clean --force permanently deletes untracked files",
    evidence,
  );
}

function analyzeBranch(rest: string[], ctx: GateContext, evidence: string[]): GateResult {
  let isDelete = false;
  let isForceMove = false;
  const positionals: string[] = [];

  for (const tok of rest) {
    if (tok === "--delete" || tok === "-d" || tok === "-D") {
      isDelete = true;
      continue;
    }
    if (tok === "-M" || tok === "--move") {
      // -M is a forced move; --move pairs with --force below.
      if (tok === "-M") isForceMove = true;
      continue;
    }
    if (tok === "--force") {
      isForceMove = isForceMove || rest.includes("--move");
      continue;
    }
    if (tok.startsWith("-")) {
      const sf = decodeShortFlags(tok);
      if (sf.delete) isDelete = true;
      continue;
    }
    positionals.push(tok);
  }

  if (isDelete) {
    const protectedHit = positionals.find((p) => isProtectedBranch(p));
    if (protectedHit) {
      return makeResult(
        "deny",
        "git.delete_protected_branch",
        "deleting a protected branch (" + normalizeBranchRef(protectedHit) + ") is irreversible on the local ref",
        evidence,
      );
    }
    return makeResult("allow", "git.allowed", "deleting a non-protected branch is routine cleanup", evidence);
  }

  if (isForceMove) {
    const protectedHit = positionals.find((p) => isProtectedBranch(p));
    if (protectedHit) {
      return makeResult(
        destructiveVerdict(ctx),
        "git.branch_force_rename_protected",
        "force-renaming a protected branch (" + normalizeBranchRef(protectedHit) + ") is a significant change",
        evidence,
      );
    }
  }

  return makeResult("allow", "git.allowed", "non-destructive branch operation", evidence);
}

function analyzeUpdateRef(rest: string[], evidence: string[]): GateResult {
  const isDelete = rest.includes("-d") || rest.includes("--delete");
  if (!isDelete) {
    return makeResult("allow", "git.allowed", "git update-ref without delete is not destructive here", evidence);
  }
  const protectedHit = rest.find((t) => !t.startsWith("-") && isProtectedBranch(t));
  if (protectedHit) {
    return makeResult(
      "deny",
      "git.update_ref_delete_protected",
      "deleting a protected ref (" + normalizeBranchRef(protectedHit) + ") via update-ref is irreversible",
      evidence,
    );
  }
  return makeResult("allow", "git.allowed", "git update-ref delete of a non-protected ref", evidence);
}

interface PushTarget {
  branch: string;
  isProtected: boolean;
  isDelete: boolean;
  forcedByPlus: boolean;
}

function analyzePush(rest: string[], ctx: GateContext, evidence: string[]): GateResult {
  let plainForce = false;
  let leaseForce = false;
  let deleteFlag = false;
  let mirror = false;
  let all = false;
  let dryRun = false;

  // Collect positional args (remote + refspecs), skipping options and the
  // values of value-taking options.
  const positionals: string[] = [];
  for (let i = 0; i < rest.length; i++) {
    const tok = rest[i];
    if (tok.startsWith("--")) {
      if (tok === "--force") plainForce = true;
      else if (tok === "--force-with-lease" || tok.startsWith("--force-with-lease=")) leaseForce = true;
      else if (tok === "--force-if-includes" || tok.startsWith("--force-if-includes=")) leaseForce = true;
      else if (tok === "--delete") deleteFlag = true;
      else if (tok === "--mirror") mirror = true;
      else if (tok === "--all") all = true;
      else if (tok === "--dry-run") dryRun = true;
      else if (PUSH_VALUE_OPTS.has(tok)) i++; // skip the value token
      continue;
    }
    if (tok.startsWith("-")) {
      const sf = decodeShortFlags(tok);
      if (sf.force) plainForce = true;
      if (sf.delete) deleteFlag = true;
      if (sf.dryRun) dryRun = true;
      if (PUSH_VALUE_OPTS.has(tok)) i++; // -o <value>
      continue;
    }
    positionals.push(tok);
  }

  if (dryRun) {
    return makeResult("allow", "git.allowed", "git push --dry-run makes no remote change", evidence);
  }

  // Refspecs are everything after the remote (positionals[0]).
  const refspecs = positionals.slice(1);

  // Fail closed if a refspec is derived from an unresolved shell expansion: we
  // cannot tell which branch it targets.
  if (refspecs.some(hasUnresolvedExpansion) || positionals.some(hasUnresolvedExpansion)) {
    if (plainForce || leaseForce || mirror) {
      return makeResult(
        "ask",
        "git.force_push_unresolved_target",
        "force push whose target is built from an unresolved shell expansion; cannot verify the branch",
        evidence,
      );
    }
  }

  if (mirror) {
    return makeResult(
      destructiveVerdict(ctx),
      "git.mirror_push",
      "git push --mirror overwrites and can delete every ref on the remote, including protected branches",
      evidence,
    );
  }

  if (all && plainForce) {
    return makeResult(
      "deny",
      "git.force_push_protected",
      "git push --all --force force-updates every branch, which includes protected branches",
      evidence,
    );
  }

  const targets = parseRefspecTargets(refspecs, deleteFlag);

  // No explicit branch: target is the current upstream, which we cannot see.
  if (targets.length === 0 && !all) {
    if (plainForce || leaseForce) {
      return makeResult(
        "ask",
        "git.force_push_unknown_target",
        "force push with no explicit branch could target a protected branch (the current upstream is unknown)",
        evidence,
      );
    }
    return makeResult("allow", "git.allowed", "ordinary push (no force, no protected target)", evidence);
  }

  let combined: GateResult | null = null;
  for (const t of targets) {
    const r = verdictForPushTarget(t, plainForce, leaseForce, ctx, evidence);
    combined = combined === null ? r : moreRestrictive(combined, r);
  }

  if (combined === null) {
    return makeResult("allow", "git.allowed", "ordinary push", evidence);
  }
  return combined;
}

function parseRefspecTargets(refspecs: string[], deleteFlag: boolean): PushTarget[] {
  const targets: PushTarget[] = [];
  for (const spec of refspecs) {
    let s = spec;
    let forcedByPlus = false;
    if (s.startsWith("+")) {
      forcedByPlus = true;
      s = s.slice(1);
    }
    let src = s;
    let dst = s;
    if (s.includes(":")) {
      const colon = s.indexOf(":");
      src = s.slice(0, colon);
      dst = s.slice(colon + 1);
    }
    // ":branch" (empty source) is a deletion; --delete makes every spec a delete.
    const isDelete = deleteFlag || (src === "" && dst !== "");
    const branch = dst !== "" ? dst : src;
    targets.push({
      branch: normalizeBranchRef(branch),
      isProtected: isProtectedBranch(branch),
      isDelete,
      forcedByPlus,
    });
  }
  return targets;
}

function verdictForPushTarget(
  t: PushTarget,
  plainForce: boolean,
  leaseForce: boolean,
  ctx: GateContext,
  evidence: string[],
): GateResult {
  const forced = plainForce || t.forcedByPlus;

  if (t.isDelete && t.isProtected) {
    return makeResult(
      "deny",
      "git.delete_protected_branch",
      "deleting a protected branch (" + t.branch + ") on the remote is destructive",
      evidence,
    );
  }

  if (forced && t.isProtected) {
    return makeResult(
      "deny",
      "git.force_push_protected",
      "force pushing to a protected branch (" + t.branch + ") rewrites shared history",
      evidence,
    );
  }

  if (leaseForce && t.isProtected) {
    return makeResult(
      destructiveVerdict(ctx),
      "git.force_push_protected_lease",
      "force-with-lease to a protected branch (" + t.branch + ") still rewrites shared history",
      evidence,
    );
  }

  // Force (plain or lease) to a non-protected feature branch is routine.
  if (forced || leaseForce) {
    return makeResult(
      "allow",
      "git.allowed",
      "force push to a non-protected feature branch (" + t.branch + ")",
      evidence,
    );
  }

  if (t.isDelete) {
    return makeResult("allow", "git.allowed", "deleting a non-protected remote branch (" + t.branch + ")", evidence);
  }

  return makeResult("allow", "git.allowed", "ordinary push to " + t.branch, evidence);
}

// Server-side GitHub branch-protection settings UnClick should also apply. The
// research is clear that the durable fix for force-push and deletion danger is
// platform-level protection (allow_force_pushes: false, allow_deletions:
// false); XGate's GitGate is defense-in-depth on top of these.
export interface BranchProtectionRecommendation {
  branch: string;
  settings: {
    required_pull_request_reviews: {
      required_approving_review_count: number;
      dismiss_stale_reviews: boolean;
      require_code_owner_reviews: boolean;
    };
    required_status_checks: { strict: boolean; contexts: string[] };
    enforce_admins: boolean;
    required_linear_history: boolean;
    allow_force_pushes: boolean;
    allow_deletions: boolean;
    block_creations: boolean;
    required_conversation_resolution: boolean;
    lock_branch: boolean;
    restrictions: null;
  };
}

export function recommendBranchProtection(
  branches: string[] = ["main", "master", "release/*"],
): BranchProtectionRecommendation[] {
  return branches.map((branch) => ({
    branch,
    settings: {
      required_pull_request_reviews: {
        required_approving_review_count: 1,
        dismiss_stale_reviews: true,
        require_code_owner_reviews: false,
      },
      required_status_checks: { strict: true, contexts: [] },
      enforce_admins: true,
      required_linear_history: true,
      // The durable fix: the platform itself refuses force pushes and deletions
      // on protected branches, so the protection survives even if a client
      // bypasses XGate.
      allow_force_pushes: false,
      allow_deletions: false,
      block_creations: false,
      required_conversation_resolution: true,
      lock_branch: false,
      restrictions: null,
    },
  }));
}
