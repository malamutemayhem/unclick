/**
 * Lane 02 acceptance tests: contradiction reconciliation & supersession.
 *
 * Pure-logic tests always run. The LocalBackend integration tests use a temp
 * data dir and the MEMORY_RECONCILE_ENABLED flag, no database required.
 *
 * Run: cd packages/mcp-server && tsx --test src/memory/__tests__/reconcile.test.ts
 */

import { describe, it, test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  classifyAgainst,
  reconcileCandidate,
  defaultSimilarity,
  isReconcileEnabled,
  type ExistingFact,
  type ReconcileDeps,
} from "../reconcile.js";
import type { ContradictionEvent, FactInput } from "../types.js";

// ---- Pure classifier (always runs) ----

describe("classifyAgainst", () => {
  it("returns distinct when subjects do not overlap", () => {
    const r = classifyAgainst("User enjoys hiking on weekends", "User lives in Denver");
    assert.equal(r.classification, "distinct");
  });

  it("returns duplicate for near-identical text", () => {
    const r = classifyAgainst("User prefers TypeScript", "User prefers TypeScript");
    assert.equal(r.classification, "duplicate");
  });

  it("returns refinement when the incoming fact only adds detail", () => {
    const r = classifyAgainst("User prefers TypeScript and Rust", "User prefers TypeScript");
    assert.equal(r.classification, "refinement");
  });

  it("returns contradiction on a competing value for the same subject", () => {
    const r = classifyAgainst("User lives in Seattle", "User lives in Denver");
    assert.equal(r.classification, "contradiction");
    assert.equal(r.reason, "competing values on shared subject");
  });

  it("returns contradiction on a negation polarity flip", () => {
    const r = classifyAgainst("User does not like coffee", "User likes coffee");
    assert.equal(r.classification, "contradiction");
    assert.equal(r.reason, "negation polarity differs");
  });

  it("returns contradiction on a differing number", () => {
    const r = classifyAgainst("Salary target is 250000", "Salary target is 200000");
    assert.equal(r.classification, "contradiction");
    assert.equal(r.reason, "numeric value differs");
  });
});

describe("defaultSimilarity", () => {
  it("is 1 for identical content and 0 for disjoint content", () => {
    assert.equal(defaultSimilarity("deploy on friday", "deploy on friday"), 1);
    assert.equal(defaultSimilarity("apples oranges", "rockets planets"), 0);
  });
});

// ---- Orchestration with injected deps (always runs, no I/O) ----

interface FakeStore {
  facts: ExistingFact[];
  deps: ReconcileDeps;
  events: ContradictionEvent[];
  supersedeCalls: number;
}

function makeStore(initial: ExistingFact[]): FakeStore {
  const store: FakeStore = {
    facts: [...initial],
    events: [],
    supersedeCalls: 0,
    deps: undefined as unknown as ReconcileDeps,
  };
  store.deps = {
    supersede: async (oldId, newText, category, confidence) => {
      store.supersedeCalls += 1;
      const idx = store.facts.findIndex((f) => f.id === oldId);
      const newId = `n${store.supersedeCalls}`;
      const replacement: ExistingFact = {
        id: newId,
        fact: newText,
        category: category ?? store.facts[idx]?.category ?? "general",
        confidence,
      };
      if (idx >= 0) store.facts[idx] = replacement; // newest-wins in the live set
      else store.facts.push(replacement);
      return newId;
    },
    emit: (event) => {
      store.events.push(event);
    },
    now: () => "2026-06-04T00:00:00.000Z",
  };
  return store;
}

describe("reconcileCandidate", () => {
  it("adds when there is no same-subject match", async () => {
    const store = makeStore([{ id: "f1", fact: "User lives in Denver", category: "profile" }]);
    const r = await reconcileCandidate(
      { fact: "User enjoys hiking", category: "profile", confidence: 0.9 },
      store.facts,
      store.deps,
    );
    assert.equal(r.decision, "add");
    assert.equal(store.supersedeCalls, 0);
    assert.equal(store.events.length, 0);
  });

  it("noops a duplicate without superseding or emitting", async () => {
    const store = makeStore([{ id: "f1", fact: "User prefers TypeScript", category: "tech" }]);
    const r = await reconcileCandidate(
      { fact: "User prefers TypeScript", category: "tech", confidence: 0.9 },
      store.facts,
      store.deps,
    );
    assert.equal(r.decision, "noop");
    assert.equal(r.fact_id, "f1");
    assert.equal(store.supersedeCalls, 0);
    assert.equal(store.events.length, 0);
  });

  it("supersedes a refinement without emitting a contradiction", async () => {
    const store = makeStore([{ id: "f1", fact: "User prefers TypeScript", category: "tech" }]);
    const r = await reconcileCandidate(
      { fact: "User prefers TypeScript and Rust", category: "tech", confidence: 0.95 },
      store.facts,
      store.deps,
    );
    assert.equal(r.classification, "refinement");
    assert.equal(r.decision, "supersede");
    assert.equal(store.supersedeCalls, 1);
    assert.equal(store.events.length, 0);
  });

  it("supersedes a contradiction and emits exactly one event with both sides", async () => {
    const store = makeStore([
      {
        id: "f1",
        fact: "Deploy day is Friday",
        category: "ops",
        confidence: 0.8,
        commit_sha: "abc123",
        source_agent_id: "agent-ci", // W3 provenance on the existing side
      },
    ]);
    const r = await reconcileCandidate(
      // W3 provenance on the incoming side (read forward-compatibly off FactInput).
      {
        fact: "Deploy day is Monday",
        category: "ops",
        confidence: 0.95,
        model_id: "claude",
        source_agent_id: "agent-now",
        receipt_id: "rcpt-7",
      } as FactInput,
      store.facts,
      store.deps,
      { session_id: "sess-1" },
    );
    assert.equal(r.classification, "contradiction");
    assert.equal(r.decision, "supersede");
    assert.equal(r.superseded_fact_id, "f1");
    assert.equal(store.supersedeCalls, 1);
    assert.equal(store.events.length, 1);

    const event = store.events[0];
    assert.equal(event.kind, "memory_contradiction");
    assert.equal(event.existing.fact, "Deploy day is Friday");
    assert.equal(event.incoming.fact, "Deploy day is Monday");
    assert.equal(event.existing.commit_sha, "abc123"); // provenance carried through
    assert.equal(event.incoming.model_id, "claude");
    assert.equal(event.existing.source_agent_id, "agent-ci"); // W3 columns, both sides
    assert.equal(event.incoming.source_agent_id, "agent-now");
    assert.equal(event.incoming.receipt_id, "rcpt-7");
    assert.equal(event.session_id, "sess-1");
  });

  it("dry_run reports the decision but does not supersede or emit", async () => {
    const store = makeStore([{ id: "f1", fact: "Salary target is 200000", category: "goal" }]);
    const r = await reconcileCandidate(
      { fact: "Salary target is 250000", category: "goal", confidence: 0.95 },
      store.facts,
      store.deps,
      { dry_run: true },
    );
    assert.equal(r.classification, "contradiction");
    assert.equal(r.decision, "supersede");
    assert.ok(r.contradiction);
    assert.equal(store.supersedeCalls, 0);
    assert.equal(store.events.length, 0);
  });

  it("serves the latest value and fires one event per genuine conflict, none per duplicate", async () => {
    const store = makeStore([{ id: "f1", fact: "Salary target is 200000", category: "goal" }]);

    // First genuine change -> contradiction + one event.
    await reconcileCandidate(
      { fact: "Salary target is 250000", category: "goal", confidence: 0.95 },
      store.facts,
      store.deps,
    );
    assert.equal(store.events.length, 1);
    assert.ok(store.facts.some((f) => f.fact.includes("250000")));
    assert.ok(!store.facts.some((f) => f.fact.includes("200000"))); // prior value replaced

    // Replay the same value twice -> duplicates -> no new events.
    await reconcileCandidate(
      { fact: "Salary target is 250000", category: "goal", confidence: 0.95 },
      store.facts,
      store.deps,
    );
    await reconcileCandidate(
      { fact: "Salary target is 250000", category: "goal", confidence: 0.95 },
      store.facts,
      store.deps,
    );
    assert.equal(store.events.length, 1);

    // A second genuine change -> one more event.
    await reconcileCandidate(
      { fact: "Salary target is 300000", category: "goal", confidence: 0.95 },
      store.facts,
      store.deps,
    );
    assert.equal(store.events.length, 2);
    assert.ok(store.facts.some((f) => f.fact.includes("300000")));
  });
});

// ---- LocalBackend integration (no DB, temp dir + flag) ----

describe("LocalBackend reconcile (flag-gated)", () => {
  let tempDir = "";

  function readRows<T>(table: string): T[] {
    const file = path.join(tempDir, `${table}.json`);
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, "utf8")) as T[];
  }

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-reconcile-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    delete process.env.MEMORY_RECONCILE_ENABLED;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("flag off: a contradicting write is stored alongside, no supersession", async () => {
    delete process.env.MEMORY_RECONCILE_ENABLED;
    assert.equal(isReconcileEnabled(), false);
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const first = await backend.addFact({ fact: "Deploy day is Friday", category: "ops", confidence: 0.9 });
    const second = await backend.addFact({ fact: "Deploy day is Monday", category: "ops", confidence: 0.95 });

    const facts = readRows<{ id: string; status: string }>("extracted_facts");
    const active = facts.filter((f) => f.status === "active");
    assert.equal(active.length, 2); // both coexist when reconciliation is off
    assert.notEqual(first.id, second.id);
    assert.equal(readRows("contradiction_events").length, 0);
  });

  test("flag on: a contradicting write supersedes the prior fact and records one contradiction", async () => {
    process.env.MEMORY_RECONCILE_ENABLED = "true";
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const first = await backend.addFact({ fact: "Deploy day is Friday", category: "ops", confidence: 0.9 });
    const second = await backend.addFact({ fact: "Deploy day is Monday", category: "ops", confidence: 0.95 });
    assert.notEqual(second.id, first.id);

    const facts = readRows<{ id: string; status: string; fact: string; valid_to?: string }>("extracted_facts");
    const oldRow = facts.find((f) => f.id === first.id);
    assert.equal(oldRow?.status, "superseded");
    assert.ok(oldRow?.valid_to, "superseded fact should have valid_to set (history preserved)");

    const newRow = facts.find((f) => f.id === second.id);
    assert.equal(newRow?.status, "active");
    assert.equal(newRow?.fact, "Deploy day is Monday"); // latest value served

    const events = readRows<ContradictionEvent>("contradiction_events");
    assert.equal(events.length, 1);
    assert.equal(events[0].classification, "contradiction");
  });

  test("flag on: the explicit reconcile_fact op classifies without writing under dry_run", async () => {
    process.env.MEMORY_RECONCILE_ENABLED = "true";
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    await backend.addFact({ fact: "Primary language is Python", category: "tech", confidence: 0.9 });
    const result = await backend.reconcileFact(
      { fact: "Primary language is Go", category: "tech", confidence: 0.95 },
      { dry_run: true },
    );

    assert.equal(result.enabled, true);
    assert.equal(result.classification, "contradiction");
    assert.equal(result.decision, "supersede");
    // dry_run: nothing superseded, nothing recorded.
    const active = readRows<{ status: string }>("extracted_facts").filter((f) => f.status === "active");
    assert.equal(active.length, 1);
    assert.equal(readRows("contradiction_events").length, 0);
  });
});
