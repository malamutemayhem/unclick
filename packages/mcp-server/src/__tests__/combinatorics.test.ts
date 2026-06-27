import { describe, it, expect } from "vitest";
import { Combinatorics } from "../combinatorics.js";

describe("Combinatorics", () => {
  it("factorial computes correctly", () => {
    expect(Combinatorics.factorial(0)).toBe(1);
    expect(Combinatorics.factorial(1)).toBe(1);
    expect(Combinatorics.factorial(5)).toBe(120);
    expect(Combinatorics.factorial(10)).toBe(3628800);
  });

  it("factorial throws for negative input", () => {
    expect(() => Combinatorics.factorial(-1)).toThrow();
  });

  it("permutations counts ordered selections", () => {
    expect(Combinatorics.permutations(5, 2)).toBe(20);
    expect(Combinatorics.permutations(5, 5)).toBe(120);
    expect(Combinatorics.permutations(3, 4)).toBe(0);
  });

  it("combinations counts unordered selections", () => {
    expect(Combinatorics.combinations(5, 2)).toBe(10);
    expect(Combinatorics.combinations(10, 3)).toBe(120);
    expect(Combinatorics.combinations(5, 0)).toBe(1);
    expect(Combinatorics.combinations(5, 5)).toBe(1);
  });

  it("permutationsList generates all permutations", () => {
    const perms = Combinatorics.permutationsList([1, 2, 3]);
    expect(perms.length).toBe(6);
    expect(perms).toContainEqual([1, 2, 3]);
    expect(perms).toContainEqual([3, 2, 1]);
  });

  it("combinationsList generates all combinations", () => {
    const combos = Combinatorics.combinationsList([1, 2, 3, 4], 2);
    expect(combos.length).toBe(6);
    expect(combos).toContainEqual([1, 2]);
    expect(combos).toContainEqual([3, 4]);
  });

  it("powerSet generates all subsets", () => {
    const ps = Combinatorics.powerSet([1, 2, 3]);
    expect(ps.length).toBe(8);
    expect(ps).toContainEqual([]);
    expect(ps).toContainEqual([1, 2, 3]);
  });

  it("derangements counts permutations with no fixed points", () => {
    expect(Combinatorics.derangements(0)).toBe(1);
    expect(Combinatorics.derangements(1)).toBe(0);
    expect(Combinatorics.derangements(2)).toBe(1);
    expect(Combinatorics.derangements(3)).toBe(2);
    expect(Combinatorics.derangements(4)).toBe(9);
  });

  it("catalan computes Catalan numbers", () => {
    expect(Combinatorics.catalan(0)).toBe(1);
    expect(Combinatorics.catalan(1)).toBe(1);
    expect(Combinatorics.catalan(4)).toBe(14);
    expect(Combinatorics.catalan(5)).toBe(42);
  });

  it("stirlingSecond partitions into k subsets", () => {
    expect(Combinatorics.stirlingSecond(4, 2)).toBe(7);
    expect(Combinatorics.stirlingSecond(3, 1)).toBe(1);
    expect(Combinatorics.stirlingSecond(3, 3)).toBe(1);
  });

  it("bell counts total partitions", () => {
    expect(Combinatorics.bell(0)).toBe(1);
    expect(Combinatorics.bell(3)).toBe(5);
    expect(Combinatorics.bell(4)).toBe(15);
  });

  it("multinomial computes multinomial coefficient", () => {
    expect(Combinatorics.multinomial(2, 1)).toBe(3);
    expect(Combinatorics.multinomial(2, 2, 2)).toBe(90);
  });
});
