import { describe, it, expect } from "vitest";
import {
  convolve, clampGrid, sobelMagnitude, gaussianKernel, threshold,
  IDENTITY, SHARPEN, BLUR_BOX, EDGE_DETECT,
} from "../image-kernel.js";

describe("convolve", () => {
  it("identity kernel preserves values", () => {
    const grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const result = convolve(grid, IDENTITY);
    expect(result[1][1]).toBe(5);
  });

  it("blur averages neighbors", () => {
    const grid = [[0, 0, 0], [0, 9, 0], [0, 0, 0]];
    const result = convolve(grid, BLUR_BOX);
    expect(result[1][1]).toBe(1);
  });

  it("sharpen increases contrast", () => {
    const grid = [[1, 1, 1], [1, 5, 1], [1, 1, 1]];
    const result = convolve(grid, SHARPEN);
    expect(result[1][1]).toBeGreaterThan(5);
  });

  it("edge detection highlights edges", () => {
    const grid = [[0, 0, 0], [0, 10, 0], [0, 0, 0]];
    const result = convolve(grid, EDGE_DETECT);
    expect(result[1][1]).toBe(80);
  });
});

describe("clampGrid", () => {
  it("clamps values to range", () => {
    const grid = [[-10, 300], [50, 128]];
    const result = clampGrid(grid);
    expect(result[0][0]).toBe(0);
    expect(result[0][1]).toBe(255);
    expect(result[1][0]).toBe(50);
  });
});

describe("sobelMagnitude", () => {
  it("detects edges", () => {
    const grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 255, 255, 255],
      [0, 0, 255, 255, 255],
      [0, 0, 255, 255, 255],
    ];
    const result = sobelMagnitude(grid);
    expect(result[2][2]).toBeGreaterThan(0);
  });
});

describe("gaussianKernel", () => {
  it("creates normalized kernel", () => {
    const k = gaussianKernel(3, 1.0);
    expect(k).toHaveLength(3);
    expect(k[0]).toHaveLength(3);
    const sum = k.flat().reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1.0);
  });

  it("center is largest value", () => {
    const k = gaussianKernel(5, 1.0);
    const center = k[2][2];
    expect(center).toBeGreaterThan(k[0][0]);
  });
});

describe("threshold", () => {
  it("binarizes grid", () => {
    const grid = [[50, 150], [200, 100]];
    const result = threshold(grid, 128);
    expect(result).toEqual([[0, 255], [255, 0]]);
  });
});
