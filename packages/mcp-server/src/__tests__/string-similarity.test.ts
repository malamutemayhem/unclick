import { describe, it, expect } from "vitest";
import { levenshtein, similarity, jaroWinkler, longestCommonSubstring } from "../string-similarity.js";

describe("string-similarity", () => {
  it("levenshtein distance", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein("", "abc")).toBe(3);
    expect(levenshtein("abc", "abc")).toBe(0);
  });

  it("similarity ratio", () => {
    expect(similarity("abc", "abc")).toBe(1);
    expect(similarity("abc", "xyz")).toBeCloseTo(0, 1);
    expect(similarity("", "")).toBe(1);
  });

  it("jaro-winkler", () => {
    expect(jaroWinkler("martha", "marhta")).toBeGreaterThan(0.9);
    expect(jaroWinkler("abc", "abc")).toBe(1);
    expect(jaroWinkler("", "abc")).toBe(0);
    expect(jaroWinkler("abc", "")).toBe(0);
  });

  it("longest common substring", () => {
    expect(longestCommonSubstring("abcdef", "zbcdf")).toBe("bcd");
    expect(longestCommonSubstring("abc", "xyz")).toBe("");
    expect(longestCommonSubstring("hello world", "world hello")).toHaveLength(5);
  });
});
