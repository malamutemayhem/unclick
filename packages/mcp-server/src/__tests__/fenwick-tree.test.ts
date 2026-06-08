import { describe, it, expect } from "vitest";
import { FenwickTree } from "../fenwick-tree.js";

describe("FenwickTree", () => {
  it("constructs from size", () => {
    const ft = new FenwickTree(5);
    expect(ft.size).toBe(5);
    expect(ft.prefixSum(4)).toBe(0);
  });

  it("constructs from array", () => {
    const ft = new FenwickTree([1, 2, 3, 4, 5]);
    expect(ft.prefixSum(4)).toBe(15);
  });

  it("computes prefix sums", () => {
    const ft = new FenwickTree([3, 1, 4, 1, 5]);
    expect(ft.prefixSum(0)).toBe(3);
    expect(ft.prefixSum(1)).toBe(4);
    expect(ft.prefixSum(2)).toBe(8);
    expect(ft.prefixSum(4)).toBe(14);
  });

  it("computes range sums", () => {
    const ft = new FenwickTree([1, 2, 3, 4, 5]);
    expect(ft.rangeSum(1, 3)).toBe(9);
    expect(ft.rangeSum(0, 4)).toBe(15);
    expect(ft.rangeSum(2, 2)).toBe(3);
  });

  it("adds delta", () => {
    const ft = new FenwickTree([1, 2, 3]);
    ft.add(1, 5);
    expect(ft.rangeSum(1, 1)).toBe(7);
    expect(ft.prefixSum(2)).toBe(11);
  });

  it("sets value", () => {
    const ft = new FenwickTree([1, 2, 3]);
    ft.set(1, 10);
    expect(ft.get(1)).toBe(10);
    expect(ft.prefixSum(2)).toBe(14);
  });

  it("gets individual values", () => {
    const ft = new FenwickTree([5, 10, 15]);
    expect(ft.get(0)).toBe(5);
    expect(ft.get(1)).toBe(10);
    expect(ft.get(2)).toBe(15);
  });

  it("converts to array", () => {
    const ft = new FenwickTree([1, 2, 3, 4]);
    expect(ft.toArray()).toEqual([1, 2, 3, 4]);
  });

  it("handles updates and queries together", () => {
    const ft = new FenwickTree(3);
    ft.add(0, 10);
    ft.add(1, 20);
    ft.add(2, 30);
    expect(ft.rangeSum(0, 2)).toBe(60);
    ft.add(1, -5);
    expect(ft.rangeSum(0, 2)).toBe(55);
  });
});
