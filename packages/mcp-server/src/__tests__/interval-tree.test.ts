import { describe, it, expect } from "vitest";
import { IntervalTree } from "../interval-tree.js";

describe("interval-tree", () => {
  it("search finds intervals containing a point", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 1, high: 5 }, "a");
    tree.insert({ low: 3, high: 8 }, "b");
    tree.insert({ low: 10, high: 15 }, "c");
    const results = tree.search(4);
    expect(results.map((r) => r.value).sort()).toEqual(["a", "b"]);
  });

  it("search returns empty for no match", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 1, high: 5 }, "a");
    expect(tree.search(6)).toEqual([]);
  });

  it("overlap finds intersecting intervals", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 1, high: 5 }, "a");
    tree.insert({ low: 6, high: 10 }, "b");
    tree.insert({ low: 4, high: 7 }, "c");
    const results = tree.overlap({ low: 3, high: 6 });
    expect(results.map((r) => r.value).sort()).toEqual(["a", "b", "c"]);
  });

  it("all returns all intervals", () => {
    const tree = new IntervalTree<number>();
    tree.insert({ low: 1, high: 5 }, 1);
    tree.insert({ low: 3, high: 8 }, 2);
    expect(tree.all().length).toBe(2);
  });

  it("size tracks insertions", () => {
    const tree = new IntervalTree<string>();
    expect(tree.size).toBe(0);
    tree.insert({ low: 0, high: 10 }, "x");
    expect(tree.size).toBe(1);
  });

  it("search at boundary is inclusive", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 5, high: 10 }, "a");
    expect(tree.search(5).length).toBe(1);
    expect(tree.search(10).length).toBe(1);
  });
});
