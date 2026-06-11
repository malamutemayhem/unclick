import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { applyMemoryRetrievalCriteria, parseMemoryRetrievalCriteria } from "../criteria.js";

let tempDir = "";

describe("criteria retrieval", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-criteria-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
    process.env.MEMORY_BACKEND = "local";
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    delete process.env.MEMORY_BACKEND;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("parse rejects junk and normalizes fields", () => {
    assert.equal(parseMemoryRetrievalCriteria(null), null);
    assert.equal(parseMemoryRetrievalCriteria("nope"), null);
    assert.equal(parseMemoryRetrievalCriteria({}), null);
    const parsed = parseMemoryRetrievalCriteria({
      category_weights: { Preference: 2, bad: -1 },
      min_confidence: 1.5,
      sources: ["Fact", ""],
    });
    assert.deepEqual(parsed, {
      category_weights: { preference: 2 },
      min_confidence: 1,
      sources: ["fact"],
    });
  });

  test("category weights, confidence floor, and source filter re-rank the pool", () => {
    const rows = [
      { source: "fact", category: "general", confidence: 0.9, final_score: 1.0, created_at: "2026-06-01T00:00:00Z" },
      { source: "fact", category: "preference", confidence: 0.9, final_score: 0.8, created_at: "2026-06-01T00:00:00Z" },
      { source: "session", category: "session", confidence: 1, final_score: 1.2, created_at: "2026-06-01T00:00:00Z" },
      { source: "fact", category: "general", confidence: 0.3, final_score: 1.1, created_at: "2026-06-01T00:00:00Z" },
    ];
    const ranked = applyMemoryRetrievalCriteria(
      rows,
      { category_weights: { preference: 3 }, min_confidence: 0.5, sources: ["fact"] },
      10
    );
    assert.deepEqual(ranked.map((r) => r.category), ["preference", "general"]);
    assert.equal(ranked.some((r) => r.source === "session"), false);
    assert.equal(ranked.some((r) => r.confidence === 0.3), false);
  });

  test("recency half-life prefers newer rows at equal relevance", () => {
    const now = Date.now();
    const rows = [
      { source: "fact", category: "general", confidence: 0.9, final_score: 1, created_at: new Date(now - 30 * 86_400_000).toISOString() },
      { source: "fact", category: "general", confidence: 0.9, final_score: 1, created_at: new Date(now - 1 * 86_400_000).toISOString() },
    ];
    const ranked = applyMemoryRetrievalCriteria(rows, { recency_half_life_days: 7 }, 10);
    assert.ok((ranked[0]?.created_at ?? "") > (ranked[1]?.created_at ?? ""), "newer row must rank first");
  });

  test("search_memory handler applies criteria end to end and stays legacy without them", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    await backend.addFact({ fact: "Criteria zebra general note.", category: "general", confidence: 0.9 });
    await backend.addFact({ fact: "Criteria zebra preference note.", category: "preference", confidence: 0.9 });

    const plain = await MEMORY_HANDLERS.search_memory({ query: "criteria zebra", max_results: 5 }) as Array<unknown>;
    assert.ok(Array.isArray(plain) && plain.length === 2);

    const weighted = await MEMORY_HANDLERS.search_memory({
      query: "criteria zebra",
      max_results: 1,
      full_content: true,
      criteria: { category_weights: { preference: 5 } },
    }) as Array<{ category: string; criteria_score?: number }>;
    assert.equal(weighted.length, 1);
    assert.equal(weighted[0]?.category, "preference");
    assert.ok((weighted[0]?.criteria_score ?? 0) > 0);
  });
});
