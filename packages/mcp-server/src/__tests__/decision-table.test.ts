import { describe, it, expect } from "vitest";
import { DecisionTable } from "../decision-table.js";

describe("DecisionTable", () => {
  it("addRule and evaluate finds matching action", () => {
    const dt = new DecisionTable<string>();
    dt.addRule({ conditions: { weather: "rain" }, action: "umbrella" });
    dt.addRule({ conditions: { weather: "sun" }, action: "sunscreen" });
    expect(dt.evaluate({ weather: "rain" })).toBe("umbrella");
  });

  it("evaluate returns undefined when no match", () => {
    const dt = new DecisionTable<string>();
    dt.addRule({ conditions: { x: 1 }, action: "a" });
    expect(dt.evaluate({ x: 2 })).toBeUndefined();
  });

  it("evaluate respects priority", () => {
    const dt = new DecisionTable<string>();
    dt.addRule({ conditions: { level: "high" }, action: "alert", priority: 1 });
    dt.addRule({ conditions: { level: "high" }, action: "log", priority: 10 });
    expect(dt.evaluate({ level: "high" })).toBe("log");
  });

  it("evaluateAll returns all matching actions", () => {
    const dt = new DecisionTable<string>();
    dt.addRule({ conditions: { type: "a" }, action: "x" });
    dt.addRule({ conditions: { type: "a" }, action: "y" });
    expect(dt.evaluateAll({ type: "a" })).toEqual(["x", "y"]);
  });

  it("removeRule removes by index", () => {
    const dt = new DecisionTable<string>();
    dt.addRule({ conditions: { a: 1 }, action: "first" });
    dt.addRule({ conditions: { b: 2 }, action: "second" });
    expect(dt.removeRule(0)).toBe(true);
    expect(dt.size()).toBe(1);
  });

  it("findConflicts detects rules with same conditions but different actions", () => {
    const dt = new DecisionTable<string>();
    dt.addRule({ conditions: { x: 1 }, action: "a" });
    dt.addRule({ conditions: { x: 1 }, action: "b" });
    dt.addRule({ conditions: { x: 2 }, action: "c" });
    expect(dt.findConflicts()).toEqual([[0, 1]]);
  });

  it("clear empties all rules", () => {
    const dt = new DecisionTable<string>();
    dt.addRule({ conditions: { a: 1 }, action: "x" });
    dt.clear();
    expect(dt.size()).toBe(0);
  });

  it("validate returns completeness and conflict count", () => {
    const dt = new DecisionTable<string>();
    dt.addRule({ conditions: { x: 1 }, action: "a" });
    dt.addRule({ conditions: { x: 1 }, action: "b" });
    const v = dt.validate();
    expect(v.complete).toBe(true);
    expect(v.conflictCount).toBe(1);
  });

  it("addRules adds multiple rules at once", () => {
    const dt = new DecisionTable<number>();
    dt.addRules([
      { conditions: { a: true }, action: 1 },
      { conditions: { b: true }, action: 2 },
    ]);
    expect(dt.size()).toBe(2);
  });
});
