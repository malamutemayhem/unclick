import { describe, it, expect } from "vitest";
import { centroidDecomposition } from "./centroid-tool.js";

describe("centroidDecomposition", () => {
  it("decomposes a path graph", async () => {
    const r = (await centroidDecomposition({
      vertex_count: 5,
      edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    })) as any;
    expect(r.vertex_count).toBe(5);
    expect(r.centroid_root).toBeGreaterThanOrEqual(0);
    expect(r.max_depth).toBeGreaterThan(0);
  });

  it("decomposes a star graph", async () => {
    const r = (await centroidDecomposition({
      vertex_count: 5,
      edges: [[0, 1], [0, 2], [0, 3], [0, 4]],
    })) as any;
    expect(r.centroid_root).toBe(0);
    expect(r.max_depth).toBe(1);
  });

  it("handles single vertex", async () => {
    const r = (await centroidDecomposition({
      vertex_count: 1,
      edges: [],
    })) as any;
    expect(r.centroid_root).toBe(0);
    expect(r.max_depth).toBe(0);
  });

  it("returns correct parent array length", async () => {
    const r = (await centroidDecomposition({
      vertex_count: 4,
      edges: [[0, 1], [1, 2], [1, 3]],
    })) as any;
    expect(r.centroid_parent).toHaveLength(4);
    expect(r.centroid_depth).toHaveLength(4);
  });

  it("stamps meta", async () => {
    const r = (await centroidDecomposition({
      vertex_count: 2,
      edges: [[0, 1]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
