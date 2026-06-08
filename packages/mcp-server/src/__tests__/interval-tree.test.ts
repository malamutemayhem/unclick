import { describe, it, expect } from "vitest";
import { IntervalTree } from "../interval-tree.js";

describe("IntervalTree", () => {
  it("insert and search by point", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ start: 1, end: 5 }, "a");
    tree.insert({ start: 3, end: 8 }, "b");
    tree.insert({ start: 10, end: 15 }, "c");
    const results = tree.search(4);
    expect(results.map((r) => r.data).sort()).toEqual(["a", "b"]);
  });

  it("search misses non-overlapping", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ start: 1, end: 3 }, "a");
    expect(tree.search(5)).toEqual([]);
  });

  it("overlap finds overlapping intervals", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ start: 1, end: 5 }, "a");
    tree.insert({ start: 6, end: 10 }, "b");
    tree.insert({ start: 4, end: 7 }, "c");
    const results = tree.overlap({ start: 3, end: 6 });
    expect(results.map((r) => r.data).sort()).toEqual(["a", "b", "c"]);
  });

  it("overlap returns empty for no matches", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ start: 1, end: 3 }, "a");
    expect(tree.overlap({ start: 5, end: 10 })).toEqual([]);
  });

  it("size tracks count", () => {
    const tree = new IntervalTree<string>();
    expect(tree.size).toBe(0);
    tree.insert({ start: 1, end: 5 }, "a");
    tree.insert({ start: 3, end: 8 }, "b");
    expect(tree.size).toBe(2);
  });

  it("all returns all entries", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ start: 1, end: 5 }, "a");
    tree.insert({ start: 3, end: 8 }, "b");
    expect(tree.all()).toHaveLength(2);
  });

  it("clear empties tree", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ start: 1, end: 5 }, "a");
    tree.clear();
    expect(tree.size).toBe(0);
    expect(tree.all()).toEqual([]);
  });

  it("search at boundary returns interval", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ start: 5, end: 10 }, "a");
    expect(tree.search(5)).toHaveLength(1);
    expect(tree.search(10)).toHaveLength(1);
  });
});
