import { describe, it, expect } from "vitest";
import { SparseArray } from "../sparse-array.js";

describe("sparse-array", () => {
  it("set and get at arbitrary indices", () => {
    const sa = new SparseArray<string>();
    sa.set(100, "a");
    sa.set(0, "b");
    expect(sa.get(100)).toBe("a");
    expect(sa.get(0)).toBe("b");
    expect(sa.get(50)).toBeUndefined();
  });

  it("length tracks highest index + 1", () => {
    const sa = new SparseArray<number>();
    sa.set(10, 1);
    expect(sa.length).toBe(11);
    sa.set(5, 2);
    expect(sa.length).toBe(11);
  });

  it("count tracks occupied slots", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.set(100, 2);
    expect(sa.count).toBe(2);
  });

  it("delete removes a slot", () => {
    const sa = new SparseArray<number>();
    sa.set(5, 42);
    sa.delete(5);
    expect(sa.has(5)).toBe(false);
    expect(sa.count).toBe(0);
  });

  it("indices returns sorted occupied indices", () => {
    const sa = new SparseArray<string>();
    sa.set(10, "a");
    sa.set(2, "b");
    sa.set(7, "c");
    expect(sa.indices()).toEqual([2, 7, 10]);
  });

  it("values returns in index order", () => {
    const sa = new SparseArray<string>();
    sa.set(5, "b");
    sa.set(1, "a");
    expect(sa.values()).toEqual(["a", "b"]);
  });

  it("map creates new sparse array", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.set(5, 2);
    const doubled = sa.map((v) => v * 2);
    expect(doubled.get(0)).toBe(2);
    expect(doubled.get(5)).toBe(4);
  });

  it("compact returns dense array of values", () => {
    const sa = new SparseArray<number>();
    sa.set(100, 3);
    sa.set(0, 1);
    sa.set(50, 2);
    expect(sa.compact()).toEqual([1, 2, 3]);
  });
});
