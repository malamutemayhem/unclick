import { describe, it, expect } from "vitest";
import { BVHTree } from "../bvh-tree.js";

describe("BVHTree", () => {
  const items = [
    { id: 0, bounds: { minX: 0, minY: 0, maxX: 2, maxY: 2 } },
    { id: 1, bounds: { minX: 5, minY: 5, maxX: 7, maxY: 7 } },
    { id: 2, bounds: { minX: 10, minY: 10, maxX: 12, maxY: 12 } },
    { id: 3, bounds: { minX: 1, minY: 1, maxX: 3, maxY: 3 } },
    { id: 4, bounds: { minX: 20, minY: 20, maxX: 22, maxY: 22 } },
  ];

  it("build creates tree", () => {
    const bvh = new BVHTree();
    bvh.build(items);
    expect(bvh.root).not.toBeNull();
  });

  it("query finds overlapping items", () => {
    const bvh = new BVHTree();
    bvh.build(items);
    const results = bvh.query({ minX: 0, minY: 0, maxX: 3, maxY: 3 });
    const ids = results.map(r => r.id).sort();
    expect(ids).toContain(0);
    expect(ids).toContain(3);
  });

  it("query returns empty for non-overlapping range", () => {
    const bvh = new BVHTree();
    bvh.build(items);
    const results = bvh.query({ minX: 50, minY: 50, maxX: 60, maxY: 60 });
    expect(results.length).toBe(0);
  });

  it("queryPoint finds items containing point", () => {
    const bvh = new BVHTree();
    bvh.build(items);
    const results = bvh.queryPoint(1, 1);
    const ids = results.map(r => r.id);
    expect(ids).toContain(0);
    expect(ids).toContain(3);
  });

  it("depth returns positive value", () => {
    const bvh = new BVHTree();
    bvh.build(items);
    expect(bvh.depth()).toBeGreaterThan(0);
  });

  it("combineBounds merges correctly", () => {
    const a = { minX: 0, minY: 0, maxX: 5, maxY: 5 };
    const b = { minX: 3, minY: 3, maxX: 10, maxY: 10 };
    const c = BVHTree.combineBounds(a, b);
    expect(c.minX).toBe(0);
    expect(c.minY).toBe(0);
    expect(c.maxX).toBe(10);
    expect(c.maxY).toBe(10);
  });

  it("boundsOverlap detects intersection", () => {
    expect(BVHTree.boundsOverlap(
      { minX: 0, minY: 0, maxX: 5, maxY: 5 },
      { minX: 3, minY: 3, maxX: 8, maxY: 8 },
    )).toBe(true);
  });

  it("boundsArea computes correctly", () => {
    expect(BVHTree.boundsArea({ minX: 0, minY: 0, maxX: 4, maxY: 5 })).toBe(20);
  });

  it("empty tree returns 0 depth", () => {
    const bvh = new BVHTree();
    expect(bvh.depth()).toBe(0);
  });
});
