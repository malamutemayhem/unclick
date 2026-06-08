import { describe, it, expect } from "vitest";
import { SortedArray } from "../sorted-array.js";

describe("SortedArray", () => {
  it("inserts in sorted order", () => {
    const sa = new SortedArray<number>();
    sa.insert(5); sa.insert(1); sa.insert(3);
    expect(sa.toArray()).toEqual([1, 3, 5]);
  });

  it("has and indexOf", () => {
    const sa = SortedArray.from([3, 1, 4, 1, 5]);
    expect(sa.has(4)).toBe(true);
    expect(sa.has(2)).toBe(false);
    expect(sa.indexOf(4)).toBeGreaterThanOrEqual(0);
    expect(sa.indexOf(2)).toBe(-1);
  });

  it("remove", () => {
    const sa = SortedArray.from([1, 2, 3]);
    expect(sa.remove(2)).toBe(true);
    expect(sa.toArray()).toEqual([1, 3]);
    expect(sa.remove(99)).toBe(false);
  });

  it("first and last", () => {
    const sa = SortedArray.from([5, 1, 3]);
    expect(sa.first()).toBe(1);
    expect(sa.last()).toBe(5);
  });

  it("range query", () => {
    const sa = SortedArray.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(sa.range(3, 7)).toEqual([3, 4, 5, 6, 7]);
  });

  it("get by index", () => {
    const sa = SortedArray.from([3, 1, 2]);
    expect(sa.get(0)).toBe(1);
    expect(sa.get(2)).toBe(3);
  });

  it("clear and length", () => {
    const sa = SortedArray.from([1, 2, 3]);
    expect(sa.length).toBe(3);
    sa.clear();
    expect(sa.length).toBe(0);
  });

  it("custom comparator", () => {
    const sa = new SortedArray<string>((a, b) => a.localeCompare(b));
    sa.insert("banana"); sa.insert("apple"); sa.insert("cherry");
    expect(sa.toArray()).toEqual(["apple", "banana", "cherry"]);
  });

  it("iteration via Symbol.iterator", () => {
    const sa = SortedArray.from([3, 1, 2]);
    expect([...sa]).toEqual([1, 2, 3]);
  });
});
