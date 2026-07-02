#!/usr/bin/env node
// gen-stage3b-split.mjs
// Stage 3b: split additional-tools.ts (ADDITIONAL_TOOLS) and
// additional-handlers.ts (imports + ADDITIONAL_HANDLERS) into one small module
// per connector under src/wiring/<slug>.ts, and rewrite the two files as thin
// generated indexes that import + assemble the per-app modules.
//
// Behaviour-preserving: per-app tool objects and handler entries are moved
// verbatim and re-assembled in the original order, so the runtime
// ADDITIONAL_TOOLS array and ADDITIONAL_HANDLERS map are identical. A segment
// manifest records the exact original byte layout (scaffolding, blank lines,
// and any stray/empty/duplicate headers are kept as verbatim literals) so the
// build-time text scanners can reconstruct the original text byte-for-byte via
// wiring-model.mjs. The script self-verifies recombination before writing.
//
// Idempotent: src/wiring is cleared and rebuilt each run.
//
// Usage: node gen-stage3b-split.mjs [srcDir]
//   srcDir defaults to packages/mcp-server/src relative to repo root.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(here, "../packages/mcp-server/src");

const TOOLS_FILE = path.join(SRC, "additional-tools.ts");
const HANDLERS_FILE = path.join(SRC, "additional-handlers.ts");
const WIRING_DIR = path.join(SRC, "wiring");

const read = (p) => fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n");
const camel = (slug) => slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const HANDLER_TYPE = "Record<string, (args: Record<string, unknown>) => Promise<unknown>>";

function fail(msg) {
  console.error(`gen-stage3b-split: ${msg}`);
  process.exit(1);
}

// chunk a body by header regex into ordered { slug, text } preserving the leading
// segment (text before the first header) as a separate piece.
function chunkBody(body, headerRe) {
  const headers = [...body.matchAll(headerRe)];
  if (headers.length === 0) fail(`no headers matched ${headerRe}`);
  const seg0 = body.slice(0, headers[0].index);
  const chunks = [];
  for (let i = 0; i < headers.length; i++) {
    const slug = headers[i][1];
    const from = headers[i].index;
    const to = i + 1 < headers.length ? headers[i + 1].index : body.length;
    chunks.push({ slug, text: body.slice(from, to) });
  }
  // recombination proof
  if (seg0 + chunks.map((c) => c.text).join("") !== body) fail("chunk recombination mismatch");
  return { seg0, chunks };
}

// ─── Parse additional-tools.ts ───────────────────────────────────────────────
const toolsSrc = read(TOOLS_FILE);
const T_MARKER = "export const ADDITIONAL_TOOLS = [";
const tIdx = toolsSrc.indexOf(T_MARKER);
if (tIdx < 0) fail("ADDITIONAL_TOOLS marker not found");
const tBodyStart = tIdx + T_MARKER.length;
const tBodyEnd = toolsSrc.lastIndexOf("] as const;");
if (tBodyEnd <= tBodyStart) fail("ADDITIONAL_TOOLS close not found");
const toolsBody = toolsSrc.slice(tBodyStart, tBodyEnd);
const toolsTail = toolsSrc.slice(tBodyEnd); // "] as const;" + trailing (verbatim)
const { seg0: tSeg0, chunks: toolChunks } = chunkBody(toolsBody, /\n  \/\/ ─+ ([a-z0-9-]+)-tool\.ts ─+/g);
const toolCount = (t) => (t.match(/\n\s*name:\s*"/g) || []).length;

// ─── Parse additional-handlers.ts ──────────────────────────────────────────────
const handlersSrc = read(HANDLERS_FILE);
const H_MARKER = "export const ADDITIONAL_HANDLERS";
const hIdx = handlersSrc.indexOf(H_MARKER);
if (hIdx < 0) fail("ADDITIONAL_HANDLERS marker not found");
const importsRegion = handlersSrc.slice(0, hIdx);
const hLineEnd = handlersSrc.indexOf("{", hIdx);
const hMarkerLine = handlersSrc.slice(hIdx, hLineEnd + 1); // exact "export const ... = {"
const mBodyStart = hLineEnd + 1;
const mBodyEnd = handlersSrc.lastIndexOf("\n};");
if (mBodyEnd <= mBodyStart) fail("ADDITIONAL_HANDLERS close not found");
const mapBody = handlersSrc.slice(mBodyStart, mBodyEnd);
const mapTail = handlersSrc.slice(mBodyEnd); // "\n};" + trailing (verbatim)
const { seg0: hSeg0, chunks: handlerChunks } = chunkBody(mapBody, /\n  \/\/ ([a-z0-9-]+)-tool\.ts\b/g);
const entryCount = (t) => (t.match(/^\s*[a-z0-9_]+:\s*\(/gm) || []).length;

// ─── Imports: identifier -> module, module -> [idents], module -> category ─────
const identModule = {};
const moduleIdents = {};
for (const m of importsRegion.matchAll(/import\s*\{([\s\S]*?)\}\s*from\s*"\.\/([a-z0-9-]+)-tool\.js";/g)) {
  const idents = m[1].split(",").map((s) => s.trim()).filter(Boolean);
  moduleIdents[m[2]] = (moduleIdents[m[2]] || []).concat(idents);
  for (const id of idents) identModule[id] = m[2];
}
for (const m of importsRegion.matchAll(/import\s*\{[\s\S]*?\}\s*from\s*"([^"]+)";/g)) {
  if (!/^\.\/[a-z0-9-]+-tool\.js$/.test(m[1])) fail(`unexpected non -tool.js import: ${m[0]}`);
}
const moduleCategory = {};
const categoryOrder = [];
{
  let category = "Other";
  for (const ln of importsRegion.split("\n")) {
    const h = ln.match(/^\/\/\s*[─-]{3,}\s*(.+?)\s*[─-]{3,}\s*$/);
    if (h) { category = h[1].trim(); if (!categoryOrder.includes(category)) categoryOrder.push(category); continue; }
    const im = ln.match(/from\s+"\.\/([a-z0-9-]+)-tool\.js"/);
    if (im && !(im[1] in moduleCategory)) moduleCategory[im[1]] = category;
  }
}

// ─── Decide primary chunk per slug; build segment lists ────────────────────────
// A "primary" chunk (non-empty, first occurrence for its slug) becomes the slug's
// wiring export and a {slug} segment. Empty chunks and any later duplicate of a
// slug become verbatim {lit} segments so the original byte layout is preserved.
function buildSegments(seg0, chunks, countOf, kind) {
  const segs = [{ lit: seg0 }];
  const primaryText = {}; // slug -> chunk text (the one that becomes the wiring export)
  const order = []; // primary slugs in order (for the index spreads)
  for (const c of chunks) {
    const n = countOf(c.text);
    if (n > 0 && !(c.slug in primaryText)) {
      primaryText[c.slug] = c.text;
      order.push(c.slug);
      segs.push({ slug: c.slug });
    } else {
      // empty header, or a real duplicate of an already-primary slug -> keep verbatim
      if (n > 0) fail(`true duplicate non-empty ${kind} chunk for "${c.slug}"; needs manual handling`);
      segs.push({ lit: c.text });
    }
  }
  return { segs, primaryText, order };
}
const T = buildSegments(tSeg0, toolChunks, toolCount, "tool");
const H = buildSegments(hSeg0, handlerChunks, entryCount, "handler");

// ─── Synthesize the import region (feeds parseImportCategories only) ───────────
let importRegionSynth = "";
for (const cat of categoryOrder) {
  const mods = Object.keys(moduleCategory).filter((m) => moduleCategory[m] === cat);
  if (!mods.length) continue;
  importRegionSynth += `// ─── ${cat} ───\n`;
  for (const mod of mods) importRegionSynth += `import { ${(moduleIdents[mod] || ["_"]).join(", ")} } from "./${mod}-tool.js";\n`;
}

// ─── Write wiring files ────────────────────────────────────────────────────────
if (fs.existsSync(WIRING_DIR)) fs.rmSync(WIRING_DIR, { recursive: true });
fs.mkdirSync(WIRING_DIR, { recursive: true });

const allSlugs = [...new Set([...T.order, ...H.order])];
function importsForSlug(slug) {
  const handlerText = H.primaryText[slug] || "";
  const toolText = T.primaryText[slug] || "";
  const usedByModule = {};
  for (const [id, mod] of Object.entries(identModule)) {
    if (new RegExp(`\\b${id}\\b`).test(handlerText)) (usedByModule[mod] ||= new Set()).add(id);
  }
  const moduleOrder = Object.keys(usedByModule).sort(
    (a, b) => handlerText.indexOf([...usedByModule[a]][0]) - handlerText.indexOf([...usedByModule[b]][0])
  );
  const lines = moduleOrder.map((mod) => {
    const ordered = moduleIdents[mod].filter((id) => usedByModule[mod].has(id));
    return `import { ${ordered.join(", ")} } from "../${mod}-tool.js";`;
  });
  if (/\bCOMMONSENSEPASS_CLAIM_KINDS\b/.test(toolText)) {
    lines.push(`import { COMMONSENSEPASS_CLAIM_KINDS } from "../commonsensepass-tool.js";`);
  }
  return lines;
}

for (const slug of allSlugs) {
  const id = camel(slug);
  const toolText = T.primaryText[slug];
  const handlerText = H.primaryText[slug];
  const parts = [
    `// wiring/${slug}.ts`,
    `// Per-app MCP wiring for the ${slug} connector, split from additional-tools.ts`,
    `// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.`,
    `// category: ${moduleCategory[slug] || "Other"}`,
  ];
  const imps = importsForSlug(slug);
  if (imps.length) { parts.push("", ...imps); }
  if (toolText !== undefined) parts.push("", `export const ${id}Tools = [${toolText}] as const;`);
  if (handlerText !== undefined) parts.push("", `export const ${id}Handlers: ${HANDLER_TYPE} = {${handlerText}};`);
  parts.push("");
  fs.writeFileSync(path.join(WIRING_DIR, `${slug}.ts`), parts.join("\n"));
}

// ─── Manifest (drives scanner reconstruction + index order) ────────────────────
fs.writeFileSync(
  path.join(WIRING_DIR, "_manifest.json"),
  JSON.stringify({
    toolMarker: T_MARKER,
    toolSegments: T.segs,
    toolsTail,
    toolOrder: T.order,
    handlerMarkerLine: hMarkerLine,
    handlerSegments: H.segs,
    handlersTail: mapTail,
    handlerOrder: H.order,
    importRegionSynth,
  }, null, 2) + "\n"
);

// ─── Self-verify: reconstruct and compare to original bodies ───────────────────
function extractTools(slug) {
  const src = read(path.join(WIRING_DIR, `${slug}.ts`));
  const marker = `export const ${camel(slug)}Tools = [`;
  const a = src.indexOf(marker) + marker.length;
  return src.slice(a, src.indexOf("] as const;", a));
}
function extractHandlers(slug) {
  const src = read(path.join(WIRING_DIR, `${slug}.ts`));
  const a = src.indexOf(`${camel(slug)}Handlers`);
  const open = src.indexOf("= {", a) + 3;
  return src.slice(open, src.lastIndexOf("};"));
}
const reconToolsBody = T.segs.map((s) => (s.lit !== undefined ? s.lit : extractTools(s.slug))).join("");
const reconMapBody = H.segs.map((s) => (s.lit !== undefined ? s.lit : extractHandlers(s.slug))).join("");
if (reconToolsBody !== toolsBody) fail("RECONSTRUCTION MISMATCH: tools body");
if (reconMapBody !== mapBody) fail("RECONSTRUCTION MISMATCH: handlers map body");

// ─── Write thin index files ─────────────────────────────────────────────────────
const toolsIndex = `// additional-tools.ts
// AUTO-GENERATED index. Do not edit by hand. Each connector's tool schemas live
// in src/wiring/<slug>.ts; this assembles them into ADDITIONAL_TOOLS in the
// original order. Regenerate with scripts/gen-stage3b-split.mjs.

${T.order.map((s) => `import { ${camel(s)}Tools } from "./wiring/${s}.js";`).join("\n")}

export const ADDITIONAL_TOOLS = [
${T.order.map((s) => `  ...${camel(s)}Tools,`).join("\n")}
];
`;
const handlersIndex = `// additional-handlers.ts
// AUTO-GENERATED index. Do not edit by hand. Each connector's imports + handler
// entries live in src/wiring/<slug>.ts; this assembles them into
// ADDITIONAL_HANDLERS in the original order. Regenerate with
// scripts/gen-stage3b-split.mjs.

${H.order.map((s) => `import { ${camel(s)}Handlers } from "./wiring/${s}.js";`).join("\n")}

export const ADDITIONAL_HANDLERS: ${HANDLER_TYPE} = {
${H.order.map((s) => `  ...${camel(s)}Handlers,`).join("\n")}
};
`;
fs.writeFileSync(TOOLS_FILE, toolsIndex);
fs.writeFileSync(HANDLERS_FILE, handlersIndex);

console.log(`gen-stage3b-split: ${allSlugs.length} wiring files`);
console.log(`  tool chunks ${toolChunks.length} (primary ${T.order.length}), handler chunks ${handlerChunks.length} (primary ${H.order.length})`);
console.log(`  recombination + reconstruction: OK (tools body + handlers map byte-identical)`);
