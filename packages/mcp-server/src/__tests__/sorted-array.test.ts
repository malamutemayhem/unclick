import { describe, it, expect } from "vitest";
import { SortedArray } from "../sorted-array.js";

describe("SortedArray", () => {
  const numCmp = (a: number, b: number) => a - b;

  it("insert maintains order", () => {
    const sa = new SortedArray<number>(numCmp);
    sa.insert(5);
    sa.insert(1);
    sa.insert(3);
    sa.insert(8);
    sa.insert(2);
    expect(sa.toArray()).toEqual([1, 2, 3, 5, 8]);
  });

  it("has and indexOf", () => {
    const sa = new SortedArray<number>(numCmp);
    sa.insert(10);
    sa.insert(20);
    sa.insert(30);
    expect(sa.has(20)).toBe(true);
    expect(sa.has(15)).toBe(false);
    expect(sa.indexOf(20)).toBe(1);
    expect(sa.indexOf(99)).toBe(-1);
  });

  it("remove", () => {
    const sa = new SortedArray<number>(numCmp);
    sa.insert(1);
    sa.insert(2);
    sa.insert(3);
    expect(sa.remove(2)).toBe(true);
    expect(sa.toArray()).toEqual([1, 3]);
    expect(sa.remove(99)).toBe(false);
  });

  it("first and last", () => {
    const sa = new SortedArray<number>(numCmp);
    sa.insert(5);
    sa.insert(1);
    sa.insert(9);
    expect(sa.first()).toBe(1);
    expect(sa.last()).toBe(9);
  });

  it("range query", () => {
    const sa = new SortedArray<number>(numCmp);
    for (let i = 1; i <= 10; i++) sa.insert(i);
    expect(sa.range(3, 7)).toEqual([3, 4, 5, 6, 7]);
  });

  it("at for index access", () => {
    const sa = new SortedArray<number>(numCmp);
    sa.insert(10);
    sa.insert(20);
    expect(sa.at(0)).toBe(10);
    expect(sa.at(1)).toBe(20);
    expect(sa.at(5)).toBeUndefined();
  });

  it("string sorting", () => {
    const sa = new SortedArray<string>((a, b) => a.localeCompare(b));
    sa.insert("cherry");
    sa.insert("apple");
    sa.insert("banana");
    expect(sa.toArray()).toEqual(["apple", "banana", "cherry"]);
  });
});
