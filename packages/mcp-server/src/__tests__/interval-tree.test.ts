import { describe, it, expect } from "vitest";
import { IntervalTree } from "../interval-tree.js";

describe("IntervalTree", () => {
  it("inserts and tracks size", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 1, high: 5 }, "a");
    tree.insert({ low: 3, high: 8 }, "b");
    expect(tree.size).toBe(2);
  });

  it("search finds intervals containing point", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 1, high: 5 }, "a");
    tree.insert({ low: 3, high: 8 }, "b");
    tree.insert({ low: 10, high: 15 }, "c");

    const results = tree.search(4);
    const values = results.map((r) => r.value).sort();
    expect(values).toEqual(["a", "b"]);
  });

  it("search returns empty for no match", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 1, high: 5 }, "a");
    expect(tree.search(6)).toEqual([]);
  });

  it("search matches boundary", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 5, high: 10 }, "a");
    expect(tree.search(5).length).toBe(1);
    expect(tree.search(10).length).toBe(1);
  });

  it("overlap finds intersecting intervals", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 1, high: 5 }, "a");
    tree.insert({ low: 6, high: 10 }, "b");
    tree.insert({ low: 4, high: 7 }, "c");

    const results = tree.overlap({ low: 4, high: 6 });
    const values = results.map((r) => r.value).sort();
    expect(values).toEqual(["a", "b", "c"]);
  });

  it("overlap returns empty for no intersection", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 1, high: 3 }, "a");
    expect(tree.overlap({ low: 5, high: 8 })).toEqual([]);
  });

  it("all returns everything in order", () => {
    const tree = new IntervalTree<string>();
    tree.insert({ low: 5, high: 10 }, "b");
    tree.insert({ low: 1, high: 3 }, "a");
    tree.insert({ low: 8, high: 15 }, "c");
    const all = tree.all();
    expect(all.length).toBe(3);
  });

  it("handles many intervals", () => {
    const tree = new IntervalTree<number>();
    for (let i = 0; i < 100; i++) {
      tree.insert({ low: i, high: i + 5 }, i);
    }
    expect(tree.size).toBe(100);
    const at50 = tree.search(50);
    expect(at50.length).toBeGreaterThan(0);
  });
});
