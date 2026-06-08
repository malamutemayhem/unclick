import { describe, it, expect } from "vitest";
import { ngrams, ngramSet, cosineSimilarity, diceCoefficient, overlapCoefficient } from "../ngram-similarity.js";

describe("ngrams", () => {
  it("generates character bigrams", () => {
    expect(ngrams("hello", 2)).toEqual(["he", "el", "ll", "lo"]);
  });

  it("generates trigrams", () => {
    expect(ngrams("abcd", 3)).toEqual(["abc", "bcd"]);
  });

  it("lowercases input", () => {
    expect(ngrams("AB", 2)).toEqual(["ab"]);
  });

  it("returns empty for short input", () => {
    expect(ngrams("a", 2)).toEqual([]);
  });
});

describe("ngramSet", () => {
  it("returns unique ngrams", () => {
    const s = ngramSet("aaa", 2);
    expect(s.size).toBe(1);
    expect(s.has("aa")).toBe(true);
  });
});

describe("cosineSimilarity", () => {
  it("identical strings return 1", () => {
    expect(cosineSimilarity("hello", "hello")).toBe(1);
  });

  it("completely different strings return low value", () => {
    expect(cosineSimilarity("abc", "xyz")).toBe(0);
  });

  it("similar strings return high value", () => {
    const sim = cosineSimilarity("hello world", "hello there");
    expect(sim).toBeGreaterThan(0.2);
    expect(sim).toBeLessThan(1);
  });

  it("handles empty strings", () => {
    expect(cosineSimilarity("", "")).toBe(0);
  });
});

describe("diceCoefficient", () => {
  it("identical strings return 1", () => {
    expect(diceCoefficient("night", "night")).toBe(1);
  });

  it("no shared bigrams return 0", () => {
    expect(diceCoefficient("ab", "cd")).toBe(0);
  });

  it("partial overlap returns between 0 and 1", () => {
    const d = diceCoefficient("night", "nacht");
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThan(1);
  });
});

describe("overlapCoefficient", () => {
  it("identical strings return 1", () => {
    expect(overlapCoefficient("test", "test")).toBe(1);
  });

  it("substring has high overlap", () => {
    const o = overlapCoefficient("ab", "abc");
    expect(o).toBeGreaterThan(0.5);
  });

  it("no shared bigrams return 0", () => {
    expect(overlapCoefficient("ab", "cd")).toBe(0);
  });
});
