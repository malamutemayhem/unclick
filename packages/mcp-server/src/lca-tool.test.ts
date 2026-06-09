import { describe, it, expect } from "vitest";
import { lowestCommonAncestor } from "./lca-tool.js";

describe("lowestCommonAncestor", () => {
  it("finds LCA in a simple tree", async () => {
    const r = (await lowestCommonAncestor({
      vertex_count: 5,
      edges: [[0, 1], [0, 2], [1, 3], [1, 4]],
      queries: [[3, 4]],
    })) as any;
    expect(r.results[0].lca).toBe(1);
    expect(r.results[0].distance).toBe(2);
  });

  it("returns node itself when querying same node", async () => {
    const r = (await lowestCommonAncestor({
      vertex_count: 3,
      edges: [[0, 1], [0, 2]],
      queries: [[1, 1]],
    })) as any;
    expect(r.results[0].lca).toBe(1);
    expect(r.results[0].distance).toBe(0);
  });

  it("finds root as LCA for nodes in different subtrees", async () => {
    const r = (await lowestCommonAncestor({
      vertex_count: 5,
      edges: [[0, 1], [0, 2], [1, 3], [2, 4]],
      queries: [[3, 4]],
    })) as any;
    expect(r.results[0].lca).toBe(0);
  });

  it("handles multiple queries", async () => {
    const r = (await lowestCommonAncestor({
      vertex_count: 4,
      edges: [[0, 1], [1, 2], [1, 3]],
      queries: [[2, 3], [0, 3]],
    })) as any;
    expect(r.results).toHaveLength(2);
    expect(r.results[0].lca).toBe(1);
    expect(r.results[1].lca).toBe(0);
  });

  it("stamps meta", async () => {
    const r = (await lowestCommonAncestor({
      vertex_count: 2,
      edges: [[0, 1]],
      queries: [[0, 1]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
