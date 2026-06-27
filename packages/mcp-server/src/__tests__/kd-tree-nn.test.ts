import { describe, it, expect } from "vitest";
import { KDTreeNN } from "../kd-tree-nn.js";

describe("KDTreeNN", () => {
  it("nearest finds closest point", () => {
    const kd = new KDTreeNN(2, [[0, 0], [10, 10], [5, 5], [2, 2]]);
    expect(kd.nearest([3, 3])).toEqual([2, 2]);
  });

  it("nearest on exact point", () => {
    const kd = new KDTreeNN(2, [[1, 1], [5, 5]]);
    expect(kd.nearest([5, 5])).toEqual([5, 5]);
  });

  it("kNearest returns k closest", () => {
    const kd = new KDTreeNN(2, [[0, 0], [1, 1], [2, 2], [10, 10], [20, 20]]);
    const result = kd.kNearest([0, 0], 3);
    expect(result.length).toBe(3);
    expect(result[0]).toEqual([0, 0]);
  });

  it("insert adds points", () => {
    const kd = new KDTreeNN(2);
    kd.insert([5, 5]);
    kd.insert([1, 1]);
    expect(kd.size()).toBe(2);
    expect(kd.nearest([0, 0])).toEqual([1, 1]);
  });

  it("works in 3D", () => {
    const kd = new KDTreeNN(3, [[0, 0, 0], [1, 1, 1], [5, 5, 5]]);
    expect(kd.nearest([1, 0, 0])).toEqual([0, 0, 0]);
  });

  it("nearest on empty returns undefined", () => {
    const kd = new KDTreeNN(2);
    expect(kd.nearest([0, 0])).toBeUndefined();
  });

  it("size tracks points", () => {
    const kd = new KDTreeNN(2, [[1, 1], [2, 2], [3, 3]]);
    expect(kd.size()).toBe(3);
  });

  it("kNearest with k > n returns all", () => {
    const kd = new KDTreeNN(2, [[1, 1], [2, 2]]);
    const result = kd.kNearest([0, 0], 5);
    expect(result.length).toBe(2);
  });
});
