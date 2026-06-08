import { describe, it, expect } from "vitest";
import { IntervalTree } from "../interval-tree.js";

describe("IntervalTree", () => {
  it("inserts and queries by point", () => {
    const tree = new IntervalTree<string>();
    tree.insert(1, 5, "a");
    tree.insert(3, 8, "b");
    tree.insert(10, 15, "c");
    const hits = tree.query(4);
    expect(hits.length).toBe(2);
    expect(hits.map((h) => h.value).sort()).toEqual(["a", "b"]);
  });

  it("query at boundary is inclusive", () => {
    const tree = new IntervalTree<string>();
    tree.insert(5, 10, "x");
    expect(tree.query(5).length).toBe(1);
    expect(tree.query(10).length).toBe(1);
    expect(tree.query(4).length).toBe(0);
    expect(tree.query(11).length).toBe(0);
  });

  it("queryRange finds overlapping intervals", () => {
    const tree = new IntervalTree<string>();
    tree.insert(1, 3, "a");
    tree.insert(5, 8, "b");
    tree.insert(10, 15, "c");
    const result = tree.queryRange(2, 6);
    expect(result.length).toBe(2);
    expect(result.map((r) => r.value).sort()).toEqual(["a", "b"]);
  });

  it("remove deletes an entry", () => {
    const tree = new IntervalTree<string>();
    tree.insert(1, 5, "a");
    tree.insert(3, 8, "b");
    expect(tree.length).toBe(2);
    expect(tree.remove("a")).toBe(true);
    expect(tree.length).toBe(1);
    expect(tree.query(2).length).toBe(0);
  });

  it("remove returns false for missing", () => {
    const tree = new IntervalTree<string>();
    expect(tree.remove("x")).toBe(false);
  });

  it("overlaps checks for any overlap", () => {
    const tree = new IntervalTree<string>();
    tree.insert(5, 10, "a");
    expect(tree.overlaps(8, 12)).toBe(true);
    expect(tree.overlaps(11, 15)).toBe(false);
  });

  it("all returns copy", () => {
    const tree = new IntervalTree<number>();
    tree.insert(0, 1, 42);
    expect(tree.all().length).toBe(1);
    expect(tree.all()[0].value).toBe(42);
  });

  it("clear empties tree", () => {
    const tree = new IntervalTree<string>();
    tree.insert(0, 10, "a");
    tree.clear();
    expect(tree.length).toBe(0);
  });
});
