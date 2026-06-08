import { describe, it, expect } from "vitest";
import { SortedArray } from "../sorted-array.js";

describe("SortedArray", () => {
  it("inserts in sorted order", () => {
    const sa = new SortedArray<number>();
    sa.insert(3);
    sa.insert(1);
    sa.insert(2);
    expect(sa.toArray()).toEqual([1, 2, 3]);
  });

  it("has and indexOf", () => {
    const sa = new SortedArray<number>();
    sa.insert(5);
    sa.insert(10);
    expect(sa.has(5)).toBe(true);
    expect(sa.has(7)).toBe(false);
    expect(sa.indexOf(10)).toBe(1);
    expect(sa.indexOf(99)).toBe(-1);
  });

  it("remove deletes element", () => {
    const sa = new SortedArray<number>();
    sa.insert(1);
    sa.insert(2);
    sa.insert(3);
    expect(sa.remove(2)).toBe(true);
    expect(sa.toArray()).toEqual([1, 3]);
  });

  it("remove returns false for missing", () => {
    const sa = new SortedArray<number>();
    expect(sa.remove(1)).toBe(false);
  });

  it("first and last", () => {
    const sa = new SortedArray<number>();
    sa.insert(10);
    sa.insert(5);
    sa.insert(15);
    expect(sa.first).toBe(5);
    expect(sa.last).toBe(15);
  });

  it("at returns by index", () => {
    const sa = new SortedArray<number>();
    sa.insert(3);
    sa.insert(1);
    sa.insert(2);
    expect(sa.at(0)).toBe(1);
    expect(sa.at(2)).toBe(3);
  });

  it("range returns subset", () => {
    const sa = new SortedArray<number>();
    [1, 3, 5, 7, 9].forEach((n) => sa.insert(n));
    expect(sa.range(3, 7)).toEqual([3, 5, 7]);
  });

  it("custom comparator", () => {
    const sa = new SortedArray<string>((a, b) => a.length - b.length || a.localeCompare(b));
    sa.insert("bb");
    sa.insert("a");
    sa.insert("ccc");
    expect(sa.toArray()).toEqual(["a", "bb", "ccc"]);
  });

  it("size tracks count", () => {
    const sa = new SortedArray<number>();
    expect(sa.size).toBe(0);
    sa.insert(1);
    sa.insert(2);
    expect(sa.size).toBe(2);
  });
});
