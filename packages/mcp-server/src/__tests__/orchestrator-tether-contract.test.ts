import { describe, expect, it } from "vitest";

import { MCP_SERVER_INSTRUCTIONS, VISIBLE_TOOLS } from "../server.js";

describe("Orchestrator tether contract", () => {
  it("keeps the continuity instructions compact, forceful, and multi-path", () => {
    expect(MCP_SERVER_INSTRUCTIONS).toContain("ORCHESTRATOR TETHER CONTRACT");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("save_conversation_turn");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("admin_conversation_turn_ingest");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("UNTETHERED:");
    expect(MCP_SERVER_INSTRUCTIONS).toContain("First real Orchestrator proof wins");
    expect(MCP_SERVER_INSTRUCTIONS.length).toBeLessThan(3100);
  });

  it("advertises the primary save tool to seats", () => {
    const saveTurnTool = VISIBLE_TOOLS.find((tool) => tool.name === "save_conversation_turn");

    expect(saveTurnTool?.description).toContain("primary proof path");
    expect(saveTurnTool?.description).toContain("UNTETHERED");
  });
});
