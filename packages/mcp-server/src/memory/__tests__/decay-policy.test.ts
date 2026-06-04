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
  access_count: number;
  last_accessed: string;
  decay_tier: string;
  created_at: string;
  effective_score?: number;
  decayed_confidence?: number;
  heat_score?: number;
  decay_reason?: string;
  archived_at?: string | null;
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

describe("lane-08 decay policy", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-decay-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("archives stale operational facts and computes effective score inputs", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();
    const now = "2026-06-04T00:00:00.000Z";

    const identity = await backend.addFact({
      fact: "Chris prefers compact memory first with source receipts.",
      category: "preference",
      confidence: 0.95,
    });
    const heartbeat = await backend.addFact({
      fact: "heartbeat self-report: no new signals",
      category: "system",
      confidence: 0.9,
      startup_fact_kind: "operational",
    });
    const resolved = await backend.addFact({
      fact: "PR #1200 shipped and the blocker is resolved.",
      category: "task",
      confidence: 0.8,
    });

    const rows = readRows<FactRow>("extracted_facts");
    for (const row of rows) {
      if (row.id === identity.id) {
        row.last_accessed = "2026-05-20T00:00:00.000Z";
        row.created_at = "2026-05-01T00:00:00.000Z";
      }
      if (row.id === heartbeat.id) {
        row.last_accessed = "2026-04-20T00:00:00.000Z";
        row.created_at = "2026-04-01T00:00:00.000Z";
      }
      if (row.id === resolved.id) {
        row.last_accessed = "2026-05-20T00:00:00.000Z";
        row.created_at = "2026-05-01T00:00:00.000Z";
      }
    }
    writeRows("extracted_facts", rows);

    const result = await backend.manageDecayV2({ now, dry_run: false });
    assert.equal(result.metrics.hot_set_staleness > 0, true);
    assert.equal(result.archived, 1);

    const updated = readRows<FactRow>("extracted_facts");
    const byId = new Map(updated.map((row) => [row.id, row]));
    const identityRow = byId.get(identity.id);
    const heartbeatRow = byId.get(heartbeat.id);
    const resolvedRow = byId.get(resolved.id);

    assert.equal(identityRow?.status, "active");
    assert.equal(identityRow?.decay_tier, "hot");
    assert.equal(typeof identityRow?.effective_score, "number");
    assert.equal(typeof identityRow?.decayed_confidence, "number");
    assert.equal(typeof identityRow?.heat_score, "number");

    assert.equal(heartbeatRow?.status, "archived");
    assert.equal(heartbeatRow?.decay_tier, "cold");
    assert.match(heartbeatRow?.decay_reason ?? "", /ttl_archive/);
    assert.equal(Boolean(heartbeatRow?.archived_at), true);

    assert.equal(resolvedRow?.status, "active");
    assert.equal(resolvedRow?.decay_tier, "cold");
    assert.match(resolvedRow?.decay_reason ?? "", /resolved_cold/);
    assert.equal((identityRow?.effective_score ?? 0) > (heartbeatRow?.effective_score ?? 1), true);
  });
});
