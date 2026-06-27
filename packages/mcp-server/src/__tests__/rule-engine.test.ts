import { describe, it, expect } from "vitest";
import { RuleEngine, allOf, anyOf, not } from "../rule-engine.js";

describe("RuleEngine", () => {
  it("evaluates first matching rule", () => {
    const engine = new RuleEngine<number>();
    engine.addRule({ name: "big", condition: (n) => n > 100, action: () => "big" });
    engine.addRule({ name: "small", condition: (n) => n < 10, action: () => "small" });
    expect(engine.evaluateFirst(5)?.result).toBe("small");
    expect(engine.evaluateFirst(200)?.result).toBe("big");
  });

  it("returns null when no match", () => {
    const engine = new RuleEngine<number>();
    engine.addRule({ name: "big", condition: (n) => n > 100, action: () => "big" });
    expect(engine.evaluateFirst(50)).toBeNull();
  });

  it("respects priority", () => {
    const engine = new RuleEngine<number>();
    engine.addRule({ name: "low", priority: 1, condition: () => true, action: () => "low" });
    engine.addRule({ name: "high", priority: 10, condition: () => true, action: () => "high" });
    expect(engine.evaluateFirst(1)?.result).toBe("high");
  });

  it("evaluates all matching rules", () => {
    const engine = new RuleEngine<number>();
    engine.addRule({ name: "pos", condition: (n) => n > 0, action: () => "pos" });
    engine.addRule({ name: "even", condition: (n) => n % 2 === 0, action: () => "even" });
    const results = engine.evaluateAll(4);
    expect(results.length).toBe(2);
  });

  it("removes rule", () => {
    const engine = new RuleEngine<number>();
    engine.addRule({ name: "a", condition: () => true, action: () => 1 });
    expect(engine.removeRule("a")).toBe(true);
    expect(engine.ruleCount).toBe(0);
  });

  it("lists rules", () => {
    const engine = new RuleEngine<number>();
    engine.addRule({ name: "b", priority: 1, condition: () => true, action: () => 1 });
    engine.addRule({ name: "a", priority: 2, condition: () => true, action: () => 1 });
    expect(engine.listRules()).toEqual(["a", "b"]);
  });
});

describe("combinators", () => {
  it("allOf", () => {
    const check = allOf<number>((n) => n > 0, (n) => n < 10);
    expect(check(5)).toBe(true);
    expect(check(15)).toBe(false);
  });

  it("anyOf", () => {
    const check = anyOf<number>((n) => n > 100, (n) => n < 0);
    expect(check(-1)).toBe(true);
    expect(check(50)).toBe(false);
  });

  it("not", () => {
    const check = not<number>((n) => n > 0);
    expect(check(-1)).toBe(true);
    expect(check(1)).toBe(false);
  });
});
