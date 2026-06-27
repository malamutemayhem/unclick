import { describe, it, expect } from "vitest";
import { diffArrays, intersection, union, difference, symmetricDifference } from "../diff-array.js";

describe("diff-array", () => {
  it("diffArrays finds added and removed", () => {
    const result = diffArrays([1, 2, 3], [2, 3, 4]);
    expect(result.added).toEqual([4]);
    expect(result.removed).toEqual([1]);
    expect(result.unchanged).toEqual([2, 3]);
  });

  it("diffArrays with custom key function", () => {
    type Item = { id: number; name: string };
    const before: Item[] = [{ id: 1, name: "a" }, { id: 2, name: "b" }];
    const after: Item[] = [{ id: 2, name: "b" }, { id: 3, name: "c" }];
    const result = diffArrays(before, after, (i) => i.id);
    expect(result.added.map((i) => i.id)).toEqual([3]);
    expect(result.removed.map((i) => i.id)).toEqual([1]);
  });

  it("intersection returns common elements", () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });

  it("union returns all unique elements", () => {
    expect(union([1, 2], [2, 3]).sort()).toEqual([1, 2, 3]);
  });

  it("difference returns elements in a not in b", () => {
    expect(difference([1, 2, 3], [2, 3])).toEqual([1]);
    expect(difference([1, 2], [1, 2])).toEqual([]);
  });

  it("symmetricDifference returns elements in only one set", () => {
    expect(symmetricDifference([1, 2, 3], [2, 3, 4]).sort()).toEqual([1, 4]);
  });

  it("handles empty arrays", () => {
    const result = diffArrays([], [1, 2]);
    expect(result.added).toEqual([1, 2]);
    expect(result.removed).toEqual([]);
  });
});
