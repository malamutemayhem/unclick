import { describe, it, expect } from "vitest";
import {
  evaluateSignal,
  evaluateExpression,
  planToolAvailability,
  type AvailabilityContext,
} from "../tool-availability.js";

const baseCtx: AvailabilityContext = {
  env: { STRIPE_SECRET_KEY: "sk_test_123", NODE_ENV: "production" },
  connectedCredentials: new Set(["stripe", "github"]),
  featureFlags: new Set(["memory_v2"]),
};

describe("evaluateSignal", () => {
  it("always is always available", () => {
    expect(evaluateSignal({ kind: "always" }, baseCtx)).toBeNull();
  });

  it("env passes when variable exists", () => {
    expect(evaluateSignal({ kind: "env", variable: "STRIPE_SECRET_KEY" }, baseCtx)).toBeNull();
  });

  it("env fails when variable missing", () => {
    const diag = evaluateSignal({ kind: "env", variable: "MISSING_KEY" }, baseCtx);
    expect(diag).not.toBeNull();
    expect(diag!.message).toContain("MISSING_KEY");
  });

  it("credential passes when connected", () => {
    expect(evaluateSignal({ kind: "credential", connector: "stripe" }, baseCtx)).toBeNull();
  });

  it("credential fails when not connected", () => {
    const diag = evaluateSignal({ kind: "credential", connector: "slack" }, baseCtx);
    expect(diag).not.toBeNull();
    expect(diag!.message).toContain("slack");
  });

  it("feature_flag passes when enabled", () => {
    expect(evaluateSignal({ kind: "feature_flag", flag: "memory_v2" }, baseCtx)).toBeNull();
  });

  it("feature_flag fails when disabled", () => {
    const diag = evaluateSignal({ kind: "feature_flag", flag: "beta_feature" }, baseCtx);
    expect(diag).not.toBeNull();
    expect(diag!.message).toContain("beta_feature");
  });
});

describe("evaluateExpression", () => {
  it("allOf passes when all pass", () => {
    const expr = {
      allOf: [
        { kind: "credential" as const, connector: "stripe" },
        { kind: "env" as const, variable: "STRIPE_SECRET_KEY" },
      ],
    };
    expect(evaluateExpression(expr, baseCtx)).toEqual([]);
  });

  it("allOf fails when any fails", () => {
    const expr = {
      allOf: [
        { kind: "credential" as const, connector: "stripe" },
        { kind: "credential" as const, connector: "slack" },
      ],
    };
    const diags = evaluateExpression(expr, baseCtx);
    expect(diags).toHaveLength(1);
    expect(diags[0].message).toContain("slack");
  });

  it("anyOf passes when at least one passes", () => {
    const expr = {
      anyOf: [
        { kind: "credential" as const, connector: "slack" },
        { kind: "credential" as const, connector: "stripe" },
      ],
    };
    expect(evaluateExpression(expr, baseCtx)).toEqual([]);
  });

  it("anyOf fails when all fail", () => {
    const expr = {
      anyOf: [
        { kind: "credential" as const, connector: "slack" },
        { kind: "credential" as const, connector: "discord" },
      ],
    };
    const diags = evaluateExpression(expr, baseCtx);
    expect(diags.length).toBeGreaterThan(0);
  });
});

describe("planToolAvailability", () => {
  it("splits tools into available and unavailable", () => {
    const tools = [
      { name: "stripe_customers", availability: { kind: "credential" as const, connector: "stripe" } },
      { name: "slack_send", availability: { kind: "credential" as const, connector: "slack" } },
      { name: "load_memory" },
    ];
    const plan = planToolAvailability(tools, baseCtx);
    expect(plan.available).toContain("stripe_customers");
    expect(plan.available).toContain("load_memory");
    expect(plan.unavailable).toHaveLength(1);
    expect(plan.unavailable[0].name).toBe("slack_send");
    expect(plan.unavailable[0].reasons[0]).toContain("slack");
  });

  it("treats tools without availability as always available", () => {
    const tools = [{ name: "search_memory" }];
    const plan = planToolAvailability(tools, baseCtx);
    expect(plan.available).toEqual(["search_memory"]);
  });
});
