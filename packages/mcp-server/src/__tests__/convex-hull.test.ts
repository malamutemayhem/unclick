import { describe, it, expect } from "vitest";
import { convexHull, isInsideHull, hullArea, hullPerimeter, centroid } from "../convex-hull.js";

describe("convex-hull", () => {
  it("computes hull of square", () => {
    const points = [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 },
      { x: 0.5, y: 0.5 },
    ];
    const hull = convexHull(points);
    expect(hull).toHaveLength(4);
  });

  it("handles collinear points", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
    const hull = convexHull(points);
    expect(hull).toHaveLength(2);
  });

  it("handles single point", () => {
    expect(convexHull([{ x: 1, y: 1 }])).toHaveLength(1);
  });

  it("handles empty input", () => {
    expect(convexHull([])).toEqual([]);
  });

  it("handles triangle", () => {
    const points = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 2, y: 3 }];
    const hull = convexHull(points);
    expect(hull).toHaveLength(3);
  });

  it("isInsideHull identifies interior point", () => {
    const hull = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, { x: 0, y: 4 }];
    expect(isInsideHull(hull, { x: 2, y: 2 })).toBe(true);
  });

  it("isInsideHull rejects exterior point", () => {
    const hull = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, { x: 0, y: 4 }];
    expect(isInsideHull(hull, { x: 10, y: 10 })).toBe(false);
  });

  it("computes hull area", () => {
    const hull = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }, { x: 0, y: 3 }];
    expect(hullArea(hull)).toBeCloseTo(12);
  });

  it("computes hull perimeter", () => {
    const hull = [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 4 }, { x: 0, y: 4 }];
    expect(hullPerimeter(hull)).toBeCloseTo(14);
  });

  it("computes centroid", () => {
    const hull = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, { x: 0, y: 4 }];
    const c = centroid(hull);
    expect(c.x).toBeCloseTo(2);
    expect(c.y).toBeCloseTo(2);
  });
});
