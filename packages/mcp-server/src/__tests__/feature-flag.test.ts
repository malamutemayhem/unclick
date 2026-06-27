import { describe, it, expect } from "vitest";
import { FeatureFlagService } from "../feature-flag.js";

describe("FeatureFlagService", () => {
  it("registers and evaluates a disabled flag", () => {
    const svc = new FeatureFlagService();
    svc.register("dark-mode", false, "Dark mode toggle");
    expect(svc.evaluate("dark-mode")).toBe(false);
    expect(svc.isEnabled("dark-mode")).toBe(false);
  });

  it("enables and disables flags", () => {
    const svc = new FeatureFlagService();
    svc.register("feat", "off");
    expect(svc.enable("feat")).toBe(true);
    expect(svc.isEnabled("feat")).toBe(true);
    expect(svc.evaluate("feat")).toBe(true);
    expect(svc.disable("feat")).toBe(true);
    expect(svc.evaluate("feat")).toBe("off");
  });

  it("returns false for enable/disable on unknown flag", () => {
    const svc = new FeatureFlagService();
    expect(svc.enable("nope")).toBe(false);
    expect(svc.disable("nope")).toBe(false);
  });

  it("evaluates percentage rollout", () => {
    const svc = new FeatureFlagService();
    svc.register("rollout", false);
    svc.setPercentage("rollout", 100);
    expect(svc.evaluate("rollout", { userId: "user1", attributes: {} })).toBe(true);

    svc.setPercentage("rollout", 0);
    expect(svc.evaluate("rollout", { userId: "user1", attributes: {} })).toBe(false);
  });

  it("setPercentage clamps values", () => {
    const svc = new FeatureFlagService();
    svc.register("f", false);
    svc.setPercentage("f", 150);
    const flags = svc.listFlags();
    const f = flags.find((fl) => fl.key === "f");
    expect(f?.percentage).toBe(100);
  });

  it("evaluates rules with eq operator", () => {
    const svc = new FeatureFlagService();
    svc.register("premium", false);
    svc.enable("premium");
    svc.addRule("premium", { attribute: "plan", operator: "eq", value: "pro", result: "full-access" });
    const result = svc.evaluate("premium", { attributes: { plan: "pro" } });
    expect(result).toBe("full-access");
  });

  it("evaluates rules with ne operator", () => {
    const svc = new FeatureFlagService();
    svc.register("block", false);
    svc.enable("block");
    svc.addRule("block", { attribute: "region", operator: "ne", value: "US", result: "blocked" });
    expect(svc.evaluate("block", { attributes: { region: "EU" } })).toBe("blocked");
    expect(svc.evaluate("block", { attributes: { region: "US" } })).toBe(true);
  });

  it("evaluates rules with in operator", () => {
    const svc = new FeatureFlagService();
    svc.register("beta", false);
    svc.enable("beta");
    svc.addRule("beta", { attribute: "userId", operator: "in", value: ["a", "b", "c"], result: "beta-access" });
    expect(svc.evaluate("beta", { attributes: { userId: "b" } })).toBe("beta-access");
    expect(svc.evaluate("beta", { attributes: { userId: "z" } })).toBe(true);
  });

  it("evaluates rules with gt and lt operators", () => {
    const svc = new FeatureFlagService();
    svc.register("age-gate", false);
    svc.enable("age-gate");
    svc.addRule("age-gate", { attribute: "age", operator: "gt", value: 18, result: "adult" });
    expect(svc.evaluate("age-gate", { attributes: { age: 21 } })).toBe("adult");
    expect(svc.evaluate("age-gate", { attributes: { age: 15 } })).toBe(true);
  });

  it("evaluates rules with contains operator", () => {
    const svc = new FeatureFlagService();
    svc.register("email-check", false);
    svc.enable("email-check");
    svc.addRule("email-check", { attribute: "email", operator: "contains", value: "@corp.com", result: "internal" });
    expect(svc.evaluate("email-check", { attributes: { email: "dev@corp.com" } })).toBe("internal");
    expect(svc.evaluate("email-check", { attributes: { email: "user@gmail.com" } })).toBe(true);
  });

  it("user overrides take precedence", () => {
    const svc = new FeatureFlagService();
    svc.register("feat", false);
    svc.enable("feat");
    svc.setOverride("feat", "user1", "custom-value");
    expect(svc.evaluate("feat", { userId: "user1", attributes: {} })).toBe("custom-value");
    expect(svc.evaluate("feat", { userId: "user2", attributes: {} })).toBe(true);
  });

  it("lists flags and counts", () => {
    const svc = new FeatureFlagService();
    svc.register("a", false);
    svc.register("b", true);
    expect(svc.flagCount()).toBe(2);
    expect(svc.listFlags().length).toBe(2);
  });

  it("tracks evaluation log", () => {
    const svc = new FeatureFlagService();
    svc.register("f", false);
    svc.evaluate("f", { userId: "u1", attributes: {} });
    svc.evaluate("f");
    const log = svc.getEvaluationLog();
    expect(log.length).toBe(2);
    expect(log[0].flag).toBe("f");
    expect(log[0].userId).toBe("u1");
  });

  it("returns undefined for unknown flag evaluation", () => {
    const svc = new FeatureFlagService();
    expect(svc.evaluate("nope")).toBeUndefined();
  });
});
