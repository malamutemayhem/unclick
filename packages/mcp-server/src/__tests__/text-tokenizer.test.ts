import { describe, it, expect } from "vitest";
import { Tokenizer, createJsonTokenizer, createWordTokenizer } from "../text-tokenizer.js";

describe("Tokenizer", () => {
  it("tokenizes with custom rules", () => {
    const t = new Tokenizer([
      { type: "NUM", pattern: /\d+/ },
      { type: "PLUS", pattern: /\+/ },
      { type: "WS", pattern: /\s+/, skip: true },
    ]);
    const tokens = t.tokenize("3 + 42");
    expect(tokens).toEqual([
      { type: "NUM", value: "3", position: 0 },
      { type: "PLUS", value: "+", position: 2 },
      { type: "NUM", value: "42", position: 4 },
    ]);
  });

  it("throws on unexpected character", () => {
    const t = new Tokenizer([{ type: "A", pattern: /a/ }]);
    expect(() => t.tokenize("ab")).toThrow("Unexpected character 'b' at position 1");
  });

  it("returns empty array for empty input", () => {
    const t = new Tokenizer([{ type: "A", pattern: /a/ }]);
    expect(t.tokenize("")).toEqual([]);
  });

  it("skips whitespace when skip is set", () => {
    const t = new Tokenizer([
      { type: "WS", pattern: /\s+/, skip: true },
      { type: "W", pattern: /\w+/ },
    ]);
    const tokens = t.tokenize("  hello  ");
    expect(tokens).toEqual([{ type: "W", value: "hello", position: 2 }]);
  });
});

describe("createJsonTokenizer", () => {
  it("tokenizes JSON object", () => {
    const t = createJsonTokenizer();
    const tokens = t.tokenize('{"a": 1}');
    const types = tokens.map((t) => t.type);
    expect(types).toEqual(["LBRACE", "STRING", "COLON", "NUMBER", "RBRACE"]);
  });

  it("tokenizes JSON array with booleans and null", () => {
    const t = createJsonTokenizer();
    const tokens = t.tokenize("[true, false, null]");
    const types = tokens.map((t) => t.type);
    expect(types).toEqual(["LBRACKET", "TRUE", "COMMA", "FALSE", "COMMA", "NULL", "RBRACKET"]);
  });

  it("tokenizes negative and scientific numbers", () => {
    const t = createJsonTokenizer();
    const tokens = t.tokenize("-3.14e+10");
    expect(tokens[0].type).toBe("NUMBER");
    expect(tokens[0].value).toBe("-3.14e+10");
  });

  it("tokenizes string with escapes", () => {
    const t = createJsonTokenizer();
    const tokens = t.tokenize('"hello\\"world"');
    expect(tokens[0].type).toBe("STRING");
  });
});

describe("createWordTokenizer", () => {
  it("tokenizes words and numbers", () => {
    const t = createWordTokenizer();
    const tokens = t.tokenize("hello 42 world");
    expect(tokens).toEqual([
      { type: "WORD", value: "hello", position: 0 },
      { type: "NUMBER", value: "42", position: 6 },
      { type: "WORD", value: "world", position: 9 },
    ]);
  });

  it("handles punctuation", () => {
    const t = createWordTokenizer();
    const tokens = t.tokenize("a+b");
    expect(tokens[1]).toEqual({ type: "PUNCT", value: "+", position: 1 });
  });
});
