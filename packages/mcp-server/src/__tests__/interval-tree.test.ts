import { describe, it, expect } from "vitest";
import { IntervalTree } from "../interval-tree.js";

describe("IntervalTree", () => {
  it("inserts and queries point", () => {
    const tree = new IntervalTree();
    tree.insert({ start: 1, end: 5 });
    tree.insert({ start: 3, end: 8 });
    tree.insert({ start: 10, end: 15 });
    const results = tree.query(4);
    expect(results).toHaveLength(2);
  });

  it("returns empty for miss", () => {
    const tree = new IntervalTree();
    tree.insert({ start: 1, end: 5 });
    expect(tree.query(6)).toHaveLength(0);
  });

  it("finds overlapping intervals", () => {
    const tree = new IntervalTree();
    tree.insert({ start: 1, end: 5 });
    tree.insert({ start: 3, end: 8 });
    tree.insert({ start: 10, end: 15 });
    const overlaps = tree.overlapping({ start: 4, end: 6 });
    expect(overlaps).toHaveLength(2);
  });

  it("tracks size", () => {
    const tree = new IntervalTree();
    tree.insert({ start: 1, end: 5 });
    tree.insert({ start: 3, end: 8 });
    expect(tree.size).toBe(2);
  });

  it("collects all intervals", () => {
    const tree = new IntervalTree();
    tree.insert({ start: 1, end: 5 });
    tree.insert({ start: 3, end: 8 });
    expect(tree.all()).toHaveLength(2);
  });

  it("throws on invalid interval", () => {
    const tree = new IntervalTree();
    expect(() => tree.insert({ start: 10, end: 5 })).toThrow("Invalid");
  });
});
