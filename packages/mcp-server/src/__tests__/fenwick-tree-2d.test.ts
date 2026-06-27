import { describe, it, expect } from "vitest";
import { FenwickTree2D } from "../fenwick-tree-2d.js";

describe("FenwickTree2D", () => {
  it("update and prefixSum work", () => {
    const ft = new FenwickTree2D(3, 3);
    ft.update(0, 0, 1);
    ft.update(1, 1, 2);
    ft.update(2, 2, 3);
    expect(ft.prefixSum(2, 2)).toBe(6);
  });

  it("rangeSum computes submatrix sum", () => {
    const ft = FenwickTree2D.fromMatrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(ft.rangeSum(0, 0, 2, 2)).toBe(45);
    expect(ft.rangeSum(1, 1, 2, 2)).toBe(28);
    expect(ft.rangeSum(0, 0, 0, 0)).toBe(1);
  });

  it("set overwrites value at position", () => {
    const ft = new FenwickTree2D(2, 2);
    ft.update(0, 0, 5);
    ft.set(0, 0, 10);
    expect(ft.rangeSum(0, 0, 0, 0)).toBe(10);
  });

  it("dimensions returns size", () => {
    const ft = new FenwickTree2D(4, 5);
    expect(ft.dimensions()).toEqual({ rows: 4, cols: 5 });
  });

  it("fromMatrix builds correct tree", () => {
    const matrix = [
      [1, 0],
      [0, 1],
    ];
    const ft = FenwickTree2D.fromMatrix(matrix);
    expect(ft.prefixSum(0, 0)).toBe(1);
    expect(ft.prefixSum(1, 1)).toBe(2);
    expect(ft.rangeSum(1, 1, 1, 1)).toBe(1);
  });

  it("handles single cell", () => {
    const ft = new FenwickTree2D(1, 1);
    ft.update(0, 0, 42);
    expect(ft.prefixSum(0, 0)).toBe(42);
    expect(ft.rangeSum(0, 0, 0, 0)).toBe(42);
  });

  it("multiple updates accumulate", () => {
    const ft = new FenwickTree2D(2, 2);
    ft.update(0, 0, 3);
    ft.update(0, 0, 7);
    expect(ft.rangeSum(0, 0, 0, 0)).toBe(10);
  });

  it("rangeSum with row/col starting at non-zero", () => {
    const ft = FenwickTree2D.fromMatrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(ft.rangeSum(1, 0, 2, 1)).toBe(24);
  });
});
