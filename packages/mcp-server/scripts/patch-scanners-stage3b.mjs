#!/usr/bin/env node
// patch-scanners-stage3b.mjs
// Stage 3b moved the tool catalogue from additional-tools.ts / additional-handlers.ts
// into per-app modules under src/wiring/. wiring-model.mjs reconstructs the
// original text for the three generators it backs. Three OTHER text scanners read
// the catalogue directly and must be pointed at the new layout:
//   1. scripts/check-app-connection-readiness.mjs  -> read src/wiring/*.ts
//   2. packages/mcp-server/src/__tests__/schema-handler-contract.test.ts
//                                                   -> use wiring-model readHandlers()
//   3. packages/mcp-server/scripts/patch-reddit-public-wiring.mjs
//                                                   -> no-op when wiring/reddit.ts exists
// Each patch is idempotent and throws loudly if its anchor is missing.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../../..");

function patch(file, label, fn) {
  if (!fs.existsSync(file)) { console.log(`skip ${label}: not found (${file})`); return; }
  // Normalize CRLF -> LF for anchor matching (Windows checkouts use \r\n), then
  // restore the file's original line endings on write so the diff stays minimal.
  const raw = fs.readFileSync(file, "utf8");
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const before = raw.replace(/\r\n/g, "\n");
  const after = fn(before);
  if (after === null) { console.log(`ok ${label}: already patched`); return; }
  if (after === before) throw new Error(`patch ${label}: no change produced`);
  fs.writeFileSync(file, eol === "\r\n" ? after.replace(/\n/g, "\r\n") : after);
  console.log(`ok ${label}: patched`);
}

// ── 1. readiness check: read the wiring/ directory ──────────────────────────────
patch(
  path.join(repoRoot, "scripts/check-app-connection-readiness.mjs"),
  "check-app-connection-readiness",
  (src) => {
    if (src.includes("packages/mcp-server/src/wiring")) return null; // idempotent
    let out = src;

    const importAnchor = `import { readFile } from "node:fs/promises";`;
    if (!out.includes(importAnchor)) throw new Error("readiness: fs/promises import anchor missing");
    out = out.replace(importAnchor, `import { readFile, readdir } from "node:fs/promises";`);

    const loopAnchor = `  const wiringParts = [sources.toolWiring];
  for (const splitPath of TOOL_WIRING_SPLIT_PATHS) {
    try {
      wiringParts.push(await readSourceFile(cwd, splitPath));
    } catch {
      // Pre-split checkout: the decomposed wiring files do not exist yet.
    }
  }
  sources.toolWiring = wiringParts.join("\\n");`;
    if (!out.includes(loopAnchor)) throw new Error("readiness: wiringParts loop anchor missing");

    const loopReplacement = `  const wiringParts = [sources.toolWiring];
  const wiringDir = "packages/mcp-server/src/wiring";
  try {
    const files = (await readdir(path.join(cwd, wiringDir))).filter((f) => f.endsWith(".ts")).sort();
    for (const f of files) wiringParts.push(await readSourceFile(cwd, \`\${wiringDir}/\${f}\`));
  } catch {
    // Pre-3b checkout: no wiring/ dir; fold the monolith / split files back in.
    for (const splitPath of TOOL_WIRING_SPLIT_PATHS) {
      try {
        wiringParts.push(await readSourceFile(cwd, splitPath));
      } catch {
        // Pre-split checkout: the decomposed wiring files do not exist yet.
      }
    }
  }
  sources.toolWiring = wiringParts.join("\\n");`;
    out = out.replace(loopAnchor, loopReplacement);
    return out;
  }
);

// ── 2. schema-handler-contract test: use wiring-model readHandlers() ─────────────
patch(
  path.join(here, "../src/__tests__/schema-handler-contract.test.ts"),
  "schema-handler-contract.test",
  (src) => {
    if (src.includes("readHandlers(SRC_DIR)")) return null; // idempotent
    let out = src;

    const runtimeImport = `import { ADDITIONAL_TOOLS, ADDITIONAL_HANDLERS } from "../tool-wiring.js";`;
    if (!out.includes(runtimeImport)) throw new Error("contract: runtime import anchor missing");
    out = out.replace(
      runtimeImport,
      `${runtimeImport}\nimport { readHandlers } from "../../scripts/wiring-model.mjs";`
    );

    const readAnchor = `const splitSrc = path.join(SRC_DIR, "additional-handlers.ts");
const wiringSrc = fs.readFileSync(
  fs.existsSync(splitSrc) ? splitSrc : path.join(SRC_DIR, "tool-wiring.ts"),
  "utf8",
);`;
    if (!out.includes(readAnchor)) throw new Error("contract: wiringSrc read anchor missing");
    out = out.replace(
      readAnchor,
      `// Post-3b the catalogue lives in src/wiring/<slug>.ts; wiring-model reconstructs\n` +
      `// the connector imports + ADDITIONAL_HANDLERS map text the static fallback parses.\n` +
      `const wiringSrc = readHandlers(SRC_DIR);`
    );
    return out;
  }
);

// ── 3. patch-reddit: no-op once Reddit wiring is maintained directly ─────────────
patch(
  path.join(here, "patch-reddit-public-wiring.mjs"),
  "patch-reddit-public-wiring",
  (src) => {
    if (src.includes("redditWiringPath")) return null; // idempotent
    const anchor = `const toolsPath = path.resolve(here, "../src/additional-tools.ts");`;
    if (!src.includes(anchor)) throw new Error("patch-reddit: toolsPath anchor missing");
    const guard = `${anchor}
// Stage 3b moved Reddit wiring into src/wiring/reddit.ts, maintained directly with
// the public read-only tools already present, so this shim is a no-op there. It
// still patches the pre-3b monolith layouts below.
const redditWiringPath = path.resolve(here, "../src/wiring/reddit.ts");
if (fs.existsSync(redditWiringPath)) {
  const txt = fs.readFileSync(redditWiringPath, "utf8");
  if (txt.includes("reddit_thread") && txt.includes("redditThread")) {
    console.log("Reddit wiring already aligned (src/wiring/reddit.ts); nothing to patch.");
    process.exit(0);
  }
}`;
    return src.replace(anchor, guard);
  }
);

console.log("patch-scanners-stage3b: done");
