import { describe, it, expect } from "vitest";
import { parse, stringify, evaluate, defaultEnv } from "../s-expression.js";

describe("parse", () => {
  it("parses atoms", () => {
    expect(parse("hello")).toBe("hello");
  });

  it("parses numbers", () => {
    expect(parse("42")).toBe(42);
  });

  it("parses lists", () => {
    expect(parse("(a b c)")).toEqual(["a", "b", "c"]);
  });

  it("parses nested lists", () => {
    expect(parse("(+ 1 (* 2 3))")).toEqual(["+", 1, ["*", 2, 3]]);
  });

  it("parses empty list", () => {
    expect(parse("()")).toEqual([]);
  });
});

describe("stringify", () => {
  it("stringifies atom", () => {
    expect(stringify("hello")).toBe("hello");
  });

  it("stringifies number", () => {
    expect(stringify(42)).toBe("42");
  });

  it("stringifies list", () => {
    expect(stringify(["+", 1, 2])).toBe("(+ 1 2)");
  });

  it("roundtrips with parse", () => {
    const expr = "(+ (* 2 3) (- 10 5))";
    expect(stringify(parse(expr))).toBe(expr);
  });
});

describe("evaluate", () => {
  it("evaluates addition", () => {
    expect(evaluate(parse("(+ 1 2 3)"))).toBe(6);
  });

  it("evaluates subtraction", () => {
    expect(evaluate(parse("(- 10 3)"))).toBe(7);
  });

  it("evaluates multiplication", () => {
    expect(evaluate(parse("(* 2 3 4)"))).toBe(24);
  });

  it("evaluates division", () => {
    expect(evaluate(parse("(/ 10 2)"))).toBe(5);
  });

  it("evaluates nested expressions", () => {
    expect(evaluate(parse("(+ 1 (* 2 3))"))).toBe(7);
  });

  it("evaluates comparison", () => {
    expect(evaluate(parse("(< 1 2)"))).toBe(1);
    expect(evaluate(parse("(> 1 2)"))).toBe(0);
  });

  it("evaluates list operations", () => {
    expect(evaluate(parse("(length (list 1 2 3))"))).toBe(3);
  });
});
