import { describe, it, expect } from "vitest";
import { ChromaticNumber } from "../chromatic-number.js";

describe("ChromaticNumber", () => {
  it("greedy coloring produces valid coloring", () => {
    const cn = new ChromaticNumber([[0, 1], [1, 2], [2, 0]]);
    const coloring = cn.greedyColoring();
    expect(cn.isValidColoring(coloring)).toBe(true);
  });

  it("triangle needs 3 colors", () => {
    const cn = new ChromaticNumber([[0, 1], [1, 2], [2, 0]]);
    expect(cn.chromaticUpperBound()).toBe(3);
  });

  it("bipartite graph needs 2 colors", () => {
    const cn = new ChromaticNumber([[0, 1], [0, 3], [2, 1], [2, 3]]);
    expect(cn.chromaticUpperBound()).toBeLessThanOrEqual(2);
  });

  it("isBipartite detects bipartite graphs", () => {
    const cn = new ChromaticNumber([[0, 1], [2, 3], [0, 3]]);
    expect(cn.isBipartite()).toBe(true);
  });

  it("isBipartite detects non-bipartite (odd cycle)", () => {
    const cn = new ChromaticNumber([[0, 1], [1, 2], [2, 0]]);
    expect(cn.isBipartite()).toBe(false);
  });

  it("isValidColoring rejects bad coloring", () => {
    const cn = new ChromaticNumber([[0, 1]]);
    const bad = new Map([[0, 0], [1, 0]]);
    expect(cn.isValidColoring(bad)).toBe(false);
  });

  it("maxDegree is correct", () => {
    const cn = new ChromaticNumber([[0, 1], [0, 2], [0, 3]]);
    expect(cn.maxDegree()).toBe(3);
  });

  it("nodeCount is correct", () => {
    const cn = new ChromaticNumber([[0, 1], [2, 3]]);
    expect(cn.nodeCount()).toBe(4);
  });
});
