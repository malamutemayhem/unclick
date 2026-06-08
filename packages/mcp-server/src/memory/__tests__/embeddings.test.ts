import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  embedTextLocal,
  getEmbeddingState,
  isOpenAIEmbeddingsEnabled,
  EMBEDDING_DIMS,
  LOCAL_EMBEDDING_MODEL,
  OPENAI_EMBEDDING_MODEL,
} from "../embeddings.js";

const ENV_KEYS = [
  "MEMORY_OPENAI_EMBEDDINGS_ENABLED",
  "MEMORY_EMBEDDINGS_PROVIDER",
  "MEMORY_OPEN_SOURCE_EMBEDDINGS_ENABLED",
  "MEMORY_LOCAL_EMBEDDINGS_ENABLED",
  "OPENAI_API_KEY",
] as const;

let saved: Record<string, string | undefined> = {};

function saveEnv(): void {
  saved = {};
  for (const k of ENV_KEYS) saved[k] = process.env[k];
}

function restoreEnv(): void {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
}

function clearEnv(): void {
  for (const k of ENV_KEYS) delete process.env[k];
}

describe("isOpenAIEmbeddingsEnabled", () => {
  beforeEach(saveEnv);
  afterEach(restoreEnv);

  test("returns true for '1'", () => {
    process.env.MEMORY_OPENAI_EMBEDDINGS_ENABLED = "1";
    assert.equal(isOpenAIEmbeddingsEnabled(), true);
  });

  test("returns true for 'true' (case-insensitive)", () => {
    process.env.MEMORY_OPENAI_EMBEDDINGS_ENABLED = "True";
    assert.equal(isOpenAIEmbeddingsEnabled(), true);
  });

  test("returns false when unset", () => {
    delete process.env.MEMORY_OPENAI_EMBEDDINGS_ENABLED;
    assert.equal(isOpenAIEmbeddingsEnabled(), false);
  });

  test("returns false for '0'", () => {
    process.env.MEMORY_OPENAI_EMBEDDINGS_ENABLED = "0";
    assert.equal(isOpenAIEmbeddingsEnabled(), false);
  });
});

describe("getEmbeddingState", () => {
  beforeEach(() => { saveEnv(); clearEnv(); });
  afterEach(restoreEnv);

  test("returns disabled when no flags are set", () => {
    const state = getEmbeddingState();
    assert.equal(state.enabled, false);
    assert.equal(state.provider, "none");
    assert.equal(state.admin_state, "disabled");
    assert.equal(state.model, null);
  });

  test("enables local provider via MEMORY_EMBEDDINGS_PROVIDER=local", () => {
    process.env.MEMORY_EMBEDDINGS_PROVIDER = "local";
    const state = getEmbeddingState();
    assert.equal(state.enabled, true);
    assert.equal(state.provider, "local");
    assert.equal(state.model, LOCAL_EMBEDDING_MODEL);
    assert.equal(state.admin_state, "ready");
  });

  test("enables local provider via 'open-source' alias", () => {
    process.env.MEMORY_EMBEDDINGS_PROVIDER = "open-source";
    assert.equal(getEmbeddingState().provider, "local");
  });

  test("enables local provider via 'hash' alias", () => {
    process.env.MEMORY_EMBEDDINGS_PROVIDER = "hash";
    assert.equal(getEmbeddingState().provider, "local");
  });

  test("enables local provider via MEMORY_OPEN_SOURCE_EMBEDDINGS_ENABLED flag", () => {
    process.env.MEMORY_OPEN_SOURCE_EMBEDDINGS_ENABLED = "1";
    assert.equal(getEmbeddingState().provider, "local");
  });

  test("enables local provider via MEMORY_LOCAL_EMBEDDINGS_ENABLED flag", () => {
    process.env.MEMORY_LOCAL_EMBEDDINGS_ENABLED = "true";
    assert.equal(getEmbeddingState().provider, "local");
  });

  test("enables OpenAI when flag set and key present", () => {
    process.env.MEMORY_OPENAI_EMBEDDINGS_ENABLED = "1";
    process.env.OPENAI_API_KEY = "sk-test";
    const state = getEmbeddingState();
    assert.equal(state.enabled, true);
    assert.equal(state.provider, "openai");
    assert.equal(state.model, OPENAI_EMBEDDING_MODEL);
    assert.equal(state.admin_state, "ready");
  });

  test("reports missing_credentials when OpenAI flag set but no key", () => {
    process.env.MEMORY_OPENAI_EMBEDDINGS_ENABLED = "1";
    const state = getEmbeddingState();
    assert.equal(state.enabled, false);
    assert.equal(state.provider, "openai");
    assert.equal(state.admin_state, "missing_credentials");
  });

  test("local takes priority over OpenAI when both are set", () => {
    process.env.MEMORY_EMBEDDINGS_PROVIDER = "local";
    process.env.MEMORY_OPENAI_EMBEDDINGS_ENABLED = "1";
    process.env.OPENAI_API_KEY = "sk-test";
    assert.equal(getEmbeddingState().provider, "local");
  });

  test("always reports correct dimensions", () => {
    assert.equal(getEmbeddingState().dimensions, EMBEDDING_DIMS);
    process.env.MEMORY_EMBEDDINGS_PROVIDER = "local";
    assert.equal(getEmbeddingState().dimensions, EMBEDDING_DIMS);
  });
});

describe("embedTextLocal", () => {
  test("returns a vector of the correct dimension", () => {
    const vec = embedTextLocal("Chris prefers TypeScript for all agent projects at UnClick");
    assert.ok(vec !== null);
    assert.equal(vec!.length, EMBEDDING_DIMS);
  });

  test("returns normalized vector (unit length)", () => {
    const vec = embedTextLocal("Chris prefers TypeScript for all agent projects at UnClick")!;
    const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
    assert.ok(Math.abs(norm - 1.0) < 0.001, `norm should be ~1.0, got ${norm}`);
  });

  test("is deterministic (same input produces same output)", () => {
    const input = "Memory deduplication is critical for UnClick agents";
    const vec1 = embedTextLocal(input);
    const vec2 = embedTextLocal(input);
    assert.deepEqual(vec1, vec2);
  });

  test("different texts produce different vectors", () => {
    const vec1 = embedTextLocal("Chris prefers TypeScript for all agent projects at UnClick");
    const vec2 = embedTextLocal("The weather in Sydney is warm and sunny today in December");
    assert.ok(vec1 !== null && vec2 !== null);
    const identical = vec1!.every((v, i) => v === vec2![i]);
    assert.equal(identical, false);
  });

  test("returns null for empty text", () => {
    assert.equal(embedTextLocal(""), null);
    assert.equal(embedTextLocal("   "), null);
  });

  test("returns null for text shorter than 24 characters", () => {
    assert.equal(embedTextLocal("short text here"), null);
  });

  test("returns null for heartbeat patterns", () => {
    assert.equal(embedTextLocal("heartbeat_last_state: queue is empty and nothing changed"), null);
    assert.equal(embedTextLocal("<heartbeat>runner check complete and all clear</heartbeat>"), null);
  });

  test("returns null for transient signal patterns", () => {
    assert.equal(embedTextLocal("dont_notify because nothing changed in the queue"), null);
    assert.equal(embedTextLocal("unclick healthy and all systems operational now"), null);
    assert.equal(embedTextLocal("no new signals detected in the monitoring sweep"), null);
    assert.equal(embedTextLocal("user is caught up with all their notifications"), null);
  });

  test("includes trigrams for words of 5+ characters", () => {
    const vec1 = embedTextLocal("agent memory deduplication system for production use");
    const vec2 = embedTextLocal("agxxx memory deduplication system for production use");
    assert.ok(vec1 !== null && vec2 !== null);
    const same = vec1!.every((v, i) => v === vec2![i]);
    assert.equal(same, false, "trigram differences should change the vector");
  });
});
