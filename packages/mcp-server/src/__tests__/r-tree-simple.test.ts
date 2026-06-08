import { describe, it, expect } from "vitest";
import { RTreeSimple } from "../r-tree-simple.js";

describe("RTreeSimple", () => {
  it("inserts and searches", () => {
    const tree = new RTreeSimple<string>(4);
    tree.insert({ minX: 0, minY: 0, maxX: 10, maxY: 10 }, "a");
    tree.insert({ minX: 20, minY: 20, maxX: 30, maxY: 30 }, "b");
    const results = tree.search({ minX: 5, minY: 5, maxX: 25, maxY: 25 });
    expect(results).toContain("a");
    expect(results).toContain("b");
  });

  it("search filters non-intersecting", () => {
    const tree = new RTreeSimple<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 5, maxY: 5 }, "a");
    tree.insert({ minX: 50, minY: 50, maxX: 55, maxY: 55 }, "b");
    const results = tree.search({ minX: 0, minY: 0, maxX: 10, maxY: 10 });
    expect(results).toContain("a");
    expect(results).not.toContain("b");
  });

  it("tracks size", () => {
    const tree = new RTreeSimple<number>();
    tree.insert({ minX: 0, minY: 0, maxX: 1, maxY: 1 }, 1);
    tree.insert({ minX: 2, minY: 2, maxX: 3, maxY: 3 }, 2);
    expect(tree.size).toBe(2);
  });

  it("all returns all entries", () => {
    const tree = new RTreeSimple<string>();
    tree.insert({ minX: 0, minY: 0, maxX: 1, maxY: 1 }, "x");
    tree.insert({ minX: 5, minY: 5, maxX: 6, maxY: 6 }, "y");
    const all = tree.all();
    expect(all.length).toBe(2);
    expect(all).toContain("x");
    expect(all).toContain("y");
  });

  it("updates bounds after insert", () => {
    const tree = new RTreeSimple<string>();
    tree.insert({ minX: 10, minY: 10, maxX: 20, maxY: 20 }, "a");
    const b = tree.bounds;
    expect(b.minX).toBe(10);
    expect(b.maxX).toBe(20);
  });

  it("handles many insertions with splitting", () => {
    const tree = new RTreeSimple<number>(2);
    for (let i = 0; i < 10; i++) {
      tree.insert({ minX: i * 10, minY: i * 10, maxX: i * 10 + 5, maxY: i * 10 + 5 }, i);
    }
    expect(tree.size).toBe(10);
    expect(tree.all().length).toBe(10);
  });

  it("search on empty tree returns empty", () => {
    const tree = new RTreeSimple<string>();
    expect(tree.search({ minX: 0, minY: 0, maxX: 100, maxY: 100 })).toEqual([]);
  });
});
