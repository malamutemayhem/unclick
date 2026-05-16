#!/usr/bin/env node
// scripts/audit-crypto-helper-call-sites.mjs
//
// Companion audit script for "Architecture QC: shared API crypto helper v1".
// Scans the codebase for inline PBKDF2 / AES-256-GCM usage that should be
// migrated to the new shared helper at api/lib/crypto-helpers.ts.
//
// Pure stdlib, no DB access. Lists every call site so the follow-up patch
// PR (swap to shared helper) can be sized accurately.
//
// Usage:
//   node scripts/audit-crypto-helper-call-sites.mjs
//   node scripts/audit-crypto-helper-call-sites.mjs --root <path>
//   node scripts/audit-crypto-helper-call-sites.mjs --json

import { promises as fs } from "node:fs";
import * as path from "node:path";

const PATTERNS = [
  { id: "pbkdf2Sync",     re: /\bpbkdf2Sync\s*\(/ },
  { id: "pbkdf2_async",   re: /\bpbkdf2\s*\(/ },
  { id: "createCipheriv", re: /createCipheriv\s*\(\s*["'`]aes-256-gcm["'`]/i },
  { id: "createDecipheriv", re: /createDecipheriv\s*\(\s*["'`]aes-256-gcm["'`]/i },
  { id: "aes_256_gcm_string", re: /["'`]aes-256-gcm["'`]/i },
];

const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", ".turbo", ".cache", "coverage", ".vercel"]);
const TEXT_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"]);
const MAX_FILE_BYTES = 2_000_000;

// Files we expect to contain matches and which are NOT call sites that need migration:
//  - the shared helper itself
//  - its tests
//  - this audit script + its tests
const EXPECTED_REFS = [
  /\bapi\/lib\/crypto-helpers\.ts$/i,
  /\bapi\/lib\/crypto-helpers\.test\.ts$/i,
  /\baudit-crypto-helper-call-sites\.mjs$/i,
  /\baudit-crypto-helper-call-sites\.test\.mjs$/i,
];

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a === `--${name}` || a.startsWith(prefix));
  if (!found) return fallback;
  if (found === `--${name}`) {
    const idx = process.argv.indexOf(found);
    return process.argv[idx + 1] ?? fallback;
  }
  return found.slice(prefix.length);
}

function isExpected(rel) {
  return EXPECTED_REFS.some((re) => re.test(rel));
}

function shouldScan(file) {
  const ext = path.extname(file).toLowerCase();
  return TEXT_EXTENSIONS.has(ext);
}

async function* walk(dir, root, depth = 0) {
  if (depth > 20) return;
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.name.startsWith(".") && e.name !== ".github") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      yield* walk(full, root, depth + 1);
    } else if (e.isFile() && shouldScan(full)) {
      yield { full, rel: path.relative(root, full) };
    }
  }
}

export async function auditCallSites(root) {
  const callSites = []; // need migration
  const expectedHits = []; // helper / tests / this script
  let filesScanned = 0;

  for await (const { full, rel } of walk(root, root)) {
    let stat;
    try {
      stat = await fs.stat(full);
    } catch {
      continue;
    }
    if (stat.size > MAX_FILE_BYTES) continue;

    let body;
    try {
      body = await fs.readFile(full, "utf8");
    } catch {
      continue;
    }
    filesScanned += 1;

    const lines = body.split(/\r?\n/);
    const fileHits = [];
    for (let i = 0; i < lines.length; i += 1) {
      for (const p of PATTERNS) {
        if (p.re.test(lines[i])) {
          fileHits.push({ pattern: p.id, line: i + 1, excerpt: lines[i].trim().slice(0, 200) });
        }
      }
    }
    if (fileHits.length === 0) continue;

    const record = {
      file: rel.replace(/\\/g, "/"),
      hits: fileHits,
    };
    if (isExpected(rel)) expectedHits.push(record);
    else callSites.push(record);
  }

  return {
    root,
    filesScanned,
    patterns: PATTERNS.map((p) => p.id),
    callSites,
    expectedHits,
    migrationNeeded: callSites.length > 0,
  };
}

function renderText(report) {
  const lines = [];
  lines.push(`Scanned ${report.filesScanned} files under ${report.root}`);
  lines.push(`Patterns: ${report.patterns.join(", ")}`);
  if (!report.migrationNeeded) {
    lines.push("");
    lines.push("✔ No call sites found. Either the shared helper is already adopted everywhere or no crypto helpers exist yet.");
  } else {
    lines.push("");
    lines.push(`Found ${report.callSites.length} file(s) with inline crypto helper usage:`);
    for (const cs of report.callSites) {
      lines.push("");
      lines.push(`  ${cs.file}`);
      for (const h of cs.hits) {
        lines.push(`    L${h.line}  [${h.pattern}]  ${h.excerpt}`);
      }
    }
    lines.push("");
    lines.push("Follow-up patch: swap each call site to import from `api/lib/crypto-helpers.ts`. See docs/api-crypto-helpers.md for the migration recipe.");
  }
  if (report.expectedHits.length > 0) {
    lines.push("");
    lines.push("Expected hits (ignored, not migration targets):");
    for (const eh of report.expectedHits) lines.push(`  ${eh.file}`);
  }
  return lines.join("\n");
}

async function main() {
  const root = path.resolve(getArg("root", process.cwd()));
  let exists = true;
  try { await fs.access(root); } catch { exists = false; }
  if (!exists) {
    console.error(`Root path does not exist: ${root}`);
    process.exit(2);
  }
  const report = await auditCallSites(root);
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(renderText(report));
  }
  // Exit 0 always — this is informational, not a gate. The migration PR sets its own success criteria.
  process.exit(0);
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  main();
}

export { PATTERNS, isExpected, shouldScan, renderText };
