/**
 * Lane-01 tests: business_context as a searchable source (Gap 2).
 *
 * Run: npx tsx --test src/memory/__tests__/business-context-search.test.ts
 * (from packages/mcp-server directory)
 *
 * Covers:
 *   1. The retrieval-fusion helper (pure): scope weighting, content shaping,
 *      flag gate, and the ordering claim (identity outranks an equally-matching
 *      fact).
 *   2. Supabase backend: flag on surfaces business_context via the keyword
 *      path; flag off preserves today's behaviour (business_context not searched).
 *   3. Local backend parity: same on/off behaviour end to end.
 *
 * Everything new is gated by MEMORY_FUSED_RETRIEVAL_ENABLED (default off).
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const FLAG = "MEMORY_FUSED_RETRIEVAL_ENABLED";
// Embedding flags are forced off so the Supabase hybrid lane stays inert and we
// isolate the keyword path (which is where business_context joins).
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

// ─── Minimal Supabase query/client fakes (no DB) ─────────────────────────────

class FakeDataQuery {
  constructor(public table: string, private rows: unknown[]) {}
  select(..._args: unknown[]): this { return this; }
  eq(..._args: unknown[]): this { return this; }
  is(..._args: unknown[]): this { return this; }
  ilike(..._args: unknown[]): this { return this; }
  or(..._args: unknown[]): this { return this; }
  lte(..._args: unknown[]): this { return this; }
  in(..._args: unknown[]): this { return this; }
  order(..._args: unknown[]): this { return this; }
  limit(..._args: unknown[]): this { return this; }
  then<T1 = { data: unknown[] }, T2 = never>(
    onfulfilled?: ((value: { data: unknown[] }) => T1 | PromiseLike<T1>) | null,
    onrejected?: ((reason: unknown) => T2 | PromiseLike<T2>) | null
  ): Promise<T1 | T2> {
    return Promise.resolve({ data: this.rows }).then(onfulfilled, onrejected);
  }
}

class FakeDataClient {
  constructor(private rowsByTable: Record<string, unknown[]>) {}
  from(table: string): FakeDataQuery {
    return new FakeDataQuery(table, this.rowsByTable[table] ?? []);
  }
}

type FakeSupabaseBackend = {
  client: FakeDataClient;
  tenancy: { mode: "byod" };
  tables: { extracted_facts: string; session_summaries: string; business_context: string };
  searchMemory: (query: string, maxResults: number, asOf?: string) => Promise<Array<{ id: string; source: string }>>;
};

async function makeSupabaseBackend(rowsByTable: Record<string, unknown[]>): Promise<FakeSupabaseBackend> {
  const { SupabaseBackend } = await import("../supabase.js");
  const backend = Object.create(SupabaseBackend.prototype) as FakeSupabaseBackend;
  backend.client = new FakeDataClient(rowsByTable);
  backend.tenancy = { mode: "byod" };
  backend.tables = {
    extracted_facts: "extracted_facts",
    session_summaries: "session_summaries",
    business_context: "business_context",
  };
  return backend;
}

// ─── 1. retrieval-fusion helper (pure) ───────────────────────────────────────

describe("lane-01 retrieval-fusion helper", () => {
  test("isFusedRetrievalEnabled reads the flag, default off", async () => {
    const { isFusedRetrievalEnabled } = await import("../retrieval-fusion.js");
    const snap = snapshot([FLAG]);
    try {
      delete process.env[FLAG];
      assert.equal(isFusedRetrievalEnabled(), false);
      process.env[FLAG] = "true";
      assert.equal(isFusedRetrievalEnabled(), true);
      process.env[FLAG] = "1";
      assert.equal(isFusedRetrievalEnabled(), true);
      process.env[FLAG] = "false";
      assert.equal(isFusedRetrievalEnabled(), false);
    } finally {
      restore(snap);
    }
  });

  test("scores a matching standing rule with the business_context scope weight", async () => {
    const { scoreBusinessContextRows } = await import("../retrieval-fusion.js");
    const rows = scoreBusinessContextRows("timezone", [
      { id: "bc-tz", category: "identity", key: "timezone", value: "Australia/Melbourne" },
    ]);
    assert.equal(rows.length, 1);
    assert.equal(rows[0].source, "business_context");
    assert.equal(rows[0].scope_weight, 1.5);
    assert.equal(rows[0].content, "timezone: Australia/Melbourne");
    assert.ok(rows[0].final_score > 0);
  });

  test("identity standing rule outranks an equally-matching fact", async () => {
    const { scoreBusinessContextRows } = await import("../retrieval-fusion.js");
    const { scoreLocalMemoryContent } = await import("../supabase.js");
    const bc = scoreBusinessContextRows("timezone", [
      { id: "bc-tz", category: "identity", key: "timezone", value: "Australia/Melbourne" },
    ]);
    const factScore = scoreLocalMemoryContent({
      query: "timezone",
      tokens: ["timezone"],
      text: "The team discussed timezone handling in the scheduler",
      confidence: 0.9,
      source: "fact",
    });
    assert.ok(
      bc[0].final_score > factScore.finalScore,
      `expected identity (${bc[0].final_score}) > fact (${factScore.finalScore})`
    );
  });

  test("returns nothing for a non-matching or empty query", async () => {
    const { scoreBusinessContextRows } = await import("../retrieval-fusion.js");
    const row = { id: "bc-tz", category: "identity", key: "timezone", value: "Australia/Melbourne" };
    assert.deepEqual(scoreBusinessContextRows("zzznonexistentzzz", [row]), []);
    assert.deepEqual(scoreBusinessContextRows("", [row]), []);
  });
});

// ─── 2. Supabase backend (flag on/off) ───────────────────────────────────────

describe("Supabase backend: business_context in keyword search", () => {
  const rows = {
    business_context: [{ id: "bc-tz", category: "identity", key: "timezone", value: "Australia/Melbourne" }],
    extracted_facts: [],
    session_summaries: [],
  };

  test("flag on surfaces the standing rule that keyword search would otherwise miss", async () => {
    const snap = snapshot([FLAG, ...EMBED_KEYS]);
    try {
      for (const key of EMBED_KEYS) delete process.env[key];
      process.env[FLAG] = "true";
      const backend = await makeSupabaseBackend(rows);
      const results = await backend.searchMemory("timezone", 5);
      assert.ok(Array.isArray(results));
      assert.equal(results[0]?.id, "bc-tz");
      assert.equal(results[0]?.source, "business_context");
    } finally {
      restore(snap);
    }
  });

  test("flag off preserves today's behaviour: business_context is not searched", async () => {
    const snap = snapshot([FLAG, ...EMBED_KEYS]);
    try {
      for (const key of EMBED_KEYS) delete process.env[key];
      delete process.env[FLAG];
      const backend = await makeSupabaseBackend(rows);
      const results = await backend.searchMemory("timezone", 5);
      assert.deepEqual(results, []);
    } finally {
      restore(snap);
    }
  });
});

// ─── 3. Local backend parity (flag on/off) ───────────────────────────────────

describe("Local backend: business_context in search", () => {
  test("flag on surfaces business_context; flag off hides it", async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-bc-search-"));
    const snap = snapshot([FLAG, "MEMORY_LOCAL_DATA_DIR"]);
    try {
      process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
      const { LocalBackend } = await import("../local.js");
      const backend = new LocalBackend();
      await backend.setBusinessContext("identity", "timezone", "Australia/Melbourne", 100);

      process.env[FLAG] = "true";
      const on = (await backend.searchMemory("timezone", 5)) as Array<{ source: string }>;
      assert.ok(
        on.some((row) => row.source === "business_context"),
        "flag on should surface the standing rule"
      );

      delete process.env[FLAG];
      const off = (await backend.searchMemory("timezone", 5)) as Array<{ source: string }>;
      assert.ok(
        !off.some((row) => row.source === "business_context"),
        "flag off should not search business_context"
      );
    } finally {
      restore(snap);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
