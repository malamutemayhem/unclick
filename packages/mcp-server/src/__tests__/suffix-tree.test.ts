import { describe, it, expect } from "vitest";
import { SuffixTree, longestCommonSubstring } from "../suffix-tree.js";

describe("SuffixTree", () => {
  it("contains substrings", () => {
    const tree = new SuffixTree("banana");
    expect(tree.contains("ban")).toBe(true);
    expect(tree.contains("ana")).toBe(true);
    expect(tree.contains("nan")).toBe(true);
    expect(tree.contains("xyz")).toBe(false);
  });

  it("finds all occurrences", () => {
    const tree = new SuffixTree("banana");
    const positions = tree.findAll("ana");
    expect(positions).toHaveLength(2);
    expect(positions).toContain(1);
    expect(positions).toContain(3);
  });

  it("counts occurrences", () => {
    const tree = new SuffixTree("abcabc");
    expect(tree.countOccurrences("abc")).toBe(2);
    expect(tree.countOccurrences("xyz")).toBe(0);
  });

  it("finds longest repeated substring", () => {
    const tree = new SuffixTree("banana");
    const lrs = tree.longestRepeatedSubstring();
    expect(lrs).toBe("ana");
  });

  it("handles single character strings", () => {
    const tree = new SuffixTree("a");
    expect(tree.contains("a")).toBe(true);
    expect(tree.contains("b")).toBe(false);
  });

  it("lists suffixes", () => {
    const tree = new SuffixTree("abc");
    const suffixes = tree.suffixes();
    expect(suffixes).toContain("abc");
    expect(suffixes).toContain("bc");
    expect(suffixes).toContain("c");
    expect(suffixes).toHaveLength(3);
  });

  it("handles repeated characters", () => {
    const tree = new SuffixTree("aaaa");
    expect(tree.findAll("a")).toHaveLength(4);
    expect(tree.findAll("aa")).toHaveLength(3);
  });
});

describe("longestCommonSubstring", () => {
  it("finds common substring", () => {
    const result = longestCommonSubstring("abcdef", "xbcdy");
    expect(result).toBe("bcd");
  });

  it("handles no common substring", () => {
    const result = longestCommonSubstring("abc", "xyz");
    expect(result).toBe("");
  });

  it("handles identical strings", () => {
    const result = longestCommonSubstring("hello", "hello");
    expect(result).toBe("hello");
  });
});
