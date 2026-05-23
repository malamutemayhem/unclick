import { describe, expect, it } from "vitest";

import { evaluateOrchestratorContextReadGate } from "../memory/session-state.js";
import { MCP_SERVER_INSTRUCTIONS, VISIBLE_TOOLS } from "../server.js";

describe("Orchestrator tether contract", () => {
  it("keeps the continuity instructions compact, forceful, and multi-path", () => {
    expect(MCP_SERVER_INSTRUCTIONS).toContain("ORCHESTRATOR TETHER CONTRACT");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("Receipt-first rule");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("save_conversation_turn");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("unclick_save_conversation_turn");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("admin_conversation_turn_ingest");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("read_orchestrator_context");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("Log -> Read -> Decide");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("CONTEXT_UNREAD:");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("Partial capture path");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("UNTETHERED:");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("First real Orchestrator receipt wins");
    expect(MCP_SERVER_INSTRUCTIONS.length).toBeLessThan(3800);
  });

  it("advertises the primary save tool to seats", () => {
    const saveTurnTool = VISIBLE_TOOLS.find((tool) => tool.name === "save_conversation_turn");

    expect(saveTurnTool?.description).toContain("primary receipt path");
    expect(saveTurnTool?.description).toContain("UNTETHERED");
  });

  it("advertises the read-before-decide tool to seats", () => {
    const readContextTool = VISIBLE_TOOLS.find((tool) => tool.name === "read_orchestrator_context");

    expect(readContextTool?.description).toContain("Log -> Read -> Decide");
    expect(readContextTool?.description).toContain("blocks until a prior save_conversation_turn receipt");
    expect(readContextTool?.description).toContain("CONTEXT_UNREAD");
  });

  it("blocks context reads before a saved turn receipt exists", () => {
    const result = evaluateOrchestratorContextReadGate([], {
      session_id: "strict-session",
      q: "fresh wake",
    }, new Date("2026-05-22T01:00:00.000Z"));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe("CONTEXT_UNREAD");
      expect(result.missing).toContain("session_id='strict-session'");
      expect(result.guidance).toContain("save_conversation_turn");
    }
  });

  it("allows context reads only after a fresh same-session receipt", () => {
    const savedAt = new Date("2026-05-22T01:00:00.000Z");

    const allowed = evaluateOrchestratorContextReadGate([
      { sessionId: "strict-session", receiptId: "receipt-1", savedAt },
    ], {
      session_id: "strict-session",
    }, new Date("2026-05-22T01:05:00.000Z"));

    const mismatched = evaluateOrchestratorContextReadGate([
      { sessionId: "other-session", receiptId: "receipt-1", savedAt },
    ], {
      session_id: "strict-session",
    }, new Date("2026-05-22T01:05:00.000Z"));

    const stale = evaluateOrchestratorContextReadGate([
      { sessionId: "strict-session", receiptId: "receipt-1", savedAt },
    ], {
      session_id: "strict-session",
    }, new Date("2026-05-22T01:45:00.000Z"));

    expect(allowed.ok).toBe(true);
    expect(mismatched.ok).toBe(false);
    expect(stale.ok).toBe(false);
  });
});
