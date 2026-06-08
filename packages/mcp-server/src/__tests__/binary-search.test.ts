import { describe, it, expect } from "vitest";
import { binarySearch, lowerBound, upperBound, equalRange, insertionPoint } from "../binary-search.js";

describe("binary-search", () => {
  const arr = [1, 3, 5, 7, 9, 11];

  it("finds existing element", () => {
    expect(binarySearch(arr, 7)).toBe(3);
  });

  it("returns -1 for missing element", () => {
    expect(binarySearch(arr, 6)).toBe(-1);
  });

  it("finds first element", () => {
    expect(binarySearch(arr, 1)).toBe(0);
  });

  it("finds last element", () => {
    expect(binarySearch(arr, 11)).toBe(5);
  });

  it("lowerBound returns first >= target", () => {
    expect(lowerBound(arr, 5)).toBe(2);
    expect(lowerBound(arr, 4)).toBe(2);
  });

  it("upperBound returns first > target", () => {
    expect(upperBound(arr, 5)).toBe(3);
    expect(upperBound(arr, 4)).toBe(2);
  });

  it("equalRange on duplicates", () => {
    const dupes = [1, 3, 3, 3, 5, 7];
    expect(equalRange(dupes, 3)).toEqual([1, 4]);
  });

  it("insertionPoint for maintaining sort", () => {
    expect(insertionPoint(arr, 6)).toBe(3);
    expect(insertionPoint(arr, 0)).toBe(0);
    expect(insertionPoint(arr, 12)).toBe(6);
  });

  it("works with custom compare", () => {
    const strs = ["apple", "banana", "cherry"];
    const cmp = (a: string, b: string) => a.localeCompare(b);
    expect(binarySearch(strs, "banana", cmp)).toBe(1);
    expect(binarySearch(strs, "date", cmp)).toBe(-1);
  });

  it("empty array", () => {
    expect(binarySearch([], 5)).toBe(-1);
    expect(lowerBound([], 5)).toBe(0);
  });
});
