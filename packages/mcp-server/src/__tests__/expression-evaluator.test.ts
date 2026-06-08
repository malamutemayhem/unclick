import { describe, it, expect } from "vitest";
import { evaluate, validate } from "../expression-evaluator.js";

describe("expression-evaluator", () => {
  it("evaluates basic arithmetic", () => {
    expect(evaluate("2 + 3")).toBe(5);
    expect(evaluate("10 - 4")).toBe(6);
    expect(evaluate("3 * 4")).toBe(12);
    expect(evaluate("15 / 3")).toBe(5);
  });

  it("handles operator precedence", () => {
    expect(evaluate("2 + 3 * 4")).toBe(14);
    expect(evaluate("(2 + 3) * 4")).toBe(20);
  });

  it("handles exponentiation", () => {
    expect(evaluate("2 ^ 3")).toBe(8);
    expect(evaluate("2 ^ 3 ^ 2")).toBe(512); // right-associative
  });

  it("handles modulo", () => {
    expect(evaluate("10 % 3")).toBe(1);
  });

  it("handles unary minus", () => {
    expect(evaluate("-5")).toBe(-5);
    expect(evaluate("-5 + 3")).toBe(-2);
    expect(evaluate("3 * -2")).toBe(-6);
  });

  it("handles nested parentheses", () => {
    expect(evaluate("((2 + 3) * (4 - 1))")).toBe(15);
  });

  it("evaluates built-in functions", () => {
    expect(evaluate("abs(-5)")).toBe(5);
    expect(evaluate("sqrt(16)")).toBe(4);
    expect(evaluate("max(3, 7)")).toBe(7);
    expect(evaluate("min(3, 7)")).toBe(3);
  });

  it("evaluates constants", () => {
    expect(evaluate("PI")).toBeCloseTo(Math.PI);
    expect(evaluate("E")).toBeCloseTo(Math.E);
  });

  it("evaluates with variables", () => {
    expect(evaluate("x + y", { x: 3, y: 4 })).toBe(7);
    expect(evaluate("x * x + 1", { x: 5 })).toBe(26);
  });

  it("evaluates custom functions", () => {
    const result = evaluate("double(5)", {}, { double: (x) => x * 2 });
    expect(result).toBe(10);
  });

  it("handles decimal numbers", () => {
    expect(evaluate("1.5 + 2.5")).toBe(4);
  });

  it("throws on unknown variable", () => {
    expect(() => evaluate("x + 1")).toThrow("Unknown variable");
  });

  it("throws on unknown function", () => {
    expect(() => evaluate("foo(1)")).toThrow("Unknown function");
  });

  it("throws on unbalanced parens", () => {
    expect(() => evaluate("(2 + 3")).toThrow();
  });
});

describe("validate", () => {
  it("validates correct expressions", () => {
    expect(validate("2 + 3").valid).toBe(true);
  });

  it("rejects invalid expressions", () => {
    expect(validate("2 +").valid).toBe(false);
  });
});
