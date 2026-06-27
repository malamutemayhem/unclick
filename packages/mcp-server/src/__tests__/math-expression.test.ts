import { describe, it, expect } from "vitest";
import { evaluate, validate, tokenize } from "../math-expression.js";

describe("evaluate", () => {
  it("evaluates simple addition", () => {
    expect(evaluate("2 + 3")).toBe(5);
  });

  it("evaluates multiplication", () => {
    expect(evaluate("4 * 5")).toBe(20);
  });

  it("respects operator precedence", () => {
    expect(evaluate("2 + 3 * 4")).toBe(14);
  });

  it("handles parentheses", () => {
    expect(evaluate("(2 + 3) * 4")).toBe(20);
  });

  it("handles exponentiation", () => {
    expect(evaluate("2 ^ 10")).toBe(1024);
  });

  it("handles modulo", () => {
    expect(evaluate("10 % 3")).toBe(1);
  });

  it("evaluates nested parentheses", () => {
    expect(evaluate("((1 + 2) * (3 + 4))")).toBe(21);
  });

  it("evaluates functions", () => {
    expect(evaluate("sqrt(16)")).toBe(4);
    expect(evaluate("abs(-5)")).toBe(5);
  });

  it("evaluates trigonometric functions", () => {
    expect(evaluate("sin(0)")).toBeCloseTo(0);
    expect(evaluate("cos(0)")).toBeCloseTo(1);
  });

  it("evaluates constants", () => {
    expect(evaluate("pi")).toBeCloseTo(Math.PI);
    expect(evaluate("e")).toBeCloseTo(Math.E);
  });

  it("evaluates variables", () => {
    expect(evaluate("x + y", { x: 10, y: 20 })).toBe(30);
  });

  it("evaluates complex expression", () => {
    expect(evaluate("2 * (3 + 4) - 1")).toBe(13);
  });

  it("handles decimal numbers", () => {
    expect(evaluate("1.5 + 2.5")).toBe(4);
  });

  it("right associative exponentiation", () => {
    expect(evaluate("2 ^ 3 ^ 2")).toBe(512);
  });
});

describe("validate", () => {
  it("validates correct expression", () => {
    expect(validate("2 + 3").valid).toBe(true);
  });

  it("detects invalid characters", () => {
    expect(validate("2 & 3").valid).toBe(false);
  });
});

describe("tokenize", () => {
  it("tokenizes simple expression", () => {
    const tokens = tokenize("2 + 3");
    expect(tokens).toHaveLength(3);
    expect(tokens[0]).toEqual({ type: "number", value: "2" });
    expect(tokens[1]).toEqual({ type: "op", value: "+" });
  });
});
