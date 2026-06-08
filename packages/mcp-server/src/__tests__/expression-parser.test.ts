import { describe, it, expect } from "vitest";
import { evaluate, tokenize, toPostfix } from "../expression-parser.js";

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

  it("handles division and subtraction", () => {
    expect(evaluate("10 - 6 / 2")).toBe(7);
  });

  it("handles exponentiation", () => {
    expect(evaluate("2 ^ 3")).toBe(8);
  });

  it("handles modulo", () => {
    expect(evaluate("10 % 3")).toBe(1);
  });

  it("tokenizes correctly", () => {
    const tokens = tokenize("12 + 3.5");
    expect(tokens).toEqual([
      { type: "number", value: 12 },
      { type: "op", value: "+" },
      { type: "number", value: 3.5 },
    ]);
  });

  it("toPostfix converts infix", () => {
    const tokens = tokenize("2 + 3 * 4");
    const postfix = toPostfix(tokens);
    expect(postfix.map((t) => t.value)).toEqual([2, 3, 4, "*", "+"]);
  });

  it("throws on invalid characters", () => {
    expect(() => tokenize("2 & 3")).toThrow("Unexpected character");
  });
});
