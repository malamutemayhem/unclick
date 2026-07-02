import { describe, it, expect } from "vitest";
import { eulerTour } from "./eulertour-tool.js";

describe("eulerTour", () => {
  it("computes tin/tout for a simple tree", async () => {
    const r = (await eulerTour({
      vertex_count: 3,
      edges: [[0, 1], [0, 2]],
      root: 0,
    })) as any;
    expect(r.tin[0]).toBe(0);
    expect(r.tout[0]).toBeGreaterThan(r.tin[0]);
    expect(r.depth[0]).toBe(0);
    expect(r.depth[1]).toBe(1);
  });

  it("computes subtree sizes", async () => {
    const r = (await eulerTour({
      vertex_count: 5,
      edges: [[0, 1], [0, 2], [1, 3], [1, 4]],
      root: 0,
    })) as any;
    expect(r.subtree_size[0]).toBe(5);
    expect(r.subtree_size[1]).toBe(3);
    expect(r.subtree_size[2]).toBe(1);
  });

  it("handles chain tree", async () => {
    const r = (await eulerTour({
      vertex_count: 4,
      edges: [[0, 1], [1, 2], [2, 3]],
      root: 0,
    })) as any;
    expect(r.max_depth).toBe(3);
    expect(r.depth[3]).toBe(3);
  });

  it("handles single node", async () => {
    const r = (await eulerTour({
      vertex_count: 1,
      edges: [],
      root: 0,
    })) as any;
    expect(r.tour_length).toBe(2);
    expect(r.subtree_size[0]).toBe(1);
  });

  it("stamps meta", async () => {
    const r = (await eulerTour({
      vertex_count: 1,
      edges: [],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
