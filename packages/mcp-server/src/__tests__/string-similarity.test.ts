import { describe, it, expect } from "vitest";
import { jaccardSimilarity, diceCoefficient, longestCommonSubstring, hammingDistance } from "../string-similarity.js";

describe("string-similarity", () => {
  describe("jaccardSimilarity", () => {
    it("identical strings return 1", () => {
      expect(jaccardSimilarity("hello", "hello")).toBe(1);
    });

    it("completely different strings approach 0", () => {
      expect(jaccardSimilarity("abc", "xyz")).toBe(0);
    });

    it("empty strings return 1", () => {
      expect(jaccardSimilarity("", "")).toBe(1);
    });

    it("similar strings score between 0 and 1", () => {
      const score = jaccardSimilarity("hello", "hallo");
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThan(1);
    });
  });

  describe("diceCoefficient", () => {
    it("identical strings return 1", () => {
      expect(diceCoefficient("hello", "hello")).toBe(1);
    });

    it("empty strings return 1", () => {
      expect(diceCoefficient("", "")).toBe(1);
    });

    it("different strings return 0", () => {
      expect(diceCoefficient("abc", "xyz")).toBe(0);
    });
  });

  describe("longestCommonSubstring", () => {
    it("finds common substring", () => {
      expect(longestCommonSubstring("abcdef", "xbcdey")).toBe("bcde");
    });

    it("returns empty for no overlap", () => {
      expect(longestCommonSubstring("abc", "xyz")).toBe("");
    });

    it("returns empty for empty input", () => {
      expect(longestCommonSubstring("", "abc")).toBe("");
    });

    it("full match", () => {
      expect(longestCommonSubstring("abc", "abc")).toBe("abc");
    });
  });

  describe("hammingDistance", () => {
    it("zero distance for identical strings", () => {
      expect(hammingDistance("abc", "abc")).toBe(0);
    });

    it("counts differing positions", () => {
      expect(hammingDistance("karolin", "kathrin")).toBe(3);
    });

    it("throws for different lengths", () => {
      expect(() => hammingDistance("ab", "abc")).toThrow("same length");
    });
  });
});
