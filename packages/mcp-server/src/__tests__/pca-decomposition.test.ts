import { describe, it, expect } from "vitest";
import { PCADecomposition } from "../pca-decomposition.js";

describe("PCADecomposition", () => {
  it("reduces dimensions", () => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8]];
    const result = PCADecomposition.fit(data, 1);
    expect(result.transformed[0].length).toBe(1);
    expect(result.eigenvalues.length).toBe(1);
  });

  it("explained variance sums to approximately 1 for all components", () => {
    const data = [[1, 0], [0, 1], [1, 1], [0, 0]];
    const result = PCADecomposition.fit(data, 2);
    const total = result.explainedVariance.reduce((s, v) => s + v, 0);
    expect(total).toBeCloseTo(1, 5);
  });

  it("first component captures most variance", () => {
    const data = [[1, 0.1], [2, 0.2], [3, 0.3], [4, 0.4], [5, 0.5]];
    const result = PCADecomposition.fit(data, 2);
    expect(result.explainedVariance[0]).toBeGreaterThan(result.explainedVariance[1]);
  });

  it("eigenvectors are unit length", () => {
    const data = [[1, 2], [3, 4], [5, 6]];
    const result = PCADecomposition.fit(data, 2);
    for (const ev of result.eigenvectors) {
      const norm = Math.sqrt(ev.reduce((s, x) => s + x * x, 0));
      expect(norm).toBeCloseTo(1, 5);
    }
  });

  it("eigenvalues are non-negative", () => {
    const data = [[1, 0], [0, 1], [1, 1]];
    const result = PCADecomposition.fit(data, 2);
    for (const ev of result.eigenvalues) {
      expect(ev).toBeGreaterThanOrEqual(-1e-10);
    }
  });

  it("center removes mean", () => {
    const data = [[2, 4], [4, 6]];
    const centered = PCADecomposition.center(data);
    expect(centered[0][0]).toBeCloseTo(-1, 8);
    expect(centered[1][0]).toBeCloseTo(1, 8);
  });

  it("transformed data has correct rows", () => {
    const data = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]];
    const result = PCADecomposition.fit(data, 1);
    expect(result.transformed.length).toBe(5);
  });
});
