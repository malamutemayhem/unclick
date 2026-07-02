import { describe, it, expect } from "vitest";
import { graphColoring } from "./graphcolor-tool.js";

describe("graphColoring", () => {
  it("colors a triangle with 3 colors", async () => {
    const r = (await graphColoring({
      vertices: 3,
      edges: [[0, 1], [1, 2], [2, 0]],
    })) as any;
    expect(r.colors_used).toBe(3);
    expect(r.coloring[0]).not.toBe(r.coloring[1]);
    expect(r.coloring[1]).not.toBe(r.coloring[2]);
  });

  it("colors bipartite graph with 2 colors", async () => {
    const r = (await graphColoring({
      vertices: 4,
      edges: [[0, 1], [2, 3]],
    })) as any;
    expect(r.colors_used).toBeLessThanOrEqual(2);
  });

  it("handles isolated vertices", async () => {
    const r = (await graphColoring({ vertices: 3, edges: [] })) as any;
    expect(r.colors_used).toBe(1);
  });

  it("returns color groups", async () => {
    const r = (await graphColoring({
      vertices: 4,
      edges: [[0, 1], [1, 2], [2, 3]],
    })) as any;
    expect(r.colors_used).toBeLessThanOrEqual(3);
    const totalGrouped = Object.values(r.color_groups).flat().length;
    expect(totalGrouped).toBe(4);
  });

  it("stamps meta", async () => {
    const r = (await graphColoring({ vertices: 2, edges: [[0, 1]] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
