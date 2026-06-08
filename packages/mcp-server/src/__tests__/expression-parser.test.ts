import { describe, it, expect } from "vitest";
import { evaluate } from "../expression-parser.js";

describe("evaluate", () => {
  it("basic arithmetic", () => {
    expect(evaluate("2 + 3")).toBe(5);
    expect(evaluate("10 - 4")).toBe(6);
    expect(evaluate("3 * 4")).toBe(12);
    expect(evaluate("15 / 3")).toBe(5);
    expect(evaluate("7 % 3")).toBe(1);
  });

  it("operator precedence", () => {
    expect(evaluate("2 + 3 * 4")).toBe(14);
    expect(evaluate("(2 + 3) * 4")).toBe(20);
  });

  it("exponentiation (right associative)", () => {
    expect(evaluate("2 ^ 3")).toBe(8);
    expect(evaluate("2 ^ 3 ^ 2")).toBe(512);
  });

  it("unary minus", () => {
    expect(evaluate("-5")).toBe(-5);
    expect(evaluate("-3 + 7")).toBe(4);
    expect(evaluate("-(2 + 3)")).toBe(-5);
  });

  it("variables", () => {
    expect(evaluate("x + y", { x: 10, y: 20 })).toBe(30);
    expect(evaluate("a * b + c", { a: 2, b: 3, c: 1 })).toBe(7);
  });

  it("functions", () => {
    expect(evaluate("abs(-5)")).toBe(5);
    expect(evaluate("sqrt(16)")).toBe(4);
    expect(evaluate("floor(3.7)")).toBe(3);
    expect(evaluate("ceil(3.2)")).toBe(4);
  });

  it("nested expressions", () => {
    expect(evaluate("sqrt(abs(-16))")).toBe(4);
    expect(evaluate("(1 + 2) * (3 + 4)")).toBe(21);
  });

  it("decimals", () => {
    expect(evaluate("1.5 + 2.5")).toBe(4);
    expect(evaluate("0.1 + 0.2")).toBeCloseTo(0.3);
  });

  it("throws on unknown variable", () => {
    expect(() => evaluate("x + 1")).toThrow("Unknown variable");
  });

  it("throws on unknown function", () => {
    expect(() => evaluate("foo(1)")).toThrow("Unknown function");
  });
});
