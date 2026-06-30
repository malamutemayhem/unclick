import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir = "";
const originalFetch = globalThis.fetch;
let apiKey = "";

describe("save_conversation_turn hosted Orchestrator mirror", () => {
  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-orch-save-mirror-"));
    apiKey = `uc_test_mirror_key_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
    process.env.MEMORY_BACKEND = "local";
    process.env.UNCLICK_API_KEY = apiKey;
    process.env.UNCLICK_MEMORY_BASE_URL = "https://memory.example";
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    delete process.env.MEMORY_BACKEND;
    delete process.env.UNCLICK_API_KEY;
    delete process.env.UNCLICK_MEMORY_BASE_URL;
    globalThis.fetch = originalFetch;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
    apiKey = "";
  });

  test("mirrors local conversation turns to hosted ingest with a receipt", async () => {
    const calls: Array<{ url: string; init: RequestInit | undefined }> = [];
    globalThis.fetch = async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, init });
      if (url.includes("action=config")) {
        return new Response(JSON.stringify({ configured: false }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(
        JSON.stringify({
          turn_id: "hosted-turn-1",
          conversation_log_id: "hosted-log-1",
          session_id: "session-1",
          role: "assistant",
          created_at: "2026-06-30T00:00:00.000Z",
          redacted: false,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const { MEMORY_HANDLERS } = await import("../handlers.js");
    const result = (await MEMORY_HANDLERS.log_conversation({
      session_id: "session-1",
      role: "assistant",
      content: "Hosted Orchestrator mirror proof.",
      has_code: false,
    })) as {
      logged: true;
      hosted_orchestrator_receipt?: {
        turn_id: string | null;
        conversation_log_id: string | null;
      };
    };

    assert.equal(result.logged, true);
    assert.deepEqual(result.hosted_orchestrator_receipt, {
      turn_id: "hosted-turn-1",
      conversation_log_id: "hosted-log-1",
    });
    const ingestCalls = calls.filter((call) => call.url.includes("admin_conversation_turn_ingest"));
    assert.equal(ingestCalls.length, 1);
    assert.equal(
      ingestCalls[0]?.url,
      "https://memory.example/api/memory-admin?action=admin_conversation_turn_ingest",
    );
    assert.equal((ingestCalls[0]?.init?.headers as Record<string, string>)?.Authorization, `Bearer ${apiKey}`);

    const body = JSON.parse(String(ingestCalls[0]?.init?.body)) as Record<string, unknown>;
    assert.equal(body.session_id, "session-1");
    assert.equal(body.role, "assistant");
    assert.equal(body.content, "Hosted Orchestrator mirror proof.");
    assert.equal(body.source_app, "unclick-mcp-save_conversation_turn");
  });

  test("mirrors MCP tool turns as hosted system turns", async () => {
    let body: Record<string, unknown> | null = null;
    globalThis.fetch = async (_input: string | URL | Request, init?: RequestInit) => {
      const url = String(_input);
      if (url.includes("action=config")) {
        return new Response(JSON.stringify({ configured: false }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      body = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({ turn_id: "hosted-turn-2", conversation_log_id: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const { MEMORY_HANDLERS } = await import("../handlers.js");
    await MEMORY_HANDLERS.log_conversation({
      session_id: "session-tool",
      role: "tool",
      content: "Tool result summary.",
      has_code: false,
    });

    assert.equal(body?.role, "system");
    assert.equal(body?.source_app, "unclick-mcp-tool-turn");
  });
});
