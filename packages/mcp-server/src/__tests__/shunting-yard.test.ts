import { describe, it, expect } from "vitest";
import { ShuntingYard } from "../shunting-yard.js";

describe("ShuntingYard", () => {
  it("evaluates simple addition", () => {
    expect(ShuntingYard.evaluate("2 + 3")).toBe(5);
  });

  it("respects precedence", () => {
    expect(ShuntingYard.evaluate("2 + 3 * 4")).toBe(14);
  });

  it("handles parentheses", () => {
    expect(ShuntingYard.evaluate("(2 + 3) * 4")).toBe(20);
  });

  it("evaluates exponentiation", () => {
    expect(ShuntingYard.evaluate("2 ^ 3")).toBe(8);
  });

  it("right-associative exponentiation", () => {
    expect(ShuntingYard.evaluate("2 ^ 2 ^ 3")).toBe(256);
  });

  it("toPostfixString converts correctly", () => {
    expect(ShuntingYard.toPostfixString("3 + 4 * 2")).toBe("3 4 2 * +");
  });

  it("tokenize handles decimals", () => {
    const tokens = ShuntingYard.tokenize("3.14 + 2.0");
    expect(tokens[0]).toEqual({ type: "number", value: 3.14 });
  });

  it("complex expression", () => {
    expect(ShuntingYard.evaluate("(1 + 2) * (3 + 4) / 7")).toBeCloseTo(3, 8);
  });
});
