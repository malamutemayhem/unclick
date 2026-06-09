import { describe, it, expect } from "vitest";
import { chromaticNumber } from "./chromatic-tool.js";

describe("chromaticNumber", () => {
  it("finds chromatic number of a triangle", async () => {
    const r = (await chromaticNumber({
      vertex_count: 3,
      edges: [[0, 1], [1, 2], [0, 2]],
    })) as any;
    expect(r.chromatic_number).toBe(3);
  });

  it("finds chromatic number of a bipartite graph", async () => {
    const r = (await chromaticNumber({
      vertex_count: 4,
      edges: [[0, 1], [0, 3], [2, 1], [2, 3]],
    })) as any;
    expect(r.chromatic_number).toBe(2);
  });

  it("handles empty graph", async () => {
    const r = (await chromaticNumber({
      vertex_count: 5,
      edges: [],
    })) as any;
    expect(r.chromatic_number).toBe(1);
  });

  it("returns valid coloring", async () => {
    const r = (await chromaticNumber({
      vertex_count: 4,
      edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
    })) as any;
    expect(r.chromatic_number).toBe(2);
    expect(r.coloring[0]).not.toBe(r.coloring[1]);
    expect(r.coloring[1]).not.toBe(r.coloring[2]);
  });

  it("stamps meta", async () => {
    const r = (await chromaticNumber({
      vertex_count: 2,
      edges: [],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
