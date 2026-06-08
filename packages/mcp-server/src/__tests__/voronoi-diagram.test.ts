import { describe, it, expect } from "vitest";
import { VoronoiDiagram } from "../voronoi-diagram.js";

describe("VoronoiDiagram", () => {
  const sites = [
    { x: 2, y: 2 },
    { x: 8, y: 2 },
    { x: 5, y: 8 },
  ];

  it("nearest finds closest site", () => {
    expect(VoronoiDiagram.nearest(sites, 1, 1)).toBe(0);
    expect(VoronoiDiagram.nearest(sites, 9, 1)).toBe(1);
    expect(VoronoiDiagram.nearest(sites, 5, 9)).toBe(2);
  });

  it("classify returns grid of site indices", () => {
    const grid = VoronoiDiagram.classify(sites, 10, 10, 2);
    expect(grid.length).toBe(5);
    expect(grid[0].length).toBe(5);
    expect(grid[0][0]).toBe(0);
  });

  it("cellAreas sum to total area", () => {
    const areas = VoronoiDiagram.cellAreas(sites, 10, 10, 1);
    const total = areas.reduce((s, a) => s + a, 0);
    expect(total).toBeCloseTo(100, 0);
  });

  it("boundaries returns edge points", () => {
    const edges = VoronoiDiagram.boundaries(sites, 10, 10, 1);
    expect(edges.length).toBeGreaterThan(0);
  });

  it("centroid returns point within bounds", () => {
    const c = VoronoiDiagram.centroid(0, sites, 10, 10, 1);
    expect(c.x).toBeGreaterThanOrEqual(0);
    expect(c.y).toBeGreaterThanOrEqual(0);
    expect(c.x).toBeLessThanOrEqual(10);
    expect(c.y).toBeLessThanOrEqual(10);
  });

  it("lloydRelax moves sites toward centroids", () => {
    const relaxed = VoronoiDiagram.lloydRelax(sites, 10, 10, 3, 1);
    expect(relaxed.length).toBe(3);
    for (const s of relaxed) {
      expect(typeof s.x).toBe("number");
      expect(typeof s.y).toBe("number");
    }
  });

  it("lloydRelax produces more uniform distribution", () => {
    const relaxed = VoronoiDiagram.lloydRelax(sites, 10, 10, 5, 1);
    const areas = VoronoiDiagram.cellAreas(relaxed, 10, 10, 1);
    const mean = areas.reduce((s, a) => s + a, 0) / areas.length;
    const variance = areas.reduce((s, a) => s + (a - mean) ** 2, 0) / areas.length;
    const origAreas = VoronoiDiagram.cellAreas(sites, 10, 10, 1);
    const origMean = origAreas.reduce((s, a) => s + a, 0) / origAreas.length;
    const origVariance = origAreas.reduce((s, a) => s + (a - origMean) ** 2, 0) / origAreas.length;
    expect(variance).toBeLessThanOrEqual(origVariance + 1);
  });
});
