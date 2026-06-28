#!/usr/bin/env node
// Orphan-module gate for the MCP server.
//
// Why this exists: CI green only proves "compiles + colocated unit test
// passes". It never proves a module is reachable from the running server.
// That gap let ~1,975 unwired "*-calc.ts" modules (57% of src) accumulate -
// every one passed CI while being dead code (see issue #1440).
//
// This script walks the static import graph from the server entrypoints and
// flags any source module that nothing reachable imports. A baseline allowlist
// records modules that are unreachable today, so the gate only fails on NEW
// orphans - it catches the next flood without forcing a big-bang cleanup.
//
// No dependencies, no TypeScript parse: a regex import scan is enough because
// the package is ESM with explicit "./x.js" specifiers.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, "..");
const srcDir = join(pkgRoot, "src");
const allowlistPath = join(here, "orphan-modules-allowlist.json");

// Entry roots: anything the published server can start from. Keep this small
// and explicit; a new genuine entrypoint should be added here on purpose.
// "index.ts" is the published bin (unclick-mcp); "server.ts" is main/exports.
// builder-access-profiles.ts is a source-backed policy contract consumed by
// ConnectorPass and docs, not by the runtime server import graph.
const ROOTS = ["index.ts", "server.ts", "builder-access-profiles.ts"]
  .map((r) => join(srcDir, r))
  .filter((p) => existsSync(p));

// Files that are reachable by means the static scan cannot see (test setup,
// build tooling) or that are intentionally standalone are excluded from being
// "candidates" entirely.
const EXCLUDE_RE = [
  /\.test\.ts$/,
  /\.d\.ts$/,
  /\.generated\.ts$/,
  /[/\\]__tests__[/\\]/,
  /[/\\]__mocks__[/\\]/,
];

function listTsFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...listTsFiles(full));
    else if (name.endsWith(".ts")) out.push(full);
  }
  return out;
}

// Resolve an import specifier (as written, e.g. "./x.js" or "./dir") to a
// concrete source file path, or null if it is not a local source module.
function resolveSpecifier(fromFile, spec) {
  if (!spec.startsWith(".")) return null; // bare/package import
  const base = resolve(dirname(fromFile), spec);
  const candidates = [
    base,
    base.replace(/\.js$/, ".ts"),
    base.replace(/\.mjs$/, ".ts"),
    base + ".ts",
    join(base, "index.ts"),
  ];
  for (const c of candidates) {
    if (existsSync(c) && c.endsWith(".ts")) return c;
  }
  return null;
}

const IMPORT_RE =
  /(?:import|export)\s+(?:[^"';]*?\sfrom\s*)?["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g;

function importsOf(file) {
  const text = readFileSync(file, "utf8");
  const specs = [];
  let m;
  while ((m = IMPORT_RE.exec(text)) !== null) {
    const spec = m[1] ?? m[2];
    if (spec) specs.push(spec);
  }
  return specs;
}

// BFS over the import graph from the roots.
const reachable = new Set();
const queue = [...ROOTS];
for (const r of ROOTS) reachable.add(r);
while (queue.length) {
  const file = queue.pop();
  for (const spec of importsOf(file)) {
    const target = resolveSpecifier(file, spec);
    if (target && !reachable.has(target)) {
      reachable.add(target);
      queue.push(target);
    }
  }
}

const allFiles = listTsFiles(srcDir);
const candidates = allFiles.filter((f) => !EXCLUDE_RE.some((re) => re.test(f)));
const orphans = candidates
  .filter((f) => !reachable.has(f))
  .map((f) => relative(pkgRoot, f).split("\\").join("/"))
  .sort();

const baseline = existsSync(allowlistPath)
  ? new Set(JSON.parse(readFileSync(allowlistPath, "utf8")).allow ?? [])
  : new Set();

const updateMode = process.argv.includes("--update-baseline");
if (updateMode) {
  const json = JSON.stringify(
    {
      note:
        "Modules unreachable from server.ts as of baseline. The orphan gate " +
        "fails only on NEW entries. Shrink this list; do not grow it. See issue #1440.",
      allow: orphans,
    },
    null,
    2
  );
  const { writeFileSync } = await import("node:fs");
  writeFileSync(allowlistPath, json + "\n");
  console.log(`Baseline written: ${orphans.length} allowed orphan(s).`);
  process.exit(0);
}

const newOrphans = orphans.filter((f) => !baseline.has(f));
const healed = [...baseline].filter((f) => !orphans.includes(f));

console.log(
  `Orphan-module gate: ${candidates.length} candidate module(s), ` +
    `${reachable.size} reachable, ${orphans.length} orphan(s) ` +
    `(${baseline.size} baselined).`
);

if (healed.length) {
  console.log(
    `\nNote: ${healed.length} baselined module(s) are now reachable. ` +
      `Run "npm run check:orphans -- --update-baseline" to shrink the allowlist.`
  );
}

if (newOrphans.length) {
  console.error(
    `\n✖ ${newOrphans.length} new orphan module(s) - reachable from nothing the server imports:\n`
  );
  for (const f of newOrphans) console.error(`    ${f}`);
  console.error(
    `\nWire each into the server (tool-wiring.ts / server.ts) or, if it is a` +
      ` deliberate standalone entrypoint, add it to ROOTS in ` +
      `scripts/check-orphan-modules.mjs. Do NOT just append to the baseline.\n`
  );
  process.exit(1);
}

console.log("✔ No new orphan modules.");
