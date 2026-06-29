// wiring-model.mjs
// Single source of truth for parsing the tool wiring as text.
//
// Three build-time generators (generate-tool-index, generate-standalone-mcp,
// audit-integrations) and a couple of guards used to each carry their own copy
// of the brittle regexes that slice ADDITIONAL_TOOLS / ADDITIONAL_HANDLERS and
// walk the `// ── <slug>-tool.ts ──` block headers. That duplication is the
// thing that makes restructuring the wiring dangerous: a layout change has to
// be reasoned about against N independent parsers.
//
// This module centralises every one of those parses in one place. The logic is
// lifted verbatim from the original generators (only parameterised by text), so
// output is byte-identical; the win is that future layout changes touch this
// one file instead of being scattered across the scripts.
//
// Stage 3b split the catalogue into one module per connector under src/wiring/.
// readTools()/readHandlers() reconstruct the ADDITIONAL_TOOLS / ADDITIONAL_HANDLERS
// text from those per-app modules so every downstream parser below is unchanged.
// Pre-3b layouts (additional-tools.ts / additional-handlers.ts monoliths, or the
// original tool-wiring.ts) still work via the fallbacks.

import fs from "node:fs";
import path from "node:path";

const camel = (slug) => slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

/** Read tool-wiring.ts from a package src directory. */
export function readWiring(srcDir) {
  return fs.readFileSync(path.join(srcDir, "tool-wiring.ts"), "utf8");
}

// ─── Stage 3b reconstruction ─────────────────────────────────────────────────
// Rebuild the ADDITIONAL_TOOLS body and the ADDITIONAL_HANDLERS map (plus a
// category-tagged import region) from src/wiring/<slug>.ts, in the original
// order recorded in wiring/_manifest.json. The reconstructed text is for the
// text parsers below only; it is not emitted to disk.

function reconstructFromWiring(srcDir) {
  const wdir = path.join(srcDir, "wiring");
  const manifestPath = path.join(wdir, "_manifest.json");
  if (!fs.existsSync(manifestPath)) return null;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const cache = {};
  const wfile = (slug) =>
    (cache[slug] ??= fs.readFileSync(path.join(wdir, `${slug}.ts`), "utf8").replace(/\r\n/g, "\n"));

  const extractTools = (slug) => {
    const src = wfile(slug);
    const marker = `export const ${camel(slug)}Tools = [`;
    const a = src.indexOf(marker) + marker.length;
    return src.slice(a, src.indexOf("] as const;", a));
  };
  const extractHandlers = (slug) => {
    const src = wfile(slug);
    const a = src.indexOf(`${camel(slug)}Handlers`);
    const open = src.indexOf("= {", a) + 3;
    return src.slice(open, src.lastIndexOf("};"));
  };

  // Walk the segment manifest, which records the exact original byte layout:
  // {lit} segments carry verbatim scaffolding / empty / duplicate headers;
  // {slug} segments are pulled from the per-app wiring module. The result is the
  // original ADDITIONAL_TOOLS body / ADDITIONAL_HANDLERS map byte-for-byte.
  const toolsBody = manifest.toolSegments
    .map((s) => (s.lit !== undefined ? s.lit : extractTools(s.slug)))
    .join("");
  const mapBody = manifest.handlerSegments
    .map((s) => (s.lit !== undefined ? s.lit : extractHandlers(s.slug)))
    .join("");

  const toolsText = `${manifest.toolMarker}${toolsBody}${manifest.toolsTail}`;
  const handlersText = `${manifest.importRegionSynth}\n${manifest.handlerMarkerLine}${mapBody}${manifest.handlersTail}`;

  return { toolsText, handlersText };
}

/**
 * Read the ADDITIONAL_HANDLERS source text (connector imports + the handler map).
 * Post-3b: reconstructed from src/wiring/. Pre-3b: additional-handlers.ts, then
 * tool-wiring.ts.
 */
export function readHandlers(srcDir) {
  const r = reconstructFromWiring(srcDir);
  if (r) return r.handlersText;
  const split = path.join(srcDir, "additional-handlers.ts");
  return fs.existsSync(split) ? fs.readFileSync(split, "utf8") : readWiring(srcDir);
}

/**
 * Read the ADDITIONAL_TOOLS source text (the tool catalogue).
 * Post-3b: reconstructed from src/wiring/. Pre-3b: additional-tools.ts, then
 * tool-wiring.ts.
 */
export function readTools(srcDir) {
  const r = reconstructFromWiring(srcDir);
  if (r) return r.toolsText;
  const split = path.join(srcDir, "additional-tools.ts");
  return fs.existsSync(split) ? fs.readFileSync(split, "utf8") : readWiring(srcDir);
}

// ─── Section slicing ───────────────────────────────────────────────────────
export function section(wiring, marker, openTok) {
  const start = wiring.indexOf(marker);
  if (start < 0) throw new Error(`marker not found: ${marker}`);
  const open = wiring.indexOf(openTok, start) + openTok.length;
  const close = wiring.indexOf(openTok === "[" ? "\n];" : "\n};", open);
  return wiring.slice(open, close);
}

// ─── Import-region category map ──────────────────────────────────────────────
export function parseImportCategories(wiring) {
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
export function parseToolIndex(toolsText, importsText) {
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
    const props = [...chunk.matchAll(/\{\s*type:\s*"/g)].length;
    const describedProps = [...chunk.matchAll(/description:\s*"/g)].length;
    blocks[file] = { toolNames: names, toolCount: names.length, props, describedProps };
  }
  return blocks;
}
