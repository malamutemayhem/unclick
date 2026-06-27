import { describe, it, expect } from "vitest";
import { Convolution } from "../convolution.js";

describe("Convolution", () => {
  it("convolve produces correct output length", () => {
    const result = Convolution.convolve([1, 2, 3], [1, 1]);
    expect(result.length).toBe(4);
  });

  it("convolve with identity kernel", () => {
    const result = Convolution.convolve([1, 2, 3, 4], [1]);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("convolve computes correctly", () => {
    const result = Convolution.convolve([1, 2, 3], [1, 0, -1]);
    expect(result).toEqual([1, 2, 2, -2, -3]);
  });

  it("correlate reverses kernel", () => {
    const result = Convolution.correlate([1, 2, 3, 4], [1, 2]);
    expect(result.length).toBe(5);
  });

  it("movingAverage smooths signal", () => {
    const signal = [1, 5, 1, 5, 1, 5, 1];
    const smoothed = Convolution.movingAverage(signal, 3);
    expect(smoothed.length).toBe(signal.length);
    const range1 = Math.max(...signal) - Math.min(...signal);
    const range2 = Math.max(...smoothed) - Math.min(...smoothed);
    expect(range2).toBeLessThan(range1);
  });

  it("gaussianKernel sums to 1", () => {
    const kernel = Convolution.gaussianKernel(7);
    const sum = kernel.reduce((s, v) => s + v, 0);
    expect(sum).toBeCloseTo(1, 1);
  });

  it("gaussianKernel peaks at center", () => {
    const kernel = Convolution.gaussianKernel(5);
    expect(kernel[2]).toBeGreaterThan(kernel[0]);
    expect(kernel[2]).toBeGreaterThan(kernel[4]);
  });

  it("smooth reduces noise", () => {
    const noisy = [10, 12, 8, 11, 9, 13, 7, 12, 10];
    const smoothed = Convolution.smooth(noisy, 1);
    expect(smoothed.length).toBe(noisy.length);
  });

  it("edgeDetect highlights transitions", () => {
    const signal = [0, 0, 0, 5, 5, 5, 0, 0, 0];
    const edges = Convolution.edgeDetect(signal);
    expect(edges.length).toBe(signal.length);
    expect(Math.abs(edges[3])).toBeGreaterThan(0);
  });

  it("sharpen amplifies differences", () => {
    const signal = [1, 2, 1, 2, 1];
    const sharp = Convolution.sharpen(signal, 1);
    expect(sharp.length).toBe(signal.length);
  });

  it("deconvolve recovers original signal", () => {
    const original = [1, 2, 3];
    const kernel = [1, 0.5];
    const convolved = Convolution.convolve(original, kernel);
    const recovered = Convolution.deconvolve(convolved, kernel);
    expect(recovered.length).toBe(original.length);
    for (let i = 0; i < original.length; i++) {
      expect(recovered[i]).toBeCloseTo(original[i], 2);
    }
  });
});
