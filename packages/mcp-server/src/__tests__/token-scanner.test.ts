import { describe, it, expect } from "vitest";
import { Scanner, createJsonScanner } from "../token-scanner.js";

describe("Scanner", () => {
  it("scans basic tokens", () => {
    const scanner = new Scanner([
      { type: "ws", pattern: /\s+/, skip: true },
      { type: "number", pattern: /\d+/ },
      { type: "plus", pattern: /\+/ },
    ]);
    const tokens = scanner.scan("1 + 2");
    expect(tokens.length).toBe(3);
    expect(tokens[0]).toMatchObject({ type: "number", value: "1" });
    expect(tokens[1]).toMatchObject({ type: "plus", value: "+" });
    expect(tokens[2]).toMatchObject({ type: "number", value: "2" });
  });

  it("tracks line and column", () => {
    const scanner = new Scanner([
      { type: "ws", pattern: /\s+/, skip: true },
      { type: "word", pattern: /\w+/ },
    ]);
    const tokens = scanner.scan("hello\nworld");
    expect(tokens[0].line).toBe(1);
    expect(tokens[1].line).toBe(2);
    expect(tokens[1].column).toBe(1);
  });

  it("throws on unexpected character", () => {
    const scanner = new Scanner([{ type: "digit", pattern: /\d/ }]);
    expect(() => scanner.scan("a")).toThrow("Unexpected character");
  });

  it("skips whitespace when marked", () => {
    const scanner = new Scanner([
      { type: "ws", pattern: /\s+/, skip: true },
      { type: "word", pattern: /\w+/ },
    ]);
    const tokens = scanner.scan("  hello  ");
    expect(tokens.length).toBe(1);
  });
});

describe("createJsonScanner", () => {
  it("scans JSON", () => {
    const scanner = createJsonScanner();
    const tokens = scanner.scan('{"key": 123, "flag": true}');
    const types = tokens.map((t) => t.type);
    expect(types).toContain("lbrace");
    expect(types).toContain("string");
    expect(types).toContain("number");
    expect(types).toContain("true");
    expect(types).toContain("rbrace");
  });

  it("handles arrays", () => {
    const scanner = createJsonScanner();
    const tokens = scanner.scan("[1, 2, null]");
    expect(tokens.some((t) => t.type === "lbracket")).toBe(true);
    expect(tokens.some((t) => t.type === "null")).toBe(true);
  });
});
