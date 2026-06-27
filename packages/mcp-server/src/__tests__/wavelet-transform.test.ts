import { describe, it, expect } from "vitest";
import { WaveletTransform } from "../wavelet-transform.js";

describe("WaveletTransform", () => {
  it("haarForward and haarInverse round-trip", () => {
    const signal = [1, 2, 3, 4, 5, 6, 7, 8];
    const { approx, detail } = WaveletTransform.haarForward(signal);
    const recovered = WaveletTransform.haarInverse(approx, detail);
    for (let i = 0; i < signal.length; i++) {
      expect(recovered[i]).toBeCloseTo(signal[i]);
    }
  });

  it("haarForward produces correct lengths", () => {
    const signal = [1, 2, 3, 4];
    const { approx, detail } = WaveletTransform.haarForward(signal);
    expect(approx.length).toBe(2);
    expect(detail.length).toBe(2);
  });

  it("multiLevel decomposes into multiple levels", () => {
    const signal = [1, 2, 3, 4, 5, 6, 7, 8];
    const { coeffs, final: fin } = WaveletTransform.multiLevel(signal, 3);
    expect(coeffs.length).toBe(3);
    expect(fin.length).toBe(1);
  });

  it("denoise removes small coefficients", () => {
    const signal = [10, 10.1, 9.9, 10, 10.05, 9.95, 10, 10];
    const denoised = WaveletTransform.denoise(signal, 0.2);
    for (const v of denoised) {
      expect(v).toBeCloseTo(10, 0);
    }
  });

  it("energy computes sum of squares", () => {
    expect(WaveletTransform.energy([3, 4])).toBe(25);
  });

  it("compress preserves signal shape", () => {
    const signal = [1, 2, 3, 4, 5, 6, 7, 8];
    const compressed = WaveletTransform.compress(signal, 0.5);
    expect(compressed.length).toBe(signal.length);
  });

  it("constant signal has zero detail coefficients", () => {
    const signal = [5, 5, 5, 5];
    const { detail } = WaveletTransform.haarForward(signal);
    for (const d of detail) {
      expect(d).toBeCloseTo(0);
    }
  });
});
