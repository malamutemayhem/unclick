import { describe, it, expect } from "vitest";
import {
  greedyColor, chromaticNumber, isValidColoring, colorCount, dsaturColor,
} from "../graph-coloring.js";
import type { Graph } from "../graph-coloring.js";

describe("greedyColor", () => {
  it("colors a triangle with 3 colors", () => {
    const g: Graph = { vertices: 3, edges: [[0, 1], [1, 2], [0, 2]] };
    const coloring = greedyColor(g);
    expect(isValidColoring(g, coloring)).toBe(true);
    expect(colorCount(coloring)).toBeLessThanOrEqual(3);
  });

  it("colors an independent set with 1 color", () => {
    const g: Graph = { vertices: 4, edges: [] };
    const coloring = greedyColor(g);
    expect(colorCount(coloring)).toBe(1);
  });

  it("colors a bipartite graph with 2 colors", () => {
    const g: Graph = { vertices: 4, edges: [[0, 2], [0, 3], [1, 2], [1, 3]] };
    const coloring = greedyColor(g);
    expect(isValidColoring(g, coloring)).toBe(true);
    expect(colorCount(coloring)).toBeLessThanOrEqual(2);
  });
});

describe("chromaticNumber", () => {
  it("returns 0 for empty graph", () => {
    expect(chromaticNumber({ vertices: 0, edges: [] })).toBe(0);
  });

  it("returns 1 for independent set", () => {
    expect(chromaticNumber({ vertices: 3, edges: [] })).toBe(1);
  });

  it("returns 2 for bipartite", () => {
    expect(chromaticNumber({ vertices: 4, edges: [[0, 1], [2, 3]] })).toBe(2);
  });

  it("returns 3 for triangle", () => {
    expect(chromaticNumber({ vertices: 3, edges: [[0, 1], [1, 2], [0, 2]] })).toBe(3);
  });
});

describe("isValidColoring", () => {
  it("rejects invalid coloring", () => {
    const g: Graph = { vertices: 2, edges: [[0, 1]] };
    const coloring = new Map([[0, 0], [1, 0]]);
    expect(isValidColoring(g, coloring)).toBe(false);
  });
});

describe("dsaturColor", () => {
  it("produces valid coloring", () => {
    const g: Graph = { vertices: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] };
    const coloring = dsaturColor(g);
    expect(isValidColoring(g, coloring)).toBe(true);
  });

  it("uses optimal colors for bipartite", () => {
    const g: Graph = { vertices: 4, edges: [[0, 1], [2, 3]] };
    const coloring = dsaturColor(g);
    expect(colorCount(coloring)).toBe(2);
  });
});
