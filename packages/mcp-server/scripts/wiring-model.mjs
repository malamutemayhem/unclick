// wiring-model.mjs
// Single source of truth for parsing tool-wiring.ts as text.
//
// Three build-time generators (generate-tool-index, generate-standalone-mcp,
// audit-integrations) and a couple of guards used to each carry their own copy
// of the brittle regexes that slice ADDITIONAL_TOOLS / ADDITIONAL_HANDLERS and
// walk the `// ── <slug>-tool.ts ──` block headers. That duplication is the
// thing that makes restructuring tool-wiring.ts dangerous: a layout change has
// to be reasoned about against N independent parsers.
//
// This module centralises every one of those parses in one place. The logic is
// lifted verbatim from the original generators (only parameterised by text), so
// output is byte-identical; the win is that future layout changes touch this
// one file instead of being scattered across the scripts.
//
// Pure functions: every parser takes source text and returns data. The only IO
// is the readWiring() convenience reader.

import fs from "node:fs";
import path from "node:path";

/** Read tool-wiring.ts from a package src directory. */
export function readWiring(srcDir) {
  return fs.readFileSync(path.join(srcDir, "tool-wiring.ts"), "utf8");
}

/**
 * Read additional-handlers.ts (the connector imports + ADDITIONAL_HANDLERS map,
 * split out of tool-wiring.ts). Falls back to tool-wiring.ts when the split file
 * is absent, so this module also works against the pre-split layout.
 */
export function readHandlers(srcDir) {
  const split = path.join(srcDir, "additional-handlers.ts");
  return fs.existsSync(split) ? fs.readFileSync(split, "utf8") : readWiring(srcDir);
}

/**
 * Read additional-tools.ts (the ADDITIONAL_TOOLS catalogue, split out of
 * tool-wiring.ts in Stage 3). Falls back to tool-wiring.ts when the split file
 * is absent, so this module also works against the pre-split layout.
 */
export function readTools(srcDir) {
  const split = path.join(srcDir, "additional-tools.ts");
  return fs.existsSync(split) ? fs.readFileSync(split, "utf8") : readWiring(srcDir);
}

// ─── Section slicing ───────────────────────────────────────────────────────
// Slice the body of an exported literal (ADDITIONAL_TOOLS = [ ... ] or
// ADDITIONAL_HANDLERS = { ... }) by scanning from its marker to the section's
// closing "\n];" / "\n};".

export function section(wiring, marker, openTok) {
  const start = wiring.indexOf(marker);
  if (start < 0) throw new Error(`marker not found: ${marker}`);
  const open = wiring.indexOf(openTok, start) + openTok.length;
  const close = wiring.indexOf(openTok === "[" ? "\n];" : "\n};", open);
  return wiring.slice(open, close);
}

// ─── Import-region category map ──────────────────────────────────────────────
// slug -> category, from the `// ─── Category ───` headers that group the
// per-connector imports above the ADDITIONAL_TOOLS literal.

export function parseImportCategories(wiring) {
  // imports live above the first ADDITIONAL_* export, in whichever file holds
  // them (tool-wiring.ts pre-split, additional-handlers.ts post-split).
  const cut = ["export const ADDITIONAL_TOOLS", "export const ADDITIONAL_HANDLERS"]
    .map((m) => wiring.indexOf(m))
    .filter((i) => i >= 0)
    .reduce((a, b) => Math.min(a, b), Infinity);
  const importRegion = wiring.slice(0, Number.isFinite(cut) ? cut : wiring.length);
  const slugCategory = {};
  let category = "Other";
  for (const ln of importRegion.split("\n")) {
    const h = ln.match(/^\/\/\s*[─-]{3,}\s*(.+?)\s*[─-]{3,}\s*$/);
    if (h) { category = h[1].trim(); continue; }
    const im = ln.match(/from\s+"\.\/([a-z0-9-]+)-tool\.js"/);
    if (im && !(im[1] in slugCategory)) slugCategory[im[1]] = category;
  }
  return slugCategory;
}

// ─── Tool index ──────────────────────────────────────────────────────────────
// [{ app, category, tools: [{ name, description }] }], parsed from the
// ADDITIONAL_TOOLS literal and the import-region category map. Drives
// generate-tool-index.mjs.

export function parseToolIndex(toolsText, importsText) {
  // tools come from the ADDITIONAL_TOOLS literal (tool-wiring.ts); categories
  // come from the import region (additional-handlers.ts post-split). When called
  // with one argument, both are read from the same text (pre-split layout).
  const slugCategory = parseImportCategories(importsText ?? toolsText);

  const wiring = toolsText;
  const start = wiring.indexOf("export const ADDITIONAL_TOOLS");
  const body = wiring.slice(wiring.indexOf("[", start) + 1, wiring.indexOf("\n];", start));
  const headerRe = /\/\/\s*[─-]+\s*([a-z0-9-]+)-tool\.ts\s*[─-]*/g;
  const headers = [...body.matchAll(headerRe)];
  const index = [];
  for (let i = 0; i < headers.length; i++) {
    const slug = headers[i][1];
    const from = headers[i].index + headers[i][0].length;
    const to = i + 1 < headers.length ? headers[i + 1].index : body.length;
    const chunk = body.slice(from, to);
    const tools = [...chunk.matchAll(/name:\s*"([^"]+)",\s+description:\s*"((?:[^"\\]|\\.)*)"/g)]
      .map((m) => ({ name: m[1], description: m[2].replace(/\\"/g, '"') }));
    if (tools.length === 0) continue;
    index.push({ app: slug, category: slugCategory[slug] ?? "Other", tools });
  }
  index.sort((a, b) => a.app.localeCompare(b.app));
  return index;
}

// ─── Per-connector standalone extraction ─────────────────────────────────────
// Used by generate-standalone-mcp.mjs. Pass the already-sliced section bodies
// (see section()) so callers can reuse them across many slugs.

/** Tool-definition object text for a connector, from the ADDITIONAL_TOOLS body. */
export function toolDefsFor(toolsBody, slug) {
  const re = new RegExp(`//\\s*[─-]+\\s*${slug}-tool\\.ts\\s*[─-]*`, "g");
  const m = re.exec(toolsBody);
  if (!m) return null;
  const from = m.index + m[0].length;
  const nextHeader = /\n\s*\/\/\s*[─-]{2,}\s*[a-z0-9_-]+-tool\.ts/g;
  nextHeader.lastIndex = from;
  const nm = nextHeader.exec(toolsBody);
  const to = nm ? nm.index : toolsBody.length;
  return toolsBody.slice(from, to).replace(/^\s*\n/, "").replace(/,?\s*$/, "");
}

/** [{ tool, fn }] handler-map entries for a connector, from the ADDITIONAL_HANDLERS body. */
export function handlersFor(handlersBody, slug) {
  const re = new RegExp(`//\\s*${slug}-tool\\.ts`, "g");
  const m = re.exec(handlersBody);
  if (!m) return null;
  const from = m.index + m[0].length;
  const nextHeader = /\n\s*\/\/\s*[a-z0-9_-]+-tool\.ts/g;
  nextHeader.lastIndex = from;
  const nm = nextHeader.exec(handlersBody);
  const to = nm ? nm.index : handlersBody.length;
  const chunk = handlersBody.slice(from, to);
  const entries = [...chunk.matchAll(/^\s*([a-z0-9_]+):\s*\(args\)\s*=>\s*([a-zA-Z0-9_]+)\(/gm)]
    .map((x) => ({ tool: x[1], fn: x[2] }));
  return entries.length ? entries : null;
}

// ─── Audit blocks ──────────────────────────────────────────────────────────
// file -> { toolNames, toolCount, props, describedProps }, split by the
// `// ── <file>.ts ─` headers inside the ADDITIONAL_TOOLS region. Drives the
// schema-completeness heuristics in audit-integrations.mjs.

export function loadWiringBlocks(wiring) {
  const start = wiring.indexOf("export const ADDITIONAL_TOOLS");
  const end = wiring.indexOf("export const ADDITIONAL_HANDLERS");
  const body = wiring.slice(start, end > 0 ? end : undefined);

  const blocks = {};
  const headerRe = /\/\/ ──\s*([a-zA-Z0-9_-]+\.ts)\s*─/g;
  const headers = [...body.matchAll(headerRe)];
  for (let i = 0; i < headers.length; i++) {
    const file = headers[i][1].replace(/\.ts$/, "");
    const from = headers[i].index;
    const to = i + 1 < headers.length ? headers[i + 1].index : body.length;
    const chunk = body.slice(from, to);
    const names = [...chunk.matchAll(/^\s*name:\s*"([^"]+)"/gm)].map((m) => m[1]);
    // crude param + description tallies (heuristic schema-completeness signal)
    const props = [...chunk.matchAll(/\{\s*type:\s*"/g)].length;
    const describedProps = [...chunk.matchAll(/description:\s*"/g)].length;
    blocks[file] = { toolNames: names, toolCount: names.length, props, describedProps };
  }
  return blocks;
}
