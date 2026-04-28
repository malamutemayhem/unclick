import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { runAgentChecks, type JudgeSampler } from "../runner/agent.js";
import type { Pack } from "../types.js";

describe("runAgentChecks", () => {
  const config = { supabaseUrl: "http://unused", serviceRoleKey: "unused" };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [
        { check_id: "NULL" },
        { check_id: "FALSE" },
        { check_id: "ZERO" },
        { check_id: "EMPTY" },
      ],
      text: async () => "",
    } as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("includes explicit falsy expected values in the judge prompt", async () => {
    const userPrompts: string[] = [];
    const sampler: JudgeSampler = async ({ user }) => {
      userPrompts.push(user);
      return { text: JSON.stringify({ verdict: "check", reasoning: "ok" }), model: "test-model" };
    };
    const pack: Pack = {
      id: "falsy-expected",
      name: "Falsy Expected",
      version: "0.1.0",
      description: "",
      items: [
        { id: "NULL", title: "null", category: "agent", severity: "low", check_type: "agent", tags: [], profiles: ["standard"], expected: null },
        { id: "FALSE", title: "false", category: "agent", severity: "low", check_type: "agent", tags: [], profiles: ["standard"], expected: false },
        { id: "ZERO", title: "zero", category: "agent", severity: "low", check_type: "agent", tags: [], profiles: ["standard"], expected: 0 },
        { id: "EMPTY", title: "empty", category: "agent", severity: "low", check_type: "agent", tags: [], profiles: ["standard"], expected: "" },
      ],
    };

    await runAgentChecks(config, "run-1", "https://example.test", pack, "standard", undefined, sampler);

    expect(userPrompts).toHaveLength(4);
    expect(userPrompts).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Expected: null"),
        expect.stringContaining("Expected: false"),
        expect.stringContaining("Expected: 0"),
        expect.stringContaining('Expected: ""'),
      ]),
    );
  });
});
