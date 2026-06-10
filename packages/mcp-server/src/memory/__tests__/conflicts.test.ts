import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  detectConflicts,
  buildConflictWarning,
  KNOWN_CONFLICTS,
  type ConflictDef,
} from "../conflicts.js";

describe("detectConflicts", () => {
  test("returns empty for an empty tool list", () => {
    assert.deepEqual(detectConflicts([]), []);
  });

  test("returns empty when only non-memory tools are present", () => {
    assert.deepEqual(
      detectConflicts(["github_action", "slack_send", "exa_search"]),
      [],
    );
  });

  test("ignores UnClick's own prefixed tools", () => {
    assert.deepEqual(
      detectConflicts(["unclick_search", "unclick_call", "memory.add_fact"]),
      [],
    );
  });

  test("ignores UnClick's legacy tool names in the own-tools set", () => {
    assert.deepEqual(
      detectConflicts(["get_startup_context", "add_fact", "search_memory"]),
      [],
    );
  });

  test("detects Mem0 by exact tool name", () => {
    const conflicts = detectConflicts(["add-memory", "github_action"]);
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0].name, "Mem0");
  });

  test("detects Zep by prefix pattern", () => {
    const conflicts = detectConflicts(["zep_memory_store", "slack_send"]);
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0].name, "Zep");
  });

  test("detects Hindsight by prefix pattern", () => {
    const conflicts = detectConflicts(["hindsight_recall"]);
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0].name, "Hindsight");
  });

  test("detects multiple conflicts simultaneously", () => {
    const conflicts = detectConflicts([
      "add-memory",
      "zep_memory",
      "hindsight_save",
    ]);
    const names = conflicts.map((c) => c.name);
    assert.ok(names.includes("Mem0"));
    assert.ok(names.includes("Zep"));
    assert.ok(names.includes("Hindsight"));
    assert.equal(conflicts.length, 3);
  });

  test("does not duplicate a conflict when multiple tools match the same one", () => {
    const conflicts = detectConflicts(["add-memory", "search-memories"]);
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0].name, "Mem0");
  });

  test("is case-insensitive", () => {
    const conflicts = detectConflicts(["ADD-MEMORY", "ZEP_Memory"]);
    const names = conflicts.map((c) => c.name);
    assert.ok(names.includes("Mem0"));
    assert.ok(names.includes("Zep"));
  });

  test("handles null and undefined entries in tool list gracefully", () => {
    const conflicts = detectConflicts([
      null as unknown as string,
      undefined as unknown as string,
      "add-memory",
    ]);
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0].name, "Mem0");
  });

  test("detects Basic Memory by prefix", () => {
    const conflicts = detectConflicts(["basic_memory_save"]);
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0].name, "Basic Memory");
  });

  test("detects LangMem by prefix", () => {
    const conflicts = detectConflicts(["langmem_store"]);
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0].name, "LangMem");
  });

  test("detects mcp-memory-service by exact tool name", () => {
    const conflicts = detectConflicts(["save_memory"]);
    assert.equal(conflicts.length, 1);
    assert.equal(conflicts[0].name, "mcp-memory-service");
  });
});

describe("buildConflictWarning", () => {
  const mem0: ConflictDef = KNOWN_CONFLICTS.find((c) => c.name === "Mem0")!;
  const zep: ConflictDef = KNOWN_CONFLICTS.find((c) => c.name === "Zep")!;

  test("returns null for empty conflicts", () => {
    assert.equal(buildConflictWarning([]), null);
  });

  test("returns a warning string for a single conflict", () => {
    const warning = buildConflictWarning([mem0]);
    assert.ok(warning !== null);
    assert.ok(warning!.includes("Mem0"));
    assert.ok(warning!.includes("Heads up"));
  });

  test("includes removal instructions for the relevant conflict", () => {
    const warning = buildConflictWarning([mem0])!;
    assert.ok(warning.includes("claude mcp remove mem0"));
  });

  test("escalates tone after 3+ detections", () => {
    const normal = buildConflictWarning([mem0], 0)!;
    const escalated = buildConflictWarning([mem0], 3)!;
    assert.ok(normal.includes("we noticed"));
    assert.ok(escalated.includes("still connected"));
    assert.ok(escalated.includes("still causing duplicates"));
  });

  test("suppresses warning after 7+ detections", () => {
    assert.equal(buildConflictWarning([mem0], 7), null);
    assert.equal(buildConflictWarning([mem0], 10), null);
  });

  test("lists multiple conflict names in the warning", () => {
    const warning = buildConflictWarning([mem0, zep])!;
    assert.ok(warning.includes("Mem0"));
    assert.ok(warning.includes("Zep"));
  });

  test("includes safe-tools reassurance", () => {
    const warning = buildConflictWarning([mem0])!;
    assert.ok(warning.includes("GitHub, Exa, browser"));
    assert.ok(warning.includes("don't overlap"));
  });
});
