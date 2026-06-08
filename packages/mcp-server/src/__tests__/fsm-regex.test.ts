import { describe, it, expect } from "vitest";
import { NFARegex } from "../fsm-regex.js";

describe("fsm-regex", () => {
  it("matches literal string", () => {
    const re = new NFARegex("abc");
    expect(re.test("abc")).toBe(true);
    expect(re.test("ab")).toBe(false);
  });

  it("star matches zero or more", () => {
    const re = new NFARegex("ab*c");
    expect(re.test("ac")).toBe(true);
    expect(re.test("abc")).toBe(true);
    expect(re.test("abbc")).toBe(true);
  });

  it("plus matches one or more", () => {
    const re = new NFARegex("ab+c");
    expect(re.test("ac")).toBe(false);
    expect(re.test("abc")).toBe(true);
    expect(re.test("abbc")).toBe(true);
  });

  it("question matches zero or one", () => {
    const re = new NFARegex("ab?c");
    expect(re.test("ac")).toBe(true);
    expect(re.test("abc")).toBe(true);
    expect(re.test("abbc")).toBe(false);
  });

  it("alternation with pipe", () => {
    const re = new NFARegex("a|b");
    expect(re.test("a")).toBe(true);
    expect(re.test("b")).toBe(true);
    expect(re.test("c")).toBe(false);
  });

  it("dot matches any char", () => {
    const re = new NFARegex("a.c");
    expect(re.test("abc")).toBe(true);
    expect(re.test("axc")).toBe(true);
    expect(re.test("ac")).toBe(false);
  });

  it("parentheses group", () => {
    const re = new NFARegex("(ab)+");
    expect(re.test("ab")).toBe(true);
    expect(re.test("abab")).toBe(true);
    expect(re.test("")).toBe(false);
  });
});
