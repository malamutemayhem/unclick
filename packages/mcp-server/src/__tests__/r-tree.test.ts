import { describe, it, expect } from "vitest";
import { RTree } from "../r-tree.js";

describe("RTree", () => {
  it("insert and search finds matching entries", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10 }, "a");
    tree.insert({ minX: 20, minY: 20, maxX: 30, maxY: 30 }, "b");
    const results = tree.search({ minX: 5, minY: 5, maxX: 15, maxY: 15 });
    expect(results.length).toBe(1);
    expect(results[0].data).toBe("a");
  });

  it("search returns empty for non-overlapping region", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 5, maxY: 5 }, "x");
    const results = tree.search({ minX: 100, minY: 100, maxX: 200, maxY: 200 });
    expect(results.length).toBe(0);
  });

  it("size tracks insertions", () => {
    const tree = new RTree<number>();
    tree.insert({ minX: 0, minY: 0, maxX: 1, maxY: 1 }, 1);
    tree.insert({ minX: 2, minY: 2, maxX: 3, maxY: 3 }, 2);
    expect(tree.size()).toBe(2);
  });

  it("all returns every entry", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 1, maxY: 1 }, "a");
    tree.insert({ minX: 5, minY: 5, maxX: 6, maxY: 6 }, "b");
    const all = tree.all();
    expect(all.length).toBe(2);
  });

  it("bounds returns the bounding rectangle", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10 }, "a");
    tree.insert({ minX: 20, minY: 20, maxX: 30, maxY: 30 }, "b");
    const b = tree.bounds();
    expect(b.minX).toBe(0);
    expect(b.maxX).toBe(30);
  });

  it("search finds all overlapping entries", () => {
    const tree = new RTree<number>();
    tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10 }, 1);
    tree.insert({ minX: 5, minY: 5, maxX: 15, maxY: 15 }, 2);
    tree.insert({ minX: 20, minY: 20, maxX: 25, maxY: 25 }, 3);
    const results = tree.search({ minX: 4, minY: 4, maxX: 12, maxY: 12 });
    expect(results.length).toBe(2);
  });

  it("handles many insertions without error", () => {
    const tree = new RTree<number>(4);
    for (let i = 0; i < 50; i++) {
      tree.insert({ minX: i, minY: i, maxX: i + 1, maxY: i + 1 }, i);
    }
    expect(tree.size()).toBe(50);
    expect(tree.all().length).toBe(50);
  });

  it("point search works", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 5, minY: 5, maxX: 10, maxY: 10 }, "target");
    const results = tree.search({ minX: 7, minY: 7, maxX: 7, maxY: 7 });
    expect(results.length).toBe(1);
  });
});
