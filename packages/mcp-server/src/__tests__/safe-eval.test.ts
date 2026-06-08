import { describe, it, expect } from "vitest";
import { evaluate } from "../safe-eval.js";

describe("evaluate", () => {
  it("basic arithmetic", () => {
    expect(evaluate("2 + 3")).toBe(5);
    expect(evaluate("10 - 4")).toBe(6);
    expect(evaluate("3 * 4")).toBe(12);
    expect(evaluate("10 / 2")).toBe(5);
  });

  it("operator precedence", () => {
    expect(evaluate("2 + 3 * 4")).toBe(14);
    expect(evaluate("(2 + 3) * 4")).toBe(20);
  });

  it("power operator", () => {
    expect(evaluate("2 ** 3")).toBe(8);
  });

  it("modulo", () => {
    expect(evaluate("10 % 3")).toBe(1);
  });

  it("unary minus", () => {
    expect(evaluate("-5 + 3")).toBe(-2);
  });

  it("variables", () => {
    expect(evaluate("x + y", { x: 3, y: 7 })).toBe(10);
  });

  it("functions", () => {
    expect(evaluate("sqrt(16)")).toBe(4);
    expect(evaluate("max(1, 5, 3)")).toBe(5);
    expect(evaluate("abs(-7)")).toBe(7);
  });

  it("nested expressions", () => {
    expect(evaluate("sqrt(abs(-16))")).toBe(4);
  });

  it("division by zero throws", () => {
    expect(() => evaluate("1 / 0")).toThrow("Division by zero");
  });

  it("unknown variable throws", () => {
    expect(() => evaluate("x + 1")).toThrow("Unknown variable");
  });

  it("unknown function throws", () => {
    expect(() => evaluate("evil()")).toThrow("Unknown function");
  });
});
