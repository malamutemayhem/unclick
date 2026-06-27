import { describe, it, expect } from "vitest";
import { KDTree } from "../k-d-tree.js";

describe("KDTree", () => {
  it("inserts and counts nodes", () => {
    const tree = new KDTree(2);
    tree.insert({ coords: [1, 2] });
    tree.insert({ coords: [3, 4] });
    expect(tree.size).toBe(2);
  });

  it("finds nearest neighbor", () => {
    const tree = new KDTree(2);
    tree.insert({ coords: [1, 1] });
    tree.insert({ coords: [5, 5] });
    tree.insert({ coords: [9, 9] });
    const result = tree.nearest([2, 2], 1);
    expect(result).toHaveLength(1);
    expect(result[0].point.coords).toEqual([1, 1]);
  });

  it("finds k nearest neighbors", () => {
    const tree = new KDTree(2);
    tree.insert({ coords: [0, 0] });
    tree.insert({ coords: [1, 1] });
    tree.insert({ coords: [10, 10] });
    tree.insert({ coords: [2, 2] });
    const result = tree.nearest([0, 0], 2);
    expect(result).toHaveLength(2);
    expect(result[0].point.coords).toEqual([0, 0]);
    expect(result[1].point.coords).toEqual([1, 1]);
  });

  it("range search finds points in box", () => {
    const tree = new KDTree(2);
    tree.insert({ coords: [1, 1] });
    tree.insert({ coords: [3, 3] });
    tree.insert({ coords: [5, 5] });
    tree.insert({ coords: [7, 7] });
    const result = tree.rangeSearch([2, 2], [6, 6]);
    expect(result).toHaveLength(2);
  });

  it("range search returns empty for no matches", () => {
    const tree = new KDTree(2);
    tree.insert({ coords: [1, 1] });
    const result = tree.rangeSearch([10, 10], [20, 20]);
    expect(result).toHaveLength(0);
  });

  it("buildBalanced creates balanced tree", () => {
    const tree = new KDTree(2);
    const points = Array.from({ length: 15 }, (_, i) => ({ coords: [i, i * 2] }));
    tree.buildBalanced(points);
    expect(tree.size).toBe(15);
    expect(tree.height()).toBeLessThanOrEqual(5);
  });

  it("works in 3D", () => {
    const tree = new KDTree(3);
    tree.insert({ coords: [1, 1, 1] });
    tree.insert({ coords: [2, 2, 2] });
    tree.insert({ coords: [10, 10, 10] });
    const result = tree.nearest([1.5, 1.5, 1.5], 1);
    expect(result[0].point.coords).toEqual([1, 1, 1]);
  });

  it("stores data with points", () => {
    const tree = new KDTree(2);
    tree.insert({ coords: [5, 5], data: "mydata" });
    const result = tree.nearest([5, 5], 1);
    expect(result[0].point.data).toBe("mydata");
  });

  it("height of empty tree is 0", () => {
    const tree = new KDTree(2);
    expect(tree.height()).toBe(0);
  });
});
