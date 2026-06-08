import { describe, it, expect } from "vitest";
import { ZAlgorithm } from "../z-algorithm.js";

describe("ZAlgorithm", () => {
  it("compute returns correct z-array", () => {
    const z = ZAlgorithm.compute("aabxaab");
    expect(z[0]).toBe(7);
    expect(z[4]).toBe(3);
  });

  it("search finds all pattern occurrences", () => {
    expect(ZAlgorithm.search("abcabcabc", "abc")).toEqual([0, 3, 6]);
  });

  it("search returns empty for no match", () => {
    expect(ZAlgorithm.search("hello", "xyz")).toEqual([]);
  });

  it("contains checks if pattern exists", () => {
    expect(ZAlgorithm.contains("hello world", "world")).toBe(true);
    expect(ZAlgorithm.contains("hello world", "xyz")).toBe(false);
  });

  it("count returns number of occurrences", () => {
    expect(ZAlgorithm.count("aaaa", "aa")).toBe(3);
  });

  it("longestRepeatedPrefix finds longest match", () => {
    expect(ZAlgorithm.longestRepeatedPrefix("abcabc")).toBe(3);
    expect(ZAlgorithm.longestRepeatedPrefix("abcdef")).toBe(0);
  });

  it("matchLengths returns full z-array", () => {
    const z = ZAlgorithm.matchLengths("aaaa");
    expect(z).toEqual([4, 3, 2, 1]);
  });

  it("distinctSubstringCount counts unique substrings", () => {
    expect(ZAlgorithm.distinctSubstringCount("ab")).toBe(3);
    expect(ZAlgorithm.distinctSubstringCount("aaa")).toBe(3);
  });

  it("handles empty pattern", () => {
    expect(ZAlgorithm.search("hello", "")).toEqual([]);
  });
});
