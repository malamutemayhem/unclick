import { describe, it, expect } from "vitest";
import { EarleyParser } from "../earley-parser.js";

describe("EarleyParser", () => {
  it("parses simple grammar", () => {
    const parser = new EarleyParser("S");
    parser.addRule("S", ["a"]);
    expect(parser.parse(["a"])).toBe(true);
    expect(parser.parse(["b"])).toBe(false);
  });

  it("parses recursive grammar", () => {
    const parser = new EarleyParser("S");
    parser.addRule("S", ["a", "S", "b"]);
    parser.addRule("S", ["a", "b"]);
    expect(parser.parse(["a", "b"])).toBe(true);
    expect(parser.parse(["a", "a", "b", "b"])).toBe(true);
    expect(parser.parse(["a", "a", "b"])).toBe(false);
  });

  it("parses arithmetic expressions", () => {
    const parser = new EarleyParser("E");
    parser.addRule("E", ["E", "+", "T"]);
    parser.addRule("E", ["T"]);
    parser.addRule("T", ["n"]);
    expect(parser.parse(["n"])).toBe(true);
    expect(parser.parse(["n", "+", "n"])).toBe(true);
    expect(parser.parse(["n", "+", "n", "+", "n"])).toBe(true);
  });

  it("rejects empty input for non-nullable", () => {
    const parser = new EarleyParser("S");
    parser.addRule("S", ["a"]);
    expect(parser.parse([])).toBe(false);
  });

  it("handles epsilon rules", () => {
    const parser = new EarleyParser("S");
    parser.addRule("S", ["a", "B"]);
    parser.addRule("B", ["b"]);
    parser.addRule("B", ["epsilon"]);
    expect(parser.parse(["a"])).toBe(true);
    expect(parser.parse(["a", "b"])).toBe(true);
  });

  it("ruleCount tracks rules", () => {
    const parser = new EarleyParser("S");
    parser.addRule("S", ["a"]);
    parser.addRule("S", ["b"]);
    expect(parser.ruleCount).toBe(2);
  });

  it("getRules returns copies", () => {
    const parser = new EarleyParser("S");
    parser.addRule("S", ["a", "b"]);
    const rules = parser.getRules();
    expect(rules.length).toBe(1);
    expect(rules[0].lhs).toBe("S");
    expect(rules[0].rhs).toEqual(["a", "b"]);
  });
});
