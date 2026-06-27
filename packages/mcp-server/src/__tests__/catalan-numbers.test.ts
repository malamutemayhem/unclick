import { describe, it, expect } from "vitest";
import { CatalanNumbers } from "../catalan-numbers.js";

describe("CatalanNumbers", () => {
  it("nth returns known Catalan numbers", () => {
    expect(CatalanNumbers.nth(0)).toBe(1);
    expect(CatalanNumbers.nth(1)).toBe(1);
    expect(CatalanNumbers.nth(2)).toBe(2);
    expect(CatalanNumbers.nth(3)).toBe(5);
    expect(CatalanNumbers.nth(4)).toBe(14);
    expect(CatalanNumbers.nth(5)).toBe(42);
  });

  it("sequence generates first n Catalan numbers", () => {
    const seq = CatalanNumbers.sequence(6);
    expect(seq).toEqual([1, 1, 2, 5, 14, 42]);
  });

  it("binomialFormula matches nth", () => {
    for (let i = 0; i < 10; i++) {
      expect(CatalanNumbers.binomialFormula(i)).toBe(CatalanNumbers.nth(i));
    }
  });

  it("binaryTrees counts structurally unique BSTs", () => {
    expect(CatalanNumbers.binaryTrees(3)).toBe(5);
  });

  it("triangulations counts polygon triangulations", () => {
    expect(CatalanNumbers.triangulations(4)).toBe(2);
    expect(CatalanNumbers.triangulations(5)).toBe(5);
  });

  it("generateParentheses produces valid strings", () => {
    const parens = CatalanNumbers.generateParentheses(3);
    expect(parens.length).toBe(5);
    expect(parens).toContain("((()))");
    expect(parens).toContain("()(())");
  });

  it("isCatalan identifies Catalan numbers", () => {
    expect(CatalanNumbers.isCatalan(14)).toBe(true);
    expect(CatalanNumbers.isCatalan(15)).toBe(false);
  });

  it("dyckPaths equals nth Catalan", () => {
    expect(CatalanNumbers.dyckPaths(4)).toBe(14);
  });

  it("monotonePaths equals nth Catalan", () => {
    expect(CatalanNumbers.monotonePaths(3)).toBe(5);
  });
});
