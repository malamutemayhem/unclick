import { describe, it, expect } from "vitest";
import { levenshtein, damerauLevenshtein, jaroWinkler, similarity, hammingDistance } from "../string-distance.js";

describe("string-distance", () => {
  describe("levenshtein", () => {
    it("equal strings", () => { expect(levenshtein("abc", "abc")).toBe(0); });
    it("one insertion", () => { expect(levenshtein("abc", "abcd")).toBe(1); });
    it("one deletion", () => { expect(levenshtein("abcd", "abc")).toBe(1); });
    it("one substitution", () => { expect(levenshtein("abc", "adc")).toBe(1); });
    it("kitten/sitting", () => { expect(levenshtein("kitten", "sitting")).toBe(3); });
  });
  describe("damerauLevenshtein", () => {
    it("handles transposition", () => { expect(damerauLevenshtein("ab", "ba")).toBe(1); });
    it("equal strings", () => { expect(damerauLevenshtein("abc", "abc")).toBe(0); });
  });
  describe("jaroWinkler", () => {
    it("identical strings = 1", () => { expect(jaroWinkler("abc", "abc")).toBe(1); });
    it("different strings < 1", () => { expect(jaroWinkler("abc", "xyz")).toBeLessThan(1); });
    it("empty string = 0", () => { expect(jaroWinkler("abc", "")).toBe(0); });
    it("similar strings > 0.8", () => { expect(jaroWinkler("martha", "marhta")).toBeGreaterThan(0.8); });
  });
  describe("similarity", () => {
    it("identical = 1", () => { expect(similarity("abc", "abc")).toBe(1); });
    it("different < 1", () => { expect(similarity("abc", "xyz")).toBeLessThan(1); });
    it("empty = 1", () => { expect(similarity("", "")).toBe(1); });
  });
  describe("hammingDistance", () => {
    it("identical = 0", () => { expect(hammingDistance("abc", "abc")).toBe(0); });
    it("one diff = 1", () => { expect(hammingDistance("abc", "adc")).toBe(1); });
    it("throws on length mismatch", () => { expect(() => hammingDistance("ab", "abc")).toThrow(); });
  });
});
