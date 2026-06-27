import { describe, it, expect } from "vitest";
import { PolicyEngine, createPolicy } from "../policy-engine.js";

interface ReqContext { user: string; action: string; resource: string }

describe("PolicyEngine", () => {
  it("evaluates matching rule", () => {
    const engine = new PolicyEngine<ReqContext>();
    engine.addRule({ name: "admin-allow", condition: (c) => c.user === "admin", effect: "allow" });
    const decision = engine.evaluate({ user: "admin", action: "delete", resource: "file" });
    expect(decision.allowed).toBe(true);
    expect(decision.matchedRule).toBe("admin-allow");
  });

  it("uses default when no rule matches", () => {
    const engine = new PolicyEngine<ReqContext>();
    engine.setDefault("deny");
    const decision = engine.evaluate({ user: "nobody", action: "read", resource: "x" });
    expect(decision.allowed).toBe(false);
  });

  it("respects priority", () => {
    const engine = new PolicyEngine<ReqContext>();
    engine.addRule({ name: "deny-all", condition: () => true, effect: "deny", priority: 1 });
    engine.addRule({ name: "admin-allow", condition: (c) => c.user === "admin", effect: "allow", priority: 10 });
    const decision = engine.evaluate({ user: "admin", action: "delete", resource: "x" });
    expect(decision.allowed).toBe(true);
  });

  it("removeRule works", () => {
    const engine = new PolicyEngine<ReqContext>();
    engine.addRule({ name: "r1", condition: () => true, effect: "allow" });
    expect(engine.removeRule("r1")).toBe(true);
    expect(engine.ruleCount).toBe(0);
  });

  it("evaluateAll shows all rule statuses", () => {
    const engine = new PolicyEngine<ReqContext>();
    engine.addRule({ name: "a", condition: (c) => c.user === "admin", effect: "allow" });
    engine.addRule({ name: "b", condition: () => true, effect: "deny" });
    const results = engine.evaluateAll({ user: "admin", action: "r", resource: "x" });
    expect(results.length).toBe(2);
    expect(results.find((r) => r.rule === "a")?.matched).toBe(true);
    expect(results.find((r) => r.rule === "b")?.matched).toBe(true);
  });

  it("ruleNames lists rules", () => {
    const engine = new PolicyEngine<ReqContext>();
    engine.addRule({ name: "x", condition: () => true, effect: "allow" });
    engine.addRule({ name: "y", condition: () => true, effect: "deny" });
    expect(engine.ruleNames().sort()).toEqual(["x", "y"]);
  });

  it("clear removes all", () => {
    const engine = new PolicyEngine<ReqContext>();
    engine.addRule({ name: "x", condition: () => true, effect: "allow" });
    engine.clear();
    expect(engine.ruleCount).toBe(0);
  });
});

describe("createPolicy", () => {
  it("builds engine from config", () => {
    const engine = createPolicy<ReqContext>([
      { name: "r", condition: (c) => c.action === "read", effect: "allow" },
    ], "deny");
    expect(engine.evaluate({ user: "x", action: "read", resource: "y" }).allowed).toBe(true);
    expect(engine.evaluate({ user: "x", action: "write", resource: "y" }).allowed).toBe(false);
  });
});
