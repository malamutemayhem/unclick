import { describe, expect, it } from "vitest";
import { trendSlopGate } from "./trendslop-gate.js";
import type { GateContext } from "../types.js";

const baseContext: GateContext = {
  action: {
    class: "send",
    raw: "",
    tool: "boardroom.answer",
    targetEnv: "dev",
  },
  environment: "dev",
  autonomyLevel: "interactive",
  now: Date.UTC(2026, 5, 3, 0, 0, 0),
};

function context(raw: string, parsed?: unknown): GateContext {
  return {
    ...baseContext,
    action: {
      ...baseContext.action,
      raw,
      parsed,
    },
  };
}

describe("TrendSlopGate", () => {
  it("allows non-answer actions", () => {
    const result = trendSlopGate({
      ...baseContext,
      action: { class: "filesystem", raw: "delete docs/example.md", tool: "filesystem.write" },
    });

    expect(result.verdict).toBe("allow");
    expect(result.ruleId).toBe("trendslop.not_answer_surface");
  });

  it("rewrites over-agreeable advice without a counterpoint", () => {
    const result = trendSlopGate(context(
      "You are absolutely right. This is a brilliant idea and I recommend launching the AI-first platform play now.",
    ));

    expect(result.verdict).toBe("rewrite");
    expect(result.ruleId).toBe("trendslop.sycophancy_rewrite");
  });

  it("rewrites trend-heavy generic advice without context", () => {
    const result = trendSlopGate(context(
      "The strategy should leverage an agentic ecosystem flywheel to unlock scale and thought leadership.",
    ));

    expect(result.verdict).toBe("rewrite");
    expect(result.ruleId).toBe("trendslop.generic_trend_rewrite");
  });

  it("asks before high-risk advice with no grounding", () => {
    const result = trendSlopGate(context(
      "I recommend deploying the production change and deleting the old data today.",
    ));

    expect(result.verdict).toBe("ask");
    expect(result.ruleId).toBe("trendslop.high_risk_context_missing");
  });

  it("allows grounded advice with tradeoffs and evidence language", () => {
    const result = trendSlopGate(context(
      "Based on the receipt and customer data, I would push back on launching today. The tradeoff is speed versus safety, and the main risk is weak evidence.",
    ));

    expect(result.verdict).toBe("allow");
    expect(result.ruleId).toBe("trendslop.grounded_enough");
  });

  it("honors AnswerPass quality risk signals", () => {
    const result = trendSlopGate(context(
      "This looks good and I recommend the roadmap.",
      {
        answer_quality_risks: {
          sycophancy: "high",
          context_specificity: "low",
        },
      },
    ));

    expect(result.verdict).toBe("rewrite");
    expect(result.ruleId).toBe("trendslop.sycophancy_rewrite");
  });
});
