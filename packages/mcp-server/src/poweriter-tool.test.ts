import { describe, it, expect } from "vitest";
import { powerIteration } from "./poweriter-tool.js";

describe("powerIteration", () => {
  it("finds dominant eigenvalue of 2x2", async () => {
    const r = await powerIteration({
      matrix: [[2, 1], [1, 2]],
    }) as any;
    expect(r.converged).toBe(true);
    expect(r.dominant_eigenvalue).toBeCloseTo(3, 4);
    expect(r.eigenvector).toHaveLength(2);
  });

  it("finds eigenvalue of diagonal matrix", async () => {
    const r = await powerIteration({
      matrix: [[5, 0], [0, 2]],
    }) as any;
    expect(r.dominant_eigenvalue).toBeCloseTo(5, 4);
  });

  it("handles 3x3 matrix", async () => {
    const r = await powerIteration({
      matrix: [[4, 1, 0], [1, 3, 1], [0, 1, 2]],
    }) as any;
    expect(r.converged).toBe(true);
    expect(r.matrix_size).toBe(3);
    expect(r.eigenvector).toHaveLength(3);
  });

  it("rejects non-square matrix", async () => {
    await expect(powerIteration({
      matrix: [[1, 2, 3], [4, 5]],
    })).rejects.toThrow("square");
  });

  it("stamps meta", async () => {
    const r = await powerIteration({
      matrix: [[1, 0], [0, 1]],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
