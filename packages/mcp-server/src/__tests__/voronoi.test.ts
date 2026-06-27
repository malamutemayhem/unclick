import { describe, it, expect } from "vitest";
import {
  nearestSite, voronoiGrid, cellAreas, lloydRelaxation,
  distance, delaunayEdges,
} from "../voronoi.js";

describe("nearestSite", () => {
  it("finds closest site", () => {
    const sites = [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 5, y: 5 }];
    expect(nearestSite({ x: 4, y: 4 }, sites)).toBe(2);
  });

  it("returns 0 for single site", () => {
    expect(nearestSite({ x: 100, y: 100 }, [{ x: 0, y: 0 }])).toBe(0);
  });
});

describe("voronoiGrid", () => {
  it("assigns cells to nearest site", () => {
    const sites = [{ x: 2, y: 2 }, { x: 8, y: 8 }];
    const grid = voronoiGrid(sites, 10, 10);
    expect(grid[0][0]).toBe(0);
    expect(grid[grid.length - 1][grid[0].length - 1]).toBe(1);
  });

  it("creates grid with correct dimensions", () => {
    const grid = voronoiGrid([{ x: 5, y: 5 }], 10, 20, 2);
    expect(grid).toHaveLength(10);
    expect(grid[0]).toHaveLength(5);
  });
});

describe("cellAreas", () => {
  it("sums to total area", () => {
    const sites = [{ x: 5, y: 5 }, { x: 15, y: 15 }];
    const areas = cellAreas(sites, 20, 20);
    const total = areas.reduce((a, b) => a + b, 0);
    expect(total).toBeCloseTo(400, -1);
  });
});

describe("lloydRelaxation", () => {
  it("moves sites toward centroids", () => {
    const sites = [{ x: 1, y: 1 }, { x: 19, y: 19 }];
    const relaxed = lloydRelaxation(sites, 20, 20, 5);
    expect(relaxed).toHaveLength(2);
    expect(relaxed[0].x).toBeGreaterThan(1);
    expect(relaxed[1].x).toBeLessThan(19);
  });
});

describe("distance", () => {
  it("calculates euclidean distance", () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });
});

describe("delaunayEdges", () => {
  it("generates edges for triangle", () => {
    const sites = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 10 }];
    const edges = delaunayEdges(sites);
    expect(edges.length).toBe(3);
  });

  it("returns empty for single point", () => {
    expect(delaunayEdges([{ x: 0, y: 0 }])).toEqual([]);
  });
});
