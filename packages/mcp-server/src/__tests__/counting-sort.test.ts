import { describe, it, expect } from "vitest";
import { CountingSort } from "../counting-sort.js";

describe("CountingSort", () => {
  it("sorts an array of integers", () => {
    expect(CountingSort.sort([4, 2, 7, 1, 3])).toEqual([1, 2, 3, 4, 7]);
  });

  it("handles empty array", () => {
    expect(CountingSort.sort([])).toEqual([]);
  });

  it("handles array with duplicates", () => {
    expect(CountingSort.sort([3, 1, 3, 1, 2])).toEqual([1, 1, 2, 3, 3]);
  });

  it("sortDescending returns reversed order", () => {
    expect(CountingSort.sortDescending([1, 3, 2])).toEqual([3, 2, 1]);
  });

  it("sortBy sorts objects by key function", () => {
    const items = [{ name: "c", val: 3 }, { name: "a", val: 1 }, { name: "b", val: 2 }];
    const sorted = CountingSort.sortBy(items, (i) => i.val);
    expect(sorted.map((i) => i.name)).toEqual(["a", "b", "c"]);
  });

  it("frequency counts occurrences", () => {
    const freq = CountingSort.frequency([1, 2, 2, 3, 3, 3]);
    expect(freq.get(1)).toBe(1);
    expect(freq.get(2)).toBe(2);
    expect(freq.get(3)).toBe(3);
  });

  it("mode finds most frequent element", () => {
    expect(CountingSort.mode([1, 2, 2, 3, 3, 3])).toBe(3);
  });

  it("rank assigns ordinal ranks", () => {
    const ranks = CountingSort.rank([30, 10, 20]);
    expect(ranks[0]).toBe(3);
    expect(ranks[1]).toBe(1);
    expect(ranks[2]).toBe(2);
  });

  it("handles negative numbers", () => {
    expect(CountingSort.sort([-3, -1, -2, 0, 1])).toEqual([-3, -2, -1, 0, 1]);
  });
});
