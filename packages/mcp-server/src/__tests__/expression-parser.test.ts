import { describe, it, expect } from "vitest";
import { evaluate, tokenize, toRPN } from "../expression-parser.js";

describe("expression-parser", () => {
  it("evaluates simple addition", () => {
    expect(evaluate("2 + 3")).toBe(5);
  });

  it("respects operator precedence", () => {
    expect(evaluate("2 + 3 * 4")).toBe(14);
  });

  it("handles parentheses", () => {
    expect(evaluate("(2 + 3) * 4")).toBe(20);
  });

  it("handles nested parentheses", () => {
    expect(evaluate("((1 + 2) * (3 + 4))")).toBe(21);
  });

  it("handles subtraction and division", () => {
    expect(evaluate("10 - 4 / 2")).toBe(8);
  });

  it("handles exponentiation", () => {
    expect(evaluate("2 ^ 3")).toBe(8);
  });

  it("right-associates exponentiation", () => {
    expect(evaluate("2 ^ 2 ^ 3")).toBe(256);
  });

  it("handles modulo", () => {
    expect(evaluate("10 % 3")).toBe(1);
  });

  it("handles decimals", () => {
    expect(evaluate("1.5 + 2.5")).toBe(4);
  });

  it("tokenize splits correctly", () => {
    const tokens = tokenize("(1+2)");
    expect(tokens.length).toBe(5);
    expect(tokens[0]).toEqual({ type: "paren", value: "(" });
    expect(tokens[1]).toEqual({ type: "number", value: 1 });
  });

  it("toRPN converts to postfix", () => {
    const tokens = tokenize("3 + 4 * 2");
    const rpn = toRPN(tokens);
    const values = rpn.map((t) => t.value);
    expect(values).toEqual([3, 4, 2, "*", "+"]);
  });

  it("throws on mismatched parentheses", () => {
    expect(() => evaluate("(1 + 2")).toThrow("Mismatched");
  });
});
