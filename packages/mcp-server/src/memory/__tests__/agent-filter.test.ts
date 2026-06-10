/**
 * Tests for pure functions in agent.ts:
 * filterContextByLayers strips unauthorized memory layers from startup context.
 *
 * Run with: cd packages/mcp-server && npx tsx --test src/memory/__tests__/agent-filter.test.ts
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { filterContextByLayers, type MemoryLayerKey } from "../agent.js";

const ALL_LAYERS: MemoryLayerKey[] = [
  "business_context",
  "extracted_facts",
  "session_summaries",
  "knowledge_library",
  "conversation_log",
  "code_dumps",
];

describe("filterContextByLayers", () => {
  test("returns context unchanged when enabledLayers is empty (all allowed)", () => {
    const ctx = { business_context: "bc", extracted_facts: "ef" };
    const result = filterContextByLayers(ctx, []);
    assert.deepEqual(result, ctx);
  });

  test("removes layers not in enabledLayers", () => {
    const ctx: Record<string, string> = {};
    for (const l of ALL_LAYERS) ctx[l] = l;
    const enabled: MemoryLayerKey[] = ["business_context", "extracted_facts"];
    const result = filterContextByLayers(ctx, enabled) as Record<string, unknown>;
    assert.equal(result.business_context, "business_context");
    assert.equal(result.extracted_facts, "extracted_facts");
    assert.equal(result.session_summaries, undefined);
    assert.equal(result.knowledge_library, undefined);
    assert.equal(result.conversation_log, undefined);
    assert.equal(result.code_dumps, undefined);
  });

  test("preserves non-layer keys on the context object", () => {
    const ctx = { business_context: "bc", custom_field: "cf", extracted_facts: "ef" };
    const enabled: MemoryLayerKey[] = ["business_context"];
    const result = filterContextByLayers(ctx, enabled) as Record<string, unknown>;
    assert.equal(result.business_context, "bc");
    assert.equal(result.custom_field, "cf");
    assert.equal(result.extracted_facts, undefined);
  });

  test("returns null as-is", () => {
    assert.equal(filterContextByLayers(null, ["business_context"]), null);
  });

  test("returns undefined as-is", () => {
    assert.equal(filterContextByLayers(undefined, ["business_context"]), undefined);
  });

  test("returns non-object primitives as-is", () => {
    assert.equal(filterContextByLayers("hello", ["business_context"]), "hello");
    assert.equal(filterContextByLayers(42, ["business_context"]), 42);
    assert.equal(filterContextByLayers(true, ["business_context"]), true);
  });

  test("does not mutate the original context object", () => {
    const ctx = { business_context: "bc", extracted_facts: "ef" };
    filterContextByLayers(ctx, ["business_context"]);
    assert.equal(ctx.extracted_facts, "ef");
  });

  test("keeps all layers when every layer is enabled", () => {
    const ctx: Record<string, string> = {};
    for (const l of ALL_LAYERS) ctx[l] = l;
    const result = filterContextByLayers(ctx, ALL_LAYERS) as Record<string, unknown>;
    for (const key of ALL_LAYERS) {
      assert.ok(key in result, `expected ${key} to be in result`);
    }
  });

  test("removes all known layers when none are enabled except unknown keys survive", () => {
    const ctx: Record<string, string> = { other: "keep" };
    for (const l of ALL_LAYERS) ctx[l] = l;
    const enabled: MemoryLayerKey[] = [];
    // Empty enabledLayers means "all allowed" per backward-compat default
    const result = filterContextByLayers(ctx, enabled) as Record<string, unknown>;
    // With empty enabled list, everything is returned
    for (const l of ALL_LAYERS) {
      assert.ok(l in result);
    }
  });

  test("single enabled layer keeps only that layer (plus non-layer keys)", () => {
    const ctx = {
      business_context: "bc",
      extracted_facts: "ef",
      session_summaries: "ss",
      extra: "keep",
    };
    const result = filterContextByLayers(ctx, ["session_summaries"]) as Record<string, unknown>;
    assert.equal(result.session_summaries, "ss");
    assert.equal(result.extra, "keep");
    assert.equal(result.business_context, undefined);
    assert.equal(result.extracted_facts, undefined);
  });
});
