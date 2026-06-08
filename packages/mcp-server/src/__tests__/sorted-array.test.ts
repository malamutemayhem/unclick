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

  it("removes elements", () => {
    const sa = new SortedArray<number>();
    sa.insert(1);
    sa.insert(2);
    sa.insert(3);
    expect(sa.remove(2)).toBe(true);
    expect(sa.toArray()).toEqual([1, 3]);
    expect(sa.remove(99)).toBe(false);
  });

  it("finds by index and has", () => {
    const sa = new SortedArray<number>();
    sa.insert(10);
    sa.insert(20);
    sa.insert(30);
    expect(sa.indexOf(20)).toBe(1);
    expect(sa.has(20)).toBe(true);
    expect(sa.has(15)).toBe(false);
  });

  it("first and last", () => {
    const sa = new SortedArray<number>();
    sa.insert(5);
    sa.insert(1);
    sa.insert(9);
    expect(sa.first).toBe(1);
    expect(sa.last).toBe(9);
  });

  it("range query", () => {
    const sa = new SortedArray<number>();
    [1, 3, 5, 7, 9].forEach((n: number) => sa.insert(n));
    expect(sa.range(3, 7)).toEqual([3, 5, 7]);
  });

  it("custom comparator", () => {
    const sa = new SortedArray<string>((a: string, b: string) => a.length - b.length);
    sa.insert("cc");
    sa.insert("a");
    sa.insert("bbb");
    expect(sa.toArray()).toEqual(["a", "cc", "bbb"]);
  });

  it("iterates", () => {
    const sa = new SortedArray<number>();
    sa.insert(3);
    sa.insert(1);
    sa.insert(2);
    expect([...sa]).toEqual([1, 2, 3]);
  });

  it("clear and size", () => {
    const sa = new SortedArray<number>();
    sa.insert(1);
    sa.insert(2);
    expect(sa.size).toBe(2);
    sa.clear();
    expect(sa.size).toBe(0);
  });
});
