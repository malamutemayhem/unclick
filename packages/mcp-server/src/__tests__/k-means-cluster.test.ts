import { describe, it, expect } from "vitest";
import { KMeansCluster } from "../k-means-cluster.js";

describe("KMeansCluster", () => {
  it("clusters well-separated points", () => {
    const points = [[0, 0], [1, 0], [0, 1], [10, 10], [11, 10], [10, 11]];
    const { assignments } = KMeansCluster.cluster(points, 2);
    expect(assignments[0]).toBe(assignments[1]);
    expect(assignments[3]).toBe(assignments[4]);
    expect(assignments[0]).not.toBe(assignments[3]);
  });

  it("returns k centroids", () => {
    const points = [[0, 0], [1, 1], [5, 5], [6, 6]];
    const { centroids } = KMeansCluster.cluster(points, 2);
    expect(centroids.length).toBe(2);
  });

  it("single cluster", () => {
    const points = [[1, 1], [2, 2], [3, 3]];
    const { assignments } = KMeansCluster.cluster(points, 1);
    expect(new Set(assignments).size).toBe(1);
  });

  it("distance computes euclidean", () => {
    expect(KMeansCluster.distance([0, 0], [3, 4])).toBeCloseTo(5, 8);
  });

  it("inertia is non-negative", () => {
    const points = [[0, 0], [1, 1], [5, 5]];
    const { centroids, assignments } = KMeansCluster.cluster(points, 2);
    expect(KMeansCluster.inertia(points, centroids, assignments)).toBeGreaterThanOrEqual(0);
  });

  it("converges in bounded iterations", () => {
    const points = [[0, 0], [10, 10]];
    const { iterations } = KMeansCluster.cluster(points, 2);
    expect(iterations).toBeLessThan(100);
  });

  it("silhouette score in valid range", () => {
    const points = [[0, 0], [1, 0], [10, 10], [11, 10]];
    const { assignments } = KMeansCluster.cluster(points, 2);
    const score = KMeansCluster.silhouetteScore(points, assignments, 2);
    expect(score).toBeGreaterThanOrEqual(-1);
    expect(score).toBeLessThanOrEqual(1);
  });
});
