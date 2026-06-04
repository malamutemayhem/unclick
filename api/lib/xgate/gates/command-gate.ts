// XGate Part 5 - CommandGate.
//
// A pure Gate for shell commands. It tokenizes ctx.action.raw to argv per
// sub-command (handling quotes, pipes, redirects, and substitutions), then
// decides on an allowlist-first, parse-to-structure, deny-by-default basis:
//
//   1. Catastrophic, irreversible shapes (resolved after parsing) -> deny.
//   2. Re-entry / opaque / unparseable / not-on-the-allowlist -> ask (fail
//      closed). Part 8's applyAutonomy escalates ask -> deny when unattended.
//   3. Recognized safe operations inside scope -> allow, so routine work stays
//      frictionless and the rare irreversible prompt still gets read.
//
// COVERAGE BOUNDARY (state it plainly, do not oversell): an MCP server cannot
// see shell the client runs through its own Bash tool. This gate only covers
// shell routed through UnClick tools (ActionClass "shell"). Client-run shell is
// delegated to client hooks (Part 9) and OS/container sandboxes; MCP clients
// without a hook system get UnClick-tool coverage only.
//
// Principle: never a regex blocklist of "bad strings" (Cursor's denylist was
// bypassed four ways). Parse to structure, enumerate what is allowed, deny the
// rest by default. The gate is pure and never throws; on any parse failure or
// doubt it returns verdict "ask".

import {
  Gate,
  GateContext,
  GateResult,
  GateVerdict,
  VERDICT_PRECEDENCE,
} from "../types.js";

const GATE_NAME = "CommandGate";
const MAX_SUBSTITUTION_DEPTH = 4;

// ---------------------------------------------------------------------------
// Result helpers
// ---------------------------------------------------------------------------

function mk(
  verdict: GateVerdict,
  ruleId: string,
  reason: string,
  evidence: string[] = [],
): GateResult {
  return { gate: GATE_NAME, verdict, ruleId, reason, evidence: evidence.map(sanitize) };
}

/** Keep the most restrictive of two results (deny > ask > rewrite > allow). */
function moreRestrictive(a: GateResult, b: GateResult): GateResult {
  return VERDICT_PRECEDENCE[b.verdict] > VERDICT_PRECEDENCE[a.verdict] ? b : a;
}

/** Mask common credential shapes so evidence never carries a raw secret. */
function sanitize(s: string): string {
  let out = s.length > 200 ? `${s.slice(0, 197)}...` : s;
  out = out
    .replace(/AKIA[0-9A-Z]{12,}/g, "AKIA***")
    .replace(/gh[pousr]_[A-Za-z0-9]{10,}/g, "ghx_***")
    .replace(/xox[baprs]-[A-Za-z0-9-]{6,}/g, "xox-***")
    .replace(/sk-[A-Za-z0-9]{8,}/g, "sk-***")
    .replace(/[Bb]earer\s+[A-Za-z0-9._-]{8,}/g, "Bearer ***")
    .replace(/\b[A-Fa-f0-9]{32,}\b/g, "***");
  return out;
}

// ---------------------------------------------------------------------------
// Tokenizer / parser (dependency-free, shell-ish)
// ---------------------------------------------------------------------------

class ParseError extends Error {}

interface Word {
  /** Literal text with quotes removed; variable refs are kept verbatim
   *  (e.g. "$HOME", "${X}") so worst-case expansion can reason about them. */
  value: string;
  /** Contained a $VAR or ${VAR} expansion. */
  hadExpansion: boolean;
  /** The word began with a variable expansion (its head is dynamic). */
  startsWithVar: boolean;
  /** The word began with a "~" home reference. */
  hadTilde: boolean;
}

interface Stage {
  argv: Word[];
  redirects: { op: string; target: string }[];
  /** Inner text of any $(...) / `...` / <(...) / >(...) seen in this stage. */
  substitutions: string[];
}

interface ParsedCommand {
  /** Pipelines (split by ; && || & newline); each is stages split by "|". */
  pipelines: Stage[][];
  containsSubshell: boolean;
}

type Token =
  | { type: "word"; word: Word }
  | { type: "op"; value: string }
  | { type: "subst"; text: string };

const VAR_NAME_CHARS = /[A-Za-z0-9_]/;

function lex(raw: string): Token[] {
  const tokens: Token[] = [];
  let cur: Word | null = null;
  let i = 0;
  const n = raw.length;

  const ensureWord = (): Word => {
    if (!cur) cur = { value: "", hadExpansion: false, startsWithVar: false, hadTilde: false };
    return cur;
  };
  const flushWord = () => {
    if (cur) {
      tokens.push({ type: "word", word: cur });
      cur = null;
    }
  };
  const pushOp = (value: string) => {
    flushWord();
    tokens.push({ type: "op", value });
  };
  const pushSubst = (text: string) => {
    tokens.push({ type: "subst", text });
  };

  // Read a balanced-parenthesis region starting at the "(" index. Skips over
  // single/double quoted spans so parens inside strings do not miscount.
  const readBalancedParen = (openIdx: number): { text: string; end: number } => {
    let depth = 0;
    let j = openIdx;
    let inS = false;
    let inD = false;
    for (; j < n; j++) {
      const ch = raw[j];
      if (inS) {
        if (ch === "'") inS = false;
        continue;
      }
      if (inD) {
        if (ch === "\\") { j++; continue; }
        if (ch === '"') inD = false;
        continue;
      }
      if (ch === "'") { inS = true; continue; }
      if (ch === '"') { inD = true; continue; }
      if (ch === "(") depth++;
      else if (ch === ")") {
        depth--;
        if (depth === 0) return { text: raw.slice(openIdx + 1, j), end: j + 1 };
      }
    }
    throw new ParseError("unterminated parenthesis / substitution");
  };

  // Handle a "$" at position i. Returns the index to continue from, or -1 if
  // the "$" is a plain literal character.
  const handleDollar = (): number => {
    const next = raw[i + 1];
    if (next === "(") {
      const { text, end } = readBalancedParen(i + 1);
      pushSubst(text);
      return end;
    }
    if (next === "{") {
      const close = raw.indexOf("}", i + 2);
      if (close === -1) throw new ParseError("unterminated ${ } expansion");
      const w = ensureWord();
      if (w.value === "") w.startsWithVar = true;
      w.hadExpansion = true;
      w.value += raw.slice(i, close + 1);
      return close + 1;
    }
    if (next && VAR_NAME_CHARS.test(next)) {
      let j = i + 1;
      while (j < n && VAR_NAME_CHARS.test(raw[j])) j++;
      const w = ensureWord();
      if (w.value === "") w.startsWithVar = true;
      w.hadExpansion = true;
      w.value += raw.slice(i, j);
      return j;
    }
    return -1; // plain "$"
  };

  const readBacktick = (): number => {
    const close = raw.indexOf("`", i + 1);
    if (close === -1) throw new ParseError("unterminated backtick substitution");
    pushSubst(raw.slice(i + 1, close));
    return close + 1;
  };

  while (i < n) {
    const c = raw[i];

    if (c === "'") {
      const w = ensureWord();
      const close = raw.indexOf("'", i + 1);
      if (close === -1) throw new ParseError("unterminated single quote");
      w.value += raw.slice(i + 1, close);
      i = close + 1;
      continue;
    }

    if (c === '"') {
      const w = ensureWord();
      i++;
      while (i < n && raw[i] !== '"') {
        const d = raw[i];
        if (d === "\\") {
          const nx = raw[i + 1];
          if (nx === undefined) throw new ParseError("trailing backslash in double quote");
          if (nx === '"' || nx === "\\" || nx === "$" || nx === "`") {
            w.value += nx;
            i += 2;
            continue;
          }
          w.value += d;
          i++;
          continue;
        }
        if (d === "$") {
          const adv = handleDollar();
          if (adv >= 0) { i = adv; continue; }
          w.value += d;
          i++;
          continue;
        }
        if (d === "`") { i = readBacktick(); continue; }
        w.value += d;
        i++;
      }
      if (i >= n) throw new ParseError("unterminated double quote");
      i++; // closing quote
      continue;
    }

    if (c === "\\") {
      const nx = raw[i + 1];
      if (nx === undefined) throw new ParseError("trailing backslash");
      if (nx === "\n") { i += 2; continue; } // line continuation
      ensureWord().value += nx;
      i += 2;
      continue;
    }

    if (c === "\n") { pushOp("\n"); i++; continue; }
    if (c === " " || c === "\t" || c === "\r") { flushWord(); i++; continue; }

    const two = raw.slice(i, i + 2);
    if (two === "||") { pushOp("||"); i += 2; continue; }
    if (two === "&&") { pushOp("&&"); i += 2; continue; }
    if (two === ">>") { pushOp(">>"); i += 2; continue; }
    if (two === "2>") { pushOp("2>"); i += 2; continue; }
    if (two === "&>") { pushOp("&>"); i += 2; continue; }
    if (two === ">&") { pushOp(">&"); i += 2; continue; }

    if (c === "|") { pushOp("|"); i++; continue; }
    if (c === "&") { pushOp("&"); i++; continue; }
    if (c === ";") { pushOp(";"); i++; continue; }
    if (c === "(") { pushOp("("); i++; continue; }
    if (c === ")") { pushOp(")"); i++; continue; }

    if (c === "<" || c === ">") {
      if (raw[i + 1] === "(") {
        const { text, end } = readBalancedParen(i + 1);
        pushSubst(text);
        i = end;
        continue;
      }
      pushOp(c);
      i++;
      continue;
    }

    if (c === "$") {
      const adv = handleDollar();
      if (adv >= 0) { i = adv; continue; }
      ensureWord().value += c;
      i++;
      continue;
    }

    if (c === "`") { i = readBacktick(); continue; }

    if (c === "~") {
      const w = ensureWord();
      if (w.value === "") w.hadTilde = true;
      w.value += c;
      i++;
      continue;
    }

    ensureWord().value += c;
    i++;
  }

  flushWord();
  return tokens;
}

const REDIRECT_OPS = new Set([">", ">>", "<", "2>", "&>", ">&"]);
const PIPELINE_BREAKS = new Set([";", "&&", "||", "&", "\n"]);

function parse(raw: string): ParsedCommand {
  const tokens = lex(raw);
  const pipelines: Stage[][] = [];
  let pipeline: Stage[] = [];
  let stage: Stage = { argv: [], redirects: [], substitutions: [] };
  let stageHasContent = false;
  let pendingRedirect: string | null = null;
  let containsSubshell = false;

  const endStage = () => {
    if (stageHasContent) pipeline.push(stage);
    stage = { argv: [], redirects: [], substitutions: [] };
    stageHasContent = false;
    pendingRedirect = null;
  };
  const endPipeline = () => {
    endStage();
    if (pipeline.length) pipelines.push(pipeline);
    pipeline = [];
  };

  for (const t of tokens) {
    if (t.type === "subst") {
      stage.substitutions.push(t.text);
      stageHasContent = true;
      continue;
    }
    if (t.type === "word") {
      if (pendingRedirect) {
        stage.redirects.push({ op: pendingRedirect, target: t.word.value });
        pendingRedirect = null;
      } else {
        stage.argv.push(t.word);
      }
      stageHasContent = true;
      continue;
    }
    // operator
    const op = t.value;
    if (op === "|") {
      endStage();
    } else if (PIPELINE_BREAKS.has(op)) {
      endPipeline();
    } else if (op === "(") {
      containsSubshell = true;
      endPipeline();
    } else if (op === ")") {
      containsSubshell = true;
      endStage();
    } else if (REDIRECT_OPS.has(op)) {
      pendingRedirect = op;
    }
  }
  endPipeline();
  return { pipelines, containsSubshell };
}

// ---------------------------------------------------------------------------
// Vocabulary (allowlists and known-dangerous heads)
// ---------------------------------------------------------------------------

const PREFIXES = new Set(["sudo", "doas", "nohup", "command", "setsid"]);
const FETCHERS = new Set(["curl", "wget", "fetch", "aria2c", "lynx"]);
const SHELLS = new Set(["sh", "bash", "zsh", "dash", "ksh", "fish", "ash"]);
const DECODERS = new Set([
  "base64", "base32", "xxd", "uudecode", "openssl", "atob",
]);
const INTERPRETERS = new Set([
  "node", "deno", "bun", "python", "python2", "python3",
  "perl", "ruby", "php", "rscript",
]);
const INLINE_CODE_FLAGS = new Set(["-e", "-c", "-E", "--eval", "--exec", "--command"]);

// Read-only / scoped-safe command heads. Allowed when their arguments do not
// trip a danger rule. (rm, dd, chmod, find, git, npm, interpreters, shells,
// and file-mutating heads are handled by dedicated logic below.)
const SAFE_HEADS = new Set([
  "ls", "pwd", "echo", "printf", "cat", "head", "tail", "wc", "nl", "tac",
  "grep", "egrep", "fgrep", "rg", "ag", "ack",
  "sort", "uniq", "comm", "join", "paste", "column", "cut", "tr", "fold",
  "fmt", "expand", "unexpand", "rev", "seq",
  "diff", "cmp", "colordiff", "patch",
  "basename", "dirname", "realpath", "readlink",
  "stat", "file", "tree", "wc",
  "date", "cal", "whoami", "id", "groups", "uname", "hostname", "arch",
  "printenv", "which", "type", "tty",
  "df", "du", "free", "uptime", "ps", "pgrep", "jobs",
  "sleep", "true", "false", "clear", "test", "[",
  "base64", "base32", "xxd", "od", "hexdump",
  "sha256sum", "sha1sum", "sha512sum", "md5sum", "cksum",
  "jq", "yq", "mktemp", "tee",
  "mkdir", "touch", "cp", "ln",
]);

// Disposable build artifacts a recursive rm may target without prompting.
const DISPOSABLE_DIRS = new Set([
  "node_modules", "dist", "build", "out", "coverage",
  ".next", ".nuxt", ".turbo", ".cache", ".parcel-cache", ".vite",
  ".svelte-kit", ".angular", ".output",
  "tmp", "temp", ".tmp",
  "__pycache__", ".pytest_cache", ".mypy_cache", ".tox", ".ruff_cache",
]);

const NPM_SAFE_SUBCMDS = new Set([
  "test", "run", "run-script", "ci", "install", "i", "add", "ls", "list",
  "view", "info", "outdated", "audit", "why", "dedupe", "prune", "build",
  "start", "lint", "version", "ping", "config", "exec",
]);

const GIT_SAFE_SUBCMDS = new Set([
  "status", "log", "diff", "show", "branch", "remote", "fetch", "ls-files",
  "ls-remote", "rev-parse", "describe", "blame", "cat-file", "shortlog",
  "reflog", "config", "tag", "stash", "switch", "checkout",
]);

// Raw / block devices whose destruction is catastrophic. Character pseudo
// devices (/dev/null, /dev/zero, /dev/stdout, ...) are intentionally excluded.
const BLOCK_DEVICE = /^\/dev\/(sd[a-z]|hd[a-z]|nvme\d|vd[a-z]|xvd[a-z]|mmcblk\d|disk\d|loop\d|dm-\d|md\d|sr\d|fd\d)/;

// ---------------------------------------------------------------------------
// Per-stage / per-pipeline classification
// ---------------------------------------------------------------------------

function isEnvAssignment(w: Word): boolean {
  return !w.startsWithVar && !w.hadTilde && /^[A-Za-z_][A-Za-z0-9_]*=/.test(w.value);
}

/** Strip leading env assignments and transparent prefixes (sudo, env, ...). */
function unwrapPrefixes(argv: Word[]): Word[] {
  let out = argv.slice();
  while (out.length) {
    const head = out[0];
    if (isEnvAssignment(head)) { out = out.slice(1); continue; }
    if (head.value === "env" || PREFIXES.has(head.value)) { out = out.slice(1); continue; }
    break;
  }
  return out;
}

function headValue(argv: Word[]): string {
  return argv.length ? argv[0].value : "";
}

function isFlag(w: Word): boolean {
  return w.value.startsWith("-") && w.value !== "-" && w.value !== "--";
}

function hasFlag(words: Word[], ...flags: string[]): boolean {
  return words.some((w) => {
    if (flags.includes(w.value)) return true;
    // bundled short flags such as -rf cover -r and -f
    if (/^-[A-Za-z]+$/.test(w.value)) {
      return flags.some((f) => /^-[A-Za-z]$/.test(f) && w.value.includes(f.slice(1)));
    }
    return false;
  });
}

/** Replace every $VAR / ${VAR} with empty string (worst-case expansion). */
function expandVarsEmpty(s: string): string {
  return s.replace(/\$\{[^}]*\}/g, "").replace(/\$[A-Za-z_][A-Za-z0-9_]*/g, "");
}

interface RmTargetVerdict {
  catastrophic: boolean;
  ruleId?: string;
  reason?: string;
}

function classifyRmTarget(w: Word): RmTargetVerdict {
  const lit = w.value;
  const worst = expandVarsEmpty(lit).replace(/\/+/g, "/");

  // A variable at the head of the path: if unset it collapses the path into
  // (or onto) the filesystem root. This is the "rm -rf $UNSET/" class.
  if (w.startsWithVar && (worst === "" || worst === "/" || worst.startsWith("/"))) {
    if (/\$\{?HOME\b/.test(lit)) {
      return { catastrophic: true, ruleId: "shell.rm_home", reason: "rm targets the home directory ($HOME)" };
    }
    return {
      catastrophic: true,
      ruleId: "shell.rm_unset_var",
      reason: "rm target begins with a variable that, if unset, resolves into the filesystem root",
    };
  }

  // Whole target was a variable that expands to nothing.
  if (w.hadExpansion && worst === "") {
    if (/\$\{?HOME\b/.test(lit)) {
      return { catastrophic: true, ruleId: "shell.rm_home", reason: "rm targets the home directory ($HOME)" };
    }
    return { catastrophic: true, ruleId: "shell.rm_unset_var", reason: "rm target resolves to an empty/unset variable" };
  }

  // Home directory root.
  if (w.hadTilde && /^~\/*$/.test(lit)) {
    return { catastrophic: true, ruleId: "shell.rm_home", reason: "rm targets the home directory root (~)" };
  }

  // Filesystem root.
  if (/^\/+$/.test(worst)) {
    return { catastrophic: true, ruleId: "shell.rm_root", reason: "rm targets the filesystem root (/)" };
  }

  return { catastrophic: false };
}

function isSafeRemovable(w: Word): boolean {
  if (w.startsWithVar || w.hadExpansion || w.hadTilde) return false;
  const p = w.value;
  if (p === "" || p.startsWith("/")) return false; // absolute paths are never auto-safe
  const segs = p.replace(/^\.\//, "").replace(/\/+$/, "").split("/").filter(Boolean);
  if (segs.length === 0 || segs.includes("..")) return false;
  if (/\.(log|tmp)$/.test(p)) return true;
  return segs.some((s) => DISPOSABLE_DIRS.has(s));
}

function classifyRm(argv: Word[]): GateResult {
  const targets = argv.slice(1).filter((w) => !isFlag(w));

  for (const t of targets) {
    const v = classifyRmTarget(t);
    if (v.catastrophic) {
      return mk("deny", v.ruleId!, v.reason!, [`rm target: ${t.value}`]);
    }
  }

  if (targets.length === 0) {
    return mk("ask", "shell.rm_no_target", "rm with no resolvable target; failing closed to ask");
  }

  if (targets.every(isSafeRemovable)) {
    return mk("allow", "shell.rm_safe_artifact", "rm of recognized disposable build artifacts", [
      `rm targets: ${targets.map((t) => t.value).join(" ")}`,
    ]);
  }

  return mk("ask", "shell.rm_unscoped", "rm target is not a recognized disposable artifact; ask before removal", [
    `rm targets: ${targets.map((t) => t.value).join(" ")}`,
  ]);
}

function targetsBlockDevice(argv: Word[]): string | null {
  for (const w of argv) {
    const m = w.value.match(/^of=(.+)$/);
    if (m && BLOCK_DEVICE.test(m[1])) return m[1];
    if (BLOCK_DEVICE.test(w.value)) return w.value;
  }
  return null;
}

function classifyStage(stage: Stage): GateResult {
  // Redirection to a raw block device is a disk-wipe vector.
  for (const r of stage.redirects) {
    if (BLOCK_DEVICE.test(r.target)) {
      return mk("deny", "shell.write_to_device", "redirect targets a raw block device", [`${r.op} ${r.target}`]);
    }
  }

  const argv = unwrapPrefixes(stage.argv);
  if (argv.length === 0) {
    // Only a redirect or env assignment (e.g. "> file"): nothing to execute.
    return mk("allow", "shell.noop", "no command to execute in this stage");
  }

  const head = argv[0];
  const name = head.value;

  // A command name that is itself a variable cannot be reasoned about.
  if (head.startsWithVar || head.hadExpansion) {
    return mk("ask", "shell.dynamic_command", "command name is a variable expansion; cannot resolve");
  }

  // ---- catastrophic, environment-independent shapes ----
  if (name === "rm") return classifyRm(argv);

  if (name === "dd") {
    const dev = targetsBlockDevice(argv);
    if (dev) return mk("deny", "shell.dd_to_device", "dd writes to a raw block device", [`of=${dev}`]);
    return mk("ask", "shell.dd_to_file", "dd is a powerful raw-write tool; ask before running");
  }

  if (name === "mkfs" || name.startsWith("mkfs.") || name === "mke2fs" || name === "mkswap") {
    return mk("deny", "shell.mkfs", "mkfs formats a filesystem (destroys all data on the device)", [name]);
  }

  if (name === "shred") {
    const dev = targetsBlockDevice(argv);
    if (dev) return mk("deny", "shell.shred_device", "shred targets a raw block device", [dev]);
    return mk("ask", "shell.shred", "shred irreversibly destroys file contents; ask before running");
  }

  if (name === "chmod") {
    const recursive = hasFlag(argv, "-R", "--recursive");
    const worldWritable = argv.some((w) => /^0?777$/.test(w.value) || /^[augo]*\+rwx$/.test(w.value));
    if (recursive && worldWritable) {
      return mk("deny", "shell.chmod_777_recursive", "chmod -R 777 makes a whole tree world-writable", []);
    }
    return mk("allow", "shell.chmod_scoped", "scoped chmod");
  }

  // ---- re-entry / opaque execution -> ask ----
  if (name === "eval" || name === "source" || name === "." || name === "exec") {
    return mk("ask", "shell.eval_reentry", `${name} re-enters the shell with content this gate cannot see`, [name]);
  }

  if (INTERPRETERS.has(name)) {
    const rest = argv.slice(1);
    if (rest.some((w) => INLINE_CODE_FLAGS.has(w.value))) {
      return mk("ask", "shell.inline_code_exec", `${name} runs inline code this gate cannot inspect`, [name]);
    }
    const hasScript = rest.some((w) => !isFlag(w));
    if (!hasScript) {
      return mk("ask", "shell.interactive_interpreter", `${name} with no script reads code from stdin`, [name]);
    }
    return mk("allow", "shell.run_local_script", `${name} runs a local script`, [name]);
  }

  if (SHELLS.has(name)) {
    const rest = argv.slice(1);
    if (rest.some((w) => w.value === "-c")) {
      return mk("ask", "shell.inline_code_exec", `${name} -c runs inline code this gate cannot inspect`, [name]);
    }
    const hasScript = rest.some((w) => !isFlag(w));
    if (hasScript) {
      return mk("ask", "shell.run_shell_script", `${name} runs a shell script this gate cannot inspect`, [name]);
    }
    return mk("ask", "shell.interactive_shell", `${name} reads commands from stdin`, [name]);
  }

  if (name === "awk" || name === "gawk" || name === "mawk") {
    if (argv.some((w) => w.value.includes("system("))) {
      return mk("ask", "shell.awk_shellout", "awk program shells out via system()", [name]);
    }
    return mk("allow", "shell.allow_readonly", "read-only text processing", [name]);
  }

  if (name === "find") {
    if (hasFlag(argv, "-delete") || argv.some((w) => ["-delete", "-exec", "-execdir", "-ok", "-okdir"].includes(w.value))) {
      return mk("ask", "shell.find_exec", "find runs an action (-delete/-exec) on matched files; ask first", [name]);
    }
    return mk("allow", "shell.allow_readonly", "read-only find", [name]);
  }

  if (name === "xargs") {
    const innerHead = argv.slice(1).find((w) => !isFlag(w));
    const inner = innerHead?.value ?? "";
    if (["rm", "rmdir", "dd", "shred", "mkfs", "chmod", "chown", "mv", "kill"].includes(inner)) {
      return mk("ask", "shell.xargs_dynamic", `xargs runs ${inner} over input this gate cannot resolve`, [`xargs ${inner}`]);
    }
    return mk("allow", "shell.xargs_safe", "xargs over a non-destructive command", [`xargs ${inner}`]);
  }

  if (name === "mv") {
    const dev = targetsBlockDevice(argv);
    if (dev) return mk("deny", "shell.write_to_device", "mv onto a raw block device", [dev]);
    return mk("allow", "shell.allow_scoped_fs", "scoped move");
  }

  if (name === "npm" || name === "pnpm" || name === "yarn") {
    const sub = argv.slice(1).find((w) => !isFlag(w))?.value ?? "";
    if (sub === "publish") {
      return mk("ask", "shell.package_publish", `${name} publish is a ship action; defer to ShipGate / ask`, [`${name} ${sub}`]);
    }
    if (sub === "dlx" || (name === "npm" && sub === "exec")) {
      return mk("ask", "shell.package_dlx", `${name} ${sub} fetches and runs arbitrary code`, [`${name} ${sub}`]);
    }
    if (sub === "" || NPM_SAFE_SUBCMDS.has(sub)) {
      return mk("allow", "shell.package_manager", `${name} ${sub || "<default>"}`.trim(), [`${name} ${sub}`]);
    }
    return mk("ask", "shell.package_unknown", `unrecognized ${name} subcommand; ask first`, [`${name} ${sub}`]);
  }

  if (name === "git") {
    const sub = argv.slice(1).find((w) => !isFlag(w))?.value ?? "";
    if (GIT_SAFE_SUBCMDS.has(sub)) {
      return mk("allow", "shell.git_readonly", `git ${sub}`, [`git ${sub}`]);
    }
    return mk("ask", "shell.git_deferred", `git ${sub || "<command>"} is gated by GitGate; ask here`, [`git ${sub}`]);
  }

  // File-mutating but scoped heads with a device guard.
  if (name === "cp" || name === "tee") {
    const dev = targetsBlockDevice(argv);
    if (dev) return mk("deny", "shell.write_to_device", `${name} writes onto a raw block device`, [dev]);
    return mk("allow", "shell.allow_scoped_fs", `scoped ${name}`);
  }

  if (SAFE_HEADS.has(name)) {
    return mk("allow", "shell.allow_readonly", "recognized safe command", [name]);
  }

  // Deny-by-default: not on the allowlist. ask interactively; Part 8's
  // applyAutonomy escalates this to deny when running unattended.
  return mk("ask", "shell.not_allowlisted", `'${name}' is not on the command allowlist`, [name]);
}

/** Detect remote-fetch-to-shell and decode-to-shell across a pipeline. */
function pipelineHazard(stages: Stage[]): GateResult | null {
  const heads = stages.map((s) => headValue(unwrapPrefixes(s.argv)));

  const readsStdinShell = (stage: Stage): boolean => {
    const argv = unwrapPrefixes(stage.argv);
    if (!SHELLS.has(headValue(argv))) return false;
    const rest = argv.slice(1);
    if (rest.length === 0) return true;
    if (rest.some((w) => w.value === "-s" || w.value === "--stdin" || w.value === "-")) return true;
    if (rest.some((w) => w.value === "-c")) return false; // inline code, handled per-stage
    if (rest.some((w) => !isFlag(w))) return false; // script-file operand
    return true; // only flags -> reads stdin
  };

  for (let i = 1; i < stages.length; i++) {
    if (!readsStdinShell(stages[i])) continue;
    const upstream = heads.slice(0, i);
    if (upstream.some((h) => FETCHERS.has(h))) {
      return mk("deny", "shell.pipe_remote_to_shell", "remote-fetched content is piped straight into a shell", [
        `pipeline: ${heads.join(" | ")}`,
      ]);
    }
    if (upstream.some((h) => DECODERS.has(h))) {
      return mk("ask", "shell.opaque_decode_to_shell", "decoded (opaque) content is piped into a shell", [
        `pipeline: ${heads.join(" | ")}`,
      ]);
    }
    return mk("ask", "shell.pipe_to_shell", "content is piped into a shell that reads stdin", [
      `pipeline: ${heads.join(" | ")}`,
    ]);
  }
  return null;
}

// ---------------------------------------------------------------------------
// Recursive command evaluation
// ---------------------------------------------------------------------------

function evalCommand(raw: string, depth: number): GateResult {
  const trimmed = raw.trim();
  if (trimmed === "") return mk("allow", "shell.noop", "empty command");

  const parsed = parse(raw); // throws ParseError -> caught by the gate -> ask

  // Accumulate the most restrictive result. Seeded empty so the first rule that
  // actually fires becomes the deciding rule (rather than a generic baseline);
  // ties keep the earliest rule. Falls back to a no-op allow if nothing ran.
  let acc: GateResult | null = null;
  const fold = (r: GateResult): GateResult => {
    acc = acc ? moreRestrictive(acc, r) : r;
    return acc;
  };

  for (const stages of parsed.pipelines) {
    const hazard = pipelineHazard(stages);
    if (hazard && fold(hazard).verdict === "deny") return acc!;
    for (const stage of stages) {
      if (fold(classifyStage(stage)).verdict === "deny") return acc!;
      for (const sub of stage.substitutions) {
        let subResult: GateResult;
        if (depth >= MAX_SUBSTITUTION_DEPTH) {
          subResult = mk("ask", "shell.substitution_depth", "nested substitution too deep to analyze");
        } else {
          try {
            subResult = evalCommand(sub, depth + 1);
          } catch {
            subResult = mk("ask", "shell.unparseable", "unparseable command substitution; failing closed to ask");
          }
        }
        if (fold(subResult).verdict === "deny") return acc!;
      }
    }
  }
  return acc ?? mk("allow", "shell.noop", "no executable command");
}

// ---------------------------------------------------------------------------
// Gate
// ---------------------------------------------------------------------------

export const commandGate: Gate = (ctx: GateContext): GateResult => {
  // CommandGate only evaluates shell-class actions routed through UnClick tools.
  // Other action classes are owned by their dedicated gates; abstain (allow).
  if (ctx.action.class !== "shell") {
    return mk("allow", "shell.not_applicable", "CommandGate only evaluates shell-class actions");
  }
  try {
    return evalCommand(ctx.action.raw ?? "", 0);
  } catch {
    // Fail closed: anything we cannot tokenize/parse becomes "ask".
    return mk("ask", "shell.unparseable", "could not parse the shell command; failing closed to ask");
  }
};
