import { describe, expect, it } from "vitest";
import {
  budgetDecision,
  budgetStatus,
  estimateSeatsApiCostUsd,
  findSeatsApiPricing,
  normalizeSeatsApiBudgetCap,
  normalizeSeatsApiUsageRow,
  summarizeSeatsApiUsage,
} from "./seatsApiUsage";

describe("seats API usage accounting", () => {
  it("estimates provider cost from token counts and cached input", () => {
    expect(findSeatsApiPricing("anthropic", "claude-sonnet-4.6")?.inputUsdPerMillion).toBe(3);
    expect(estimateSeatsApiCostUsd({
      provider: "anthropic",
      model: "claude-sonnet-4.6",
      inputTokens: 1_000_000,
      cachedInputTokens: 200_000,
      outputTokens: 100_000,
    })).toBe(3.96);
  });

  it("uses supplied cost when a caller logs exact billing", () => {
    expect(normalizeSeatsApiUsageRow({
      provider: "openai",
      inputTokens: 10,
      outputTokens: 20,
      estimatedCostUsd: 1.234567,
    }).estimatedCostUsd).toBe(1.2346);
  });

  it("summarizes spend and budget state by provider", () => {
    const summary = summarizeSeatsApiUsage({
      periodStart: "2026-06-01T00:00:00.000Z",
      periodEnd: "2026-07-01T00:00:00.000Z",
      rows: [
        { provider: "openai", model: "gpt-5.4-mini", inputTokens: 1_000_000, outputTokens: 1_000_000 },
        { provider: "openai", model: "gpt-5.4-mini", inputTokens: 500_000, outputTokens: 0 },
      ],
      budgets: [{ provider: "openai", monthlyBudgetUsd: 5, warnAtPercent: 80, throttleAtPercent: 100 }],
    });

    expect(summary.totals.totalTokens).toBe(2_500_000);
    expect(summary.providers[0].provider).toBe("openai");
    expect(summary.providers[0].estimatedCostUsd).toBe(5.625);
    expect(summary.providers[0].budgetStatus).toBe("over");
  });

  it("classifies budget status thresholds", () => {
    expect(budgetStatus(0, null)).toBe("none");
    expect(budgetStatus(4, { provider: "openai", monthlyBudgetUsd: 10, warnAtPercent: 80, throttleAtPercent: 100 })).toBe("ok");
    expect(budgetStatus(8, { provider: "openai", monthlyBudgetUsd: 10, warnAtPercent: 80, throttleAtPercent: 100 })).toBe("warning");
    expect(budgetStatus(10, { provider: "openai", monthlyBudgetUsd: 10, warnAtPercent: 80, throttleAtPercent: 100 })).toBe("over");
  });

  it("normalizes budget caps and makes projected throttle decisions", () => {
    const budget = normalizeSeatsApiBudgetCap({
      provider: "OpenAI",
      monthlyBudgetUsd: "10.12345",
      warnAtPercent: "75.54",
      throttleAtPercent: "90",
    });

    expect(budget).toEqual({
      provider: "openai",
      monthlyBudgetUsd: 10.1235,
      warnAtPercent: 75.5,
      throttleAtPercent: 90,
    });
    expect(budgetDecision(7, budget, 0.8)).toBe("warn");
    expect(budgetDecision(8.8, budget, 0.4)).toBe("throttle");
  });
});
