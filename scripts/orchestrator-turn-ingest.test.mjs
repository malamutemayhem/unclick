import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

const apiSource = await readFile("api/memory-admin.ts", "utf8");

describe("orchestrator subscription turn ingest", () => {
  it("exposes a safe endpoint that writes direct turns to chat_messages", () => {
    assert.match(apiSource, /case "admin_conversation_turn_ingest"/);
    assert.match(apiSource, /from\("chat_messages"\)[\s\S]*insert\(\{/);
    assert.match(apiSource, /status:\s*"completed"/);
    assert.match(apiSource, /ingest_source:\s*"subscription_turn"/);
  });

  it("validates role, length, and redacts content before storage", () => {
    assert.match(apiSource, /role must be user, assistant, or system/);
    assert.match(apiSource, /content\.length > 12_000/);
    assert.match(apiSource, /const safeContent = redactSensitive\(content\)/);
    assert.match(apiSource, /redacted:\s*safeContent !== content/);
  });
});
