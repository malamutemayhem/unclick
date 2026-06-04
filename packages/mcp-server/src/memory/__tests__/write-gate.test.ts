import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { LocalBackend } from "../local.js";
import { SupabaseBackend } from "../supabase.js";
import {
  WRITE_GATE_DUPLICATE_SIMILARITY,
  WRITE_GATE_SAME_SUBJECT_OVERLAP,
  memoryWriteGateContentHash,
  scoreMemoryWriteSimilarity,
  scoreMemoryWriteSubjectOverlap,
  selectAdmissionDecision,
  writeGateCandidateFromRankedSearchRow,
} from "../write-gate.js";
import type { MemoryWriteGateSessionEventInput } from "../write-gate.js";
import type { FactInput, MemoryWriteGateCandidate } from "../types.js";

let tempDir = "";

function readRows<T>(table: string): T[] {
  const file = path.join(tempDir, `${table}.json`);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as T[];
}

function fakeSupabaseClient(rows: unknown[]) {
  return {
    from(table: string) {
      const data = table?.includes("session") ? [] : rows;
      const builder = {
        select() { return builder; },
        eq() { return builder; },
        ilike() { return builder; },
        is() { return builder; },
        lte() { return builder; },
        limit() { return builder; },
        or() { return builder; },
        order() { return builder; },
        then(resolve: (value: unknown) => unknown, reject: (reason: unknown) => unknown) {
          return Promise.resolve({ data, error: null }).then(resolve, reject);
        },
      };
      return builder;
    },
  };
}

describe("write-gate policy", () => {
  const existing: MemoryWriteGateCandidate = {
    id: "fact-1",
    fact: "Chris prefers TypeScript for UnClick agents.",
    category: "preference",
    confidence: 0.95,
    content_hash: memoryWriteGateContentHash("Chris prefers TypeScript for UnClick agents."),
    created_at: "2026-06-04T00:00:00.000Z",
  };

  test("scores near duplicate memories above the no-op threshold", () => {
    const score = scoreMemoryWriteSimilarity(
      "Chris prefers TypeScript for UnClick agent work.",
      existing.fact
    );
    assert.ok(score >= WRITE_GATE_DUPLICATE_SIMILARITY);
  });

  test("uses Worker 2 shared subject and duplicate thresholds", () => {
    assert.equal(WRITE_GATE_SAME_SUBJECT_OVERLAP, 0.5);
    assert.equal(WRITE_GATE_DUPLICATE_SIMILARITY, 0.92);
    assert.equal(
      scoreMemoryWriteSubjectOverlap(
        "Chris prefers TypeScript for UnClick agent work.",
        existing.fact
      ),
      1
    );
  });

  test("returns NOOP for exact or semantic duplicates", () => {
    const exact = selectAdmissionDecision({
      fact: existing.fact,
      category: "preference",
      confidence: 0.95,
    }, [existing]);
    assert.equal(exact.action, "NOOP");
    assert.equal(exact.reason, "exact_duplicate");
    assert.equal(exact.metrics.duplicate_rate, 0);

    const semantic = selectAdmissionDecision({
      fact: "Chris prefers TypeScript for UnClick agent work.",
      category: "preference",
      confidence: 0.95,
    }, [existing]);
    assert.equal(semantic.action, "NOOP");
    assert.equal(semantic.reason, "semantic_duplicate");
    assert.equal(semantic.matched_id, "fact-1");
  });

  test("parses Worker 6 ranked rows for admission", () => {
    const candidate = writeGateCandidateFromRankedSearchRow({
      id: "ranked-fact-1",
      source: "fact",
      content: "Chris prefers durable memory deduplication.",
      category: "technical",
      confidence: 0.91,
      created_at: "2026-06-04T00:00:00.000Z",
      final_score: 0.35,
      rrf_score: 0.08,
      kw_score: 4,
      cosine_score: 0.93,
      keyword_rank: 1,
      vector_rank: 2,
    });

    assert.equal(candidate?.id, "ranked-fact-1");
    assert.equal(candidate?.source, "fact");
    assert.equal(candidate?.final_score, 0.35);
    assert.equal(candidate?.rrf_score, 0.08);
    assert.equal(candidate?.kw_score, 4);
    assert.equal(candidate?.cosine_score, 0.93);
    assert.equal(candidate?.keyword_rank, 1);
    assert.equal(candidate?.vector_rank, 2);
  });

  test("uses Worker 6 cosine score for semantic duplicate admission", () => {
    const decision = selectAdmissionDecision({
      fact: "Chris wants memory writes collapsed.",
      category: "technical",
      confidence: 0.95,
    }, [{
      id: "ranked-fact-2",
      fact: "The operator prefers deduplicated durable memory admission.",
      category: "technical",
      confidence: 0.95,
      created_at: "2026-06-04T00:00:00.000Z",
      cosine_score: 0.94,
      final_score: 0.2,
      rrf_score: 0.05,
    }]);

    assert.equal(decision.action, "NOOP");
    assert.equal(decision.reason, "semantic_duplicate");
    assert.equal(decision.matched_id, "ranked-fact-2");
  });

  test("returns UPDATE only for a compatible expansion", () => {
    const decision = selectAdmissionDecision({
      fact: "Chris prefers TypeScript for UnClick memory work.",
      category: "preference",
      confidence: 0.95,
    }, [{
      id: "fact-2",
      fact: "Chris prefers TypeScript.",
      category: "preference",
      confidence: 0.95,
      created_at: "2026-06-04T00:00:00.000Z",
    }]);

    assert.equal(decision.action, "UPDATE");
    assert.equal(decision.reason, "compatible_expansion");
  });

  test("rejects low-confidence writes with no provenance", () => {
    const decision = selectAdmissionDecision({
      fact: "Maybe Chris likes blue dashboards.",
      category: "preference",
      confidence: 0.2,
    }, []);

    assert.equal(decision.action, "REJECT");
    assert.equal(decision.reason, "low_confidence_without_provenance");
    assert.equal(decision.route_target, "none");
  });

  test("accepts low-confidence writes with Worker 3 typed provenance columns", () => {
    const input: FactInput & {
      source_agent_id?: string;
      source_ref?: string;
      receipt_id?: string;
    } = {
      fact: "Maybe Chris prefers receipt-backed memory admission.",
      category: "preference",
      confidence: 0.2,
      source_agent_id: "worker-3",
      source_ref: "boardroom-message:test",
      receipt_id: "receipt-1",
    };

    const decision = selectAdmissionDecision(input, []);
    assert.equal(decision.action, "ADD");
    assert.equal(decision.reason, "no_duplicate_or_admission_block");
  });

  test("routes transient events away from the fact store", () => {
    const decision = selectAdmissionDecision({
      fact: "heartbeat: queue unchanged and no new signals",
      category: "system",
      confidence: 1,
      startup_fact_kind: "operational",
    }, []);

    assert.equal(decision.action, "ROUTE_EVENT");
    assert.equal(decision.route_target, "episode_store");
    assert.equal(decision.metrics.admitted_to_fact_store, false);
  });
});

describe("write-gate local backend parity", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-write-gate-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
    process.env.MEMORY_WRITE_GATE_ENABLED = "1";
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    delete process.env.MEMORY_WRITE_GATE_ENABLED;
    delete process.env.MEMORY_TYPED_SPLIT_ENABLED;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("collapses a duplicate storm to one canonical local fact", async () => {
    const backend = new LocalBackend();
    const input: FactInput = {
      fact: "Chris wants UnClick memory writes to deduplicate repeated facts.",
      category: "technical",
      confidence: 0.95,
      source_session_id: "write-gate-test",
    };

    const first = await backend.addFact(input);
    for (let i = 0; i < 99; i += 1) {
      const next = await backend.addFact(input);
      assert.equal(next.id, first.id);
    }

    const rows = readRows<{ id: string; fact: string }>("extracted_facts");
    assert.equal(rows.length, 1);
    assert.equal(rows[0].id, first.id);
  });

  test("does not write rejected low-confidence local facts", async () => {
    const backend = new LocalBackend();
    const result = await backend.addFact({
      fact: "Maybe Chris wants a vague memory with no source.",
      category: "preference",
      confidence: 0.2,
    }) as { id: string; write_gate?: { action: string }; source_kind?: string };

    assert.equal(result.write_gate?.action, "REJECT");
    assert.equal(result.source_kind, "none");
    assert.equal(readRows("extracted_facts").length, 0);
  });

  test("routes transient local writes to the conversation fallback without W9", async () => {
    const backend = new LocalBackend();
    const result = await backend.addFact({
      fact: "heartbeat: no new signals and queue unchanged",
      category: "system",
      confidence: 1,
      startup_fact_kind: "operational",
      source_session_id: "heartbeat-session",
    }) as { id: string; write_gate?: { action: string }; source_kind?: string };

    assert.equal(result.write_gate?.action, "ROUTE_EVENT");
    assert.equal(result.source_kind, "conversation_turn");
    assert.equal(readRows("extracted_facts").length, 0);
    const events = readRows<{ id: string; role: string; session_id: string }>("conversation_log");
    assert.equal(events.length, 1);
    assert.equal(events[0].id, result.id);
    assert.equal(events[0].role, "memory_write_gate_event");
    assert.equal(events[0].session_id, "heartbeat-session");
  });

  test("routes transient local writes to W9 session events when available", async () => {
    process.env.MEMORY_TYPED_SPLIT_ENABLED = "1";
    const backend = new LocalBackend();
    const events: MemoryWriteGateSessionEventInput[] = [];
    (backend as unknown as {
      addSessionEvent(data: MemoryWriteGateSessionEventInput): Promise<{ id: string; memory_class: string }>;
    }).addSessionEvent = async (event) => {
      events.push(event);
      return { id: "session-event-1", memory_class: event.memory_class };
    };

    const result = await backend.addFact({
      fact: "heartbeat: no new signals and queue unchanged",
      category: "system",
      confidence: 1,
      startup_fact_kind: "operational",
      source_session_id: "heartbeat-session",
    }) as { id: string; write_gate?: { action: string }; source_kind?: string };

    assert.equal(result.id, "session-event-1");
    assert.equal(result.write_gate?.action, "ROUTE_EVENT");
    assert.equal(result.source_kind, "session_event");
    assert.equal(readRows("conversation_log").length, 0);
    assert.equal(events.length, 1);
    assert.equal(events[0]?.event_kind, "write_gate_route");
    assert.equal(events[0]?.memory_class, "episodic");
    assert.equal(events[0]?.session_id, "heartbeat-session");
    assert.deepEqual(events[0]?.payload.write_gate, {
      action: "ROUTE_EVENT",
      reason: "transient_event",
      candidate_hash: memoryWriteGateContentHash("heartbeat: no new signals and queue unchanged"),
      route_target: "episode_store",
    });
  });

  test("supersedes a local fact for compatible expansions", async () => {
    const backend = new LocalBackend();
    const first = await backend.addFact({
      fact: "Chris prefers TypeScript.",
      category: "preference",
      confidence: 0.95,
      source_session_id: "write-gate-test",
    });
    const second = await backend.addFact({
      fact: "Chris prefers TypeScript for UnClick memory work.",
      category: "preference",
      confidence: 0.95,
      source_session_id: "write-gate-test",
    });

    assert.notEqual(second.id, first.id);
    const rows = readRows<{ id: string; status: string; superseded_by?: string }>("extracted_facts");
    assert.equal(rows.length, 2);
    assert.equal(rows.find((row) => row.id === first.id)?.status, "superseded");
    assert.equal(rows.find((row) => row.id === first.id)?.superseded_by, second.id);
  });
});

describe("write-gate Supabase admission adapter", () => {
  test("routes Supabase ROUTE_EVENT decisions to W9 session events when available", async () => {
    process.env.MEMORY_TYPED_SPLIT_ENABLED = "1";
    try {
      const backend = Object.create(SupabaseBackend.prototype) as SupabaseBackend;
      const events: MemoryWriteGateSessionEventInput[] = [];
      (backend as unknown as {
        addSessionEvent(data: MemoryWriteGateSessionEventInput): Promise<{ id: string; memory_class: string }>;
      }).addSessionEvent = async (event) => {
        events.push(event);
        return { id: "supabase-session-event-1", memory_class: event.memory_class };
      };
      const input: FactInput = {
        fact: "heartbeat: no new signals and queue unchanged",
        category: "system",
        confidence: 1,
        startup_fact_kind: "operational",
        source_session_id: "heartbeat-session",
      };
      const gate = selectAdmissionDecision(input, []);

      const result = await (backend as any).applyWriteGateDecision(input, gate) as {
        id: string;
        write_gate?: { action: string };
        source_kind?: string;
      };

      assert.equal(result.id, "supabase-session-event-1");
      assert.equal(result.write_gate?.action, "ROUTE_EVENT");
      assert.equal(result.source_kind, "session_event");
      assert.equal(events.length, 1);
      assert.equal(events[0]?.event_kind, "write_gate_route");
      assert.equal(events[0]?.memory_class, "episodic");
    } finally {
      delete process.env.MEMORY_TYPED_SPLIT_ENABLED;
    }
  });

  test("uses Supabase candidates with the shared admission policy", async () => {
    const row = {
      id: "supabase-fact-1",
      fact: "Chris prefers TypeScript for UnClick agents.",
      category: "preference",
      confidence: 0.95,
      content_hash: memoryWriteGateContentHash("Chris prefers TypeScript for UnClick agents."),
      created_at: "2026-06-04T00:00:00.000Z",
    };
    const backend = Object.create(SupabaseBackend.prototype) as SupabaseBackend;
    (backend as any).client = fakeSupabaseClient([row]);
    (backend as any).tenancy = { mode: "byod" };
    (backend as any).tables = {
      extracted_facts: "extracted_facts",
      session_summaries: "session_summaries",
    };

    const decision = await backend.admitWrite({
      fact: "Chris prefers TypeScript for UnClick agent work.",
      category: "preference",
      confidence: 0.95,
    });

    assert.equal(decision.action, "NOOP");
    assert.equal(decision.matched_id, "supabase-fact-1");
  });
});
