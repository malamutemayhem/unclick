import { describe, it, expect } from "vitest";
import { permutations, combinations, powerSet, cartesianProduct } from "../permutations.js";

describe("permutations", () => {
  it("generates all permutations", () => {
    const result = permutations([1, 2, 3]);
    expect(result).toHaveLength(6);
    expect(result).toContainEqual([1, 2, 3]);
    expect(result).toContainEqual([3, 2, 1]);
  });

  it("handles single element", () => {
    expect(permutations([1])).toEqual([[1]]);
  });

  it("handles empty array", () => {
    expect(permutations([])).toEqual([[]]);
  });
});

describe("combinations", () => {
  it("generates combinations of k", () => {
    const result = combinations([1, 2, 3, 4], 2);
    expect(result).toHaveLength(6);
    expect(result).toContainEqual([1, 2]);
    expect(result).toContainEqual([3, 4]);
  });

  it("k=0 returns empty combo", () => {
    expect(combinations([1, 2], 0)).toEqual([[]]);
  });

  it("k=n returns single combo", () => {
    expect(combinations([1, 2], 2)).toEqual([[1, 2]]);
  });

  it("k > n returns empty", () => {
    expect(combinations([1], 5)).toEqual([]);
  });
});

describe("powerSet", () => {
  it("generates all subsets", () => {
    const result = powerSet([1, 2]);
    expect(result).toHaveLength(4);
    expect(result).toContainEqual([]);
    expect(result).toContainEqual([1]);
    expect(result).toContainEqual([2]);
    expect(result).toContainEqual([1, 2]);
  });

  it("empty array returns [[]]", () => {
    expect(powerSet([])).toEqual([[]]);
  });
});

describe("cartesianProduct", () => {
  it("generates product of two arrays", () => {
    const result = cartesianProduct([1, 2], [3, 4]);
    expect(result).toHaveLength(4);
    expect(result).toContainEqual([1, 3]);
    expect(result).toContainEqual([2, 4]);
  });

  it("handles empty input", () => {
    expect(cartesianProduct()).toEqual([[]]);
  });

  it("handles single array", () => {
    expect(cartesianProduct([1, 2])).toEqual([[1], [2]]);
  });
});
