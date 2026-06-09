import { describe, it, expect } from "vitest";
import { kmeansCluster } from "./kmeans-tool.js";

describe("kmeansCluster", () => {
  it("clusters 2D points", async () => {
    const r = await kmeansCluster({
      points: [[0,0],[1,0],[0,1],[10,10],[11,10],[10,11]],
      k: 2,
    }) as any;
    expect(r.k).toBe(2);
    expect(r.cluster_sizes).toHaveLength(2);
    expect(r.cluster_sizes[0] + r.cluster_sizes[1]).toBe(6);
    expect(r.centroids).toHaveLength(2);
    expect(r.assignments).toHaveLength(6);
  });

  it("clusters 1D points", async () => {
    const r = await kmeansCluster({
      points: [[1],[2],[3],[100],[101],[102]],
      k: 2,
    }) as any;
    expect(r.dimensions).toBe(1);
    expect(r.point_count).toBe(6);
  });

  it("k=1 puts all in one cluster", async () => {
    const r = await kmeansCluster({
      points: [[1,2],[3,4],[5,6]],
      k: 1,
    }) as any;
    expect(r.cluster_sizes).toEqual([3]);
  });

  it("rejects empty points", async () => {
    await expect(kmeansCluster({ points: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await kmeansCluster({
      points: [[1],[2],[3]],
      k: 2,
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
