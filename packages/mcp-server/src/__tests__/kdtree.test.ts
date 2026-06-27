import { describe, it, expect } from "vitest";
import { KDTree } from "../kdtree.js";

describe("KDTree", () => {
  it("inserts and tracks size", () => {
    const tree = new KDTree(2);
    tree.insert([1, 2]);
    tree.insert([3, 4]);
    expect(tree.size).toBe(2);
  });

  it("finds nearest neighbor", () => {
    const tree = new KDTree(2);
    tree.insert([0, 0], "origin");
    tree.insert([10, 10], "far");
    tree.insert([1, 1], "close");
    const result = tree.nearest([0.9, 0.9], 1);
    expect(result).toHaveLength(1);
    expect(result[0].data).toBe("close");
  });

  it("finds k nearest neighbors", () => {
    const tree = new KDTree(2);
    tree.insert([0, 0]);
    tree.insert([1, 0]);
    tree.insert([2, 0]);
    tree.insert([10, 0]);
    const result = tree.nearest([0, 0], 3);
    expect(result).toHaveLength(3);
    expect(result[0].distance).toBe(0);
  });

  it("returns results sorted by distance", () => {
    const tree = new KDTree(2);
    tree.insert([5, 5]);
    tree.insert([1, 1]);
    tree.insert([3, 3]);
    const result = tree.nearest([0, 0], 3);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].distance).toBeGreaterThanOrEqual(result[i - 1].distance);
    }
  });

  it("performs range search", () => {
    const tree = new KDTree(2);
    tree.insert([1, 1]);
    tree.insert([5, 5]);
    tree.insert([3, 3]);
    tree.insert([10, 10]);
    const result = tree.rangeSearch([0, 0], [4, 4]);
    expect(result).toHaveLength(2);
  });

  it("works in 3 dimensions", () => {
    const tree = new KDTree(3);
    tree.insert([1, 2, 3]);
    tree.insert([4, 5, 6]);
    tree.insert([7, 8, 9]);
    const result = tree.nearest([1, 2, 3], 1);
    expect(result[0].distance).toBe(0);
  });

  it("builds from points", () => {
    const tree = KDTree.fromPoints([[0, 0], [1, 1], [2, 2]], 2);
    expect(tree.size).toBe(3);
  });

  it("handles single point", () => {
    const tree = new KDTree(2);
    tree.insert([5, 5], "only");
    const result = tree.nearest([0, 0], 1);
    expect(result[0].data).toBe("only");
  });
});
