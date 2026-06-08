import { describe, it, expect } from "vitest";
import { InvertedIndex } from "../inverted-index.js";

describe("InvertedIndex", () => {
  function makeIndex() {
    const idx = new InvertedIndex();
    idx.add("d1", "the quick brown fox");
    idx.add("d2", "the lazy brown dog");
    idx.add("d3", "quick fox jumps high");
    return idx;
  }

  it("search finds documents with all terms (AND)", () => {
    const idx = makeIndex();
    expect(idx.search("quick fox")).toEqual(expect.arrayContaining(["d1", "d3"]));
    expect(idx.search("quick fox")).not.toContain("d2");
  });

  it("searchAny finds documents with any term (OR)", () => {
    const idx = makeIndex();
    const results = idx.searchAny("dog fox");
    expect(results).toContain("d1");
    expect(results).toContain("d2");
    expect(results).toContain("d3");
  });

  it("returns empty for unmatched terms", () => {
    const idx = makeIndex();
    expect(idx.search("elephant")).toEqual([]);
  });

  it("searchRanked sorts by relevance", () => {
    const idx = makeIndex();
    const results = idx.searchRanked("quick brown fox");
    expect(results[0].docId).toBe("d1");
    expect(results[0].score).toBeGreaterThan(results[1].score);
  });

  it("remove deletes document from index", () => {
    const idx = makeIndex();
    idx.remove("d1");
    expect(idx.search("quick fox")).not.toContain("d1");
    expect(idx.documentCount).toBe(2);
  });

  it("tracks document and term counts", () => {
    const idx = makeIndex();
    expect(idx.documentCount).toBe(3);
    expect(idx.termCount).toBeGreaterThan(0);
  });

  it("getDocument retrieves original text", () => {
    const idx = makeIndex();
    expect(idx.getDocument("d1")).toBe("the quick brown fox");
  });

  it("clear empties index", () => {
    const idx = makeIndex();
    idx.clear();
    expect(idx.documentCount).toBe(0);
    expect(idx.termCount).toBe(0);
  });

  it("handles empty query", () => {
    const idx = makeIndex();
    expect(idx.search("")).toEqual([]);
  });
});
