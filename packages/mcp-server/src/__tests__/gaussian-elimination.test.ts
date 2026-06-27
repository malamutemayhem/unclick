import { describe, it, expect } from "vitest";
import { GaussianElimination } from "../gaussian-elimination.js";

describe("GaussianElimination", () => {
  it("solves 2x2 system", () => {
    const A = [[2, 1], [1, 3]];
    const b = [5, 10];
    const x = GaussianElimination.solve(A, b)!;
    expect(x[0]).toBeCloseTo(1, 8);
    expect(x[1]).toBeCloseTo(3, 8);
  });

  it("solves 3x3 system", () => {
    const A = [[1, 2, 3], [4, 5, 6], [7, 8, 10]];
    const b = [6, 15, 25];
    const x = GaussianElimination.solve(A, b)!;
    expect(x[0]).toBeCloseTo(1, 8);
    expect(x[1]).toBeCloseTo(1, 8);
    expect(x[2]).toBeCloseTo(1, 8);
  });

  it("returns null for singular matrix", () => {
    const A = [[1, 2], [2, 4]];
    const b = [3, 6];
    expect(GaussianElimination.solve(A, b)).toBeNull();
  });

  it("computes determinant", () => {
    expect(GaussianElimination.determinant([[1, 2], [3, 4]])).toBeCloseTo(-2, 8);
    expect(GaussianElimination.determinant([[1, 0], [0, 1]])).toBeCloseTo(1, 8);
  });

  it("determinant of singular is zero", () => {
    expect(GaussianElimination.determinant([[1, 2], [2, 4]])).toBeCloseTo(0, 8);
  });

  it("computes inverse", () => {
    const inv = GaussianElimination.inverse([[1, 2], [3, 4]])!;
    expect(inv[0][0]).toBeCloseTo(-2, 8);
    expect(inv[1][1]).toBeCloseTo(-0.5, 8);
  });

  it("inverse of singular is null", () => {
    expect(GaussianElimination.inverse([[1, 2], [2, 4]])).toBeNull();
  });

  it("rank computation", () => {
    expect(GaussianElimination.rank([[1, 2], [3, 4]])).toBe(2);
    expect(GaussianElimination.rank([[1, 2], [2, 4]])).toBe(1);
    expect(GaussianElimination.rank([[1, 0, 0], [0, 1, 0], [0, 0, 1]])).toBe(3);
  });
});
