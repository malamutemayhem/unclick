import { describe, it, expect } from "vitest";
import { SparseTable, RangeMinQuery, RangeMaxQuery, RangeGCDQuery } from "../sparse-table.js";

describe("SparseTable", () => {
  it("queries range minimum correctly", () => {
    const st = new SparseTable([3, 1, 4, 1, 5, 9, 2, 6], Math.min);
    expect(st.query(0, 7)).toBe(1);
    expect(st.query(4, 7)).toBe(2);
    expect(st.query(0, 0)).toBe(3);
  });

  it("queries range maximum correctly", () => {
    const st = new SparseTable([3, 1, 4, 1, 5, 9, 2, 6], Math.max);
    expect(st.query(0, 7)).toBe(9);
    expect(st.query(0, 2)).toBe(4);
  });

  it("size and levels are correct", () => {
    const st = new SparseTable([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(st.size()).toBe(8);
    expect(st.levels()).toBeGreaterThan(0);
  });

  it("single element query returns that element", () => {
    const st = new SparseTable([10, 20, 30], Math.min);
    expect(st.query(1, 1)).toBe(20);
  });

  it("RangeMinQuery works", () => {
    const rmq = new RangeMinQuery([5, 2, 8, 1, 9]);
    expect(rmq.min(0, 4)).toBe(1);
    expect(rmq.min(0, 1)).toBe(2);
  });

  it("RangeMaxQuery works", () => {
    const rmq = new RangeMaxQuery([5, 2, 8, 1, 9]);
    expect(rmq.max(0, 4)).toBe(9);
    expect(rmq.max(1, 2)).toBe(8);
  });

  it("RangeGCDQuery computes GCD over range", () => {
    const gq = new RangeGCDQuery([12, 8, 4, 16]);
    expect(gq.query(0, 3)).toBe(4);
    expect(gq.query(0, 1)).toBe(4);
    expect(gq.query(2, 3)).toBe(4);
  });

  it("handles two-element arrays", () => {
    const st = new SparseTable([7, 3], Math.min);
    expect(st.query(0, 1)).toBe(3);
  });
});
