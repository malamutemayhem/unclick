import { describe, it, expect } from "vitest";
import { KDTree } from "../kd-tree.js";

describe("KDTree", () => {
  const points = [
    { coords: [2, 3] },
    { coords: [5, 4] },
    { coords: [9, 6] },
    { coords: [4, 7] },
    { coords: [8, 1] },
    { coords: [7, 2] },
  ];

  it("finds nearest neighbor", () => {
    const tree = new KDTree(points, 2);
    const result = tree.nearest([5, 5]);
    expect(result).not.toBeNull();
    expect(result!.coords).toEqual([5, 4]);
  });

  it("finds exact match", () => {
    const tree = new KDTree(points, 2);
    const result = tree.nearest([9, 6]);
    expect(result!.coords).toEqual([9, 6]);
  });

  it("returns null for empty tree", () => {
    const tree = new KDTree([], 2);
    expect(tree.nearest([0, 0])).toBeNull();
  });

  it("finds k nearest neighbors", () => {
    const tree = new KDTree(points, 2);
    const result = tree.kNearest([5, 5], 3);
    expect(result).toHaveLength(3);
    expect(result[0].coords).toEqual([5, 4]);
  });

  it("kNearest returns all if k > size", () => {
    const tree = new KDTree(points, 2);
    const result = tree.kNearest([5, 5], 100);
    expect(result).toHaveLength(points.length);
  });

  it("performs range search", () => {
    const tree = new KDTree(points, 2);
    const result = tree.rangeSearch([3, 2], [6, 5]);
    expect(result.length).toBeGreaterThan(0);
    for (const p of result) {
      expect(p.coords[0]).toBeGreaterThanOrEqual(3);
      expect(p.coords[0]).toBeLessThanOrEqual(6);
      expect(p.coords[1]).toBeGreaterThanOrEqual(2);
      expect(p.coords[1]).toBeLessThanOrEqual(5);
    }
  });

  it("reports dimensions", () => {
    const tree = new KDTree([], 3);
    expect(tree.dimensions).toBe(3);
  });

  it("works with 3D points", () => {
    const pts = [
      { coords: [1, 1, 1] },
      { coords: [2, 2, 2] },
      { coords: [3, 3, 3] },
    ];
    const tree = new KDTree(pts, 3);
    const result = tree.nearest([2, 2, 2]);
    expect(result!.coords).toEqual([2, 2, 2]);
  });

  it("single point tree", () => {
    const tree = new KDTree([{ coords: [5, 5] }], 2);
    expect(tree.nearest([0, 0])!.coords).toEqual([5, 5]);
  });
});
