import { describe, it, expect } from "vitest";
import { TextSimilarity } from "../text-similarity.js";

describe("TextSimilarity", () => {
  it("calculates levenshtein distance", () => {
    expect(TextSimilarity.levenshtein("kitten", "sitting")).toBe(3);
    expect(TextSimilarity.levenshtein("", "abc")).toBe(3);
    expect(TextSimilarity.levenshtein("abc", "abc")).toBe(0);
  });

  it("calculates normalized levenshtein", () => {
    expect(TextSimilarity.normalizedLevenshtein("abc", "abc")).toBe(1);
    expect(TextSimilarity.normalizedLevenshtein("", "")).toBe(1);
    expect(TextSimilarity.normalizedLevenshtein("abc", "xyz")).toBeCloseTo(0, 1);
  });

  it("calculates jaro-winkler similarity", () => {
    expect(TextSimilarity.jaroWinkler("martha", "marhta")).toBeGreaterThan(0.9);
    expect(TextSimilarity.jaroWinkler("abc", "abc")).toBe(1);
    expect(TextSimilarity.jaroWinkler("", "abc")).toBe(0);
    expect(TextSimilarity.jaroWinkler("abc", "")).toBe(0);
  });

  it("calculates cosine similarity", () => {
    expect(TextSimilarity.cosine("hello", "hello")).toBeCloseTo(1);
    expect(TextSimilarity.cosine("abc", "xyz")).toBe(0);
    expect(TextSimilarity.cosine("aab", "aac")).toBeGreaterThan(0.5);
  });

  it("calculates jaccard similarity", () => {
    expect(TextSimilarity.jaccard("the cat", "the cat")).toBe(1);
    expect(TextSimilarity.jaccard("the cat", "the dog")).toBeCloseTo(1 / 3);
  });

  it("calculates hamming distance", () => {
    expect(TextSimilarity.hammingDistance("karolin", "kathrin")).toBe(3);
    expect(TextSimilarity.hammingDistance("abc", "abc")).toBe(0);
  });

  it("throws for unequal length hamming", () => {
    expect(() => TextSimilarity.hammingDistance("ab", "abc")).toThrow();
  });

  it("finds longest common subsequence", () => {
    expect(TextSimilarity.longestCommonSubsequence("abcde", "ace")).toBe("ace");
    expect(TextSimilarity.longestCommonSubsequence("abc", "abc")).toBe("abc");
    expect(TextSimilarity.longestCommonSubsequence("abc", "xyz")).toBe("");
  });

  it("handles empty strings", () => {
    expect(TextSimilarity.levenshtein("", "")).toBe(0);
    expect(TextSimilarity.longestCommonSubsequence("", "abc")).toBe("");
  });

  it("handles single character strings", () => {
    expect(TextSimilarity.levenshtein("a", "b")).toBe(1);
    expect(TextSimilarity.jaroWinkler("a", "a")).toBe(1);
  });
});
