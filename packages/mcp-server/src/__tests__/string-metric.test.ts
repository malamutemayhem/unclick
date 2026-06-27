import { describe, it, expect } from "vitest";
import { hammingDistance, jaroSimilarity, jaroWinklerSimilarity, longestCommonSubstring, longestCommonSubsequence } from "../string-metric.js";

describe("hammingDistance", () => {
  it("identical strings return 0", () => {
    expect(hammingDistance("abc", "abc")).toBe(0);
  });

  it("counts differing positions", () => {
    expect(hammingDistance("karolin", "kathrin")).toBe(3);
  });

  it("throws on length mismatch", () => {
    expect(() => hammingDistance("ab", "abc")).toThrow("equal length");
  });
});

describe("jaroSimilarity", () => {
  it("identical returns 1", () => {
    expect(jaroSimilarity("abc", "abc")).toBe(1);
  });

  it("empty vs non-empty returns 0", () => {
    expect(jaroSimilarity("", "abc")).toBe(0);
  });

  it("both empty returns 1", () => {
    expect(jaroSimilarity("", "")).toBe(1);
  });

  it("similar strings return high score", () => {
    const sim = jaroSimilarity("martha", "marhta");
    expect(sim).toBeGreaterThan(0.9);
  });

  it("different strings return low score", () => {
    const sim = jaroSimilarity("abc", "xyz");
    expect(sim).toBeLessThan(0.3);
  });
});

describe("jaroWinklerSimilarity", () => {
  it("identical returns 1", () => {
    expect(jaroWinklerSimilarity("test", "test")).toBe(1);
  });

  it("shared prefix boosts score", () => {
    const jaro = jaroSimilarity("martha", "marhta");
    const jw = jaroWinklerSimilarity("martha", "marhta");
    expect(jw).toBeGreaterThanOrEqual(jaro);
  });
});

describe("longestCommonSubstring", () => {
  it("finds longest common substring", () => {
    expect(longestCommonSubstring("abcdef", "zbcdf")).toBe("bcd");
  });

  it("returns empty for no common chars", () => {
    expect(longestCommonSubstring("abc", "xyz")).toBe("");
  });

  it("identical strings return full string", () => {
    expect(longestCommonSubstring("hello", "hello")).toBe("hello");
  });
});

describe("longestCommonSubsequence", () => {
  it("finds LCS", () => {
    expect(longestCommonSubsequence("abcde", "ace")).toBe("ace");
  });

  it("returns empty for no common", () => {
    expect(longestCommonSubsequence("abc", "xyz")).toBe("");
  });

  it("identical returns full", () => {
    expect(longestCommonSubsequence("hello", "hello")).toBe("hello");
  });
});
