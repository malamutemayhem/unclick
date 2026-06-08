import { describe, it, expect } from "vitest";
import { SortedMap } from "../sorted-map.js";

describe("sorted-map", () => {
  it("set and get work", () => {
    const m = new SortedMap<number, string>();
    m.set(3, "c");
    m.set(1, "a");
    m.set(2, "b");
    expect(m.get(1)).toBe("a");
    expect(m.get(2)).toBe("b");
    expect(m.get(3)).toBe("c");
  });

  it("entries returns keys in sorted order", () => {
    const m = new SortedMap<number, string>();
    m.set(3, "c");
    m.set(1, "a");
    m.set(2, "b");
    expect(m.entries()).toEqual([[1, "a"], [2, "b"], [3, "c"]]);
  });

  it("set overwrites existing key", () => {
    const m = new SortedMap<string, number>();
    m.set("x", 1);
    m.set("x", 2);
    expect(m.get("x")).toBe(2);
    expect(m.size).toBe(1);
  });

  it("delete removes key", () => {
    const m = new SortedMap<number, string>();
    m.set(1, "a");
    m.set(2, "b");
    expect(m.delete(1)).toBe(true);
    expect(m.has(1)).toBe(false);
    expect(m.delete(99)).toBe(false);
    expect(m.size).toBe(1);
  });

  it("min and max return extremes", () => {
    const m = new SortedMap<number, string>();
    m.set(5, "e");
    m.set(1, "a");
    m.set(9, "i");
    expect(m.min()).toEqual([1, "a"]);
    expect(m.max()).toEqual([9, "i"]);
  });

  it("min and max return undefined when empty", () => {
    const m = new SortedMap<number, string>();
    expect(m.min()).toBeUndefined();
    expect(m.max()).toBeUndefined();
  });

  it("range returns entries within bounds", () => {
    const m = new SortedMap<number, string>();
    for (let i = 1; i <= 10; i++) m.set(i, String.fromCharCode(96 + i));
    expect(m.range(3, 6)).toEqual([[3, "c"], [4, "d"], [5, "e"], [6, "f"]]);
  });

  it("clear empties the map", () => {
    const m = new SortedMap<number, number>();
    m.set(1, 1);
    m.set(2, 2);
    m.clear();
    expect(m.size).toBe(0);
    expect(m.entries()).toEqual([]);
  });

  it("works with custom comparator", () => {
    const m = new SortedMap<string, number>((a, b) => b.localeCompare(a));
    m.set("a", 1);
    m.set("c", 3);
    m.set("b", 2);
    expect(m.entries().map(([k]) => k)).toEqual(["c", "b", "a"]);
  });
});
