import { describe, it, expect } from "vitest";
import { RabinKarp } from "../rabin-karp.js";

describe("RabinKarp", () => {
  it("finds pattern in text", () => {
    expect(RabinKarp.search("abcabcabc", "abc")).toEqual([0, 3, 6]);
  });

  it("returns empty for no match", () => {
    expect(RabinKarp.search("hello", "xyz")).toEqual([]);
  });

  it("handles single character pattern", () => {
    expect(RabinKarp.search("aaba", "a")).toEqual([0, 1, 3]);
  });

  it("handles pattern longer than text", () => {
    expect(RabinKarp.search("ab", "abcd")).toEqual([]);
  });

  it("searchMultiple finds all patterns", () => {
    const results = RabinKarp.searchMultiple("abcdef", ["abc", "def", "xyz"]);
    expect(results.get("abc")).toEqual([0]);
    expect(results.get("def")).toEqual([3]);
    expect(results.get("xyz")).toEqual([]);
  });

  it("hash is deterministic", () => {
    expect(RabinKarp.hash("hello")).toBe(RabinKarp.hash("hello"));
  });

  it("rollingHashes returns correct count", () => {
    const hashes = RabinKarp.rollingHashes("abcdef", 3);
    expect(hashes.length).toBe(4);
  });

  it("overlapping matches", () => {
    expect(RabinKarp.search("aaaa", "aa")).toEqual([0, 1, 2]);
  });
});
