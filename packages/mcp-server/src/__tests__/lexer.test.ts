import { describe, it, expect } from "vitest";
import { Lexer, TokenStream } from "../lexer.js";

describe("Lexer", () => {
  it("tokenizes numbers and identifiers", () => {
    const lex = Lexer.createSimple();
    const tokens = lex.tokenize("foo 42");
    expect(tokens).toHaveLength(2);
    expect(tokens[0]).toMatchObject({ type: "IDENT", value: "foo" });
    expect(tokens[1]).toMatchObject({ type: "NUMBER", value: "42" });
  });

  it("tokenizes operators and parens", () => {
    const lex = Lexer.createSimple();
    const tokens = lex.tokenize("(a + b)");
    expect(tokens.map(t => t.type)).toEqual(["LPAREN", "IDENT", "OP", "IDENT", "RPAREN"]);
  });

  it("skips whitespace", () => {
    const lex = Lexer.createSimple();
    const tokens = lex.tokenize("  x  ");
    expect(tokens).toHaveLength(1);
    expect(tokens[0].value).toBe("x");
  });

  it("tracks line and column", () => {
    const lex = Lexer.createSimple();
    const tokens = lex.tokenize("a\nb");
    expect(tokens[0]).toMatchObject({ line: 1, col: 1 });
    expect(tokens[1]).toMatchObject({ line: 2, col: 1 });
  });

  it("throws on unexpected character", () => {
    const lex = Lexer.createSimple();
    expect(() => lex.tokenize("@")).toThrow("Unexpected character");
  });

  it("tokenizes strings", () => {
    const lex = Lexer.createSimple();
    const tokens = lex.tokenize('"hello"');
    expect(tokens[0]).toMatchObject({ type: "STRING", value: '"hello"' });
  });

  it("tokenizes floats", () => {
    const lex = Lexer.createSimple();
    const tokens = lex.tokenize("3.14");
    expect(tokens[0]).toMatchObject({ type: "NUMBER", value: "3.14" });
  });

  it("custom rules", () => {
    const lex = new Lexer();
    lex.addRule("KEYWORD", /if|else|while/);
    lex.addRule("IDENT", /[a-zA-Z_]\w*/);
    lex.addRule("WS", /\s+/, true);
    const tokens = lex.tokenize("if foo else");
    expect(tokens.map(t => t.type)).toEqual(["KEYWORD", "IDENT", "KEYWORD"]);
  });
});

describe("TokenStream", () => {
  it("peek and next", () => {
    const lex = Lexer.createSimple();
    const stream = new TokenStream(lex.tokenize("a b c"));
    expect(stream.peek()!.value).toBe("a");
    expect(stream.next()!.value).toBe("a");
    expect(stream.peek()!.value).toBe("b");
  });

  it("expect succeeds on correct type", () => {
    const lex = Lexer.createSimple();
    const stream = new TokenStream(lex.tokenize("42"));
    const tok = stream.expect("NUMBER");
    expect(tok.value).toBe("42");
  });

  it("expect throws on wrong type", () => {
    const lex = Lexer.createSimple();
    const stream = new TokenStream(lex.tokenize("foo"));
    expect(() => stream.expect("NUMBER")).toThrow("Expected NUMBER");
  });

  it("match returns null on mismatch", () => {
    const lex = Lexer.createSimple();
    const stream = new TokenStream(lex.tokenize("foo"));
    expect(stream.match("NUMBER")).toBeNull();
    expect(stream.position).toBe(0);
  });

  it("done and remaining", () => {
    const lex = Lexer.createSimple();
    const stream = new TokenStream(lex.tokenize("a b"));
    expect(stream.done).toBe(false);
    expect(stream.remaining).toBe(2);
    stream.next();
    stream.next();
    expect(stream.done).toBe(true);
    expect(stream.remaining).toBe(0);
  });
});
