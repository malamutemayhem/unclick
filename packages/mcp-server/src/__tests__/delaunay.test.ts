import { describe, it, expect } from "vitest";
import { Delaunay } from "../delaunay.js";

describe("Delaunay", () => {
  it("computes circumcircle of a triangle", () => {
    const circle = Delaunay.circumcircle({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 });
    expect(circle.center.x).toBeCloseTo(0.5);
    expect(circle.center.y).toBeCloseTo(0.5);
    expect(circle.radius).toBeCloseTo(Math.SQRT2 / 2, 5);
  });

  it("checks point in circumcircle", () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 4, y: 0 };
    const p3 = { x: 0, y: 4 };
    expect(Delaunay.inCircumcircle({ x: 1, y: 1 }, p1, p2, p3)).toBe(true);
    expect(Delaunay.inCircumcircle({ x: 10, y: 10 }, p1, p2, p3)).toBe(false);
  });

  it("triangulates a square", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    const triangles = Delaunay.triangulate(points);
    expect(triangles).toHaveLength(2);
  });

  it("triangulates 5 points", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
      { x: 1, y: 1 },
    ];
    const triangles = Delaunay.triangulate(points);
    expect(triangles.length).toBeGreaterThanOrEqual(4);
  });

  it("returns empty for fewer than 3 points", () => {
    expect(Delaunay.triangulate([{ x: 0, y: 0 }])).toEqual([]);
  });

  it("extracts unique edges from triangles", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0.5, y: 1 },
    ];
    const triangles = Delaunay.triangulate(points);
    const edges = Delaunay.edgesFromTriangles(triangles);
    expect(edges).toHaveLength(3);
  });

  it("computes triangle area", () => {
    const area = Delaunay.triangleArea({ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 });
    expect(area).toBeCloseTo(6);
  });
});
