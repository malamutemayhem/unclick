import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { MemoryTypedLinkCandidate } from "../typed-links.js";

// lane-05: true-forget propagation. Verifies that forgetMemory tombstones a
// fact AND scrubs it from every derived store (typed links, taxonomy snapshots,
// library history), and that the handler honours MEMORY_HARD_FORGET_ENABLED.

let tempDir = "";

function readRows<T>(table: string): T[] {
  const file = path.join(tempDir, `${table}.json`);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as T[];
}

describe("LocalBackend.forgetMemory true-forget propagation", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-forget-local-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("tombstones the fact, scrubs content, and clears it from search + startup while keeping other facts", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const secret = await backend.addFact({
      fact: "Project Bluejay launch playbook lives in the ops handbook.",
      category: "project",
      confidence: 0.95,
    });
    const keeper = await backend.addFact({
      fact: "Chris prefers compact memory first with source receipts.",
      category: "preference",
      confidence: 0.9,
    });

    const before = (await backend.searchFacts("Bluejay")) as Array<{ id: string }>;
    assert.ok(before.some((r) => r.id === secret.id), "fact should be searchable before forget");

    const receipt = await backend.forgetMemory({ fact_id: secret.id, reason: "user asked to delete" });
    assert.equal(receipt.fact_tombstoned, true);
    assert.equal(receipt.content_scrubbed, true);
    assert.equal(receipt.verified_clean, true);

    // Gone from every recall surface.
    const factHits = (await backend.searchFacts("Bluejay")) as Array<{ id: string }>;
    assert.ok(!factHits.some((r) => r.id === secret.id), "forgotten fact must not appear in searchFacts");
    const recallHits = (await backend.searchMemory("Bluejay launch playbook", 10)) as Array<{ id: string }>;
    assert.ok(!recallHits.some((r) => r.id === secret.id), "forgotten fact must not appear in searchMemory");
    const startup = (await backend.getStartupContext(5)) as { active_facts: Array<{ fact: string }> };
    assert.ok(!startup.active_facts.some((f) => f.fact.includes("Bluejay")), "forgotten fact must not load at startup");

    // Tombstone row remains for audit, but the content is gone.
    const rows = readRows<{
      id: string;
      fact: string;
      status: string;
      forgotten_at?: string;
      invalidated_at?: string;
    }>("extracted_facts");
    const tomb = rows.find((r) => r.id === secret.id);
    assert.ok(tomb, "tombstone row should remain for audit");
    assert.equal(tomb?.status, "forgotten");
    assert.equal(tomb?.fact, "[forgotten]");
    assert.ok(tomb?.forgotten_at, "forgotten_at marker should be set");
    assert.ok(tomb?.invalidated_at, "invalidated_at should be set");
    assert.ok(
      !JSON.stringify(rows).includes("Bluejay"),
      "no trace of the forgotten content should remain in the facts table"
    );

    // Unrelated facts survive.
    const keepHits = (await backend.searchFacts("compact memory")) as Array<{ id: string }>;
    assert.ok(keepHits.some((r) => r.id === keeper.id), "unrelated facts must survive a forget");
  });

  test("deletes typed links derived from the forgotten fact", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const fact = await backend.addFact({
      fact: "Worker 5 owns the true-forget lane.",
      category: "project",
      confidence: 0.9,
    });
    const candidate: MemoryTypedLinkCandidate = {
      source_kind: "fact",
      source_id: fact.id,
      relation: "owns",
      target_kind: "tool",
      target_text: "true-forget",
      confidence: 0.9,
      evidence_span: { start: 0, end: 8, text: "Worker 5" },
      redaction_state: "clean",
    };
    const saved = await backend.saveTypedLinkCandidates([candidate]);
    assert.equal(saved.saved, 1);
    assert.equal(readRows("memory_typed_links").length, 1);

    const receipt = await backend.forgetMemory({ fact_id: fact.id });
    assert.equal(receipt.typed_links_deleted, 1);
    assert.equal(
      readRows<{ source_id: string }>("memory_typed_links").filter((r) => r.source_id === fact.id).length,
      0,
      "typed links for the forgotten fact must be deleted"
    );
  });

  test("sweeps Worker 9 episodic events linked by source_fact_id or verbatim content", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const fact = await backend.addFact({
      fact: "Amber rollout ships Thursday at 0900 UTC.",
      category: "project",
      confidence: 0.9,
    });

    // Seed W9's episode store the way local addSessionEvent writes it: one event
    // FK-linked to the fact, one fact_route episode linked only by verbatim
    // content (the router leaves source_fact_id unset), and one unrelated event.
    const event = (id: string, extra: Record<string, unknown>) => ({
      id,
      memory_class: "episodic",
      event_kind: "episode",
      payload: {},
      created_at: "2026-06-04T00:00:00.000Z",
      updated_at: "2026-06-04T00:00:00.000Z",
      ...extra,
    });
    fs.writeFileSync(
      path.join(tempDir, "session_events.json"),
      JSON.stringify(
        [
          event("ev-fk", { content: "Routed episode body.", source_fact_id: fact.id }),
          event("ev-content", { event_kind: "fact_route", content: "Amber rollout ships Thursday at 0900 UTC." }),
          event("ev-keep", { content: "Unrelated standup note." }),
        ],
        null,
        2
      )
    );

    const receipt = await backend.forgetMemory({ fact_id: fact.id });
    assert.equal(receipt.session_events_deleted, 2, "FK-linked and content-linked episodes are swept");
    assert.ok(receipt.surfaces_swept.includes("session_events"), "session_events is reported as a swept surface");

    const remaining = readRows<{ id: string }>("session_events");
    assert.deepEqual(remaining.map((r) => r.id), ["ev-keep"], "only the unrelated episode survives the forget");
  });

  test("session_events sweep is a no-op (0, no crash) when the typed-split store is absent", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();
    const fact = await backend.addFact({
      fact: "No episode store exists on this tenant yet.",
      category: "technical",
      confidence: 0.9,
    });
    const receipt = await backend.forgetMemory({ fact_id: fact.id });
    assert.equal(receipt.session_events_deleted, 0);
    assert.equal(receipt.verified_clean, true);
  });

  test("scrubs the fact from taxonomy snapshots and purges snapshot history", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const fact = await backend.addFact({
      fact: "Cobalt migration runbook covers the database cutover steps.",
      category: "technical",
      confidence: 0.92,
    });
    await backend.refreshTaxonomySnapshots({ dry_run: false });

    const pointer = `fact:${fact.id}`;
    const before = readRows<{ category: string; content: string }>("knowledge_library");
    assert.ok(
      before.some((d) => d.category === "memory_snapshot" && d.content.includes(pointer)),
      "a snapshot should reference the fact before forget"
    );

    const receipt = await backend.forgetMemory({ fact_id: fact.id });
    assert.equal(receipt.verified_clean, true);

    const afterLib = readRows<{ content: string }>("knowledge_library");
    assert.ok(
      !afterLib.some((d) => (d.content ?? "").includes(pointer)),
      "no live snapshot may reference the forgotten fact"
    );
    assert.ok(
      !JSON.stringify(afterLib).includes("Cobalt migration runbook"),
      "forgotten content text must be gone from live snapshots"
    );
    const afterHistory = readRows<{ content: string }>("knowledge_library_history");
    assert.ok(
      !afterHistory.some((d) => (d.content ?? "").includes(pointer)),
      "no archived snapshot version may reference the forgotten fact"
    );
  });

  test("throws when the fact does not exist", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();
    await assert.rejects(() => backend.forgetMemory({ fact_id: "does-not-exist" }), /not found/);
  });
});

describe("forget handler flag gating (MEMORY_HARD_FORGET_ENABLED)", () => {
  const FORCED_LOCAL_ENV = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_ANON_KEY",
    "UNCLICK_API_KEY",
    "UNCLICK_API_KEY_HASH",
    "MEMORY_HARD_FORGET_ENABLED",
  ] as const;
  const saved: Record<string, string | undefined> = {};

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-forget-handler-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
    for (const key of FORCED_LOCAL_ENV) {
      saved[key] = process.env[key];
      delete process.env[key]; // force the zero-config local backend, no network
    }
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    for (const key of FORCED_LOCAL_ENV) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("flag off falls back to reversible soft invalidate (content preserved)", async () => {
    delete process.env.MEMORY_HARD_FORGET_ENABLED;
    const { LocalBackend } = await import("../local.js");
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const backend = new LocalBackend();
    const fact = await backend.addFact({
      fact: "Flag-off keeps the original text.",
      category: "technical",
      confidence: 0.9,
    });

    const res = (await MEMORY_HANDLERS.forget({ fact_id: fact.id })) as {
      mode: string;
      flag_enabled: boolean;
    };
    assert.equal(res.mode, "soft_invalidate");
    assert.equal(res.flag_enabled, false);

    const row = readRows<{ id: string; fact: string; status: string; invalidated_at?: string }>(
      "extracted_facts"
    ).find((r) => r.id === fact.id);
    assert.equal(row?.fact, "Flag-off keeps the original text.", "soft invalidate must NOT scrub content");
    assert.ok(row?.invalidated_at, "soft invalidate sets invalidated_at");
    assert.notEqual(row?.status, "forgotten");
  });

  test("flag on performs a hard forget with compliance 1.0", async () => {
    process.env.MEMORY_HARD_FORGET_ENABLED = "1";
    const { LocalBackend } = await import("../local.js");
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const backend = new LocalBackend();
    const fact = await backend.addFact({
      fact: "Flag-on scrubs the Sapphire codename.",
      category: "project",
      confidence: 0.9,
    });

    const res = (await MEMORY_HANDLERS.forget({ fact_id: fact.id })) as {
      mode: string;
      forget_compliance: number;
      verified_clean: boolean;
    };
    assert.equal(res.mode, "hard_forget");
    assert.equal(res.forget_compliance, 1);
    assert.equal(res.verified_clean, true);

    const row = readRows<{ id: string; fact: string; status: string }>("extracted_facts").find(
      (r) => r.id === fact.id
    );
    assert.equal(row?.status, "forgotten");
    assert.equal(row?.fact, "[forgotten]");
  });
});
