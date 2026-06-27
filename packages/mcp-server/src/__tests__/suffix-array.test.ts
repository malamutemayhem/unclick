import { describe, it, expect } from "vitest";
import { SuffixArray } from "../suffix-array.js";

describe("suffix-array", () => {
  it("builds from text", () => {
    const sa = new SuffixArray("banana");
    expect(sa.length).toBe(6);
  });

  it("search finds all occurrences", () => {
    const sa = new SuffixArray("banana");
    const positions = sa.search("an");
    expect(positions).toEqual([1, 3]);
  });

  it("search returns empty for no match", () => {
    const sa = new SuffixArray("banana");
    expect(sa.search("xyz")).toEqual([]);
  });

  it("contains checks existence", () => {
    const sa = new SuffixArray("hello world");
    expect(sa.contains("world")).toBe(true);
    expect(sa.contains("xyz")).toBe(false);
  });

  it("count returns number of occurrences", () => {
    const sa = new SuffixArray("abcabc");
    expect(sa.count("abc")).toBe(2);
    expect(sa.count("xyz")).toBe(0);
  });

  it("at returns suffix at index", () => {
    const sa = new SuffixArray("abc");
    const suffixes = [sa.at(0), sa.at(1), sa.at(2)];
    suffixes.sort();
    expect(suffixes).toEqual(["abc", "bc", "c"]);
  });

  it("single char text", () => {
    const sa = new SuffixArray("a");
    expect(sa.search("a")).toEqual([0]);
    expect(sa.length).toBe(1);
  });
});
