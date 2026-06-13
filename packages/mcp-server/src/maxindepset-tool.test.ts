import { describe, it, expect } from "vitest";
import { maxIndependentSet } from "./maxindepset-tool.js";

describe("maxIndependentSet", () => {
  it("finds MIS in a triangle", async () => {
    const r = (await maxIndependentSet({
      vertex_count: 3,
      edges: [[0, 1], [1, 2], [0, 2]],
    })) as any;
    expect(r.max_independent_set_size).toBe(1);
  });

  it("finds MIS in a path", async () => {
    const r = (await maxIndependentSet({
      vertex_count: 4,
      edges: [[0, 1], [1, 2], [2, 3]],
    })) as any;
    expect(r.max_independent_set_size).toBe(2);
  });

  it("returns all vertices for edgeless graph", async () => {
    const r = (await maxIndependentSet({
      vertex_count: 4,
      edges: [],
    })) as any;
    expect(r.max_independent_set_size).toBe(4);
    expect(r.independent_set).toEqual([0, 1, 2, 3]);
  });

  it("handles bipartite graph", async () => {
    const r = (await maxIndependentSet({
      vertex_count: 4,
      edges: [[0, 2], [0, 3], [1, 2], [1, 3]],
    })) as any;
    expect(r.max_independent_set_size).toBe(2);
  });

  it("stamps meta", async () => {
    const r = (await maxIndependentSet({
      vertex_count: 2,
      edges: [[0, 1]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
