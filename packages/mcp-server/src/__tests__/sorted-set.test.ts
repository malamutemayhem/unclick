import { describe, it, expect } from "vitest";
import { SortedSet } from "../sorted-set.js";

describe("SortedSet", () => {
  it("maintains sorted order", () => {
    const s = new SortedSet<number>();
    s.add(3); s.add(1); s.add(2);
    expect(s.toArray()).toEqual([1, 2, 3]);
  });
  it("prevents duplicates", () => {
    const s = new SortedSet<number>();
    expect(s.add(1)).toBe(true);
    expect(s.add(1)).toBe(false);
    expect(s.size).toBe(1);
  });
  it("has/delete", () => {
    const s = SortedSet.from([5, 3, 7]);
    expect(s.has(5)).toBe(true);
    expect(s.delete(5)).toBe(true);
    expect(s.has(5)).toBe(false);
    expect(s.delete(99)).toBe(false);
  });
  it("first/last", () => {
    const s = SortedSet.from([10, 5, 15]);
    expect(s.first()).toBe(5);
    expect(s.last()).toBe(15);
  });
  it("range", () => {
    const s = SortedSet.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(s.range(3, 7)).toEqual([3, 4, 5, 6, 7]);
  });
  it("iterator", () => {
    const s = SortedSet.from([3, 1, 2]);
    expect([...s]).toEqual([1, 2, 3]);
  });
  it("clear", () => {
    const s = SortedSet.from([1, 2, 3]);
    s.clear();
    expect(s.size).toBe(0);
  });
  it("custom comparator", () => {
    const s = new SortedSet<string>((a, b) => a.localeCompare(b));
    s.add("banana"); s.add("apple"); s.add("cherry");
    expect(s.toArray()).toEqual(["apple", "banana", "cherry"]);
  });
});
