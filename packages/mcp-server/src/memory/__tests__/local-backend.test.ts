import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir = "";

function readRows<T>(table: string): T[] {
  return JSON.parse(fs.readFileSync(path.join(tempDir, `${table}.json`), "utf8")) as T[];
}

describe("LocalBackend memory parity", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-local-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("search_memory searches saved facts and session summaries in local mode", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const fact = await backend.addFact({
      fact: "Chris wants local Memory recall to find saved facts.",
      category: "technical",
      confidence: 0.95,
    });
    await backend.writeSessionSummary({
      session_id: "local-search-session",
      platform: "test",
      summary: "The Memory QC pass checked local search parity.",
      decisions: [],
      open_loops: [],
      topics: ["memory"],
    });

    const factResults = await backend.searchMemory("local Memory recall", 5) as Array<{ id: string; source: string }>;
    assert.equal(factResults[0]?.id, fact.id);
    assert.equal(factResults[0]?.source, "fact");

    const sessionResults = await backend.searchMemory("search parity", 5) as Array<{ source: string }>;
    assert.ok(sessionResults.some((row) => row.source === "session"));
  });

  test("startup context excludes operational and invalidated local facts", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const durable = await backend.addFact({
      fact: "Chris prefers compact memory first with source receipts.",
      category: "preference",
      confidence: 0.9,
    });
    const operational = await backend.addFact({
      fact: "heartbeat self-report: no new signals",
      category: "system",
      confidence: 1,
      startup_fact_kind: "operational",
    });
    const invalidated = await backend.addFact({
      fact: "This stale fact must not appear after invalidation.",
      category: "technical",
      confidence: 1,
    });

    await backend.invalidateFact({
      fact_id: invalidated.id,
      reason: "local parity test",
      session_id: "local-startup-session",
    });

    const context = await backend.getStartupContext(3) as { active_facts: Array<{ fact: string }> };
    const facts = context.active_facts.map((row) => row.fact);
    assert.ok(facts.includes("Chris prefers compact memory first with source receipts."));
    assert.equal(facts.some((fact) => fact.includes("heartbeat")), false);
    assert.equal(facts.some((fact) => fact.includes("stale fact")), false);

    const searchResults = await backend.searchMemory("heartbeat self-report source receipts", 10) as Array<{ content: string }>;
    assert.equal(searchResults.some((row) => row.content.includes("heartbeat")), false);

    const rows = readRows<{
      id: string;
      access_count: number;
      invalidated_at?: string;
    }>("extracted_facts");
    const byId = new Map(rows.map((row) => [row.id, row]));
    assert.equal(byId.get(durable.id)?.access_count, 1);
    assert.equal(byId.get(operational.id)?.access_count, 0);
    assert.equal(byId.get(invalidated.id)?.access_count, 0);
    assert.ok(byId.get(invalidated.id)?.invalidated_at);
  });

  test("startup context preserves provenance fields on active local facts", async (t) => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();
    // Provenance surfacing is gated behind MEMORY_PROVENANCE_ENABLED (lane-03 owns it;
    // flag off keeps startup context byte-identical to today).
    const prevProvenanceFlag = process.env.MEMORY_PROVENANCE_ENABLED;
    process.env.MEMORY_PROVENANCE_ENABLED = "1";
    t.after(() => {
      if (prevProvenanceFlag === undefined) delete process.env.MEMORY_PROVENANCE_ENABLED;
      else process.env.MEMORY_PROVENANCE_ENABLED = prevProvenanceFlag;
    });

    const saved = await backend.addFact({
      fact: "Chris wants startup receipts surfaced for profile cards.",
      category: "preference",
      confidence: 0.91,
    });

    const rows = readRows<{
      id: string;
      source_agent_id?: string | null;
      source_ref?: string | null;
      receipt_id?: string | null;
    } & Record<string, unknown>>("extracted_facts");
    const row = rows.find((item) => item.id === saved.id);
    assert.ok(row);
    row.source_agent_id = "agent-worker-3";
    row.source_ref = "conversation:receipt-source";
    row.receipt_id = "receipt-startup-1";
    fs.writeFileSync(path.join(tempDir, "extracted_facts.json"), JSON.stringify(rows, null, 2));

    const context = await backend.getStartupContext(3) as {
      active_facts: Array<{
        fact: string;
        source_agent_id?: string | null;
        source_ref?: string | null;
        receipt_id?: string | null;
      }>;
    };
    const active = context.active_facts.find((item) => item.fact.includes("startup receipts"));
    assert.ok(active);
    assert.equal(active.source_agent_id, "agent-worker-3");
    assert.equal(active.source_ref, "conversation:receipt-source");
    assert.equal(active.receipt_id, "receipt-startup-1");
  });

  test("local search and startup context respect valid_from", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    await backend.addFact({
      fact: "Future-only Memory fact should wait for its valid window.",
      category: "technical",
      confidence: 1,
      valid_from: "2099-01-01T00:00:00.000Z",
    });

    const searchResults = await backend.searchMemory("future-only Memory fact", 5) as unknown[];
    assert.equal(searchResults.length, 0);

    const context = await backend.getStartupContext(3) as { active_facts: Array<{ fact: string }> };
    assert.equal(context.active_facts.some((row) => row.fact.includes("Future-only")), false);
  });

  test("local taxonomy snapshots exclude operational facts", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    await backend.addFact({
      fact: "Durable Memory taxonomy fact should become a snapshot source.",
      category: "technical",
      confidence: 0.95,
    });
    await backend.addFact({
      fact: "heartbeat self-report should not become a library snapshot source.",
      category: "system",
      confidence: 1,
      startup_fact_kind: "operational",
    });

    const result = await backend.refreshTaxonomySnapshots({ dry_run: true, max_sources: 10 }) as {
      source_count: number;
      snapshots: Array<{ source_receipts: Array<{ memory_id: string }> }>;
    };
    const sourceIds = result.snapshots.flatMap((snapshot) =>
      snapshot.source_receipts.map((receipt) => receipt.memory_id)
    );

    assert.equal(result.source_count, 1);
    assert.equal(sourceIds.length, 1);
    assert.equal(sourceIds[0]?.startsWith("fact:"), true);
  });
});
