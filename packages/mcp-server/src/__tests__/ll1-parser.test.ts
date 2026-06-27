import { describe, it, expect } from "vitest";
import { LL1Parser } from "../ll1-parser.js";

describe("LL1Parser", () => {
  const grammar = {
    rules: new Map([
      ["S", [["a", "B"], ["b"]]],
      ["B", [["b", "S"], ["epsilon"]]],
    ]),
    terminals: new Set(["a", "b"]),
    startSymbol: "S",
  };

  it("parses valid input", () => {
    const parser = new LL1Parser(grammar);
    expect(parser.parse(["b"])).toBe(true);
  });

  it("parses nested input", () => {
    const parser = new LL1Parser(grammar);
    expect(parser.parse(["a", "b", "b"])).toBe(true);
  });

  it("rejects invalid input", () => {
    const parser = new LL1Parser(grammar);
    expect(parser.parse(["a", "a"])).toBe(false);
  });

  it("FIRST sets computed correctly", () => {
    const parser = new LL1Parser(grammar);
    const firstS = parser.getFirst("S");
    expect(firstS.has("a")).toBe(true);
    expect(firstS.has("b")).toBe(true);
  });

  it("FOLLOW sets computed correctly", () => {
    const parser = new LL1Parser(grammar);
    const followS = parser.getFollow("S");
    expect(followS.has("$")).toBe(true);
  });

  it("parses empty via epsilon", () => {
    const parser = new LL1Parser(grammar);
    expect(parser.parse(["a"])).toBe(true);
  });

  it("rejects empty input for non-nullable start", () => {
    const parser = new LL1Parser(grammar);
    expect(parser.parse([])).toBe(false);
  });
});
