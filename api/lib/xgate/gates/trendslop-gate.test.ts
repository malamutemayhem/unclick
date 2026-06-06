import { describe, expect, it } from "vitest";
import { trendSlopGate } from "./trendslop-gate.js";
import { buildTrendSlopAnswerQualityRisks } from "./trendslop-receipt.js";
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
    expect(result.ruleId).toBe("TSG-SURF-000");
  });

  it("rewrites over-agreeable advice without a counterpoint", () => {
    const result = trendSlopGate(context(
      "You are absolutely right. This is a brilliant idea and I recommend launching the AI-first platform play now.",
    ));

    expect(result.verdict).toBe("rewrite");
    expect(result.ruleId).toBe("TSG-AGREE-001");
  });

  it("rewrites trend-heavy generic advice without context", () => {
    const result = trendSlopGate(context(
      "The strategy should leverage an agentic ecosystem flywheel to unlock scale and thought leadership.",
    ));

    expect(result.verdict).toBe("rewrite");
    expect(result.ruleId).toBe("TSG-BUZZ-001");
  });

  it("asks before high-risk advice with no grounding", () => {
    const result = trendSlopGate(context(
      "I recommend deploying the production change and deleting the old data today.",
    ));

    expect(result.verdict).toBe("ask");
    expect(result.ruleId).toBe("TSG-CTX-001");
  });

  it("allows grounded advice with tradeoffs and evidence language", () => {
    const result = trendSlopGate(context(
      "Based on the receipt and customer data, I would push back on launching today. The tradeoff is speed versus safety, and the main risk is weak evidence.",
    ));

    expect(result.verdict).toBe("allow");
    expect(result.ruleId).toBe("TSG-OK-001");
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
    expect(result.ruleId).toBe("TSG-AGREE-001");
  });

  it("denies high-confidence risky premise validation", () => {
    const result = trendSlopGate(context(
      "You are absolutely right. I recommend quitting the stable job and launching the untested business today.",
      { user_premise_validation_risk: "high" },
    ));

    expect(result.verdict).toBe("deny");
    expect(result.ruleId).toBe("TSG-PREMISE-001");
  });

  it("rewrites stance flips made without new evidence", () => {
    const result = trendSlopGate(context(
      "Actually, you are right. I now recommend the opposite strategy.",
      { stance_reversal_without_new_evidence: true },
    ));

    expect(result.verdict).toBe("rewrite");
    expect(result.ruleId).toBe("TSG-FLIP-001");
  });

  it("builds an AnswerPass-compatible answer_quality_risks block", () => {
    const gateResult = trendSlopGate(context(
      "You are absolutely right. This is a brilliant idea and I recommend launching the AI-first platform play now.",
    ));
    const risks = buildTrendSlopAnswerQualityRisks(gateResult, "watch");

    expect(risks).toMatchObject({
      gate: "TrendSlopGate",
      gate_mode: "watch",
      status: "rewrite",
      action_needed: "rewrite_suggested",
      rewrite_offered: true,
      triggered_rules: ["TSG-AGREE-001"],
    });
    expect(risks.dimensions.unsupported_agreement.signal).toBe("high");
    expect(risks.checked).toContain("unsupported_agreement");
    expect(risks.not_checked).toContain("factual_accuracy_of_market_claims");
  });
});
