import { describe, it, expect } from "vitest";
import { evaluate } from "../expression-eval.js";

describe("evaluate", () => {
  it("evaluates simple addition", () => {
    expect(evaluate("2 + 3")).toBe(5);
  });

  it("evaluates subtraction", () => {
    expect(evaluate("10 - 4")).toBe(6);
  });

  it("evaluates multiplication", () => {
    expect(evaluate("3 * 4")).toBe(12);
  });

  it("evaluates division", () => {
    expect(evaluate("10 / 2")).toBe(5);
  });

  it("evaluates modulo", () => {
    expect(evaluate("7 % 3")).toBe(1);
  });

  it("evaluates exponentiation", () => {
    expect(evaluate("2 ** 3")).toBe(8);
  });

  it("respects operator precedence", () => {
    expect(evaluate("2 + 3 * 4")).toBe(14);
  });

  it("respects parentheses", () => {
    expect(evaluate("(2 + 3) * 4")).toBe(20);
  });

  it("handles unary minus", () => {
    expect(evaluate("-5 + 3")).toBe(-2);
  });

  it("handles nested parentheses", () => {
    expect(evaluate("((2 + 3) * (4 - 1))")).toBe(15);
  });

  it("handles decimal numbers", () => {
    expect(evaluate("1.5 + 2.5")).toBe(4);
  });

  it("evaluates variables", () => {
    expect(evaluate("x + y", { x: 10, y: 20 })).toBe(30);
  });

  it("complex expression with variables", () => {
    expect(evaluate("(x ** 2) + (y ** 2)", { x: 3, y: 4 })).toBe(25);
  });

  it("throws on undefined variable", () => {
    expect(() => evaluate("x + 1")).toThrow("Undefined variable");
  });

  it("throws on division by zero", () => {
    expect(() => evaluate("1 / 0")).toThrow("Division by zero");
  });
});
