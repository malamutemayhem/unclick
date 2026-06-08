import { describe, it, expect } from "vitest";
import { KMPSearch } from "../kmp-search.js";

describe("KMPSearch", () => {
  it("search finds all pattern occurrences", () => {
    const kmp = new KMPSearch("aba");
    expect(kmp.search("abababa")).toEqual([0, 2, 4]);
  });

  it("search returns empty for no match", () => {
    const kmp = new KMPSearch("xyz");
    expect(kmp.search("abcdef")).toEqual([]);
  });

  it("firstMatch returns first occurrence", () => {
    const kmp = new KMPSearch("cd");
    expect(kmp.firstMatch("abcdef")).toBe(2);
  });

  it("firstMatch returns -1 when not found", () => {
    const kmp = new KMPSearch("xyz");
    expect(kmp.firstMatch("abc")).toBe(-1);
  });

  it("count returns number of matches", () => {
    const kmp = new KMPSearch("ab");
    expect(kmp.count("ababab")).toBe(3);
  });

  it("getFailureTable returns correct table", () => {
    const kmp = new KMPSearch("abcabd");
    expect(kmp.getFailureTable()).toEqual([0, 0, 0, 1, 2, 0]);
  });

  it("static findAll works", () => {
    expect(KMPSearch.findAll("aabaabaab", "aab")).toEqual([0, 3, 6]);
  });

  it("static contains works", () => {
    expect(KMPSearch.contains("hello world", "world")).toBe(true);
    expect(KMPSearch.contains("hello world", "xyz")).toBe(false);
  });

  it("longestPrefixSuffix computes correctly", () => {
    expect(KMPSearch.longestPrefixSuffix("abcabc")).toBe(3);
    expect(KMPSearch.longestPrefixSuffix("abcdef")).toBe(0);
  });
});
