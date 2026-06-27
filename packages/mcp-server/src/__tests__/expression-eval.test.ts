import { describe, it, expect } from "vitest";
import { evaluate, compile } from "../expression-eval.js";

describe("evaluate", () => {
  it("basic arithmetic", () => {
    expect(evaluate("2 + 3")).toBe(5);
    expect(evaluate("10 - 4")).toBe(6);
    expect(evaluate("3 * 4")).toBe(12);
    expect(evaluate("15 / 3")).toBe(5);
  });

  it("operator precedence", () => {
    expect(evaluate("2 + 3 * 4")).toBe(14);
    expect(evaluate("(2 + 3) * 4")).toBe(20);
  });

  it("exponentiation", () => {
    expect(evaluate("2 ^ 3")).toBe(8);
  });

  it("modulo", () => {
    expect(evaluate("10 % 3")).toBe(1);
  });

  it("unary negation", () => {
    expect(evaluate("-5 + 3")).toBe(-2);
  });

  it("variables", () => {
    expect(evaluate("x + y", { x: 10, y: 20 })).toBe(30);
  });

  it("built-in constants", () => {
    expect(evaluate("PI")).toBeCloseTo(Math.PI);
    expect(evaluate("E")).toBeCloseTo(Math.E);
  });

  it("function calls", () => {
    expect(evaluate("sqrt(16)")).toBe(4);
    expect(evaluate("abs(-5)")).toBe(5);
    expect(evaluate("max(3, 7)")).toBe(7);
    expect(evaluate("min(3, 7)")).toBe(3);
  });

  it("nested functions", () => {
    expect(evaluate("sqrt(pow(3, 2) + pow(4, 2))")).toBe(5);
  });

  it("throws on unknown variable", () => {
    expect(() => evaluate("z")).toThrow("Unknown variable");
  });

  it("throws on unknown function", () => {
    expect(() => evaluate("foo(1)")).toThrow("Unknown function");
  });
});

describe("compile", () => {
  it("returns reusable function", () => {
    const fn = compile("x * 2 + 1");
    expect(fn({ x: 5 })).toBe(11);
    expect(fn({ x: 10 })).toBe(21);
  });
});
