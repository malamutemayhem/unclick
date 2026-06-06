import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { classifyMemoryClass } from "../typed-memory.js";

let tempDir = "";

function readRows<T>(table: string): T[] {
  const file = path.join(tempDir, `${table}.json`);
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as T[];
}

describe("typed memory routing", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-typed-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    delete process.env.MEMORY_TYPED_SPLIT_ENABLED;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("classifies memory classes deterministically", () => {
    const logText = [
      "2026-06-04T02:00:00Z Boardroom status",
      "STATE DELTA: lane 9 published the contract.",
      "Next: create a draft PR and route long logs as episodes.",
    ].join("\n");

    assert.equal(classifyMemoryClass({ text: logText, category: "project" }), "episodic");
    assert.equal(classifyMemoryClass({ text: "Always check Boardroom before edits.", category: "workflow" }), "procedural");
    assert.equal(classifyMemoryClass({ text: "Follow up with the coordinator.", category: "task" }), "task");
    assert.equal(classifyMemoryClass({ text: "Chris prefers compact memory first.", category: "preference", memory_class: "semantic" }), "semantic");
  });

  test("keeps existing local fact writes unchanged when the flag is off", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const logText = "2026-06-04T02:00:00Z Boardroom status\nSTATE DELTA: typed split pending.";
    const result = await backend.addFact({
      fact: logText,
      category: "project",
      confidence: 0.9,
    });

    assert.equal(result.id.length > 0, true);
    assert.equal(readRows("extracted_facts").length, 1);
    assert.equal(readRows("session_events").length, 0);
  });

  test("routes long timestamped logs to local session events when enabled", async () => {
    process.env.MEMORY_TYPED_SPLIT_ENABLED = "1";
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const logText = [
      "2026-06-04T02:00:00Z Boardroom status",
      "STATE DELTA: Worker 9 published the typed memory contract.",
      "Next: create a draft PR and keep long logs out of fact search.",
    ].join("\n");

    const result = await backend.addFact({
      fact: logText,
      category: "project",
      confidence: 0.9,
      source_session_id: "session-1",
    }) as { id: string; routed_to_episode?: boolean; memory_class?: string };

    assert.equal(result.routed_to_episode, true);
    assert.equal(result.memory_class, "episodic");
    assert.equal(readRows("extracted_facts").length, 0);

    const events = await backend.listSessionEvents({ query: "typed memory contract", limit: 5 }) as Array<{
      id: string;
      memory_class: string;
      content: string;
    }>;
    assert.equal(events.length, 1);
    assert.equal(events[0]?.id, result.id);
    assert.equal(events[0]?.memory_class, "episodic");

    const searchResults = await backend.searchMemory("typed memory contract", 5) as unknown[];
    assert.equal(searchResults.length, 0);
  });

  test("round-trips non-episodic memory_class on local facts", async () => {
    process.env.MEMORY_TYPED_SPLIT_ENABLED = "1";
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const result = await backend.addFact({
      fact: "UnClick memory should follow the typed split workflow.",
      category: "workflow",
      confidence: 0.95,
      memory_class: "procedural",
    });

    const rows = readRows<{ id: string; memory_class?: string }>("extracted_facts");
    assert.equal(rows.find((row) => row.id === result.id)?.memory_class, "procedural");

    const facts = await backend.searchFacts("typed split workflow") as Array<{ id: string; memory_class?: string }>;
    assert.equal(facts[0]?.id, result.id);
  });
});
