import { describe, it, expect } from "vitest";
import { RTree } from "../rtree.js";

describe("RTree", () => {
  it("inserts and searches", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10 }, "a");
    const results = tree.search({ minX: 5, minY: 5, maxX: 15, maxY: 15 });
    expect(results).toHaveLength(1);
    expect(results[0].data).toBe("a");
  });

  it("search misses non-overlapping", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10 }, "a");
    const results = tree.search({ minX: 20, minY: 20, maxX: 30, maxY: 30 });
    expect(results).toHaveLength(0);
  });

  it("contains finds point inside rect", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10 }, "box");
    expect(tree.contains({ x: 5, y: 5 })).toHaveLength(1);
    expect(tree.contains({ x: 15, y: 15 })).toHaveLength(0);
  });

  it("size tracks insertions", () => {
    const tree = new RTree<number>();
    expect(tree.size).toBe(0);
    tree.insert({ minX: 0, minY: 0, maxX: 1, maxY: 1 }, 1);
    tree.insert({ minX: 2, minY: 2, maxX: 3, maxY: 3 }, 2);
    expect(tree.size).toBe(2);
  });

  it("handles many insertions", () => {
    const tree = new RTree<number>(4);
    for (let i = 0; i < 20; i++) {
      tree.insert({ minX: i * 10, minY: i * 10, maxX: i * 10 + 5, maxY: i * 10 + 5 }, i);
    }
    expect(tree.size).toBe(20);
    const results = tree.search({ minX: 0, minY: 0, maxX: 200, maxY: 200 });
    expect(results).toHaveLength(20);
  });

  it("all returns every entry", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 1, maxY: 1 }, "a");
    tree.insert({ minX: 5, minY: 5, maxX: 6, maxY: 6 }, "b");
    expect(tree.all()).toHaveLength(2);
  });

  it("bounds covers all entries", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10 }, "a");
    tree.insert({ minX: 20, minY: 20, maxX: 30, maxY: 30 }, "b");
    const b = tree.bounds;
    expect(b.minX).toBe(0);
    expect(b.maxX).toBe(30);
  });

  it("clear empties tree", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 1, maxY: 1 }, "a");
    tree.clear();
    expect(tree.size).toBe(0);
    expect(tree.all()).toHaveLength(0);
  });

  it("overlapping rects found in search", () => {
    const tree = new RTree<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10 }, "a");
    tree.insert({ minX: 5, minY: 5, maxX: 15, maxY: 15 }, "b");
    tree.insert({ minX: 20, minY: 20, maxX: 30, maxY: 30 }, "c");
    const results = tree.search({ minX: 8, minY: 8, maxX: 12, maxY: 12 });
    expect(results).toHaveLength(2);
  });

  it("triggers split with small maxEntries", () => {
    const tree = new RTree<number>(2);
    for (let i = 0; i < 10; i++) {
      tree.insert({ minX: i, minY: i, maxX: i + 1, maxY: i + 1 }, i);
    }
    expect(tree.size).toBe(10);
    expect(tree.all()).toHaveLength(10);
  });
});
