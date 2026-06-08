import { describe, it, expect } from "vitest";
import { SuffixAutomaton } from "../suffix-automaton.js";

describe("SuffixAutomaton", () => {
  it("contains detects substrings", () => {
    const sa = new SuffixAutomaton("abcbc");
    expect(sa.contains("abc")).toBe(true);
    expect(sa.contains("bcb")).toBe(true);
    expect(sa.contains("cbc")).toBe(true);
    expect(sa.contains("xyz")).toBe(false);
  });

  it("contains detects suffixes", () => {
    const sa = new SuffixAutomaton("hello");
    expect(sa.contains("llo")).toBe(true);
    expect(sa.contains("hello")).toBe(true);
    expect(sa.contains("o")).toBe(true);
  });

  it("countDistinctSubstrings is correct", () => {
    const sa = new SuffixAutomaton("abc");
    expect(sa.countDistinctSubstrings()).toBe(6);
  });

  it("stateCount grows with text", () => {
    const sa = new SuffixAutomaton("aaa");
    expect(sa.stateCount()).toBeGreaterThan(1);
  });

  it("extend builds incrementally", () => {
    const sa = new SuffixAutomaton();
    sa.extend("a");
    sa.extend("b");
    expect(sa.contains("ab")).toBe(true);
    expect(sa.contains("a")).toBe(true);
    expect(sa.contains("b")).toBe(true);
  });

  it("longestCommonSubstring finds overlap", () => {
    const sa = new SuffixAutomaton("abcdef");
    expect(sa.longestCommonSubstring("xcdey")).toBe("cde");
  });

  it("longestCommonSubstring with no overlap returns empty", () => {
    const sa = new SuffixAutomaton("abc");
    expect(sa.longestCommonSubstring("xyz")).toBe("");
  });

  it("empty pattern is always contained", () => {
    const sa = new SuffixAutomaton("test");
    expect(sa.contains("")).toBe(true);
  });
});
