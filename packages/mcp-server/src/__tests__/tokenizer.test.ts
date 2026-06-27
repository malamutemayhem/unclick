import { describe, it, expect } from "vitest";
import {
  createTokenizer, jsonTokenizer, mathTokenizer, tokenCount, filterByType,
} from "../tokenizer.js";

describe("createTokenizer", () => {
  it("tokenizes with custom rules", () => {
    const tokenize = createTokenizer([
      { type: "word", pattern: /[a-z]+/ },
      { type: "num", pattern: /\d+/ },
      { type: "ws", pattern: /\s+/, skip: true },
    ]);
    const tokens = tokenize("hello 42 world");
    expect(tokens).toHaveLength(3);
    expect(tokens[0]).toMatchObject({ type: "word", value: "hello" });
    expect(tokens[1]).toMatchObject({ type: "num", value: "42" });
  });

  it("tracks line and column", () => {
    const tokenize = createTokenizer([
      { type: "word", pattern: /\w+/ },
      { type: "nl", pattern: /\n/ },
      { type: "ws", pattern: / +/, skip: true },
    ]);
    const tokens = tokenize("hello\nworld");
    expect(tokens[0].line).toBe(1);
    expect(tokens[2].line).toBe(2);
  });

  it("throws on unexpected character", () => {
    const tokenize = createTokenizer([{ type: "a", pattern: /a/ }]);
    expect(() => tokenize("b")).toThrow("Unexpected character");
  });
});

describe("jsonTokenizer", () => {
  it("tokenizes JSON", () => {
    const tokens = jsonTokenizer('{"key": 42, "arr": [true, null]}');
    const types = tokens.map((t) => t.type);
    expect(types).toContain("lbrace");
    expect(types).toContain("string");
    expect(types).toContain("number");
    expect(types).toContain("boolean");
    expect(types).toContain("null");
  });

  it("handles strings with escapes", () => {
    const tokens = jsonTokenizer('"hello \\"world\\""');
    expect(tokens[0].type).toBe("string");
  });
});

describe("mathTokenizer", () => {
  it("tokenizes math expression", () => {
    const tokens = mathTokenizer("3 + 4 * (x - 2)");
    expect(tokens.length).toBeGreaterThan(5);
    expect(tokens[0]).toMatchObject({ type: "number", value: "3" });
  });
});

describe("tokenCount", () => {
  it("counts token types", () => {
    const tokens = jsonTokenizer('{"a": 1, "b": 2}');
    const counts = tokenCount(tokens);
    expect(counts.get("string")).toBe(2);
    expect(counts.get("number")).toBe(2);
  });
});

describe("filterByType", () => {
  it("filters tokens", () => {
    const tokens = mathTokenizer("1 + 2 + 3");
    const nums = filterByType(tokens, "number");
    expect(nums).toHaveLength(3);
  });
});
