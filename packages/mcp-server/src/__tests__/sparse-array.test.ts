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

  it("length reflects highest index + 1", () => {
    const sa = new SparseArray<number>();
    sa.set(99, 1);
    expect(sa.length).toBe(100);
  });

  it("count reflects actual entries", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.set(99, 2);
    expect(sa.count).toBe(2);
  });

  it("has checks presence", () => {
    const sa = new SparseArray<number>();
    sa.set(5, 1);
    expect(sa.has(5)).toBe(true);
    expect(sa.has(6)).toBe(false);
  });

  it("delete removes entry", () => {
    const sa = new SparseArray<number>();
    sa.set(5, 1);
    expect(sa.delete(5)).toBe(true);
    expect(sa.has(5)).toBe(false);
    expect(sa.delete(5)).toBe(false);
  });

  it("clear empties", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.clear();
    expect(sa.length).toBe(0);
    expect(sa.count).toBe(0);
  });

  it("forEach iterates entries", () => {
    const sa = new SparseArray<string>();
    sa.set(0, "a");
    sa.set(10, "b");
    const seen: string[] = [];
    sa.forEach((v) => seen.push(v));
    expect(seen.sort()).toEqual(["a", "b"]);
  });

  it("map transforms values", () => {
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
    expect(filtered.count).toBe(2);
  });

  it("toArray includes gaps as undefined", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 1);
    sa.set(2, 3);
    expect(sa.toArray()).toEqual([1, undefined, 3]);
  });

  it("indices returns sorted indices", () => {
    const sa = new SparseArray<number>();
    sa.set(10, 1);
    sa.set(2, 2);
    expect(sa.indices()).toEqual([2, 10]);
  });

  it("values returns all values", () => {
    const sa = new SparseArray<number>();
    sa.set(0, 10);
    sa.set(5, 20);
    expect(sa.values().sort()).toEqual([10, 20]);
  });

  it("entries returns sorted pairs", () => {
    const sa = new SparseArray<string>();
    sa.set(5, "b");
    sa.set(1, "a");
    expect(sa.entries()).toEqual([[1, "a"], [5, "b"]]);
  });
});
