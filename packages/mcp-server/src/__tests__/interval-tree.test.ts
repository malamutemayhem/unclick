import { describe, it, expect } from "vitest";
import { IntervalTree } from "../interval-tree.js";

describe("IntervalTree", () => {
  it("inserts and queries overlapping intervals", () => {
    const tree = new IntervalTree();
    tree.insert(1, 5);
    tree.insert(3, 8);
    tree.insert(10, 15);
    const result = tree.query(4, 6);
    expect(result.length).toBe(2);
  });

  it("returns empty for non-overlapping query", () => {
    const tree = new IntervalTree();
    tree.insert(1, 3);
    tree.insert(5, 7);
    expect(tree.query(8, 10)).toEqual([]);
  });

  it("contains returns intervals at a point", () => {
    const tree = new IntervalTree();
    tree.insert(1, 10);
    tree.insert(5, 15);
    tree.insert(20, 25);
    const at7 = tree.contains(7);
    expect(at7.length).toBe(2);
    const at22 = tree.contains(22);
    expect(at22.length).toBe(1);
  });

  it("tracks size", () => {
    const tree = new IntervalTree();
    tree.insert(1, 5);
    tree.insert(3, 8);
    expect(tree.size).toBe(2);
  });

  it("toArray returns sorted intervals", () => {
    const tree = new IntervalTree();
    tree.insert(5, 10);
    tree.insert(1, 3);
    tree.insert(7, 12);
    const arr = tree.toArray();
    expect(arr.length).toBe(3);
    expect(arr[0].low).toBe(1);
  });

  it("handles single-point intervals", () => {
    const tree = new IntervalTree();
    tree.insert(5, 5);
    expect(tree.contains(5).length).toBe(1);
    expect(tree.contains(4)).toEqual([]);
  });
});
