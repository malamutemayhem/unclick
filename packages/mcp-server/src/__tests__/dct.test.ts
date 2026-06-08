import { describe, it, expect } from "vitest";
import { DCT } from "../dct.js";

describe("DCT", () => {
  it("forward and inverse round-trip", () => {
    const signal = [1, 2, 3, 4, 5, 6, 7, 8];
    const coeffs = DCT.forward(signal);
    const recovered = DCT.inverse(coeffs);
    for (let i = 0; i < signal.length; i++) {
      expect(recovered[i]).toBeCloseTo(signal[i], 5);
    }
  });

  it("forward produces correct length", () => {
    const coeffs = DCT.forward([1, 2, 3, 4]);
    expect(coeffs.length).toBe(4);
  });

  it("compress keeps top coefficients", () => {
    const signal = [1, 2, 3, 4, 5, 6, 7, 8];
    const compressed = DCT.compress(signal, 4);
    expect(compressed.length).toBe(8);
    for (let i = 0; i < signal.length; i++) {
      expect(compressed[i]).toBeCloseTo(signal[i], 0);
    }
  });

  it("energy computes sum of squared coefficients", () => {
    expect(DCT.energy([3, 4])).toBe(25);
  });

  it("energyCompaction shows energy concentration", () => {
    const signal = [10, 10, 10, 10];
    const ratio = DCT.energyCompaction(signal, 1);
    expect(ratio).toBeCloseTo(1, 5);
  });

  it("forward2D and inverse2D round-trip", () => {
    const matrix = [[1, 2], [3, 4]];
    const coeffs = DCT.forward2D(matrix);
    const recovered = DCT.inverse2D(coeffs);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        expect(recovered[i][j]).toBeCloseTo(matrix[i][j], 5);
      }
    }
  });

  it("constant signal concentrates energy in DC coefficient", () => {
    const signal = [5, 5, 5, 5];
    const coeffs = DCT.forward(signal);
    expect(Math.abs(coeffs[0])).toBeGreaterThan(0);
    for (let i = 1; i < coeffs.length; i++) {
      expect(Math.abs(coeffs[i])).toBeCloseTo(0, 5);
    }
  });

  it("inverse of zeros returns zeros", () => {
    const result = DCT.inverse([0, 0, 0, 0]);
    for (const v of result) {
      expect(v).toBeCloseTo(0);
    }
  });
});
