import { describe, it, expect } from "vitest";
import { SortedArray } from "../sorted-array.js";

describe("SortedArray", () => {
  it("maintains sort order on insert", () => {
    const sa = new SortedArray<number>();
    sa.insert(3);
    sa.insert(1);
    sa.insert(2);
    expect(sa.toArray()).toEqual([1, 2, 3]);
  });

  it("finds items by index", () => {
    const sa = new SortedArray<number>();
    sa.insert(10);
    sa.insert(20);
    sa.insert(30);
    expect(sa.indexOf(20)).toBe(1);
    expect(sa.indexOf(99)).toBe(-1);
  });

  it("has checks presence", () => {
    const sa = new SortedArray<number>();
    sa.insert(5);
    expect(sa.has(5)).toBe(true);
    expect(sa.has(6)).toBe(false);
  });

  it("remove deletes item", () => {
    const sa = new SortedArray<number>();
    sa.insert(1);
    sa.insert(2);
    sa.insert(3);
    expect(sa.remove(2)).toBe(true);
    expect(sa.toArray()).toEqual([1, 3]);
    expect(sa.remove(99)).toBe(false);
  });

  it("first and last return correct items", () => {
    const sa = new SortedArray<number>();
    sa.insert(5);
    sa.insert(1);
    sa.insert(9);
    expect(sa.first()).toBe(1);
    expect(sa.last()).toBe(9);
  });

  it("handles custom comparator", () => {
    const sa = new SortedArray<string>((a, b) => b.localeCompare(a));
    sa.insert("banana");
    sa.insert("apple");
    sa.insert("cherry");
    expect(sa.toArray()).toEqual(["cherry", "banana", "apple"]);
  });

  it("handles duplicates", () => {
    const sa = new SortedArray<number>();
    sa.insert(1);
    sa.insert(1);
    sa.insert(1);
    expect(sa.size).toBe(3);
    expect(sa.toArray()).toEqual([1, 1, 1]);
  });

  it("clear empties the array", () => {
    const sa = new SortedArray<number>();
    sa.insert(1);
    sa.clear();
    expect(sa.size).toBe(0);
  });
});
