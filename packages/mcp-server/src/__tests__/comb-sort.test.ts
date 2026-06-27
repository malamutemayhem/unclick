import { describe, it, expect } from "vitest";
import { CombSort } from "../comb-sort.js";

describe("CombSort", () => {
  it("sorts an array of numbers", () => {
    expect(CombSort.sort([5, 3, 8, 1, 2])).toEqual([1, 2, 3, 5, 8]);
  });

  it("handles empty array", () => {
    expect(CombSort.sort([])).toEqual([]);
  });

  it("handles already sorted array", () => {
    expect(CombSort.sort([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("handles array with duplicates", () => {
    expect(CombSort.sort([3, 1, 3, 2, 1])).toEqual([1, 1, 2, 3, 3]);
  });

  it("sortDescending returns reversed order", () => {
    expect(CombSort.sortDescending([1, 5, 3])).toEqual([5, 3, 1]);
  });

  it("sortBy sorts objects by key function", () => {
    const items = [{ n: "z", v: 3 }, { n: "a", v: 1 }, { n: "m", v: 2 }];
    const sorted = CombSort.sortBy(items, (i) => i.v);
    expect(sorted.map((i) => i.n)).toEqual(["a", "m", "z"]);
  });

  it("isSorted checks if array is sorted", () => {
    expect(CombSort.isSorted([1, 2, 3])).toBe(true);
    expect(CombSort.isSorted([3, 1, 2])).toBe(false);
  });

  it("sortStrings sorts string arrays", () => {
    expect(CombSort.sortStrings(["banana", "apple", "cherry"])).toEqual(["apple", "banana", "cherry"]);
  });

  it("does not mutate original array", () => {
    const original = [3, 1, 2];
    CombSort.sort(original);
    expect(original).toEqual([3, 1, 2]);
  });
});
