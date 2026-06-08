/**
 * Lane-01 increment 2 tests: fuse keyword + vector instead of short-circuiting (Gap 1).
 *
 * Run: npx tsx --test src/memory/__tests__/fused-retrieval.test.ts
 * (from packages/mcp-server directory)
 *
 * Covers:
 *   1. fuseRankedSearchLanes (pure): rank-based RRF, both-lane rows outrank
 *      single-lane rows, cosine carry, maxResults.
 *   2. Supabase searchMemory: flag on + embeddings on fuses the keyword lane and
 *      the semantic (hybrid RPC) lane so a vector-only hit surfaces alongside a
 *      keyword-only hit; flag off preserves today's keyword-first short-circuit.
 *
 * Gated by MEMORY_FUSED_RETRIEVAL_ENABLED (default off).
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import type { MemorySearchResultRow } from "../types.js";

const FLAG = "MEMORY_FUSED_RETRIEVAL_ENABLED";
const EMBED_KEYS = [
  "MEMORY_OPENAI_EMBEDDINGS_ENABLED",
  "MEMORY_EMBEDDINGS_PROVIDER",
  "MEMORY_OPEN_SOURCE_EMBEDDINGS_ENABLED",
  "MEMORY_LOCAL_EMBEDDINGS_ENABLED",
  "OPENAI_API_KEY",
];

function snapshot(keys: string[]): Record<string, string | undefined> {
  const snap: Record<string, string | undefined> = {};
  for (const key of keys) snap[key] = process.env[key];
  return snap;
}
function restore(snap: Record<string, string | undefined>): void {
  for (const key of Object.keys(snap)) {
    const value = snap[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

function row(id: string, createdAt = "2026-05-01T00:00:00Z", cosine = 0): MemorySearchResultRow {
  return {
    id,
    source: "fact",
    content: id,
    category: "technical",
    confidence: 1,
    created_at: createdAt,
    final_score: 0,
    rrf_score: 0,
    kw_score: 0,
    cosine_score: cosine,
  };
}

// ─── 1. fuseRankedSearchLanes (pure) ─────────────────────────────────────────

describe("lane-01 fuseRankedSearchLanes", () => {
  test("a row in both lanes outranks single-lane rows", async () => {
    const { fuseRankedSearchLanes } = await import("../retrieval-fusion.js");
    const keywordLane = [row("A"), row("B")];
    const semanticLane = [row("B", "2026-05-01T00:00:00Z", 0.8), row("C")];
    const fused = fuseRankedSearchLanes(keywordLane, semanticLane, 10);

    assert.deepEqual(fused.map((r) => r.id), ["B", "A", "C"]);
    const b = fused[0];
    assert.equal(b.keyword_rank, 2);
    assert.equal(b.vector_rank, 1);
    assert.equal(b.cosine_score, 0.8, "carries the semantic lane cosine score");
    assert.ok(b.final_score > fused[1].final_score, "both-lane row beats keyword-only");
    assert.ok(fused[1].final_score > fused[2].final_score, "keyword rank 1 beats vector rank 2");
  });

  test("semantic lane empty leaves the keyword lane intact and ranked", async () => {
    const { fuseRankedSearchLanes } = await import("../retrieval-fusion.js");
    const fused = fuseRankedSearchLanes([row("A"), row("B")], [], 10);
    assert.deepEqual(fused.map((r) => r.id), ["A", "B"]);
    assert.equal(fused[0].keyword_rank, 1);
    assert.equal(fused[0].vector_rank, null);
  });

  test("respects maxResults", async () => {
    const { fuseRankedSearchLanes } = await import("../retrieval-fusion.js");
    const fused = fuseRankedSearchLanes([row("A"), row("B"), row("C")], [], 1);
    assert.equal(fused.length, 1);
    assert.equal(fused[0].id, "A");
  });
});

// ─── 2. Supabase searchMemory fusion (no DB) ─────────────────────────────────

class FakeQ {
  constructor(public table: string, private rows: unknown[]) {}
  select(..._a: unknown[]): this { return this; }
  eq(..._a: unknown[]): this { return this; }
  is(..._a: unknown[]): this { return this; }
  ilike(..._a: unknown[]): this { return this; }
  or(..._a: unknown[]): this { return this; }
  lte(..._a: unknown[]): this { return this; }
  in(..._a: unknown[]): this { return this; }
  order(..._a: unknown[]): this { return this; }
  limit(..._a: unknown[]): this { return this; }
  then<T1 = { data: unknown[] }, T2 = never>(
    onfulfilled?: ((value: { data: unknown[] }) => T1 | PromiseLike<T1>) | null,
    onrejected?: ((reason: unknown) => T2 | PromiseLike<T2>) | null
  ): Promise<T1 | T2> {
    return Promise.resolve({ data: this.rows }).then(onfulfilled, onrejected);
  }
}

class FakeRpcClient {
  constructor(private rowsByTable: Record<string, unknown[]>, private rpcRows: unknown[]) {}
  from(table: string): FakeQ {
    return new FakeQ(table, this.rowsByTable[table] ?? []);
  }
  rpc(_fn: string, _params: unknown): Promise<{ data: unknown[]; error: null }> {
    return Promise.resolve({ data: this.rpcRows, error: null });
  }
}

type FakeBackend = {
  client: FakeRpcClient;
  tenancy: { mode: "byod" };
  tables: { extracted_facts: string; session_summaries: string; business_context: string };
  searchMemory: (q: string, n: number, asOf?: string) => Promise<Array<{ id: string; source: string }>>;
};

const KEYWORD_FACT = {
  id: "kw-1",
  fact: "alpha keyword only retrieval coverage note",
  category: "technical",
  confidence: 0.9,
  created_at: "2026-05-01T00:00:00Z",
  valid_from: "2020-01-01T00:00:00Z",
  valid_to: null,
  invalidated_at: null,
  source_type: "manual",
  startup_fact_kind: "durable",
};
// Semantic-only hit, session-sourced with a matching active session row so the
// recall-visibility filter proves recycle-bin hidden sessions stay excluded
// without dropping valid vector-only hits.
const SEMANTIC_HIT = {
  id: "vec-1",
  source: "session",
  content: "zeta semantic only summary",
  category: "session",
  confidence: 1,
  created_at: "2026-05-02T00:00:00Z",
  final_score: 0.5,
  rrf_score: 0.5,
  kw_score: 0,
  cosine_score: 0.8,
  keyword_rank: null,
  vector_rank: 1,
};
const SEMANTIC_SESSION_ROW = {
  id: "vec-1",
  summary: "zeta semantic only summary",
  created_at: "2026-05-02T00:00:00Z",
  status: "active",
};
// A query long enough (>= 24 chars) that the local embedding provider produces a vector.
const QUERY = "alpha probe coverage retrieval signal";

async function makeBackend(): Promise<FakeBackend> {
  const { SupabaseBackend } = await import("../supabase.js");
  const backend = Object.create(SupabaseBackend.prototype) as FakeBackend;
  backend.client = new FakeRpcClient(
    { extracted_facts: [KEYWORD_FACT], session_summaries: [SEMANTIC_SESSION_ROW], business_context: [] },
    [SEMANTIC_HIT]
  );
  backend.tenancy = { mode: "byod" };
  backend.tables = {
    extracted_facts: "extracted_facts",
    session_summaries: "session_summaries",
    business_context: "business_context",
  };
  return backend;
}

describe("Supabase searchMemory: keyword + vector fusion", () => {
  test("flag on + embeddings on surfaces BOTH the keyword hit and the vector-only hit", async () => {
    const snap = snapshot([FLAG, ...EMBED_KEYS]);
    try {
      for (const key of EMBED_KEYS) delete process.env[key];
      process.env[FLAG] = "true";
      process.env.MEMORY_OPEN_SOURCE_EMBEDDINGS_ENABLED = "true";
      const backend = await makeBackend();
      const results = await backend.searchMemory(QUERY, 10);
      const ids = results.map((r) => r.id);
      assert.ok(ids.includes("kw-1"), `keyword hit present: ${JSON.stringify(ids)}`);
      assert.ok(ids.includes("vec-1"), `vector-only hit no longer shadowed: ${JSON.stringify(ids)}`);
    } finally {
      restore(snap);
    }
  });

  test("flag off preserves the keyword-first short-circuit (vector-only hit stays hidden)", async () => {
    const snap = snapshot([FLAG, ...EMBED_KEYS]);
    try {
      for (const key of EMBED_KEYS) delete process.env[key];
      delete process.env[FLAG];
      process.env.MEMORY_OPEN_SOURCE_EMBEDDINGS_ENABLED = "true";
      const backend = await makeBackend();
      const results = await backend.searchMemory(QUERY, 10);
      const ids = results.map((r) => r.id);
      assert.ok(ids.includes("kw-1"), "keyword hit present");
      assert.ok(!ids.includes("vec-1"), "short-circuit: vector lane not consulted when keyword matched");
    } finally {
      restore(snap);
    }
  });
});

// ─── 3. orderByEffectiveScore (increment 3) ──────────────────────────────────

function eff(
  id: string,
  source: string,
  finalScore: number,
  createdAt: string,
  opts: { scope_weight?: number; effective_score?: number } = {}
): {
  id: string;
  source: string;
  content: string;
  category: string;
  confidence: number;
  created_at: string;
  final_score: number;
  rrf_score: number;
  kw_score: number;
  cosine_score: number;
  scope_weight?: number;
  effective_score?: number;
} {
  return {
    id,
    source,
    content: id,
    category: "x",
    confidence: 1,
    created_at: createdAt,
    final_score: finalScore,
    rrf_score: finalScore,
    kw_score: 0,
    cosine_score: 0,
    ...opts,
  };
}

describe("lane-01 orderByEffectiveScore", () => {
  test("business_context outranks a higher-scored fact via scope weight", async () => {
    const { orderByEffectiveScore } = await import("../retrieval-fusion.js");
    const fact = eff("f", "fact", 1.0, "2026-05-01T00:00:00Z");
    const bc = eff("bc", "business_context", 0.8, "", { scope_weight: 1.5 });
    const ordered = orderByEffectiveScore([fact, bc], 10, "2026-06-04T00:00:00Z");
    assert.equal(ordered[0].id, "bc");
    assert.equal(typeof ordered[0].effective_score, "number");
  });

  test("consumes Worker 8 effective_score as the base when present", async () => {
    const { orderByEffectiveScore } = await import("../retrieval-fusion.js");
    const plain = eff("plain", "fact", 1.0, "");
    const decayed = eff("decayed", "fact", 0.1, "", { effective_score: 9 });
    const ordered = orderByEffectiveScore([plain, decayed], 10);
    assert.equal(ordered[0].id, "decayed");
  });

  test("standing rule with no timestamp is not recency-penalized", async () => {
    const { orderByEffectiveScore } = await import("../retrieval-fusion.js");
    const fresh = eff("fresh", "fact", 1.0, "");
    const old = eff("old", "fact", 1.0, "2020-01-01T00:00:00Z");
    const ordered = orderByEffectiveScore([old, fresh], 10, "2026-06-04T00:00:00Z");
    assert.equal(ordered[0].id, "fresh");
  });

  test("respects maxResults", async () => {
    const { orderByEffectiveScore } = await import("../retrieval-fusion.js");
    const ordered = orderByEffectiveScore(
      [eff("a", "fact", 0.3, ""), eff("b", "fact", 0.2, ""), eff("c", "fact", 0.1, "")],
      2
    );
    assert.equal(ordered.length, 2);
    assert.deepEqual(ordered.map((r) => r.id), ["a", "b"]);
  });

  test("NaN in final_score or effective_score does not break sort order", async () => {
    const { orderByEffectiveScore } = await import("../retrieval-fusion.js");
    const good = eff("good", "fact", 0.5, "");
    const nanFinal = eff("nan-final", "fact", NaN as unknown as number, "");
    const nanEff = eff("nan-eff", "fact", 0.3, "", { effective_score: NaN as unknown as number });
    const infEff = eff("inf-eff", "fact", 0.1, "", { effective_score: Infinity as unknown as number });
    const ordered = orderByEffectiveScore([nanFinal, good, infEff, nanEff], 10);
    for (const row of ordered) {
      assert.equal(Number.isFinite(row.effective_score), true, `${row.id} has finite effective_score`);
    }
    assert.equal(ordered[0].id, "good", "valid row ranks first over NaN/Infinity rows");
  });

  test("NaN in scope_weight falls back to source-based weight", async () => {
    const { orderByEffectiveScore } = await import("../retrieval-fusion.js");
    const nanWeight = eff("nw", "business_context", 0.8, "", { scope_weight: NaN as unknown as number });
    const ordered = orderByEffectiveScore([nanWeight], 10);
    assert.equal(Number.isFinite(ordered[0].effective_score), true);
    assert.ok((ordered[0].effective_score ?? 0) > 0, "falls back to business_context scope weight 1.5");
  });
});
