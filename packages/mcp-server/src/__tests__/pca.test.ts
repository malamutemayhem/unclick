import { describe, it, expect } from "vitest";
import { PCA } from "../pca.js";

describe("PCA", () => {
  const data = [
    [2.5, 2.4],
    [0.5, 0.7],
    [2.2, 2.9],
    [1.9, 2.2],
    [3.1, 3.0],
    [2.3, 2.7],
    [2.0, 1.6],
    [1.0, 1.1],
    [1.5, 1.6],
    [1.1, 0.9],
  ];

  it("fit returns components", () => {
    const result = PCA.fit(data, 2);
    expect(result.components.length).toBe(2);
    expect(result.eigenvalues.length).toBe(2);
  });

  it("explained variance sums to approximately 1", () => {
    const result = PCA.fit(data, 2);
    const total = result.explainedVariance.reduce((s, v) => s + v, 0);
    expect(total).toBeCloseTo(1, 1);
  });

  it("first component explains most variance", () => {
    const result = PCA.fit(data, 2);
    expect(result.explainedVariance[0]).toBeGreaterThan(result.explainedVariance[1]);
  });

  it("transform reduces dimensionality", () => {
    const result = PCA.fit(data, 1);
    const projected = PCA.transform(data, result.components, result.mean);
    expect(projected.length).toBe(data.length);
    expect(projected[0].length).toBe(1);
  });

  it("transform to 2 preserves dimensionality", () => {
    const result = PCA.fit(data, 2);
    const projected = PCA.transform(data, result.components, result.mean);
    expect(projected[0].length).toBe(2);
  });

  it("inverse approximately recovers original", () => {
    const result = PCA.fit(data, 2);
    const projected = PCA.transform(data, result.components, result.mean);
    const recovered = PCA.inverse(projected, result.components, result.mean);
    for (let i = 0; i < data.length; i++) {
      expect(recovered[i][0]).toBeCloseTo(data[i][0], 0);
      expect(recovered[i][1]).toBeCloseTo(data[i][1], 0);
    }
  });

  it("mean is computed correctly", () => {
    const result = PCA.fit(data, 2);
    const expectedMeanX = data.reduce((s, r) => s + r[0], 0) / data.length;
    expect(result.mean[0]).toBeCloseTo(expectedMeanX, 2);
  });

  it("eigenvalues are non-negative", () => {
    const result = PCA.fit(data, 2);
    for (const ev of result.eigenvalues) {
      expect(ev).toBeGreaterThanOrEqual(0);
    }
  });
});
