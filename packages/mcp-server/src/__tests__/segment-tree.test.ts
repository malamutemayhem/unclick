import { describe, it, expect } from "vitest";
import { SegmentTree, sumTree, minTree, maxTree } from "../segment-tree.js";

describe("SegmentTree", () => {
  it("computes sum queries", () => {
    const st = sumTree([1, 2, 3, 4, 5]);
    expect(st.query(0, 4)).toBe(15);
    expect(st.query(1, 3)).toBe(9);
    expect(st.query(2, 2)).toBe(3);
  });

  it("updates values", () => {
    const st = sumTree([1, 2, 3, 4, 5]);
    st.update(2, 10);
    expect(st.query(0, 4)).toBe(22);
    expect(st.query(2, 2)).toBe(10);
  });

  it("computes min queries", () => {
    const st = minTree([5, 3, 7, 1, 9]);
    expect(st.query(0, 4)).toBe(1);
    expect(st.query(0, 1)).toBe(3);
    expect(st.query(2, 4)).toBe(1);
  });

  it("computes max queries", () => {
    const st = maxTree([5, 3, 7, 1, 9]);
    expect(st.query(0, 4)).toBe(9);
    expect(st.query(0, 2)).toBe(7);
  });

  it("handles single element", () => {
    const st = sumTree([42]);
    expect(st.query(0, 0)).toBe(42);
    st.update(0, 10);
    expect(st.query(0, 0)).toBe(10);
  });

  it("handles empty array", () => {
    const st = sumTree([]);
    expect(st.size).toBe(0);
  });

  it("reports size", () => {
    const st = sumTree([1, 2, 3]);
    expect(st.size).toBe(3);
  });

  it("custom merge with product", () => {
    const st = new SegmentTree([2, 3, 4], (a, b) => a * b, 1);
    expect(st.query(0, 2)).toBe(24);
    expect(st.query(0, 1)).toBe(6);
  });

  it("min tree update", () => {
    const st = minTree([5, 3, 7]);
    st.update(1, 10);
    expect(st.query(0, 2)).toBe(5);
    st.update(0, 20);
    expect(st.query(0, 2)).toBe(7);
  });
});
