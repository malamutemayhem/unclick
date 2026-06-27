import { describe, it, expect } from "vitest";
import { Lexer, RecursiveDescentParser, evaluate } from "../grammar-parser.js";

function createMathLexer(): Lexer {
  const lexer = new Lexer();
  lexer.addRule("WS", /\s+/, true);
  lexer.addRule("NUMBER", /\d+(\.\d+)?/);
  lexer.addRule("IDENT", /[a-zA-Z_]\w*/);
  lexer.addRule("OP", /[+\-*/()]/);
  return lexer;
}

describe("Lexer", () => {
  it("tokenizes simple expression", () => {
    const lexer = createMathLexer();
    const tokens = lexer.tokenize("1 + 2");
    expect(tokens.length).toBe(3);
    expect(tokens[0]).toEqual({ type: "NUMBER", value: "1", pos: 0 });
    expect(tokens[1]).toEqual({ type: "OP", value: "+", pos: 2 });
    expect(tokens[2]).toEqual({ type: "NUMBER", value: "2", pos: 4 });
  });

  it("skips whitespace", () => {
    const lexer = createMathLexer();
    const tokens = lexer.tokenize("  42  ");
    expect(tokens.length).toBe(1);
    expect(tokens[0].value).toBe("42");
  });

  it("tokenizes identifiers", () => {
    const lexer = createMathLexer();
    const tokens = lexer.tokenize("x + y");
    expect(tokens[0].type).toBe("IDENT");
    expect(tokens[2].type).toBe("IDENT");
  });

  it("throws on unexpected character", () => {
    const lexer = createMathLexer();
    expect(() => lexer.tokenize("1 @ 2")).toThrow("Unexpected character");
  });

  it("tokenizes decimal numbers", () => {
    const lexer = createMathLexer();
    const tokens = lexer.tokenize("3.14");
    expect(tokens[0].value).toBe("3.14");
  });
});

describe("RecursiveDescentParser", () => {
  it("parses and evaluates addition", () => {
    const parser = new RecursiveDescentParser(createMathLexer());
    const ast = parser.parse("2 + 3");
    expect(evaluate(ast)).toBe(5);
  });

  it("parses and evaluates multiplication with precedence", () => {
    const parser = new RecursiveDescentParser(createMathLexer());
    const ast = parser.parse("2 + 3 * 4");
    expect(evaluate(ast)).toBe(14);
  });

  it("handles parentheses", () => {
    const parser = new RecursiveDescentParser(createMathLexer());
    const ast = parser.parse("(2 + 3) * 4");
    expect(evaluate(ast)).toBe(20);
  });

  it("handles unary negation", () => {
    const parser = new RecursiveDescentParser(createMathLexer());
    const ast = parser.parse("-5 + 3");
    expect(evaluate(ast)).toBe(-2);
  });

  it("handles variables", () => {
    const parser = new RecursiveDescentParser(createMathLexer());
    const ast = parser.parse("x + y");
    expect(evaluate(ast, { x: 10, y: 20 })).toBe(30);
  });

  it("handles complex expression", () => {
    const parser = new RecursiveDescentParser(createMathLexer());
    const ast = parser.parse("(10 - 2) * (3 + 1)");
    expect(evaluate(ast)).toBe(32);
  });

  it("handles division", () => {
    const parser = new RecursiveDescentParser(createMathLexer());
    const ast = parser.parse("10 / 2");
    expect(evaluate(ast)).toBe(5);
  });

  it("handles division by zero", () => {
    const parser = new RecursiveDescentParser(createMathLexer());
    const ast = parser.parse("10 / 0");
    expect(evaluate(ast)).toBe(0);
  });
});
