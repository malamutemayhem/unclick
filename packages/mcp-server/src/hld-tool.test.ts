import { describe, it, expect } from "vitest";
import { heavyLightDecomp } from "./hld-tool.js";

describe("heavyLightDecomp", () => {
  it("decomposes a path graph", async () => {
    const r = (await heavyLightDecomp({
      vertex_count: 5,
      edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    })) as any;
    expect(r.chain_count).toBe(1);
    expect(r.vertex_count).toBe(5);
  });

  it("decomposes a star graph", async () => {
    const r = (await heavyLightDecomp({
      vertex_count: 5,
      edges: [[0, 1], [0, 2], [0, 3], [0, 4]],
    })) as any;
    expect(r.chain_count).toBeGreaterThanOrEqual(2);
  });

  it("handles single vertex", async () => {
    const r = (await heavyLightDecomp({
      vertex_count: 1,
      edges: [],
    })) as any;
    expect(r.chain_count).toBe(1);
    expect(r.position[0]).toBe(0);
  });

  it("returns correct array lengths", async () => {
    const r = (await heavyLightDecomp({
      vertex_count: 4,
      edges: [[0, 1], [1, 2], [1, 3]],
    })) as any;
    expect(r.chain_head).toHaveLength(4);
    expect(r.position).toHaveLength(4);
    expect(r.depth).toHaveLength(4);
  });

  it("stamps meta", async () => {
    const r = (await heavyLightDecomp({
      vertex_count: 2,
      edges: [[0, 1]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
