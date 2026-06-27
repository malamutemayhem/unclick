import { describe, it, expect } from "vitest";
import {
  char, alt, seq, star, matches, nullable, derivative,
  EPS, EMPTY, DOT, charClass, parseSimple, reToString,
} from "../regex-derivative.js";

describe("nullable", () => {
  it("eps is nullable", () => expect(nullable(EPS)).toBe(true));
  it("empty is not nullable", () => expect(nullable(EMPTY)).toBe(false));
  it("char is not nullable", () => expect(nullable(char("a"))).toBe(false));
  it("star is nullable", () => expect(nullable(star(char("a")))).toBe(true));
});

describe("derivative", () => {
  it("derivative of char with matching char is eps", () => {
    expect(nullable(derivative(char("a"), "a"))).toBe(true);
  });

  it("derivative of char with non-matching char is empty", () => {
    const d = derivative(char("a"), "b");
    expect(nullable(d)).toBe(false);
  });
});

describe("matches", () => {
  it("matches single char", () => {
    expect(matches(char("a"), "a")).toBe(true);
    expect(matches(char("a"), "b")).toBe(false);
  });

  it("matches sequence", () => {
    const re = seq(char("a"), char("b"));
    expect(matches(re, "ab")).toBe(true);
    expect(matches(re, "ac")).toBe(false);
  });

  it("matches alternation", () => {
    const re = alt(char("a"), char("b"));
    expect(matches(re, "a")).toBe(true);
    expect(matches(re, "b")).toBe(true);
    expect(matches(re, "c")).toBe(false);
  });

  it("matches star", () => {
    const re = star(char("a"));
    expect(matches(re, "")).toBe(true);
    expect(matches(re, "aaa")).toBe(true);
    expect(matches(re, "ab")).toBe(false);
  });

  it("matches dot", () => {
    expect(matches(DOT, "x")).toBe(true);
    expect(matches(seq(DOT, DOT), "ab")).toBe(true);
  });

  it("matches char class", () => {
    const re = charClass("abc");
    expect(matches(re, "a")).toBe(true);
    expect(matches(re, "d")).toBe(false);
  });

  it("matches negated char class", () => {
    const re = charClass("abc", true);
    expect(matches(re, "d")).toBe(true);
    expect(matches(re, "a")).toBe(false);
  });

  it("matches complex pattern", () => {
    const re = seq(star(alt(char("a"), char("b"))), char("c"));
    expect(matches(re, "c")).toBe(true);
    expect(matches(re, "abc")).toBe(true);
    expect(matches(re, "bac")).toBe(true);
    expect(matches(re, "abd")).toBe(false);
  });
});

describe("parseSimple + matches", () => {
  it("parses and matches literal", () => {
    expect(matches(parseSimple("abc"), "abc")).toBe(true);
  });

  it("parses alternation", () => {
    const re = parseSimple("a|b");
    expect(matches(re, "a")).toBe(true);
    expect(matches(re, "b")).toBe(true);
  });

  it("parses star", () => {
    expect(matches(parseSimple("a*"), "aaa")).toBe(true);
  });

  it("parses plus", () => {
    expect(matches(parseSimple("a+"), "")).toBe(false);
    expect(matches(parseSimple("a+"), "aa")).toBe(true);
  });

  it("parses optional", () => {
    expect(matches(parseSimple("ab?c"), "ac")).toBe(true);
    expect(matches(parseSimple("ab?c"), "abc")).toBe(true);
  });

  it("parses groups", () => {
    expect(matches(parseSimple("(ab)*"), "abab")).toBe(true);
  });
});

describe("reToString", () => {
  it("prints regex", () => {
    const s = reToString(seq(char("a"), star(char("b"))));
    expect(s).toContain("a");
    expect(s).toContain("b");
  });
});
