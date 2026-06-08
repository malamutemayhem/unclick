import { describe, it, expect } from "vitest";
import { kMeans } from "../k-means.js";

describe("k-means", () => {
  it("clusters obvious groups", () => {
    const points = [
      [0, 0], [1, 0], [0, 1],
      [10, 10], [11, 10], [10, 11],
    ];
    const result = kMeans(points, 2);
    expect(result.centroids.length).toBe(2);
    expect(result.assignments.length).toBe(6);
    expect(result.assignments[0]).toBe(result.assignments[1]);
    expect(result.assignments[0]).toBe(result.assignments[2]);
    expect(result.assignments[3]).toBe(result.assignments[4]);
    expect(result.assignments[3]).toBe(result.assignments[5]);
    expect(result.assignments[0]).not.toBe(result.assignments[3]);
  });

  it("handles empty input", () => {
    const result = kMeans([], 3);
    expect(result.centroids).toEqual([]);
    expect(result.assignments).toEqual([]);
  });

  it("k >= n returns identity", () => {
    const points = [[1, 2], [3, 4]];
    const result = kMeans(points, 5);
    expect(result.centroids.length).toBe(2);
  });

  it("single cluster", () => {
    const points = [[1, 1], [2, 2], [3, 3]];
    const result = kMeans(points, 1);
    expect(result.centroids.length).toBe(1);
    expect(result.assignments.every((a) => a === 0)).toBe(true);
  });

  it("1D clustering", () => {
    const points = [[0], [1], [100], [101]];
    const result = kMeans(points, 2);
    expect(result.assignments[0]).toBe(result.assignments[1]);
    expect(result.assignments[2]).toBe(result.assignments[3]);
    expect(result.assignments[0]).not.toBe(result.assignments[2]);
  });

  it("converges within max iterations", () => {
    const points = Array.from({ length: 50 }, (_, i) => [i < 25 ? i : i + 100]);
    const result = kMeans(points, 2, 50);
    expect(result.iterations).toBeLessThanOrEqual(50);
  });
});
