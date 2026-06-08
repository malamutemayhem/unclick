import { describe, it, expect } from "vitest";
import { simpleHash, shingles, jaccardSimilarity, fingerprint, similarity, isDuplicate, findDuplicates } from "../content-fingerprint.js";

describe("simpleHash", () => {
  it("returns consistent results", () => {
    expect(simpleHash("hello")).toBe(simpleHash("hello"));
  });

  it("returns different results for different inputs", () => {
    expect(simpleHash("hello")).not.toBe(simpleHash("world"));
  });

  it("returns non-negative", () => {
    expect(simpleHash("test")).toBeGreaterThanOrEqual(0);
  });
});

describe("shingles", () => {
  it("creates word n-grams", () => {
    const s = shingles("the quick brown fox jumps", 2);
    expect(s.has("the quick")).toBe(true);
    expect(s.has("quick brown")).toBe(true);
    expect(s.size).toBe(4);
  });

  it("handles short text", () => {
    expect(shingles("hello", 2).size).toBe(0);
    expect(shingles("hello world", 2).size).toBe(1);
  });
});

describe("jaccardSimilarity", () => {
  it("identical sets return 1", () => {
    const s = new Set(["a", "b"]);
    expect(jaccardSimilarity(s, s)).toBe(1);
  });

  it("disjoint sets return 0", () => {
    expect(jaccardSimilarity(new Set(["a"]), new Set(["b"]))).toBe(0);
  });

  it("empty sets return 1", () => {
    expect(jaccardSimilarity(new Set(), new Set())).toBe(1);
  });

  it("partial overlap", () => {
    const a = new Set(["a", "b", "c"]);
    const b = new Set(["b", "c", "d"]);
    expect(jaccardSimilarity(a, b)).toBe(0.5);
  });
});

describe("fingerprint", () => {
  it("returns sorted hashes", () => {
    const fp = fingerprint("the quick brown fox jumps over the lazy dog");
    expect(fp.length).toBeGreaterThan(0);
    for (let i = 1; i < fp.length; i++) {
      expect(fp[i]).toBeGreaterThanOrEqual(fp[i - 1]);
    }
  });
});

describe("similarity", () => {
  it("identical fingerprints return 1", () => {
    const fp = fingerprint("hello world foo bar");
    expect(similarity(fp, fp)).toBe(1);
  });

  it("different texts return lower similarity", () => {
    const fp1 = fingerprint("the quick brown fox jumps");
    const fp2 = fingerprint("completely different unrelated text here");
    expect(similarity(fp1, fp2)).toBeLessThan(0.5);
  });
});

describe("isDuplicate", () => {
  it("detects near-duplicate texts", () => {
    const a = "the quick brown fox jumps over the lazy dog near the river bank today";
    const b = "the quick brown fox jumps over the lazy cat near the river bank today";
    expect(isDuplicate(a, b, 0.4)).toBe(true);
  });

  it("rejects different texts", () => {
    const a = "the quick brown fox";
    const b = "completely unrelated content here today";
    expect(isDuplicate(a, b, 0.5)).toBe(false);
  });
});

describe("findDuplicates", () => {
  it("finds duplicate pairs", () => {
    const texts = [
      "the quick brown fox jumps over the lazy dog near the river bank today",
      "completely different text about something else entirely here now",
      "the quick brown fox jumps over the lazy cat near the river bank today",
    ];
    const pairs = findDuplicates(texts, 0.4);
    expect(pairs.length).toBeGreaterThan(0);
    expect(pairs.some(([i, j]) => (i === 0 && j === 2) || (i === 2 && j === 0))).toBe(true);
  });

  it("returns empty for unique texts", () => {
    const texts = [
      "alpha beta gamma delta epsilon",
      "one two three four five six seven",
      "red green blue yellow purple orange",
    ];
    expect(findDuplicates(texts, 0.8)).toEqual([]);
  });
});
