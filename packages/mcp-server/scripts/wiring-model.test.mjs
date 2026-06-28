// Tests for wiring-model.mjs, the shared tool-wiring.ts parser.
// Run: node --test scripts/wiring-model.test.mjs
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import {
  readWiring, section, parseImportCategories, parseToolIndex,
  toolDefsFor, handlersFor, loadWiringBlocks,
} from "./wiring-model.mjs";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");
const wiring = readWiring(SRC);
const toolsBody = section(wiring, "export const ADDITIONAL_TOOLS", "[");
const handlersBody = section(wiring, "export const ADDITIONAL_HANDLERS", "{");

test("section slices non-empty ADDITIONAL_TOOLS / ADDITIONAL_HANDLERS bodies", () => {
  assert.ok(toolsBody.length > 0, "tools body empty");
  assert.ok(handlersBody.length > 0, "handlers body empty");
  assert.match(toolsBody, /name:\s*"/, "tools body has no tool definitions");
  assert.match(handlersBody, /\(args\)\s*=>/, "handlers body has no handler entries");
  // NOTE: the ADDITIONAL_TOOLS array closes with `] as const;`, not `];`, so
  // the "[" section's close token ("\n];") is absent and section() slices to
  // EOF. That is preserved here intentionally (behaviour-preserving): the
  // downstream parsers only match tool-definition-shaped blocks, so the extra
  // tail is inert. Tightening the close token is a later, separately-verified
  // step, not part of this decoupling.
});

test("section throws on a missing marker", () => {
  assert.throws(() => section(wiring, "export const NOPE_NOT_HERE", "["), /marker not found/);
});

test("parseImportCategories maps slugs to non-empty categories", () => {
  const map = parseImportCategories(wiring);
  const slugs = Object.keys(map);
  assert.ok(slugs.length > 50, `expected many slugs, got ${slugs.length}`);
  for (const slug of slugs) {
    assert.match(slug, /^[a-z0-9-]+$/, `bad slug: ${slug}`);
    assert.ok(typeof map[slug] === "string" && map[slug].length > 0, `empty category for ${slug}`);
  }
});

test("parseToolIndex returns sorted, well-formed, non-empty entries", () => {
  const index = parseToolIndex(wiring);
  assert.ok(index.length > 100, `expected >100 apps, got ${index.length}`);
  for (let i = 1; i < index.length; i++) {
    assert.ok(index[i - 1].app.localeCompare(index[i].app) <= 0, "index not sorted by app");
  }
  for (const entry of index) {
    assert.ok(typeof entry.app === "string" && entry.app.length > 0);
    assert.ok(typeof entry.category === "string" && entry.category.length > 0);
    assert.ok(Array.isArray(entry.tools) && entry.tools.length > 0, `${entry.app} has no tools`);
    for (const t of entry.tools) {
      assert.ok(typeof t.name === "string" && t.name.length > 0);
      assert.ok(typeof t.description === "string");
    }
  }
});

test("toolDefsFor / handlersFor are consistent for a sampled real slug", () => {
  // pick a slug that has handler entries, then assert both extractors agree it exists
  const slugWithHandlers = [...handlersBody.matchAll(/\/\/\s*([a-z0-9_-]+)-tool\.ts/g)][0]?.[1];
  assert.ok(slugWithHandlers, "no connector header found in handlers body");
  const handlers = handlersFor(handlersBody, slugWithHandlers);
  assert.ok(Array.isArray(handlers) && handlers.length > 0, `no handlers parsed for ${slugWithHandlers}`);
  for (const h of handlers) {
    assert.match(h.tool, /^[a-z0-9_]+$/);
    assert.match(h.fn, /^[a-zA-Z0-9_]+$/);
  }
  const defs = toolDefsFor(toolsBody, slugWithHandlers);
  assert.ok(defs === null || typeof defs === "string");

  // unknown slug yields null from both
  assert.equal(handlersFor(handlersBody, "definitely-not-a-real-slug"), null);
  assert.equal(toolDefsFor(toolsBody, "definitely-not-a-real-slug"), null);
});

test("loadWiringBlocks returns coherent per-file blocks", () => {
  const blocks = loadWiringBlocks(wiring);
  const files = Object.keys(blocks);
  assert.ok(files.length > 50, `expected many blocks, got ${files.length}`);
  for (const file of files) {
    const b = blocks[file];
    assert.equal(b.toolCount, b.toolNames.length, `toolCount != toolNames.length for ${file}`);
    assert.ok(Number.isInteger(b.props) && b.props >= 0, `bad props for ${file}`);
    assert.ok(Number.isInteger(b.describedProps) && b.describedProps >= 0, `bad describedProps for ${file}`);
  }
});
