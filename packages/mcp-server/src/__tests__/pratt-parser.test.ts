import { describe, it, expect } from "vitest";
import { tokenize, parse, evaluate, astToString, Parser, defaultPrecedence } from "../pratt-parser.js";

describe("tokenize", () => {
  it("tokenizes numbers and operators", () => {
    const tokens = tokenize("1 + 2");
    expect(tokens[0]).toEqual({ type: "number", value: 1 });
    expect(tokens[1]).toEqual({ type: "op", value: "+" });
    expect(tokens[2]).toEqual({ type: "number", value: 2 });
  });

  it("tokenizes identifiers", () => {
    const tokens = tokenize("foo + bar");
    expect(tokens[0]).toEqual({ type: "ident", value: "foo" });
  });

  it("tokenizes parentheses", () => {
    const tokens = tokenize("(1)");
    expect(tokens[0]).toEqual({ type: "lparen" });
    expect(tokens[2]).toEqual({ type: "rparen" });
  });
});

describe("parse + evaluate", () => {
  it("evaluates simple addition", () => {
    expect(evaluate(parse("1 + 2"))).toBe(3);
  });

  it("respects precedence: * over +", () => {
    expect(evaluate(parse("2 + 3 * 4"))).toBe(14);
  });

  it("respects parentheses", () => {
    expect(evaluate(parse("(2 + 3) * 4"))).toBe(20);
  });

  it("handles right-associative exponentiation", () => {
    expect(evaluate(parse("2 ^ 3 ^ 2"))).toBe(512);
  });

  it("handles unary negation", () => {
    expect(evaluate(parse("-5 + 3"))).toBe(-2);
  });

  it("handles modulo", () => {
    expect(evaluate(parse("10 % 3"))).toBe(1);
  });

  it("evaluates with variables", () => {
    const vars = new Map([["x", 10], ["y", 3]]);
    expect(evaluate(parse("x * y + 1"), vars)).toBe(31);
  });

  it("evaluates function calls", () => {
    const fns = new Map<string, (...args: number[]) => number>([
      ["max", (...args) => Math.max(...args)],
    ]);
    expect(evaluate(parse("max(3, 7, 2)"), undefined, fns)).toBe(7);
  });

  it("handles complex nested expressions", () => {
    expect(evaluate(parse("(1 + 2) * (3 + 4) / 7"))).toBe(3);
  });
});

describe("astToString", () => {
  it("pretty prints AST", () => {
    const ast = parse("1 + 2 * 3");
    expect(astToString(ast)).toBe("(1 + (2 * 3))");
  });

  it("prints function calls", () => {
    const fns = new Map<string, (...args: number[]) => number>([
      ["f", (a: number) => a],
    ]);
    const ast = parse("f(1)");
    expect(astToString(ast)).toBe("f(1)");
  });
});
