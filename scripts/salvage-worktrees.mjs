#!/usr/bin/env node
// scripts/salvage-worktrees.mjs
//
// Non-destructive salvage planner for dirty / stale / orphan local worktrees.
//
// Serves UnClick jobs:
//   2352d206  Salvage dirty/stale local worktrees before cleanup
//   07d3e88f  Inspect forgotten checkout branches (preserve work, no deletion)
//
// It walks a root directory (for example C:\G\UnClick\repos\), inspects every
// immediate sub-checkout READ-ONLY, classifies its state, and builds a
// preservation plan that pushes each at-risk checkout to a
//   safety/local-sync-<timestamp>/<NN>-<branch>
// branch on origin and writes local snapshot artefacts (a full git bundle, a
// tracked-changes patch, and an untracked-file manifest). This is the exact
// pattern already proven on 2026-05-29 (see the safety/local-sync-20260529-100205/*
// branches on origin).
//
// SAFETY: the plan only ever contains preserve operations (bundle, push,
// diff-to-file, ls-files). It never emits reset, clean, checkout -f, pull,
// rebase, merge, stash pop/drop, branch -D, restore, or push --force. The
// planner asserts this invariant. Cleanup / deletion is always left to the
// human owner after preservation is confirmed.
//
// Default mode is dry-run (print the plan). Pass --execute to actually run the
// preserve commands.
//
// Usage:
//   node scripts/salvage-worktrees.mjs --root "C:\\G\\UnClick\\repos"
//   node scripts/salvage-worktrees.mjs --root ./repos --json
//   node scripts/salvage-worktrees.mjs --root ./repos --execute

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const execFileP = promisify(execFile);

// Tokens that must never appear in a generated salvage command. The planner
// preserves work; it does not mutate or delete checkouts.
export const DESTRUCTIVE_TOKENS = [
  "reset",
  "clean",
  "checkout -f",
  "checkout --force",
  "restore",
  "pull",
  "rebase",
  "merge",
  "stash pop",
  "stash drop",
  "stash clear",
  "branch -d",
  "branch -D",
  "--force",
  "-f ",
  "rm -",
];

export function sanitizeBranchSegment(name) {
  return String(name ?? "")
    .trim()
    .replace(/[~^:?*\[\]\\\s]/g, "-")
    .replace(/\//g, "-")
    .replace(/\.{2,}/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .replace(/-{2,}/g, "-") || "detached";
}

export function pad2(n) {
  return String(n).padStart(2, "0");
}

export function nowStamp(date = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return (
    `${date.getUTCFullYear()}${p(date.getUTCMonth() + 1)}${p(date.getUTCDate())}` +
    `-${p(date.getUTCHours())}${p(date.getUTCMinutes())}${p(date.getUTCSeconds())}`
  );
}

/**
 * Summarise `git status --porcelain=v1` output into counts.
 */
export function summarizeStatus(porcelain) {
  const counts = { modified: 0, added: 0, deleted: 0, renamed: 0, untracked: 0, total: 0 };
  for (const raw of String(porcelain ?? "").split(/\r?\n/)) {
    if (!raw.trim()) continue;
    counts.total += 1;
    const xy = raw.slice(0, 2);
    if (xy === "??") counts.untracked += 1;
    else if (xy.includes("R")) counts.renamed += 1;
    else if (xy.includes("D")) counts.deleted += 1;
    else if (xy.includes("A")) counts.added += 1;
    else counts.modified += 1;
  }
  counts.dirty = counts.total - counts.untracked;
  return counts;
}

/**
 * Classify a worktree snapshot. Pure: takes plain values.
 *
 * snapshot = {
 *   path, branch, head, detached:boolean, upstream:string|null,
 *   ahead:number, behind:number, status:{...}, stashCount:number,
 *   onRemote:boolean   // is HEAD contained in any remote-tracking ref
 * }
 */
export function classifyWorktree(snapshot) {
  const s = snapshot || {};
  const status = s.status || {};
  const reasons = [];

  const hasUncommitted = (status.dirty || 0) > 0 || (status.untracked || 0) > 0;
  const ahead = s.ahead || 0;
  const unpushed = ahead > 0 || (!s.detached && !s.upstream && s.onRemote === false);
  const detached = Boolean(s.detached);
  const stash = (s.stashCount || 0) > 0;

  if (hasUncommitted) {
    reasons.push(
      `uncommitted changes (${status.dirty || 0} tracked, ${status.untracked || 0} untracked)`,
    );
  }
  if (detached) reasons.push("detached HEAD (no branch ref protecting the tip)");
  if (unpushed) reasons.push("local commits not present on any remote");
  if (stash) reasons.push(`${s.stashCount} stash entr${s.stashCount === 1 ? "y" : "ies"}`);

  const atRisk = reasons.length > 0;
  let state = "clean";
  if (atRisk) {
    if (hasUncommitted) state = "dirty";
    else if (unpushed) state = "unpushed";
    else if (detached) state = "detached";
    else state = "stash-only";
  }
  return { path: s.path, branch: s.branch, state, atRisk, reasons };
}

/**
 * Build a preservation plan from a classified inventory. Only at-risk
 * worktrees get preserve steps; clean ones are listed for transparency.
 */
export function buildSalvagePlan(inventory, { timestamp = nowStamp(), outDir = "." } = {}) {
  const namespace = `safety/local-sync-${timestamp}`;
  const atRisk = inventory.filter((w) => w.atRisk);
  const clean = inventory.filter((w) => !w.atRisk).map((w) => ({ path: w.path, branch: w.branch }));

  const items = atRisk.map((w, idx) => {
    const nn = pad2(idx + 1);
    const seg = sanitizeBranchSegment(w.branch || "detached");
    const branchName = `${namespace}/${nn}-${seg}`;
    const base = `${outDir.replace(/\/+$/, "")}/${nn}-${seg}`;
    const q = (p) => `"${p}"`;
    const commands = [
      `git -C ${q(w.path)} bundle create ${q(base + ".bundle")} --all`,
      `git -C ${q(w.path)} push origin ${q("HEAD:refs/heads/" + branchName)}`,
      `git -C ${q(w.path)} diff HEAD > ${q(base + ".tracked.patch")}`,
      `git -C ${q(w.path)} ls-files --others --exclude-standard > ${q(base + ".untracked-manifest.txt")}`,
      `git -C ${q(w.path)} status --porcelain=v1 > ${q(base + ".status.txt")}`,
    ];
    return {
      index: nn,
      path: w.path,
      branch: w.branch,
      state: w.state,
      reasons: w.reasons,
      branchName,
      bundleFile: base + ".bundle",
      commands,
      notes:
        "Preserve only. After the safety branch and bundle are confirmed on origin, the owner may clean the local checkout. No reset / pull / force here.",
    };
  });

  const plan = { timestamp, namespace, atRiskCount: atRisk.length, cleanCount: clean.length, items, clean };
  assertNonDestructive(plan);
  return plan;
}

// Strip quoted operands ("paths", "refspecs", redirect targets) so the
// destructive-token scan only sees the git verb/flag skeleton. Without this a
// harmless worktree path like .../repos/clean would false-trip the guard.
function commandSkeleton(cmd) {
  return String(cmd).replace(/"[^"]*"/g, '""').toLowerCase();
}

/**
 * Guard invariant: throws if any generated command's verb/flag skeleton
 * contains a destructive token. Path and refspec operands are excluded.
 */
export function assertNonDestructive(plan) {
  for (const item of plan.items || []) {
    for (const cmd of item.commands || []) {
      const skeleton = commandSkeleton(cmd);
      for (const tok of DESTRUCTIVE_TOKENS) {
        if (skeleton.includes(tok)) {
          throw new Error(`Refusing destructive salvage command (${tok}): ${cmd}`);
        }
      }
    }
  }
  return true;
}

export function renderPlanMarkdown(plan) {
  const lines = [];
  lines.push(`# Worktree salvage plan ${plan.timestamp}`);
  lines.push("");
  lines.push(`Namespace: \`${plan.namespace}\``);
  lines.push(`At-risk worktrees: ${plan.atRiskCount}  |  Clean: ${plan.cleanCount}`);
  lines.push("");
  if (plan.items.length === 0) {
    lines.push("No at-risk worktrees found. Nothing to preserve.");
  }
  for (const item of plan.items) {
    lines.push(`## ${item.index} ${item.path}`);
    lines.push(`- branch: \`${item.branch || "(detached)"}\`  state: **${item.state}**`);
    lines.push(`- reasons: ${item.reasons.join("; ")}`);
    lines.push(`- safety branch: \`${item.branchName}\``);
    lines.push("");
    lines.push("```sh");
    for (const c of item.commands) lines.push(c);
    lines.push("```");
    lines.push("");
  }
  if (plan.clean.length) {
    lines.push("## Clean (no action needed)");
    for (const c of plan.clean) lines.push(`- ${c.path} (\`${c.branch || "detached"}\`)`);
  }
  return lines.join("\n");
}

// ── thin runtime layer (read-only inspection) ───────────────────────────────

function getArg(name, fallback = undefined) {
  const prefix = `--${name}=`;
  for (let i = 0; i < process.argv.length; i += 1) {
    const a = process.argv[i];
    if (a === `--${name}`) return process.argv[i + 1] ?? fallback;
    if (a.startsWith(prefix)) return a.slice(prefix.length);
  }
  return fallback;
}

async function gitOut(cwd, args) {
  try {
    const { stdout } = await execFileP("git", ["-C", cwd, ...args], { encoding: "utf8" });
    return stdout;
  } catch {
    return "";
  }
}

async function inspectWorktree(dir) {
  const branch = (await gitOut(dir, ["rev-parse", "--abbrev-ref", "HEAD"])).trim();
  const head = (await gitOut(dir, ["rev-parse", "HEAD"])).trim();
  const detached = branch === "HEAD" || branch === "";
  const upstreamRaw = (await gitOut(dir, ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"])).trim();
  const upstream = upstreamRaw && !upstreamRaw.includes("fatal") ? upstreamRaw : null;
  let ahead = 0;
  if (upstream) {
    const counts = (await gitOut(dir, ["rev-list", "--left-right", "--count", `${upstream}...HEAD`])).trim();
    const m = counts.split(/\s+/);
    ahead = Number(m[1] || 0);
  }
  const status = summarizeStatus(await gitOut(dir, ["status", "--porcelain=v1"]));
  const stashCount = (await gitOut(dir, ["stash", "list"])).split(/\r?\n/).filter(Boolean).length;
  // onRemote: does any remote-tracking ref contain HEAD?
  const containing = (await gitOut(dir, ["branch", "-r", "--contains", "HEAD"])).trim();
  const onRemote = containing.length > 0;
  return classifyWorktree({
    path: dir,
    branch: detached ? "" : branch,
    head,
    detached,
    upstream,
    ahead,
    status,
    stashCount,
    onRemote,
  });
}

async function main() {
  const root = getArg("root");
  if (!root) {
    console.error('Usage: node scripts/salvage-worktrees.mjs --root "C:\\\\G\\\\UnClick\\\\repos" [--execute] [--json]');
    process.exit(2);
  }
  const timestamp = nowStamp();
  const outDir = getArg("out", `./unclick-salvage-${timestamp}`);
  const execute = process.argv.includes("--execute");
  const asJson = process.argv.includes("--json");

  let entries;
  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch (err) {
    console.error(`Cannot read root ${root}: ${err?.message ?? err}`);
    process.exit(2);
  }

  const inventory = [];
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const dir = path.join(root, ent.name);
    if (!existsSync(path.join(dir, ".git"))) continue;
    inventory.push(await inspectWorktree(dir));
  }

  const plan = buildSalvagePlan(inventory, { timestamp, outDir });

  if (asJson) {
    console.log(JSON.stringify(plan, null, 2));
  } else {
    console.log(renderPlanMarkdown(plan));
  }

  if (execute && plan.items.length) {
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "salvage-plan.json"), JSON.stringify(plan, null, 2));
    for (const item of plan.items) {
      // Re-derive and run only the non-destructive preserve operations through
      // execFile (not a shell) so nothing can be injected or chained.
      const seg = path.basename(item.bundleFile, ".bundle");
      const base = path.join(outDir, seg);
      await execFileP("git", ["-C", item.path, "bundle", "create", `${base}.bundle`, "--all"]).catch((e) =>
        console.error(`bundle failed for ${item.path}: ${e?.message}`),
      );
      await execFileP("git", ["-C", item.path, "push", "origin", `HEAD:refs/heads/${item.branchName}`]).catch((e) =>
        console.error(`push failed for ${item.path}: ${e?.message}`),
      );
      const diff = await gitOut(item.path, ["diff", "HEAD"]);
      await writeFile(`${base}.tracked.patch`, diff);
      const untracked = await gitOut(item.path, ["ls-files", "--others", "--exclude-standard"]);
      await writeFile(`${base}.untracked-manifest.txt`, untracked);
      const status = await gitOut(item.path, ["status", "--porcelain=v1"]);
      await writeFile(`${base}.status.txt`, status);
      console.error(`preserved ${item.path} -> ${item.branchName}`);
    }
  }

  process.exit(0);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  main();
}
