import { describe, it, expect } from "vitest";
import { permutations, combinations, powerSet, countPermutations, countCombinations, collect } from "../permutations.js";

describe("permutations", () => {
  it("generates all permutations", () => {
    const result = collect(permutations([1, 2, 3]));
    expect(result.length).toBe(6);
    expect(result).toContainEqual([1, 2, 3]);
    expect(result).toContainEqual([3, 2, 1]);
  });

  it("single element", () => {
    expect(collect(permutations([1]))).toEqual([[1]]);
  });

  it("empty array", () => {
    expect(collect(permutations([]))).toEqual([[]]);
  });

  it("generates combinations of size k", () => {
    const result = collect(combinations([1, 2, 3, 4], 2));
    expect(result.length).toBe(6);
    expect(result).toContainEqual([1, 2]);
    expect(result).toContainEqual([3, 4]);
  });

  it("combinations k=0 yields empty", () => {
    expect(collect(combinations([1, 2], 0))).toEqual([[]]);
  });

  it("combinations k > n yields nothing", () => {
    expect(collect(combinations([1], 5))).toEqual([]);
  });

  it("powerSet generates all subsets", () => {
    const result = collect(powerSet([1, 2]));
    expect(result.length).toBe(4);
    expect(result).toContainEqual([]);
    expect(result).toContainEqual([1]);
    expect(result).toContainEqual([2]);
    expect(result).toContainEqual([1, 2]);
  });

  it("countPermutations", () => {
    expect(countPermutations(4)).toBe(24);
    expect(countPermutations(5, 2)).toBe(20);
  });

  it("countCombinations", () => {
    expect(countCombinations(5, 2)).toBe(10);
    expect(countCombinations(4, 4)).toBe(1);
  });
});
