import { describe, it, expect } from "vitest";
import { bipartiteCheck } from "./bipartite-tool.js";

describe("bipartiteCheck", () => {
  it("detects bipartite graph", async () => {
    const r = (await bipartiteCheck({
      vertices: 4,
      edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
    })) as any;
    expect(r.is_bipartite).toBe(true);
    expect(r.set_a_size + r.set_b_size).toBe(4);
  });

  it("detects non-bipartite (odd cycle)", async () => {
    const r = (await bipartiteCheck({
      vertices: 3,
      edges: [[0, 1], [1, 2], [2, 0]],
    })) as any;
    expect(r.is_bipartite).toBe(false);
  });

  it("handles disconnected graph", async () => {
    const r = (await bipartiteCheck({
      vertices: 4,
      edges: [[0, 1], [2, 3]],
    })) as any;
    expect(r.is_bipartite).toBe(true);
    expect(r.connected_components).toBe(2);
  });

  it("handles isolated vertices", async () => {
    const r = (await bipartiteCheck({ vertices: 3, edges: [] })) as any;
    expect(r.is_bipartite).toBe(true);
    expect(r.connected_components).toBe(3);
  });

  it("stamps meta", async () => {
    const r = (await bipartiteCheck({ vertices: 2, edges: [[0, 1]] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
