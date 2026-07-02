import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir = "";

function readAccessCount(id: string): number {
  const rows = JSON.parse(
    fs.readFileSync(path.join(tempDir, "extracted_facts.json"), "utf8")
  ) as Array<{ id: string; access_count: number }>;
  return rows.find((row) => row.id === id)?.access_count ?? -1;
}

describe("recall access reinforcement (Recall Check 1x/2x counters)", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-recall-access-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
    process.env.MEMORY_BACKEND = "local";
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    delete process.env.MEMORY_BACKEND;
    delete process.env.MEMORY_WRITE_GATE_ENABLED;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("search_memory op bumps access_count for surfaced facts on each recall", async () => {
    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const fact = await backend.addFact({
      fact: "Recall reinforcement marker wombat-tracker stays useful.",
      category: "technical",
      confidence: 0.9,
    });
    assert.equal(readAccessCount(fact.id), 0, "fresh fact starts at zero");

    await MEMORY_HANDLERS.search_memory({ query: "wombat-tracker", max_results: 5 });
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.equal(readAccessCount(fact.id), 1, "first recall shows 1x");

    await MEMORY_HANDLERS.search_memory({ query: "wombat-tracker", max_results: 5 });
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.equal(readAccessCount(fact.id), 2, "second recall shows 2x");
  });

  test("internal candidate searches (write gate) do not inflate access_count", async () => {
    process.env.MEMORY_WRITE_GATE_ENABLED = "1";
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const fact = await backend.addFact({
      fact: "Gate candidate marker pelican-quota must not be inflated.",
      category: "technical",
      confidence: 0.9,
    });

    // The write gate searches existing memories for admission candidates;
    // that is a hidden candidate pool, not a surfaced recall.
    await backend.admitWrite({
      fact: "Gate candidate marker pelican-quota now reads differently.",
      category: "technical",
      confidence: 0.9,
    });
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.equal(readAccessCount(fact.id), 0, "admission search must not bump access_count");
  });

  test("recordRecallAccess is bounded and ignores unknown ids", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();
    const result = await backend.recordRecallAccess(["does-not-exist"]);
    assert.equal(result.updated, 0);
    const empty = await backend.recordRecallAccess([]);
    assert.equal(empty.updated, 0);
  });
});
