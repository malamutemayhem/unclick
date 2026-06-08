import { describe, it, expect } from "vitest";
import { CombinationGen } from "../combination-gen.js";

describe("CombinationGen", () => {
  it("combinations generates correct k-subsets", () => {
    const result = CombinationGen.combinations([1, 2, 3], 2);
    expect(result).toEqual([[1, 2], [1, 3], [2, 3]]);
  });

  it("combinations returns empty for k > n", () => {
    expect(CombinationGen.combinations([1, 2], 3)).toEqual([]);
  });

  it("permutations generates all orderings", () => {
    const result = CombinationGen.permutations([1, 2, 3]);
    expect(result.length).toBe(6);
    expect(result).toContainEqual([3, 2, 1]);
  });

  it("powerSet generates all subsets", () => {
    const result = CombinationGen.powerSet([1, 2]);
    expect(result.length).toBe(4);
    expect(result).toContainEqual([]);
    expect(result).toContainEqual([1, 2]);
  });

  it("nCr computes binomial coefficient", () => {
    expect(CombinationGen.nCr(5, 2)).toBe(10);
    expect(CombinationGen.nCr(10, 0)).toBe(1);
    expect(CombinationGen.nCr(3, 4)).toBe(0);
  });

  it("nPr computes partial permutations", () => {
    expect(CombinationGen.nPr(5, 3)).toBe(60);
    expect(CombinationGen.nPr(4, 4)).toBe(24);
  });

  it("cartesianProduct computes cross product", () => {
    const result = CombinationGen.cartesianProduct([1, 2], [3, 4]);
    expect(result.length).toBe(4);
    expect(result).toContainEqual([1, 3]);
    expect(result).toContainEqual([2, 4]);
  });

  it("derangements counts fixed-point-free permutations", () => {
    expect(CombinationGen.derangements(0)).toBe(1);
    expect(CombinationGen.derangements(1)).toBe(0);
    expect(CombinationGen.derangements(3)).toBe(2);
    expect(CombinationGen.derangements(4)).toBe(9);
  });

  it("combinations count matches nCr", () => {
    const combos = CombinationGen.combinations([1, 2, 3, 4, 5], 3);
    expect(combos.length).toBe(CombinationGen.nCr(5, 3));
  });
});
