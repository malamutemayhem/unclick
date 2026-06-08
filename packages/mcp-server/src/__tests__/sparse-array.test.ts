import { describe, it, expect } from "vitest";
import { SparseArray } from "../sparse-array.js";

describe("SparseArray", () => {
  it("set and get", () => {
    const sa = new SparseArray<string>();
    sa.set(0, "a");
    sa.set(100, "b");
    expect(sa.get(0)).toBe("a");
    expect(sa.get(100)).toBe("b");
    expect(sa.get(50)).toBeUndefined();
  });

  it("has checks existence", () => {
    const sa = new SparseArray<number>();
    sa.set(5, 10);
    expect(sa.has(5)).toBe(true);
    expect(sa.has(6)).toBe(false);
  });

  it("delete removes", () => {
    const sa = new SparseArray<number>();
    sa.set(1, 10);
    sa.delete(1);
    expect(sa.has(1)).toBe(false);
  });

  it("size counts entries", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.set(1000, 2);
    expect(sa.size).toBe(2);
  });

  it("length reflects max index", () => {
    const sa = new SparseArray<number>();
    sa.set(99, 1);
    expect(sa.length).toBe(100);
  });

  it("density calculates", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.set(9, 2);
    expect(sa.density).toBe(0.2);
  });

  it("indices returns sorted indices", () => {
    const sa = new SparseArray<string>();
    sa.set(5, "a");
    sa.set(1, "b");
    sa.set(3, "c");
    expect(sa.indices()).toEqual([1, 3, 5]);
  });

  it("values returns ordered values", () => {
    const sa = new SparseArray<string>();
    sa.set(2, "b");
    sa.set(0, "a");
    expect(sa.values()).toEqual(["a", "b"]);
  });

  it("map transforms", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.set(5, 2);
    const mapped = sa.map((v) => v * 10);
    expect(mapped.get(0)).toBe(10);
    expect(mapped.get(5)).toBe(20);
  });

  it("filter keeps matching", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.set(1, 2);
    sa.set(2, 3);
    const filtered = sa.filter((v) => v > 1);
    expect(filtered.size).toBe(2);
  });

  it("toDense fills gaps", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.set(2, 3);
    expect(sa.toDense(0)).toEqual([1, 0, 3]);
  });

  it("clear resets", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.clear();
    expect(sa.size).toBe(0);
  });
});
