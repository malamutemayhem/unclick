import { afterEach, describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  sessionState,
  setClientInfo,
  setInstructionsSent,
  markPromptUsed,
  markResourceRead,
  markContextLoaded,
  recordToolCall,
  snapshotSessionState,
} from "../session-state.js";

function resetState(): void {
  sessionState.clientInfo = null;
  sessionState.instructionsSent = false;
  sessionState.contextLoaded = false;
  sessionState.contextLoadMethod = null;
  sessionState.promptUsed = false;
  sessionState.resourcesRead = [];
  sessionState.firstToolCall = null;
  sessionState.toolsCalledBeforeContext = 0;
  sessionState.logged = false;
}

describe("session-state", () => {
  afterEach(resetState);

  describe("setClientInfo", () => {
    test("sets name and version from provided info", () => {
      setClientInfo({ name: "cursor", version: "1.2.3" });
      assert.deepEqual(sessionState.clientInfo, { name: "cursor", version: "1.2.3" });
    });

    test("defaults name and version to 'unknown' when omitted", () => {
      setClientInfo({});
      assert.deepEqual(sessionState.clientInfo, { name: "unknown", version: "unknown" });
    });

    test("does nothing when info is undefined", () => {
      setClientInfo(undefined);
      assert.equal(sessionState.clientInfo, null);
    });
  });

  describe("setInstructionsSent", () => {
    test("records that instructions were sent", () => {
      setInstructionsSent(true);
      assert.equal(sessionState.instructionsSent, true);
    });
  });

  describe("markPromptUsed", () => {
    test("marks context loaded via prompt for load-memory", () => {
      markPromptUsed("load-memory");
      assert.equal(sessionState.promptUsed, true);
      assert.equal(sessionState.contextLoaded, true);
      assert.equal(sessionState.contextLoadMethod, "prompt");
    });

    test("marks context loaded via prompt for load_memory (underscore variant)", () => {
      markPromptUsed("load_memory");
      assert.equal(sessionState.promptUsed, true);
      assert.equal(sessionState.contextLoaded, true);
      assert.equal(sessionState.contextLoadMethod, "prompt");
    });

    test("ignores unrelated prompt names", () => {
      markPromptUsed("some-other-prompt");
      assert.equal(sessionState.promptUsed, false);
      assert.equal(sessionState.contextLoaded, false);
    });

    test("does not overwrite contextLoadMethod if context was already loaded", () => {
      markContextLoaded("instructions");
      markPromptUsed("load-memory");
      assert.equal(sessionState.promptUsed, true);
      assert.equal(sessionState.contextLoadMethod, "instructions");
    });
  });

  describe("markResourceRead", () => {
    test("tracks a resource URI", () => {
      markResourceRead("memory://startup");
      assert.deepEqual(sessionState.resourcesRead, ["memory://startup"]);
    });

    test("deduplicates repeated URIs", () => {
      markResourceRead("memory://startup");
      markResourceRead("memory://startup");
      assert.equal(sessionState.resourcesRead.length, 1);
    });

    test("marks context loaded for memory:// URIs", () => {
      markResourceRead("memory://startup");
      assert.equal(sessionState.contextLoaded, true);
      assert.equal(sessionState.contextLoadMethod, "resource");
    });

    test("does not mark context loaded for non-memory URIs", () => {
      markResourceRead("file:///tmp/readme.md");
      assert.equal(sessionState.contextLoaded, false);
    });

    test("ignores empty URI", () => {
      markResourceRead("");
      assert.deepEqual(sessionState.resourcesRead, []);
    });
  });

  describe("markContextLoaded", () => {
    test("sets contextLoaded and method on first call", () => {
      markContextLoaded("manual");
      assert.equal(sessionState.contextLoaded, true);
      assert.equal(sessionState.contextLoadMethod, "manual");
    });

    test("is idempotent - does not overwrite on second call", () => {
      markContextLoaded("instructions");
      markContextLoaded("manual");
      assert.equal(sessionState.contextLoadMethod, "instructions");
    });
  });

  describe("recordToolCall", () => {
    test("records the first tool call name", () => {
      recordToolCall("search_memory");
      assert.equal(sessionState.firstToolCall, "search_memory");
    });

    test("does not overwrite firstToolCall on subsequent calls", () => {
      recordToolCall("search_memory");
      recordToolCall("save_fact");
      assert.equal(sessionState.firstToolCall, "search_memory");
    });

    test("counts tools called before context is loaded", () => {
      recordToolCall("save_fact");
      recordToolCall("search_memory");
      assert.equal(sessionState.toolsCalledBeforeContext, 2);
    });

    test("stops counting after context is loaded", () => {
      recordToolCall("save_fact");
      markContextLoaded("manual");
      recordToolCall("search_memory");
      assert.equal(sessionState.toolsCalledBeforeContext, 1);
    });

    test("treats get_startup_context as context-loading via tool_description", () => {
      recordToolCall("get_startup_context");
      assert.equal(sessionState.contextLoaded, true);
      assert.equal(sessionState.contextLoadMethod, "tool_description");
      assert.equal(sessionState.toolsCalledBeforeContext, 0);
    });

    test("get_startup_context does not overwrite an existing contextLoadMethod", () => {
      markContextLoaded("instructions");
      recordToolCall("get_startup_context");
      assert.equal(sessionState.contextLoadMethod, "instructions");
    });
  });

  describe("snapshotSessionState", () => {
    test("returns a shallow copy that is independent of the original", () => {
      setClientInfo({ name: "test", version: "1.0" });
      markResourceRead("memory://startup");
      const snapshot = snapshotSessionState();
      assert.deepEqual(snapshot.clientInfo, { name: "test", version: "1.0" });
      assert.deepEqual(snapshot.resourcesRead, ["memory://startup"]);

      snapshot.resourcesRead.push("memory://extra");
      assert.equal(sessionState.resourcesRead.length, 1);
    });
  });
});
