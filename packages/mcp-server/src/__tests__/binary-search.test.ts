import { describe, it, expect } from "vitest";
import { binarySearch, lowerBound, upperBound, equalRange, insertionIndex, binarySearchBy } from "../binary-search.js";

describe("binarySearch", () => {
  it("finds element", () => {
    expect(binarySearch([1, 3, 5, 7, 9], 5)).toBe(2);
  });

  it("returns -1 for missing", () => {
    expect(binarySearch([1, 3, 5, 7, 9], 4)).toBe(-1);
  });

  it("works with custom comparator", () => {
    const arr = ["apple", "banana", "cherry"];
    const idx = binarySearch(arr, "banana", (a, b) => a.localeCompare(b));
    expect(idx).toBe(1);
  });

  it("finds first element", () => {
    expect(binarySearch([1, 2, 3], 1)).toBe(0);
  });

  it("finds last element", () => {
    expect(binarySearch([1, 2, 3], 3)).toBe(2);
  });
});

describe("lowerBound", () => {
  it("finds insertion point", () => {
    expect(lowerBound([1, 3, 3, 5, 7], 3)).toBe(1);
  });

  it("returns length for larger value", () => {
    expect(lowerBound([1, 2, 3], 10)).toBe(3);
  });
});

describe("upperBound", () => {
  it("finds past-the-end of target", () => {
    expect(upperBound([1, 3, 3, 5, 7], 3)).toBe(3);
  });
});

describe("equalRange", () => {
  it("finds range of equal elements", () => {
    expect(equalRange([1, 2, 2, 2, 3], 2)).toEqual([1, 4]);
  });

  it("empty range for missing", () => {
    const [lo, hi] = equalRange([1, 3, 5], 2);
    expect(lo).toBe(hi);
  });
});

describe("insertionIndex", () => {
  it("returns correct insertion point", () => {
    expect(insertionIndex([1, 3, 5], 4)).toBe(2);
    expect(insertionIndex([1, 3, 5], 0)).toBe(0);
    expect(insertionIndex([1, 3, 5], 6)).toBe(3);
  });
});

describe("binarySearchBy", () => {
  it("searches by key function", () => {
    const items = [{ id: 1 }, { id: 3 }, { id: 5 }];
    const idx = binarySearchBy(items, 3, (item) => item.id);
    expect(idx).toBe(1);
  });

  it("returns -1 for missing key", () => {
    const items = [{ id: 1 }, { id: 3 }];
    expect(binarySearchBy(items, 2, (item) => item.id)).toBe(-1);
  });
});
