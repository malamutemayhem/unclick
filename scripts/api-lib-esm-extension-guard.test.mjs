// Regression guard for the PR #1047 prod ESM crash class.
//
// In May 2026 a one-character omission (a relative import without the `.js`
// extension in api/lib/fishbowl-todo-open-stale-release.ts) crashed the
// Vercel function on every 15-minute cron tick with ERR_MODULE_NOT_FOUND.
// vitest is lenient on extensionless relative imports, so local tests passed;
// Vercel's nodenext ESM loader is strict, so prod broke. The api/ workspace
// has no typecheck/build gate in CI that mirrors Vercel's ESM resolution.
//
// This guard fails CI if any TypeScript or JavaScript source file under
// api/lib/ contains a relative import (static or dynamic, value or type-only,
// import or re-export) whose specifier does not carry an explicit recognised
// extension. Test files (`*.test.ts`) are excluded because they run under vitest,
// not Vercel.
//
// If a future fix legitimately needs a non-`.js` extension (e.g. `.json`,
// `.mjs`, `.cjs`), add it to ALLOWED_EXTENSIONS below with a comment
// explaining why.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const scanRoot = path.join(repoRoot, "api", "lib");

// Files of these extensions are scanned as source.
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".mts", ".cts", ".js", ".mjs", ".cjs"]);

// Allowed extensions for relative import specifiers. `.js` is the canonical
// target for `.ts` source under nodenext. Add new ones here with a note.
const ALLOWED_EXTENSIONS = new Set([".js", ".mjs", ".cjs", ".json"]);

// Test/spec files are not loaded by Vercel; they run under vitest in CI.
function isTestFile(relativePath) {
  return /\.test\.[mc]?[jt]sx?$/i.test(relativePath);
}

function walkSourceFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    if (entry.name === "node_modules") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSourceFiles(fullPath, out);
      continue;
    }
    if (!entry.isFile()) continue;
    if (!SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) continue;
    const relativePath = path.relative(repoRoot, fullPath);
    if (isTestFile(relativePath)) continue;
    out.push({ fullPath, relativePath });
  }
  return out;
}

// Matches the relative-import shapes that compile to runtime imports:
//   import ... from "./..." or '../...'
//   import "./..."
//   import type ... from "./..."
//   export ... from "./..."
//   export * from "./..."
//   import("./...")  (dynamic)
// Captures the specifier in group 2 (group 1 is the quote).
const RELATIVE_IMPORT_PATTERNS = [
  /\bfrom\s+(["'])(\.{1,2}\/[^"']+)\1/g,
  /\bimport\s+(["'])(\.{1,2}\/[^"']+)\1/g,
  /\bimport\s*\(\s*(["'])(\.{1,2}\/[^"']+)\1\s*\)/g,
];

function lineForOffset(content, offset) {
  return content.slice(0, offset).split(/\r?\n/).length;
}

function findRelativeImports(content) {
  const hits = [];
  for (const pattern of RELATIVE_IMPORT_PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of content.matchAll(pattern)) {
      const specifier = match[2];
      const offset = match.index ?? 0;
      hits.push({ specifier, offset });
    }
  }
  return hits;
}

function stripQueryAndFragment(specifier) {
  return specifier.split("?")[0].split("#")[0];
}

function hasAllowedExtension(specifier) {
  const ext = path.extname(stripQueryAndFragment(specifier)).toLowerCase();
  return ALLOWED_EXTENSIONS.has(ext);
}

test("guard regex catches the historical .js-omission bug shape", () => {
  // Positive control: this is exactly the line shape that crashed prod in #1047.
  const sample = `import {
  classifyTodoActionability,
  type TodoActionability,
} from "./fishbowl-todo-actionability";`;
  const hits = findRelativeImports(sample);
  assert.equal(hits.length, 1, "expected exactly one relative import");
  assert.equal(hits[0].specifier, "./fishbowl-todo-actionability");
  assert.equal(hasAllowedExtension(hits[0].specifier), false, "missing .js must be rejected");

  // Negative control: the fixed form must pass.
  const fixedSample = `import { x } from "./fishbowl-todo-actionability.js";`;
  const fixedHits = findRelativeImports(fixedSample);
  assert.equal(fixedHits.length, 1);
  assert.equal(hasAllowedExtension(fixedHits[0].specifier), true);
});

test("api/lib relative imports all carry an explicit ESM extension", () => {
  const files = walkSourceFiles(scanRoot);
  assert.ok(files.length > 0, `expected source files under ${path.relative(repoRoot, scanRoot)}`);

  const offenders = [];
  for (const { fullPath, relativePath } of files) {
    const content = fs.readFileSync(fullPath, "utf8");
    for (const { specifier, offset } of findRelativeImports(content)) {
      if (hasAllowedExtension(specifier)) continue;
      const line = lineForOffset(content, offset);
      offenders.push(`${relativePath}:${line} import "${specifier}" missing .js`);
    }
  }

  assert.deepEqual(
    offenders,
    [],
    [
      "Found relative imports in api/lib/ without an explicit .js extension.",
      "Vercel's nodenext ESM loader will reject these at runtime with ERR_MODULE_NOT_FOUND",
      "(see PR #1047). Add the .js extension to each specifier:",
      ...offenders,
    ].join("\n"),
  );
});
