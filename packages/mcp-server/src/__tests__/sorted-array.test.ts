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

  it("removes an item", () => {
    const sa = new SortedArray<number>();
    sa.insert(1);
    sa.insert(2);
    sa.insert(3);
    expect(sa.remove(2)).toBe(true);
    expect(sa.toArray()).toEqual([1, 3]);
  });

  it("remove returns false for missing", () => {
    const sa = new SortedArray<number>();
    sa.insert(1);
    expect(sa.remove(5)).toBe(false);
  });

  it("has checks existence", () => {
    const sa = new SortedArray<number>();
    sa.insert(5);
    expect(sa.has(5)).toBe(true);
    expect(sa.has(3)).toBe(false);
  });

  it("first and last", () => {
    const sa = new SortedArray<number>();
    sa.insert(5);
    sa.insert(1);
    sa.insert(9);
    expect(sa.first).toBe(1);
    expect(sa.last).toBe(9);
  });

  it("size tracking", () => {
    const sa = new SortedArray<number>();
    expect(sa.size).toBe(0);
    sa.insert(1);
    sa.insert(2);
    expect(sa.size).toBe(2);
  });

  it("custom comparator", () => {
    const sa = new SortedArray<string>((a: string, b: string) => a.length - b.length);
    sa.insert("ccc");
    sa.insert("a");
    sa.insert("bb");
    expect(sa.toArray()).toEqual(["a", "bb", "ccc"]);
  });

  it("clear empties array", () => {
    const sa = new SortedArray<number>();
    sa.insert(1);
    sa.clear();
    expect(sa.size).toBe(0);
  });

  it("iterates", () => {
    const sa = new SortedArray<number>();
    sa.insert(3);
    sa.insert(1);
    sa.insert(2);
    expect([...sa]).toEqual([1, 2, 3]);
  });
});
