#!/usr/bin/env node
// scripts/check-checkout-hygiene.mjs
//
// Drive-synced checkout drift guard.
//
// Serves UnClick job "Drive-synced checkout drift hygiene: pre-commit guard +
// orphan-clone cleanup for C:\G\UnClick\repos\" (606cde4b).
//
// Why: a live git working tree that sits inside a cloud-sync root (Google Drive,
// OneDrive, Dropbox, iCloud, Box, pCloud) is unsafe. The sync daemon races the
// git process over .git/index and .git/objects, which corrupts the index,
// leaves stale index.lock files, and produces the "drift" that stranded the
// C:\G\UnClick\repos\ checkouts. A clone with no origin remote is an orphan
// that cannot be reconciled with GitHub. This guard flags both before a commit.
//
// It is advisory by design. The script reports findings and exits non-zero so a
// pre-commit hook can warn (default) or block (strict). It never edits, moves,
// or deletes anything.
//
// Exit codes:
//   0 = safe (checkout is outside any known sync root and has an origin remote)
//   1 = findings (sync-root or orphan-clone risk detected)
//   2 = usage / I/O error
//
// Usage:
//   node scripts/check-checkout-hygiene.mjs
//   node scripts/check-checkout-hygiene.mjs --path "C:\\G\\UnClick\\repos\\unclick" --extra-root "C:\\G"
//   node scripts/check-checkout-hygiene.mjs --json
//
// Extra sync roots (for site-specific mounts like a mapped Drive letter) can be
// supplied with repeated --extra-root flags or the UNCLICK_EXTRA_SYNC_ROOTS env
// var (comma or semicolon separated).

import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileP = promisify(execFile);

// Known cloud-sync path markers. Each pattern is matched against the checkout
// path after it is lowercased and its backslashes are normalised to forward
// slashes, so the same list works on Windows, macOS, and Linux mounts.
export const SYNC_ROOT_MARKERS = [
  { provider: "Google Drive", pattern: "/my drive/" },
  { provider: "Google Drive", pattern: "/google drive/" },
  { provider: "Google Drive", pattern: "/googledrive/" },
  { provider: "Google Drive (shared shortcut)", pattern: "/.shortcut-targets-by-id/" },
  { provider: "Google Drive (computers backup)", pattern: "/other computers/" },
  { provider: "OneDrive", pattern: "/onedrive/" },
  { provider: "OneDrive", pattern: "/onedrive -" },
  { provider: "Dropbox", pattern: "/dropbox/" },
  { provider: "iCloud Drive", pattern: "/library/mobile documents/" },
  { provider: "iCloud Drive", pattern: "/icloud drive/" },
  { provider: "Box", pattern: "/box sync/" },
  { provider: "pCloud", pattern: "/pclouddrive/" },
];

export function normalizePath(p) {
  return String(p ?? "")
    .replace(/\\/g, "/")
    .toLowerCase();
}

// Normalise a user-supplied extra root into a "/segment/" needle so a bare
// "C:\G" still matches ".../c:/g/unclick/...". Returns null for empties.
function extraRootToPattern(root) {
  const norm = normalizePath(root).replace(/^\/+|\/+$/g, "");
  if (!norm) return null;
  return `/${norm}/`;
}

export function gatherExtraRoots({ cliRoots = [], env = {} } = {}) {
  const fromEnv = String(env.UNCLICK_EXTRA_SYNC_ROOTS ?? "")
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
  return [...cliRoots, ...fromEnv];
}

/**
 * Returns the matching sync provider name when `targetPath` sits inside a known
 * cloud-sync root, otherwise null. A leading separator is prepended so a marker
 * that anchors on "/" still matches a path that begins with the marker.
 */
export function detectSyncRoot(targetPath, extraRoots = []) {
  const hay = `/${normalizePath(targetPath).replace(/^\/+/, "")}`;
  for (const { provider, pattern } of SYNC_ROOT_MARKERS) {
    if (hay.includes(pattern)) return provider;
  }
  for (const root of extraRoots) {
    const pat = extraRootToPattern(root);
    if (pat && hay.includes(pat)) return "custom sync root";
  }
  return null;
}

/**
 * Parse `git remote -v` output into a de-duplicated list of { name, url }.
 */
export function parseRemotes(remoteVerbose) {
  const seen = new Map();
  for (const line of String(remoteVerbose ?? "").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^(\S+)\s+(\S+)/);
    if (!match) continue;
    const [, name, url] = match;
    if (!seen.has(name)) seen.set(name, url);
  }
  return [...seen.entries()].map(([name, url]) => ({ name, url }));
}

/**
 * Pure evaluation. Inputs are plain values so the logic is testable without a
 * git repo or filesystem.
 *
 * @param {object} input
 * @param {string} input.checkoutPath  Absolute path of the working tree.
 * @param {string} [input.gitDir]      Absolute path of the .git directory.
 * @param {{name:string,url:string}[]} [input.remotes]
 * @param {string[]} [input.extraRoots]
 * @returns {{ ok:boolean, level:'safe'|'warn', findings:object[] }}
 */
export function evaluateCheckoutHygiene({
  checkoutPath,
  gitDir = "",
  remotes = [],
  extraRoots = [],
} = {}) {
  const findings = [];

  const gitDirProvider = gitDir ? detectSyncRoot(gitDir, extraRoots) : null;
  const treeProvider = detectSyncRoot(checkoutPath, extraRoots);

  if (gitDirProvider) {
    // The .git directory itself under a sync root is the worst case: object and
    // index corruption, not just working-tree races.
    findings.push({
      code: "DRIVE-SYNC-002",
      severity: "high",
      provider: gitDirProvider,
      message: `.git directory is inside a ${gitDirProvider} sync root (${gitDir}). The sync daemon will race git over .git/objects and .git/index and corrupt the repo.`,
    });
  } else if (treeProvider) {
    findings.push({
      code: "DRIVE-SYNC-001",
      severity: "medium",
      provider: treeProvider,
      message: `Working tree is inside a ${treeProvider} sync root (${checkoutPath}). Live checkouts here drift; keep code on a non-synced path and store only bundles/snapshots in the sync folder.`,
    });
  }

  const hasOrigin = remotes.some((r) => r.name === "origin");
  if (!hasOrigin) {
    findings.push({
      code: "ORPHAN-CLONE-001",
      severity: remotes.length === 0 ? "high" : "medium",
      message:
        remotes.length === 0
          ? "Clone has no git remotes. It is disconnected from GitHub and its commits cannot be reconciled or pushed for safekeeping."
          : `Clone has remotes (${remotes.map((r) => r.name).join(", ")}) but none named "origin", so standard fetch/push hygiene tooling will skip it.`,
    });
  }

  const level = findings.length > 0 ? "warn" : "safe";
  return { ok: level === "safe", level, findings };
}

export function render(result) {
  const lines = [];
  if (result.ok) {
    lines.push("✔ Checkout hygiene OK: outside known sync roots, origin remote present.");
    return lines.join("\n");
  }
  lines.push(`⚠ ${result.findings.length} checkout-hygiene finding(s):`);
  for (const f of result.findings) {
    lines.push(`  - [${f.code}/${f.severity}] ${f.message}`);
  }
  lines.push("");
  lines.push("This is advisory. To preserve work safely before any move, see docs/worktree-salvage-runbook.md.");
  lines.push("To relocate a live checkout off a synced drive, see docs/checkout-drift-hygiene.md.");
  return lines.join("\n");
}

// ── thin runtime layer ──────────────────────────────────────────────────────

function getArgs(name) {
  const values = [];
  const prefix = `--${name}=`;
  for (let i = 0; i < process.argv.length; i += 1) {
    const a = process.argv[i];
    if (a === `--${name}`) {
      const next = process.argv[i + 1];
      if (next && !next.startsWith("--")) values.push(next);
    } else if (a.startsWith(prefix)) {
      values.push(a.slice(prefix.length));
    }
  }
  return values;
}

async function gitOut(args) {
  try {
    const { stdout } = await execFileP("git", args, { encoding: "utf8" });
    return stdout.trim();
  } catch {
    return "";
  }
}

async function main() {
  const pathOverride = getArgs("path")[0];
  const extraRoots = gatherExtraRoots({ cliRoots: getArgs("extra-root"), env: process.env });
  const asJson = process.argv.includes("--json");

  let checkoutPath = pathOverride;
  let gitDir = "";
  let remotes = [];
  try {
    if (!checkoutPath) {
      const top = await gitOut(["rev-parse", "--show-toplevel"]);
      checkoutPath = top || process.cwd();
    }
    gitDir = await gitOut(["rev-parse", "--absolute-git-dir"]);
    remotes = parseRemotes(await gitOut(["remote", "-v"]));
  } catch (err) {
    console.error(`checkout hygiene: ${err?.message ?? err}`);
    process.exit(2);
  }

  const result = evaluateCheckoutHygiene({ checkoutPath, gitDir, remotes, extraRoots });
  if (asJson) {
    console.log(JSON.stringify({ checkoutPath, gitDir, ...result }, null, 2));
  } else {
    console.log(render(result));
  }
  process.exit(result.ok ? 0 : 1);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  main();
}
