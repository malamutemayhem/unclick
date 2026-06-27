import { describe, it, expect } from "vitest";
import { WaveletTree } from "../wavelet-tree.js";

describe("WaveletTree", () => {
  it("access returns element at index", () => {
    const wt = new WaveletTree([3, 1, 4, 1, 5, 9, 2, 6]);
    expect(wt.access(0)).toBe(3);
    expect(wt.access(2)).toBe(4);
    expect(wt.access(5)).toBe(9);
  });

  it("rank counts occurrences up to position", () => {
    const wt = new WaveletTree([1, 2, 1, 3, 1, 2]);
    expect(wt.rank(1, 5)).toBe(3);
    expect(wt.rank(2, 6)).toBe(2);
    expect(wt.rank(3, 6)).toBe(1);
  });

  it("kthSmallest returns sorted element", () => {
    const wt = new WaveletTree([5, 3, 1, 4, 2]);
    expect(wt.kthSmallest(0)).toBe(1);
    expect(wt.kthSmallest(2)).toBe(3);
    expect(wt.kthSmallest(4)).toBe(5);
  });

  it("kthSmallest out of range returns -1", () => {
    const wt = new WaveletTree([1, 2, 3]);
    expect(wt.kthSmallest(-1)).toBe(-1);
    expect(wt.kthSmallest(3)).toBe(-1);
  });

  it("rangeCount counts elements in value range", () => {
    const wt = new WaveletTree([1, 5, 3, 7, 2, 8, 4, 6]);
    expect(wt.rangeCount(3, 6)).toBe(4);
    expect(wt.rangeCount(1, 8)).toBe(8);
    expect(wt.rangeCount(10, 20)).toBe(0);
  });

  it("length returns data size", () => {
    const wt = new WaveletTree([1, 2, 3, 4, 5]);
    expect(wt.length()).toBe(5);
  });

  it("works with single element", () => {
    const wt = new WaveletTree([42]);
    expect(wt.access(0)).toBe(42);
    expect(wt.rank(42, 1)).toBe(1);
  });

  it("works with duplicate values", () => {
    const wt = new WaveletTree([3, 3, 3, 3]);
    expect(wt.rank(3, 4)).toBe(4);
    expect(wt.kthSmallest(0)).toBe(3);
  });
});
