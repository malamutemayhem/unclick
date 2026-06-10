#!/usr/bin/env node
// PR scope guard.
//
// Why this exists: PR #1347 described "11 shared utility modules, no existing
// code changed" but actually carried 2,578 commits / ~7,600 changed files of
// auto-generated filler (issue #1440). Nothing flagged the gap between the
// stated scope and the real diff. This guard fails a PR whose diff is grossly
// out of proportion - far past anything a normal feature or even a large
// refactor produces - unless a human explicitly opts in.
//
// It is deliberately generous: it only trips on true bloat, and a legitimate
// large change clears it by adding the "large-change-ok" label (or a
// "scope-ok" marker in the PR body). No dependencies.

import { execSync } from "node:child_process";

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const base = arg("base") ?? process.env.BASE_SHA;
const head = arg("head") ?? process.env.HEAD_SHA ?? "HEAD";
const labels = (arg("labels") ?? process.env.LABELS ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
const body = (arg("body") ?? process.env.PR_BODY ?? "").toLowerCase();

// Thresholds: set high so only egregious bloat trips. A connector add with full
// catalog regeneration is ~15-30 files; a big refactor rarely passes 200.
// Overridable via env so the repo can tune limits without editing code.
const MAX_FILES = Number(process.env.SCOPE_MAX_FILES) || 500;
const MAX_ADDITIONS = Number(process.env.SCOPE_MAX_ADDITIONS) || 50_000;

const OVERRIDE_LABEL = "large-change-ok";
const overridden =
  labels.includes(OVERRIDE_LABEL) || /\bscope-ok\b/.test(body);

if (!base) {
  console.log("PR scope guard: no base ref provided; skipping.");
  process.exit(0);
}

function sh(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

let fileCount = 0;
let additions = 0;
try {
  const names = sh(`git diff --name-only ${base}...${head}`);
  fileCount = names ? names.split("\n").length : 0;
  // numstat: "<added>\t<deleted>\t<path>" per file ("-" for binary).
  const numstat = sh(`git diff --numstat ${base}...${head}`);
  for (const line of numstat.split("\n").filter(Boolean)) {
    const added = line.split("\t")[0];
    if (added !== "-") additions += Number(added) || 0;
  }
} catch (err) {
  // Never fail CI because the diff could not be computed.
  console.log(
    `PR scope guard: could not compute diff (${
      err instanceof Error ? err.message : String(err)
    }); skipping.`
  );
  process.exit(0);
}

const violations = [];
if (fileCount > MAX_FILES)
  violations.push(`${fileCount} changed files (limit ${MAX_FILES})`);
if (additions > MAX_ADDITIONS)
  violations.push(`${additions} insertions (limit ${MAX_ADDITIONS})`);

console.log(
  `PR scope guard: ${fileCount} files changed, ${additions} insertions ` +
    `(limits: ${MAX_FILES} files / ${MAX_ADDITIONS} insertions).`
);

if (violations.length === 0) {
  console.log("✔ Within scope limits.");
  process.exit(0);
}

if (overridden) {
  console.log(
    `\n⚠ Over scope limits (${violations.join(
      "; "
    )}), but overridden via "${OVERRIDE_LABEL}" label / "scope-ok" marker. Allowing.`
  );
  process.exit(0);
}

console.error(
  `\n✖ PR scope guard failed: ${violations.join("; ")}.\n\n` +
    `A diff this large is almost never a single reviewable change - PR #1347 is\n` +
    `the cautionary tale (#1440). If this bloat is unintended, the branch is\n` +
    `likely based on a stale/wrong ref: re-cut it from origin/main and port only\n` +
    `the intended change.\n\n` +
    `If the size is genuinely intended (e.g. a large vendored data import or\n` +
    `bulk regeneration), add the "${OVERRIDE_LABEL}" label to the PR, or include\n` +
    `"scope-ok" in the PR body, and re-run.\n`
);
process.exit(1);
