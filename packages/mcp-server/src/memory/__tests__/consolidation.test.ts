import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir = "";

interface FactRow {
  id: string;
  fact: string;
  category: string;
  confidence: number;
  status: string;
  superseded_by?: string | null;
  access_count: number;
  decay_tier: string;
  valid_to?: string | null;
  source_agent_id?: string | null;
  source_ref?: string | null;
  receipt_id?: string | null;
  quarantined_at?: string | null;
  consolidation_group_id?: string | null;
  consolidation_receipt?: {
    kind?: string;
    canonical_id?: string;
    duplicate_ids?: string[];
    provenance_union?: Array<Record<string, unknown>>;
    average_same_subject_overlap?: number;
  };
}

function tablePath(table: string): string {
  return path.join(tempDir, `${table}.json`);
}

function readRows<T>(table: string): T[] {
  return JSON.parse(fs.readFileSync(tablePath(table), "utf8")) as T[];
}

function writeRows<T>(table: string, rows: T[]): void {
  fs.writeFileSync(tablePath(table), JSON.stringify(rows, null, 2));
}

describe("lane-08 consolidation", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-consolidation-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    delete process.env.MEMORY_CONSOLIDATION_ENABLED;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("stays flag-gated in the memory dispatcher", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const result = await MEMORY_HANDLERS.consolidate({});
    assert.deepEqual(result, {
      skipped: "flag_disabled",
      flag: "MEMORY_CONSOLIDATION_ENABLED",
    });
  });

  test("collapses near-duplicate facts with a provenance receipt and no access inflation", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();
    const now = "2026-06-04T00:00:00.000Z";

    await backend.addFact({
      fact: "Chris prefers compact memory first with source receipts.",
      category: "preference",
      confidence: 0.86,
      source_session_id: "s1",
    });
    await backend.addFact({
      fact: "Chris prefers compact memory first with source receipts.",
      category: "preference",
      confidence: 0.9,
      source_session_id: "s2",
    });
    await backend.addFact({
      fact: "Chris prefers compact memory first with source receipts",
      category: "preference",
      confidence: 0.88,
      source_session_id: "s3",
    });

    const initialRows = readRows<FactRow>("extracted_facts");
    initialRows[0].source_agent_id = "codex-worker-08-memory-hardening";
    initialRows[0].source_ref = "https://github.com/malamutemayhem/unclick/pull/1285";
    initialRows[0].receipt_id = "receipt-1";
    writeRows("extracted_facts", initialRows);

    const result = await backend.consolidateMemory({
      now,
      dry_run: false,
      source: "heartbeat",
    });
    assert.equal(result.groups.length, 1);
    assert.equal(result.duplicate_count, 2);
    assert.equal(result.metrics.dedup_collapse_rate, 0.6667);

    const rows = readRows<FactRow>("extracted_facts");
    const active = rows.filter((row) => row.status === "active");
    const superseded = rows.filter((row) => row.status === "superseded");
    assert.equal(active.length, 1);
    assert.equal(superseded.length, 2);
    assert.equal(active[0].access_count, 0);
    assert.equal(superseded.every((row) => row.access_count === 0), true);

    const receipt = active[0].consolidation_receipt;
    assert.equal(receipt?.kind, "memory_consolidation_receipt_v1");
    assert.equal(receipt?.canonical_id, active[0].id);
    assert.equal(receipt?.duplicate_ids?.length, 2);
    assert.equal(receipt?.provenance_union?.length, 3);
    assert.equal(receipt?.provenance_union?.some((entry) => entry.source_agent_id === "codex-worker-08-memory-hardening"), true);
    assert.equal(receipt?.average_same_subject_overlap, 1);
    assert.equal(superseded.every((row) => row.superseded_by === active[0].id), true);
    assert.equal(superseded.every((row) => row.decay_tier === "cold"), true);
    assert.equal(superseded.every((row) => row.valid_to === now), true);
  });

  test("NaN access_count does not break canonical selection sort", async () => {
    const { buildMemoryConsolidationPlan } = await import("../consolidation.js");
    const base = {
      fact: "Chris prefers compact memory.",
      category: "preference",
      status: "active",
      created_at: "2026-06-01T00:00:00Z",
      valid_from: "2026-06-01T00:00:00Z",
      valid_to: null,
      invalidated_at: null,
      source_type: "manual",
      startup_fact_kind: "durable",
    };
    const rows = [
      { ...base, id: "good", confidence: 0.95, access_count: 5 },
      { ...base, id: "nan-access", confidence: 0.90, access_count: NaN as unknown as number },
      { ...base, id: "null-access", confidence: 0.85, access_count: null },
    ];
    const plan = buildMemoryConsolidationPlan(rows as any, {
      now: "2026-06-04T00:00:00Z",
      dry_run: false,
    });
    assert.equal(plan.groups.length, 1, "all three duplicate facts form one group");
    assert.equal(plan.groups[0].canonical_id, "good", "highest-scoring row is canonical");
    const canonical = plan.patches.find((p) => p.id === "good");
    assert.ok(canonical, "canonical patch exists");
    assert.equal(Number.isFinite(canonical!.confidence), true, "confidence is finite");
  });

  test("honors Worker 4 quarantine by excluding quarantined facts from consolidation", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    await backend.addFact({
      fact: "Chris keeps credentials out of durable memory.",
      category: "security",
      confidence: 0.9,
    });
    await backend.addFact({
      fact: "Chris keeps credentials out of durable memory.",
      category: "security",
      confidence: 0.89,
    });

    const rows = readRows<FactRow>("extracted_facts");
    rows[1].quarantined_at = "2026-06-04T00:00:00.000Z";
    writeRows("extracted_facts", rows);

    const result = await backend.consolidateMemory({
      now: "2026-06-04T00:00:00.000Z",
      dry_run: false,
    });

    assert.equal(result.groups.length, 0);
    const updated = readRows<FactRow>("extracted_facts");
    assert.equal(updated.filter((row) => row.status === "active").length, 2);
  });
});
