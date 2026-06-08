import { describe, it, expect } from "vitest";
import { levenshtein, hammingDistance, jaroWinkler, longestCommonSubstring } from "../string-distance.js";

describe("levenshtein", () => {
  it("identical strings", () => {
    expect(levenshtein("hello", "hello")).toBe(0);
  });

  it("one insertion", () => {
    expect(levenshtein("cat", "cats")).toBe(1);
  });

  it("one deletion", () => {
    expect(levenshtein("cats", "cat")).toBe(1);
  });

  it("one substitution", () => {
    expect(levenshtein("cat", "car")).toBe(1);
  });

  it("completely different", () => {
    expect(levenshtein("abc", "xyz")).toBe(3);
  });

  it("empty string", () => {
    expect(levenshtein("", "hello")).toBe(5);
  });
});

describe("hammingDistance", () => {
  it("identical strings", () => {
    expect(hammingDistance("abc", "abc")).toBe(0);
  });

  it("one difference", () => {
    expect(hammingDistance("abc", "axc")).toBe(1);
  });

  it("throws on different lengths", () => {
    expect(() => hammingDistance("ab", "abc")).toThrow("same length");
  });
});

describe("jaroWinkler", () => {
  it("identical strings score 1", () => {
    expect(jaroWinkler("hello", "hello")).toBe(1);
  });

  it("completely different scores near 0", () => {
    expect(jaroWinkler("abc", "xyz")).toBeLessThan(0.5);
  });

  it("similar strings score high", () => {
    expect(jaroWinkler("martha", "marhta")).toBeGreaterThan(0.9);
  });

  it("empty string returns 0", () => {
    expect(jaroWinkler("", "hello")).toBe(0);
  });
});

describe("longestCommonSubstring", () => {
  it("finds common substring", () => {
    expect(longestCommonSubstring("abcdef", "zbcdf")).toBe("bcd");
  });

  it("no common substring", () => {
    expect(longestCommonSubstring("abc", "xyz")).toBe("");
  });

  it("identical strings", () => {
    expect(longestCommonSubstring("hello", "hello")).toBe("hello");
  });
});
