/**
 * Tests for pure functions in retrieval-fusion.ts:
 * env flag gating, scope weights, content rendering, RRF lane fusion,
 * and effective-score ordering with recency decay.
 *
 * Run with: cd packages/mcp-server && npx tsx --test src/memory/__tests__/retrieval-fusion.test.ts
 */

import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  isFusedRetrievalEnabled,
  scopeWeightForSource,
  businessContextContent,
  fuseRankedSearchLanes,
  orderByEffectiveScore,
  MEMORY_SOURCE_SCOPE_WEIGHT,
  MEMORY_RRF_K,
  MEMORY_RECENCY_DECAY_DAYS,
  type BusinessContextSearchInput,
  type EffectiveScoreRow,
} from "../retrieval-fusion.js";

// ---- isFusedRetrievalEnabled ----

describe("isFusedRetrievalEnabled", () => {
  let saved: string | undefined;
  beforeEach(() => {
    saved = process.env.MEMORY_FUSED_RETRIEVAL_ENABLED;
    delete process.env.MEMORY_FUSED_RETRIEVAL_ENABLED;
  });
  afterEach(() => {
    if (saved === undefined) delete process.env.MEMORY_FUSED_RETRIEVAL_ENABLED;
    else process.env.MEMORY_FUSED_RETRIEVAL_ENABLED = saved;
  });

  test("defaults to false when env var is unset", () => {
    assert.equal(isFusedRetrievalEnabled(), false);
  });

  test("returns true for '1'", () => {
    process.env.MEMORY_FUSED_RETRIEVAL_ENABLED = "1";
    assert.equal(isFusedRetrievalEnabled(), true);
  });

  test("returns true for 'true' (case-insensitive)", () => {
    process.env.MEMORY_FUSED_RETRIEVAL_ENABLED = "true";
    assert.equal(isFusedRetrievalEnabled(), true);
    process.env.MEMORY_FUSED_RETRIEVAL_ENABLED = "TRUE";
    assert.equal(isFusedRetrievalEnabled(), true);
    process.env.MEMORY_FUSED_RETRIEVAL_ENABLED = "True";
    assert.equal(isFusedRetrievalEnabled(), true);
  });

  test("returns false for 'false', '0', or other values", () => {
    process.env.MEMORY_FUSED_RETRIEVAL_ENABLED = "false";
    assert.equal(isFusedRetrievalEnabled(), false);
    process.env.MEMORY_FUSED_RETRIEVAL_ENABLED = "0";
    assert.equal(isFusedRetrievalEnabled(), false);
    process.env.MEMORY_FUSED_RETRIEVAL_ENABLED = "yes";
    assert.equal(isFusedRetrievalEnabled(), false);
  });
});

// ---- scopeWeightForSource ----

describe("scopeWeightForSource", () => {
  test("business_context has the highest weight (1.5)", () => {
    assert.equal(scopeWeightForSource("business_context"), 1.5);
  });

  test("returns 1.0 for fact, session, and conversation", () => {
    assert.equal(scopeWeightForSource("fact"), 1.0);
    assert.equal(scopeWeightForSource("session"), 1.0);
    assert.equal(scopeWeightForSource("conversation"), 1.0);
  });

  test("returns 1.0 for unknown sources (fallback)", () => {
    assert.equal(scopeWeightForSource("unknown_source"), 1.0);
    assert.equal(scopeWeightForSource(""), 1.0);
  });
});

// ---- businessContextContent ----

describe("businessContextContent", () => {
  test("renders 'key: value' for a string value", () => {
    const row: BusinessContextSearchInput = {
      id: "1", category: "prefs", key: "timezone", value: "UTC+10",
    };
    assert.equal(businessContextContent(row), "timezone: UTC+10");
  });

  test("renders key alone when value is empty string", () => {
    const row: BusinessContextSearchInput = {
      id: "1", category: "prefs", key: "dark_mode", value: "",
    };
    assert.equal(businessContextContent(row), "dark_mode");
  });

  test("renders key alone when value is null", () => {
    const row: BusinessContextSearchInput = {
      id: "1", category: "prefs", key: "placeholder", value: null,
    };
    assert.equal(businessContextContent(row), "placeholder");
  });

  test("renders key alone when value is undefined", () => {
    const row: BusinessContextSearchInput = {
      id: "1", category: "prefs", key: "empty", value: undefined,
    };
    assert.equal(businessContextContent(row), "empty");
  });

  test("JSON-stringifies object values", () => {
    const row: BusinessContextSearchInput = {
      id: "1", category: "prefs", key: "config", value: { a: 1 },
    };
    const result = businessContextContent(row);
    assert.ok(result.startsWith("config: "));
    assert.ok(result.includes('"a"'));
  });

  test("converts numeric values to string", () => {
    const row: BusinessContextSearchInput = {
      id: "1", category: "prefs", key: "count", value: 42,
    };
    const result = businessContextContent(row);
    assert.equal(result, "count: 42");
  });
});

// ---- constants ----

describe("MEMORY_SOURCE_SCOPE_WEIGHT", () => {
  test("business_context weight exceeds all others", () => {
    const weights = Object.values(MEMORY_SOURCE_SCOPE_WEIGHT);
    assert.equal(
      MEMORY_SOURCE_SCOPE_WEIGHT.business_context,
      Math.max(...weights),
    );
  });
});

describe("MEMORY_RRF_K", () => {
  test("matches the Worker 6 default of 60", () => {
    assert.equal(MEMORY_RRF_K, 60);
  });
});

describe("MEMORY_RECENCY_DECAY_DAYS", () => {
  test("is 90 days", () => {
    assert.equal(MEMORY_RECENCY_DECAY_DAYS, 90);
  });
});

// ---- fuseRankedSearchLanes ----

describe("fuseRankedSearchLanes", () => {
  function makeRow(id: string, overrides: Record<string, unknown> = {}) {
    return {
      id,
      source: "fact" as const,
      content: `content for ${id}`,
      category: "general",
      confidence: 1,
      created_at: "2025-01-01T00:00:00Z",
      final_score: 0.5,
      rrf_score: 0,
      kw_score: 1,
      cosine_score: 0,
      ...overrides,
    };
  }

  test("row present in both lanes outranks single-lane rows", () => {
    const kw = [makeRow("dual"), makeRow("kw_only")];
    const vec = [makeRow("dual"), makeRow("vec_only")];
    const result = fuseRankedSearchLanes(kw, vec, 10);
    assert.equal(result[0].id, "dual");
    const dual = result.find((r) => r.id === "dual")!;
    const kwOnly = result.find((r) => r.id === "kw_only")!;
    assert.ok(dual.rrf_score > kwOnly.rrf_score);
  });

  test("all unique rows from both lanes appear in output", () => {
    const kw = [makeRow("a"), makeRow("b")];
    const vec = [makeRow("c"), makeRow("d")];
    const result = fuseRankedSearchLanes(kw, vec, 10);
    const ids = result.map((r) => r.id);
    assert.deepEqual(ids.sort(), ["a", "b", "c", "d"]);
  });

  test("respects maxResults limit", () => {
    const kw = [makeRow("a"), makeRow("b"), makeRow("c")];
    const vec = [makeRow("d"), makeRow("e")];
    const result = fuseRankedSearchLanes(kw, vec, 3);
    assert.equal(result.length, 3);
  });

  test("handles empty keyword lane", () => {
    const vec = [makeRow("a"), makeRow("b")];
    const result = fuseRankedSearchLanes([], vec, 10);
    assert.equal(result.length, 2);
    assert.equal(result[0].keyword_rank, null);
    assert.equal(result[0].vector_rank, 1);
  });

  test("handles empty semantic lane", () => {
    const kw = [makeRow("a"), makeRow("b")];
    const result = fuseRankedSearchLanes(kw, [], 10);
    assert.equal(result.length, 2);
    assert.equal(result[0].vector_rank, null);
    assert.equal(result[0].keyword_rank, 1);
  });

  test("handles both lanes empty", () => {
    assert.equal(fuseRankedSearchLanes([], [], 10).length, 0);
  });

  test("carries cosine_score from semantic lane when keyword row lacks one", () => {
    const kw = [makeRow("a", { cosine_score: 0 })];
    const vec = [makeRow("a", { cosine_score: 0.85 })];
    const result = fuseRankedSearchLanes(kw, vec, 10);
    assert.equal(result[0].cosine_score, 0.85);
  });

  test("preserves keyword_rank and vector_rank on fused output", () => {
    const kw = [makeRow("x"), makeRow("y")];
    const vec = [makeRow("y"), makeRow("z")];
    const result = fuseRankedSearchLanes(kw, vec, 10);
    const x = result.find((r) => r.id === "x")!;
    const y = result.find((r) => r.id === "y")!;
    const z = result.find((r) => r.id === "z")!;
    assert.equal(x.keyword_rank, 1);
    assert.equal(x.vector_rank, null);
    assert.equal(y.keyword_rank, 2);
    assert.equal(y.vector_rank, 1);
    assert.equal(z.keyword_rank, null);
    assert.equal(z.vector_rank, 2);
  });

  test("custom k parameter changes RRF contribution scale", () => {
    const kw = [makeRow("a")];
    const vec = [makeRow("a")];
    const defaultK = fuseRankedSearchLanes(kw, vec, 10);
    const smallK = fuseRankedSearchLanes(kw, vec, 10, 1);
    assert.ok(smallK[0].rrf_score > defaultK[0].rrf_score);
  });

  test("breaks ties by created_at descending (newer first)", () => {
    const kw = [makeRow("older", { created_at: "2024-01-01T00:00:00Z" })];
    const vec = [makeRow("newer", { created_at: "2025-06-01T00:00:00Z" })];
    const result = fuseRankedSearchLanes(kw, vec, 10);
    assert.equal(result[0].id, "newer");
  });

  test("RRF formula matches 1/(k+rank)", () => {
    const kw = [makeRow("a")];
    const result = fuseRankedSearchLanes(kw, [], 10);
    const expected = 1 / (MEMORY_RRF_K + 1);
    assert.ok(Math.abs(result[0].rrf_score - expected) < 1e-12);
  });
});

// ---- orderByEffectiveScore ----

describe("orderByEffectiveScore", () => {
  function makeRow(
    source: string,
    finalScore: number,
    created_at?: string | null,
  ): EffectiveScoreRow {
    return { source, final_score: finalScore, created_at: created_at ?? "2025-01-01T00:00:00Z" };
  }

  test("business_context outranks equally-scored fact via scope weight", () => {
    const rows = [makeRow("fact", 1.0), makeRow("business_context", 1.0)];
    const result = orderByEffectiveScore(rows, 10);
    assert.equal(result[0].source, "business_context");
    assert.ok((result[0].effective_score ?? 0) > (result[1].effective_score ?? 0));
  });

  test("respects maxResults", () => {
    const rows = [makeRow("fact", 1.0), makeRow("fact", 0.8), makeRow("fact", 0.5)];
    assert.equal(orderByEffectiveScore(rows, 2).length, 2);
  });

  test("prefers row.effective_score over final_score when present", () => {
    const rows: EffectiveScoreRow[] = [
      { source: "fact", final_score: 10, effective_score: 0.1 },
      { source: "fact", final_score: 1, effective_score: 5.0 },
    ];
    const result = orderByEffectiveScore(rows, 10);
    assert.equal(result[0].final_score, 1);
  });

  test("applies recency decay so older facts score lower", () => {
    const rows = [
      makeRow("fact", 1.0, "2020-01-01T00:00:00Z"),
      makeRow("fact", 1.0, "2025-12-01T00:00:00Z"),
    ];
    const result = orderByEffectiveScore(rows, 10, "2026-01-01T00:00:00Z");
    assert.equal(result[0].created_at, "2025-12-01T00:00:00Z");
    assert.ok((result[0].effective_score ?? 0) > (result[1].effective_score ?? 0));
  });

  test("null created_at is not recency-penalized (weight 1.0)", () => {
    const rows: EffectiveScoreRow[] = [
      { source: "business_context", final_score: 1.0, created_at: null },
      { source: "fact", final_score: 1.0, created_at: "2020-01-01T00:00:00Z" },
    ];
    const result = orderByEffectiveScore(rows, 10, "2026-01-01T00:00:00Z");
    assert.equal(result[0].source, "business_context");
  });

  test("uses row.scope_weight when present instead of lookup", () => {
    const rows: EffectiveScoreRow[] = [
      { source: "fact", final_score: 1.0, scope_weight: 5.0 },
      { source: "business_context", final_score: 1.0 },
    ];
    const result = orderByEffectiveScore(rows, 10);
    assert.equal(result[0].source, "fact");
  });

  test("handles empty input", () => {
    assert.equal(orderByEffectiveScore([], 10).length, 0);
  });

  test("writes computed effective_score back onto each row", () => {
    const rows = [makeRow("fact", 2.0)];
    const result = orderByEffectiveScore(rows, 10);
    assert.equal(typeof result[0].effective_score, "number");
    assert.ok((result[0].effective_score ?? 0) > 0);
  });

  test("breaks ties by created_at descending", () => {
    const rows: EffectiveScoreRow[] = [
      { source: "fact", final_score: 1.0, scope_weight: 1.0, created_at: "2025-01-01T00:00:00Z" },
      { source: "fact", final_score: 1.0, scope_weight: 1.0, created_at: "2025-06-01T00:00:00Z" },
    ];
    const result = orderByEffectiveScore(rows, 10, "2025-06-02T00:00:00Z");
    assert.equal(result[0].created_at, "2025-06-01T00:00:00Z");
  });
});
