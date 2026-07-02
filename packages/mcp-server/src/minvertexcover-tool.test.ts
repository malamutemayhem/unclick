import { describe, it, expect } from "vitest";
import { minVertexCover } from "./minvertexcover-tool.js";

describe("minVertexCover", () => {
  it("finds cover for a triangle", async () => {
    const r = (await minVertexCover({
      vertex_count: 3,
      edges: [[0, 1], [1, 2], [0, 2]],
    })) as any;
    expect(r.cover_size).toBe(2);
    expect(r.cover).toHaveLength(2);
  });

  it("finds cover for a single edge", async () => {
    const r = (await minVertexCover({
      vertex_count: 2,
      edges: [[0, 1]],
    })) as any;
    expect(r.cover_size).toBe(1);
  });

  it("returns empty cover for no edges", async () => {
    const r = (await minVertexCover({
      vertex_count: 3,
      edges: [],
    })) as any;
    expect(r.cover_size).toBe(0);
    expect(r.cover).toEqual([]);
  });

  it("handles star graph", async () => {
    const r = (await minVertexCover({
      vertex_count: 5,
      edges: [[0, 1], [0, 2], [0, 3], [0, 4]],
    })) as any;
    expect(r.cover_size).toBe(1);
    expect(r.cover).toEqual([0]);
  });

  it("stamps meta", async () => {
    const r = (await minVertexCover({
      vertex_count: 2,
      edges: [[0, 1]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
