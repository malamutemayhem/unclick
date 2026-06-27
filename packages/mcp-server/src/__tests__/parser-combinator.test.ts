import { describe, it, expect } from "vitest";
import {
  char, string, regex, satisfy, letter, digit,
  map, seq, alt, many, many1, optional, sepBy, between,
  lazy, label, eof, chainLeft, integer, float, word
} from "../parser-combinator.js";

describe("ParserCombinator", () => {
  it("char matches single character", () => {
    const result = char("a")("abc");
    expect(result.success).toBe(true);
    expect(result.value).toBe("a");
    expect(result.rest).toBe("bc");
  });

  it("char fails on mismatch", () => {
    const result = char("a")("xyz");
    expect(result.success).toBe(false);
  });

  it("string matches prefix", () => {
    const result = string("hello")("hello world");
    expect(result.success).toBe(true);
    expect(result.rest).toBe(" world");
  });

  it("regex matches pattern", () => {
    const result = regex(/[0-9]+/)("123abc");
    expect(result.success).toBe(true);
    expect(result.value).toBe("123");
  });

  it("satisfy with predicate", () => {
    const upper = satisfy((c) => c >= "A" && c <= "Z", "uppercase");
    expect(upper("Hello").success).toBe(true);
    expect(upper("hello").success).toBe(false);
  });

  it("map transforms result", () => {
    const num = map(regex(/[0-9]+/), Number);
    const result = num("42rest");
    expect(result.success).toBe(true);
    expect(result.value).toBe(42);
  });

  it("seq combines parsers", () => {
    const result = seq(letter, digit)("a1");
    expect(result.success).toBe(true);
    expect(result.value).toEqual(["a", "1"]);
  });

  it("alt tries alternatives", () => {
    const p = alt(string("foo"), string("bar"));
    expect(p("foo").success).toBe(true);
    expect(p("bar").success).toBe(true);
    expect(p("baz").success).toBe(false);
  });

  it("many collects zero or more", () => {
    const result = many(digit)("123abc");
    expect(result.success).toBe(true);
    expect(result.value).toEqual(["1", "2", "3"]);
  });

  it("many1 requires at least one", () => {
    expect(many1(digit)("123").success).toBe(true);
    expect(many1(digit)("abc").success).toBe(false);
  });

  it("optional returns null on failure", () => {
    const result = optional(digit)("abc");
    expect(result.success).toBe(true);
    expect(result.value).toBeNull();
  });

  it("sepBy parses separated values", () => {
    const result = sepBy(integer(), char(","))("1,2,3");
    expect(result.success).toBe(true);
    expect(result.value).toEqual([1, 2, 3]);
  });

  it("between parses delimited content", () => {
    const parens = between(char("("), integer(), char(")"));
    const result = parens("(42)");
    expect(result.success).toBe(true);
    expect(result.value).toBe(42);
  });

  it("lazy enables recursive parsers", () => {
    const p: ReturnType<typeof char> = lazy(() => alt(char("a"), char("b")));
    expect(p("a").success).toBe(true);
    expect(p("b").success).toBe(true);
  });

  it("label provides custom error", () => {
    const p = label(digit, "a digit");
    const result = p("abc");
    expect(result.success).toBe(false);
    expect(result.expected).toBe("a digit");
  });

  it("eof matches end of input", () => {
    expect(eof()("").success).toBe(true);
    expect(eof()("x").success).toBe(false);
  });

  it("chainLeft builds left-associative expressions", () => {
    const add = map(char("+"), () => (a: number, b: number) => a + b);
    const expr = chainLeft(integer(), add);
    const result = expr("1+2+3");
    expect(result.success).toBe(true);
    expect(result.value).toBe(6);
  });

  it("integer parses integers", () => {
    expect(integer()("42").value).toBe(42);
    expect(integer()("-7").value).toBe(-7);
  });

  it("float parses decimals", () => {
    expect(float()("3.14").value).toBeCloseTo(3.14);
  });

  it("word parses letters", () => {
    const result = word()("hello123");
    expect(result.value).toBe("hello");
  });
});
