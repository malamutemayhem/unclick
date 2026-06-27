import { describe, it, expect } from "vitest";
import { LazySegmentTree, MinSegmentTree } from "../segment-tree-lazy.js";

describe("LazySegmentTree", () => {
  it("builds from data and queries range sum", () => {
    const st = new LazySegmentTree([1, 2, 3, 4, 5]);
    expect(st.rangeQuery(0, 4)).toBe(15);
    expect(st.rangeQuery(1, 3)).toBe(9);
    expect(st.rangeQuery(0, 0)).toBe(1);
  });

  it("supports point queries", () => {
    const st = new LazySegmentTree([10, 20, 30]);
    expect(st.pointQuery(0)).toBe(10);
    expect(st.pointQuery(1)).toBe(20);
    expect(st.pointQuery(2)).toBe(30);
  });

  it("supports range updates", () => {
    const st = new LazySegmentTree([1, 1, 1, 1, 1]);
    st.rangeUpdate(0, 4, 10);
    expect(st.rangeQuery(0, 4)).toBe(55);
    expect(st.pointQuery(0)).toBe(11);
  });

  it("supports point updates", () => {
    const st = new LazySegmentTree([1, 2, 3]);
    st.pointUpdate(1, 5);
    expect(st.pointQuery(1)).toBe(7);
    expect(st.totalSum()).toBe(11);
  });

  it("handles multiple range updates", () => {
    const st = new LazySegmentTree([0, 0, 0, 0, 0]);
    st.rangeUpdate(0, 2, 3);
    st.rangeUpdate(2, 4, 5);
    expect(st.pointQuery(0)).toBe(3);
    expect(st.pointQuery(2)).toBe(8);
    expect(st.pointQuery(4)).toBe(5);
  });

  it("reports size and total sum", () => {
    const st = new LazySegmentTree([1, 2, 3]);
    expect(st.size()).toBe(3);
    expect(st.totalSum()).toBe(6);
  });

  it("handles empty array", () => {
    const st = new LazySegmentTree([]);
    expect(st.size()).toBe(0);
    expect(st.totalSum()).toBe(0);
  });
});

describe("MinSegmentTree", () => {
  it("queries range minimum", () => {
    const st = new MinSegmentTree([5, 2, 8, 1, 9]);
    expect(st.rangeMin(0, 4)).toBe(1);
    expect(st.rangeMin(0, 2)).toBe(2);
    expect(st.rangeMin(3, 4)).toBe(1);
  });

  it("updates and queries", () => {
    const st = new MinSegmentTree([5, 2, 8, 1, 9]);
    st.update(3, 10);
    expect(st.rangeMin(3, 4)).toBe(9);
    expect(st.rangeMin(0, 4)).toBe(2);
  });

  it("reports size", () => {
    const st = new MinSegmentTree([1, 2, 3]);
    expect(st.size()).toBe(3);
  });

  it("handles single element", () => {
    const st = new MinSegmentTree([42]);
    expect(st.rangeMin(0, 0)).toBe(42);
    st.update(0, 7);
    expect(st.rangeMin(0, 0)).toBe(7);
  });
});
