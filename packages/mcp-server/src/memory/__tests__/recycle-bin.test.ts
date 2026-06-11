import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir = "";

interface FactRowFixture {
  id: string;
  status: string;
  fact: string;
}

function readFacts(): FactRowFixture[] {
  return JSON.parse(fs.readFileSync(path.join(tempDir, "extracted_facts.json"), "utf8")) as FactRowFixture[];
}

describe("recycle bin (MEMORY_RECYCLE_BIN_ENABLED)", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-bin-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
    process.env.MEMORY_BACKEND = "local";
    process.env.MEMORY_RECYCLE_BIN_ENABLED = "1";
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    delete process.env.MEMORY_BACKEND;
    delete process.env.MEMORY_RECYCLE_BIN_ENABLED;
    delete process.env.MEMORY_HARD_FORGET_ENABLED;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("archive hides a fact from recall and restore brings it back", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const saved = await backend.addFact({
      fact: "User prefers the recycle bin deletion model for memory.",
      category: "preference",
      confidence: 0.95,
    });

    const archived = await backend.archiveFact({ fact_id: saved.id, reason: "test archive" });
    assert.equal(archived.already_archived, false);
    assert.ok(archived.archived_at);

    const hidden = await backend.searchMemory("recycle bin deletion model", 5) as Array<{ id: string }>;
    assert.equal(hidden.some((row) => row.id === saved.id), false, "archived fact must be hidden from recall");

    const startup = await backend.getStartupContext(3) as { active_facts: Array<{ fact: string }> };
    assert.equal(
      startup.active_facts.some((row) => row.fact.includes("recycle bin deletion model")),
      false,
      "archived fact must be excluded from startup context"
    );

    const binBeforeRestore = await backend.listArchivedFacts();
    assert.equal(binBeforeRestore.length, 1);
    assert.equal(binBeforeRestore[0]?.id, saved.id);
    assert.equal(binBeforeRestore[0]?.archive_reason, "test archive");

    const restored = await backend.restoreFact({ fact_id: saved.id });
    assert.equal(restored.was_archived, true);

    const visible = await backend.searchMemory("recycle bin deletion model", 5) as Array<{ id: string }>;
    assert.equal(visible.some((row) => row.id === saved.id), true, "restored fact must be recall-visible again");

    const binAfterRestore = await backend.listArchivedFacts();
    assert.equal(binAfterRestore.length, 0);
  });

  test("archive and restore are idempotent and refuse invalid states", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const saved = await backend.addFact({
      fact: "Idempotency fixture for the recycle bin.",
      category: "technical",
      confidence: 0.9,
    });

    await backend.archiveFact({ fact_id: saved.id });
    const again = await backend.archiveFact({ fact_id: saved.id });
    assert.equal(again.already_archived, true);

    await backend.restoreFact({ fact_id: saved.id });
    const restoredAgain = await backend.restoreFact({ fact_id: saved.id });
    assert.equal(restoredAgain.was_archived, false);

    await assert.rejects(
      backend.archiveFact({ fact_id: "missing-fact-id" }),
      /not found/
    );
  });

  test("forget routes to the bin when the flag is on; empty_recycle_bin is the permanent path", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    const saved = await MEMORY_HANDLERS.add_fact({
      fact: "Permanent deletion fixture: this memory will go through the bin.",
      category: "general",
      confidence: 0.9,
    }) as { id: string };
    assert.ok(saved.id);

    const forgotten = await MEMORY_HANDLERS.forget({ fact_id: saved.id }) as {
      mode: string;
      already_archived: boolean;
    };
    assert.equal(forgotten.mode, "recycle_bin_archive", "forget must archive, not delete, when the bin is enabled");
    assert.equal(forgotten.already_archived, false);

    const bin = await MEMORY_HANDLERS.list_archived({}) as { count: number; entries: Array<{ id: string }> };
    assert.equal(bin.count, 1);
    assert.equal(bin.entries[0]?.id, saved.id);

    const emptied = await MEMORY_HANDLERS.empty_recycle_bin({}) as {
      deleted: number;
      receipts: Array<{ fact_id: string; verified_clean: boolean }>;
    };
    assert.equal(emptied.deleted, 1);
    assert.equal(emptied.receipts[0]?.fact_id, saved.id);

    const binAfter = await MEMORY_HANDLERS.list_archived({}) as { count: number };
    assert.equal(binAfter.count, 0);

    const rows = readFacts();
    const row = rows.find((r) => r.id === saved.id);
    assert.ok(row, "forgotten facts stay as tombstoned rows");
    assert.equal(row?.status, "forgotten");
    assert.equal(row?.fact.includes("Permanent deletion fixture"), false, "content must be scrubbed");
  });

  test("empty_recycle_bin honors a fact_ids subset", async () => {
    const { LocalBackend } = await import("../local.js");
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const backend = new LocalBackend();

    const keep = await backend.addFact({ fact: "Bin fixture to keep archived.", category: "general", confidence: 0.9 });
    const drop = await backend.addFact({ fact: "Bin fixture to permanently delete.", category: "general", confidence: 0.9 });
    await backend.archiveFact({ fact_id: keep.id });
    await backend.archiveFact({ fact_id: drop.id });

    const emptied = await MEMORY_HANDLERS.empty_recycle_bin({ fact_ids: [drop.id] }) as { deleted: number };
    assert.equal(emptied.deleted, 1);

    const bin = await backend.listArchivedFacts();
    assert.equal(bin.length, 1);
    assert.equal(bin[0]?.id, keep.id);
  });

  test("recycle-bin ops report disabled when the flag is off", async () => {
    delete process.env.MEMORY_RECYCLE_BIN_ENABLED;
    const { MEMORY_HANDLERS } = await import("../handlers.js");

    const archive = await MEMORY_HANDLERS.archive_memory({ fact_id: "any" }) as { flag_enabled: boolean };
    assert.equal(archive.flag_enabled, false);
    const restore = await MEMORY_HANDLERS.restore_memory({ fact_id: "any" }) as { flag_enabled: boolean };
    assert.equal(restore.flag_enabled, false);
    const bin = await MEMORY_HANDLERS.list_archived({}) as { flag_enabled: boolean; entries: unknown[] };
    assert.equal(bin.flag_enabled, false);
    assert.deepEqual(bin.entries, []);
    const emptied = await MEMORY_HANDLERS.empty_recycle_bin({}) as { flag_enabled: boolean; deleted: number };
    assert.equal(emptied.flag_enabled, false);
    assert.equal(emptied.deleted, 0);
  });
});
