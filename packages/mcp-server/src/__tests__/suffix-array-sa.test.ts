import { describe, it, expect } from "vitest";
import { SuffixArraySA } from "../suffix-array-sa.js";

describe("SuffixArraySA", () => {
  it("builds sorted suffix array", () => {
    const sa = new SuffixArraySA("banana");
    const arr = sa.getSuffixArray();
    expect(arr.length).toBe(6);
    expect(arr[0]).toBe(5);
  });

  it("searches for pattern", () => {
    const sa = new SuffixArraySA("abcabcabc");
    const results = sa.search("abc");
    expect(results).toEqual([0, 3, 6]);
  });

  it("search returns empty for no match", () => {
    const sa = new SuffixArraySA("hello");
    expect(sa.search("xyz")).toEqual([]);
  });

  it("lcpArray computes longest common prefixes", () => {
    const sa = new SuffixArraySA("banana");
    const lcp = sa.lcpArray();
    expect(lcp.length).toBe(6);
  });

  it("longestRepeatedSubstring finds LRS", () => {
    const sa = new SuffixArraySA("banana");
    expect(sa.longestRepeatedSubstring()).toBe("ana");
  });

  it("single character", () => {
    const sa = new SuffixArraySA("a");
    expect(sa.getSuffixArray()).toEqual([0]);
    expect(sa.search("a")).toEqual([0]);
  });

  it("no repeated substring", () => {
    const sa = new SuffixArraySA("abc");
    expect(sa.longestRepeatedSubstring()).toBe("");
  });
});
