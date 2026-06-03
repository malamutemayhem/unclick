import { describe, expect, it } from "vitest";
import { evaluateGates, evaluateGatesWithModes } from "./policy-engine";
import type { Gate, GateContext, GateResult, GateVerdict } from "./types";

const ctx: GateContext = {
  action: { class: "shell", raw: "ls -la", tool: "test.tool" },
  environment: "dev",
  autonomyLevel: "interactive",
  now: 1_700_000_000_000,
};

function stubGate(name: string, verdict: GateVerdict, ruleId: string): Gate {
  const gate: Gate = () => ({
    gate: name,
    verdict,
    ruleId,
    reason: `${name} returned ${verdict}`,
    evidence: [],
  });
  Object.defineProperty(gate, "name", { value: name });
  return gate;
}

describe("evaluateGates", () => {
  it("returns allow for an empty gate list", () => {
    const decision = evaluateGates([], ctx);
    expect(decision.verdict).toBe("allow");
    expect(decision.results).toEqual([]);
    expect(decision.deciding.ruleId).toBe("policy.no_gates");
  });

  it("allows when every gate allows", () => {
    const decision = evaluateGates(
      [stubGate("A", "allow", "a.ok"), stubGate("B", "allow", "b.ok")],
      ctx,
    );
    expect(decision.verdict).toBe("allow");
    expect(decision.results).toHaveLength(2);
  });

  it("lets deny beat ask beats allow (most restrictive wins)", () => {
    const decision = evaluateGates(
      [
        stubGate("A", "allow", "a.ok"),
        stubGate("B", "ask", "b.ask"),
        stubGate("C", "deny", "c.deny"),
      ],
      ctx,
    );
    expect(decision.verdict).toBe("deny");
    expect(decision.deciding.gate).toBe("C");
    expect(decision.deciding.ruleId).toBe("c.deny");
  });

  it("lets ask beat allow and rewrite", () => {
    const decision = evaluateGates(
      [
        stubGate("A", "allow", "a.ok"),
        stubGate("B", "rewrite", "b.rewrite"),
        stubGate("C", "ask", "c.ask"),
      ],
      ctx,
    );
    expect(decision.verdict).toBe("ask");
    expect(decision.deciding.gate).toBe("C");
  });

  it("treats a throwing gate as ask (defense-in-depth, never propagates)", () => {
    const throwing: Gate = () => {
      throw new Error("boom");
    };
    Object.defineProperty(throwing, "name", { value: "Boom" });

    let decision: ReturnType<typeof evaluateGates> | undefined;
    expect(() => {
      decision = evaluateGates([stubGate("A", "allow", "a.ok"), throwing], ctx);
    }).not.toThrow();

    expect(decision?.verdict).toBe("ask");
    const thrown = decision?.results.find((r) => r.ruleId === "policy.gate_threw");
    expect(thrown?.gate).toBe("Boom");
    expect(thrown?.verdict).toBe("ask");
  });

  it("treats a malformed gate result as ask", () => {
    const malformed = (() => ({ nonsense: true })) as unknown as Gate;
    const decision = evaluateGates([malformed], ctx);
    expect(decision.verdict).toBe("ask");
    expect(decision.deciding.ruleId).toBe("policy.gate_invalid_result");
  });

  it("keeps the earliest gate that reached the peak verdict as deciding", () => {
    const decision = evaluateGates(
      [stubGate("A", "deny", "a.first"), stubGate("B", "deny", "b.second")],
      ctx,
    );
    expect(decision.verdict).toBe("deny");
    expect(decision.deciding.ruleId).toBe("a.first");
  });

  it("collects one result per gate in order", () => {
    const results: GateResult[] = evaluateGates(
      [stubGate("A", "allow", "a"), stubGate("B", "ask", "b"), stubGate("C", "allow", "c")],
      ctx,
    ).results;
    expect(results.map((r) => r.gate)).toEqual(["A", "B", "C"]);
  });

  it("skips gates that are explicitly off", () => {
    const decision = evaluateGatesWithModes(
      [stubGate("TrendSlopGate", "deny", "trendslop.bad"), stubGate("GitGate", "allow", "git.ok")],
      ctx,
      { gateModes: { TrendSlopGate: "off" } },
    );

    expect(decision.verdict).toBe("allow");
    expect(decision.results.map((r) => r.gate)).toEqual(["GitGate"]);
  });

  it("logs watch-mode gates without letting them block", () => {
    const decision = evaluateGatesWithModes(
      [stubGate("TrendSlopGate", "rewrite", "trendslop.sycophancy_rewrite")],
      ctx,
      { gateModes: { TrendSlopGate: "watch" } },
    );

    expect(decision.verdict).toBe("allow");
    expect(decision.results[0]).toMatchObject({
      gate: "TrendSlopGate",
      verdict: "allow",
      ruleId: "trendslop.sycophancy_rewrite.watch",
    });
    expect(decision.results[0].evidence).toContain("would_verdict:rewrite");
  });
});
