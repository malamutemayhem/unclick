import { describe, it, expect } from "vitest";
import { IntervalTree } from "../interval-tree.js";

describe("IntervalTree", () => {
  it("search finds intervals containing a point", () => {
    const tree = new IntervalTree();
    tree.insert({ low: 1, high: 5 });
    tree.insert({ low: 3, high: 8 });
    tree.insert({ low: 10, high: 15 });
    const at4 = tree.search(4);
    expect(at4.length).toBe(2);
    const at12 = tree.search(12);
    expect(at12.length).toBe(1);
    expect(at12[0].interval).toEqual({ low: 10, high: 15 });
  });

  it("search returns empty for no match", () => {
    const tree = new IntervalTree();
    tree.insert({ low: 1, high: 3 });
    expect(tree.search(5)).toEqual([]);
  });

  it("overlap finds overlapping intervals", () => {
    const tree = new IntervalTree();
    tree.insert({ low: 1, high: 5 });
    tree.insert({ low: 6, high: 10 });
    tree.insert({ low: 8, high: 12 });
    const result = tree.overlap({ low: 4, high: 7 });
    expect(result.length).toBe(2);
  });

  it("stores data with intervals", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 0, high: 10 }, "first");
    tree.insert({ low: 5, high: 15 }, "second");
    const results = tree.search(7);
    const dataValues = results.map((r) => r.data).sort();
    expect(dataValues).toEqual(["first", "second"]);
  });

  it("size tracks insertions", () => {
    const tree = new IntervalTree();
    expect(tree.size).toBe(0);
    tree.insert({ low: 1, high: 2 });
    tree.insert({ low: 3, high: 4 });
    expect(tree.size).toBe(2);
  });

  it("all returns all intervals", () => {
    const tree = new IntervalTree();
    tree.insert({ low: 5, high: 10 });
    tree.insert({ low: 1, high: 3 });
    expect(tree.all().length).toBe(2);
  });

  it("handles boundary points", () => {
    const tree = new IntervalTree();
    tree.insert({ low: 5, high: 10 });
    expect(tree.search(5).length).toBe(1);
    expect(tree.search(10).length).toBe(1);
    expect(tree.search(4).length).toBe(0);
    expect(tree.search(11).length).toBe(0);
  });
});
