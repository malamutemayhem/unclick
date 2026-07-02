import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir = "";

const EMBEDDING_ENV_KEYS = [
  "MEMORY_EMBEDDINGS_PROVIDER",
  "MEMORY_OPEN_SOURCE_EMBEDDINGS_ENABLED",
  "MEMORY_LOCAL_EMBEDDINGS_ENABLED",
  "MEMORY_OPENAI_EMBEDDINGS_ENABLED",
  "OPENAI_API_KEY",
] as const;

let savedEmbeddingEnv: Record<string, string | undefined> = {};

describe("memory ops coverage: library, conversation, code, status, embedding state", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-ops-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
    savedEmbeddingEnv = {};
    for (const key of EMBEDDING_ENV_KEYS) {
      savedEmbeddingEnv[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    for (const key of EMBEDDING_ENV_KEYS) {
      const value = savedEmbeddingEnv[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  test("list_library returns a compact index sorted by category then title", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    await backend.upsertLibraryDoc({
      slug: "zeta-notes",
      title: "Zeta notes",
      category: "research",
      content: "Long research body that must not appear in the index.",
      tags: ["research"],
    });
    await backend.upsertLibraryDoc({
      slug: "alpha-guide",
      title: "Alpha guide",
      category: "guides",
      content: "Guide body.",
      tags: ["guide", "alpha"],
    });

    const index = await backend.listLibrary() as Array<Record<string, unknown>>;
    assert.equal(index.length, 2);
    assert.deepEqual(index.map((row) => row.slug), ["alpha-guide", "zeta-notes"]);
    for (const row of index) {
      assert.ok(row.title);
      assert.ok(row.category);
      assert.equal("content" in row, false, "index rows must not carry full doc bodies");
    }
  });

  test("get_conversation_detail returns logged turns for one session in time order", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    await backend.logConversation({
      session_id: "session-a",
      role: "user",
      content: "Please review the memory operations.",
      has_code: false,
    });
    await backend.logConversation({
      session_id: "session-a",
      role: "assistant",
      content: "Reviewed. All operations dispatched.",
      has_code: false,
    });
    await backend.logConversation({
      session_id: "session-b",
      role: "user",
      content: "Unrelated session turn.",
      has_code: false,
    });

    const detail = await backend.getConversationDetail("session-a") as Array<Record<string, unknown>>;
    assert.equal(detail.length, 2);
    assert.deepEqual(detail.map((row) => row.role), ["user", "assistant"]);
    assert.equal(detail.some((row) => String(row.content).includes("Unrelated")), false);
  });

  test("store_code archives a snippet and memory_status counts it", async () => {
    const { LocalBackend } = await import("../local.js");
    const backend = new LocalBackend();

    const stored = await backend.storeCode({
      session_id: "session-code",
      language: "typescript",
      filename: "example.ts",
      content: "export const answer = 42;",
      description: "Coverage fixture",
    });
    assert.ok(stored.id);

    await backend.addFact({
      fact: "User keeps durable memory coverage fixtures in the test suite.",
      category: "technical",
      confidence: 0.9,
    });

    const status = await backend.getMemoryStatus() as {
      mode: string;
      data_dir: string;
      table_counts: Record<string, number>;
      fact_decay_tiers: Record<string, number>;
    };
    assert.equal(status.mode, "local");
    assert.equal(status.data_dir, tempDir);
    assert.equal(status.table_counts.code_dumps, 1);
    assert.equal(status.table_counts.extracted_facts, 1);
    assert.ok(status.fact_decay_tiers);
  });

  test("embedding_state reports local provider as ready", async () => {
    process.env.MEMORY_EMBEDDINGS_PROVIDER = "local";
    const { getEmbeddingState, LOCAL_EMBEDDING_MODEL } = await import("../embeddings.js");
    const state = getEmbeddingState();
    assert.equal(state.enabled, true);
    assert.equal(state.provider, "local");
    assert.equal(state.model, LOCAL_EMBEDDING_MODEL);
    assert.equal(state.admin_state, "ready");
  });

  test("embedding_state degrades to missing_credentials when OpenAI is on without a key", async () => {
    process.env.MEMORY_OPENAI_EMBEDDINGS_ENABLED = "1";
    const { getEmbeddingState, OPENAI_EMBEDDING_MODEL } = await import("../embeddings.js");
    const state = getEmbeddingState();
    assert.equal(state.enabled, false);
    assert.equal(state.provider, "openai");
    assert.equal(state.model, OPENAI_EMBEDDING_MODEL);
    assert.equal(state.admin_state, "missing_credentials");
  });

  test("embedding_state defaults to disabled with keyword retrieval still available", async () => {
    const { getEmbeddingState } = await import("../embeddings.js");
    const state = getEmbeddingState();
    assert.equal(state.enabled, false);
    assert.equal(state.provider, "none");
    assert.equal(state.admin_state, "disabled");
    assert.match(state.reason, /keyword retrieval remains available/);
  });
});
