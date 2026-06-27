import { describe, it, expect } from "vitest";
import { SVD } from "../svd.js";

describe("SVD", () => {
  const matrix = [
    [1, 0, 0],
    [0, 2, 0],
    [0, 0, 3],
  ];

  it("decompose returns U, S, V", () => {
    const { U, S, V } = SVD.decompose(matrix);
    expect(U.length).toBe(3);
    expect(S.length).toBe(3);
    expect(V.length).toBe(3);
  });

  it("singular values are non-negative", () => {
    const { S } = SVD.decompose(matrix);
    for (const s of S) {
      expect(s).toBeGreaterThanOrEqual(0);
    }
  });

  it("singular values are in descending order", () => {
    const { S } = SVD.decompose(matrix);
    for (let i = 1; i < S.length; i++) {
      expect(S[i - 1]).toBeGreaterThanOrEqual(S[i] - 0.01);
    }
  });

  it("reconstruct approximates original", () => {
    const { U, S, V } = SVD.decompose(matrix);
    const recon = SVD.reconstruct(U, S, V);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        expect(recon[i][j]).toBeCloseTo(matrix[i][j], 0);
      }
    }
  });

  it("lowRank produces approximation", () => {
    const approx = SVD.lowRank(matrix, 2);
    expect(approx.length).toBe(3);
    expect(approx[0].length).toBe(3);
  });

  it("pseudoInverse produces correct dimensions", () => {
    const pinv = SVD.pseudoInverse(matrix);
    expect(pinv.length).toBe(3);
    expect(pinv[0].length).toBe(3);
  });

  it("pseudoInverse of diagonal is inverse", () => {
    const pinv = SVD.pseudoInverse(matrix);
    expect(pinv[0][0]).toBeCloseTo(1, 0);
    expect(pinv[1][1]).toBeCloseTo(0.5, 0);
    expect(pinv[2][2]).toBeCloseTo(0.333, 0);
  });
});
