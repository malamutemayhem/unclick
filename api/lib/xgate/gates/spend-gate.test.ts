import { describe, expect, it } from "vitest";
import { createSpendGate, spendGate } from "./spend-gate.js";
import type { GateContext } from "../types.js";

const baseCtx: GateContext = {
  action: {
    class: "spend",
    raw: "run paid model batch",
    tool: "test.spend",
    estimatedSpendUsd: 0.75,
  },
  environment: "dev",
  autonomyLevel: "interactive",
  now: Date.parse("2026-06-02T00:00:00.000Z"),
};

describe("spendGate", () => {
  it("denies an action over the default budget", () => {
    const decision = spendGate({
      ...baseCtx,
      action: { ...baseCtx.action, estimatedSpendUsd: 1.25 },
    });

    expect(decision.verdict).toBe("deny");
    expect(decision.ruleId).toBe("spend.over_budget");
  });

  it("allows an action within the default budget", () => {
    const decision = spendGate(baseCtx);
    expect(decision.verdict).toBe("allow");
    expect(decision.ruleId).toBe("spend.within_budget");
  });

  it("uses a configured budget", () => {
    const gate = createSpendGate({ maxSpendUsd: 2 });
    const decision = gate({
      ...baseCtx,
      action: { ...baseCtx.action, estimatedSpendUsd: 1.5 },
    });

    expect(decision.verdict).toBe("allow");
    expect(decision.ruleId).toBe("spend.within_budget");
  });

  it("asks when a spend action has no estimate", () => {
    const decision = spendGate({
      ...baseCtx,
      action: {
        class: "spend",
        raw: "run paid model batch",
        tool: "test.spend",
      },
    });

    expect(decision.verdict).toBe("ask");
    expect(decision.ruleId).toBe("spend.missing_estimate");
  });

  it("allows unrelated actions without estimated spend", () => {
    const decision = spendGate({
      ...baseCtx,
      action: {
        class: "shell",
        raw: "npm test",
        tool: "test.shell",
      },
    });

    expect(decision.verdict).toBe("allow");
    expect(decision.ruleId).toBe("spend.no_estimate");
  });
});

