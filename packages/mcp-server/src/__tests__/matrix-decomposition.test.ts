import { describe, it, expect } from "vitest";
import {
  luDecompose, solveLU, choleskyDecompose,
  determinant, matMul, transpose,
} from "../matrix-decomposition.js";

describe("luDecompose", () => {
  it("decomposes a 2x2 matrix", () => {
    const A = [[4, 3], [6, 3]];
    const result = luDecompose(A);
    expect(result).not.toBeNull();
    const { L, U, P } = result!;
    const product = matMul(L, U);
    // L*U = P*A (permuted rows of A)
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        expect(product[i][j]).toBeCloseTo(A[P[i]][j]);
      }
    }
  });

  it("returns null for singular matrix", () => {
    const result = luDecompose([[1, 2], [2, 4]]);
    expect(result).toBeNull();
  });
});

describe("solveLU", () => {
  it("solves a linear system", () => {
    // 2x + y = 5, x + 3y = 7 -> x = 8/5, y = 9/5
    const result = luDecompose([[2, 1], [1, 3]])!;
    const x = solveLU(result.L, result.U, result.P, [5, 7]);
    expect(x[0]).toBeCloseTo(1.6);
    expect(x[1]).toBeCloseTo(1.8);
  });
});

describe("choleskyDecompose", () => {
  it("decomposes a positive definite matrix", () => {
    const A = [[4, 2], [2, 5]];
    const L = choleskyDecompose(A);
    expect(L).not.toBeNull();
    const LT = transpose(L!);
    const product = matMul(L!, LT);
    expect(product[0][0]).toBeCloseTo(4);
    expect(product[0][1]).toBeCloseTo(2);
    expect(product[1][1]).toBeCloseTo(5);
  });

  it("returns null for non-positive definite", () => {
    const result = choleskyDecompose([[-1, 0], [0, -1]]);
    expect(result).toBeNull();
  });
});

describe("determinant", () => {
  it("computes 2x2 determinant", () => {
    expect(determinant([[3, 1], [2, 4]])).toBeCloseTo(10);
  });

  it("computes 3x3 determinant", () => {
    const det = determinant([[1, 2, 3], [4, 5, 6], [7, 8, 0]]);
    expect(det).toBeCloseTo(27);
  });

  it("returns 0 for singular matrix", () => {
    expect(determinant([[1, 2], [2, 4]])).toBeCloseTo(0);
  });
});

describe("matMul", () => {
  it("multiplies matrices", () => {
    const a = [[1, 2], [3, 4]];
    const b = [[5, 6], [7, 8]];
    const c = matMul(a, b);
    expect(c).toEqual([[19, 22], [43, 50]]);
  });
});

describe("transpose", () => {
  it("transposes a matrix", () => {
    expect(transpose([[1, 2], [3, 4]])).toEqual([[1, 3], [2, 4]]);
  });

  it("handles non-square", () => {
    expect(transpose([[1, 2, 3]])).toEqual([[1], [2], [3]]);
  });
});
