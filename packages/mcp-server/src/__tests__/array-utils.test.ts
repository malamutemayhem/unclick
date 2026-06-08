import { describe, it, expect } from "vitest";
import { unique, uniqueBy, intersection, difference, zip, flatten, compact, partition, slidingWindow, rotate, range } from "../array-utils.js";

describe("array-utils", () => {
  it("unique removes duplicates", () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it("uniqueBy deduplicates by key", () => {
    const items = [{ id: 1, v: "a" }, { id: 2, v: "b" }, { id: 1, v: "c" }];
    expect(uniqueBy(items, (i) => i.id)).toHaveLength(2);
  });

  it("intersection finds common items", () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  it("difference finds items in a not in b", () => {
    expect(difference([1, 2, 3], [2, 4])).toEqual([1, 3]);
  });

  it("zip pairs arrays", () => {
    expect(zip([1, 2], ["a", "b"])).toEqual([[1, "a"], [2, "b"]]);
    expect(zip([1, 2, 3], ["a"])).toEqual([[1, "a"]]);
  });

  it("flatten one level", () => {
    expect(flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it("compact removes null/undefined", () => {
    expect(compact([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
  });

  it("partition splits by predicate", () => {
    const [evens, odds] = partition([1, 2, 3, 4], (n) => n % 2 === 0);
    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3]);
  });

  it("slidingWindow creates windows", () => {
    expect(slidingWindow([1, 2, 3, 4], 2)).toEqual([[1, 2], [2, 3], [3, 4]]);
    expect(slidingWindow([1, 2], 3)).toEqual([]);
  });

  it("rotate shifts elements", () => {
    expect(rotate([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5, 1, 2]);
    expect(rotate([1, 2, 3], -1)).toEqual([3, 1, 2]);
  });

  it("range generates sequences", () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(0, 10, 3)).toEqual([0, 3, 6, 9]);
    expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
  });
});
