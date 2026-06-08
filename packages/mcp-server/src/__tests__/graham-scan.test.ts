import { describe, it, expect } from "vitest";
import { GrahamScan } from "../graham-scan.js";

describe("GrahamScan", () => {
  it("convexHull of square", () => {
    const hull = GrahamScan.convexHull([[0, 0], [10, 0], [10, 10], [0, 10], [5, 5]]);
    expect(hull.length).toBe(4);
  });

  it("convexHull of triangle", () => {
    const hull = GrahamScan.convexHull([[0, 0], [5, 10], [10, 0]]);
    expect(hull.length).toBe(3);
  });

  it("area of unit square", () => {
    const hull = GrahamScan.convexHull([[0, 0], [1, 0], [1, 1], [0, 1]]);
    expect(GrahamScan.area(hull)).toBeCloseTo(1);
  });

  it("perimeter of unit square", () => {
    const hull = GrahamScan.convexHull([[0, 0], [1, 0], [1, 1], [0, 1]]);
    expect(GrahamScan.perimeter(hull)).toBeCloseTo(4);
  });

  it("isConvex returns true for convex polygon", () => {
    const hull = GrahamScan.convexHull([[0, 0], [10, 0], [10, 10], [0, 10]]);
    expect(GrahamScan.isConvex(hull)).toBe(true);
  });

  it("cross product is correct", () => {
    expect(GrahamScan.cross([0, 0], [1, 0], [0, 1])).toBe(1);
    expect(GrahamScan.cross([0, 0], [0, 1], [1, 0])).toBe(-1);
  });

  it("handles collinear points", () => {
    const hull = GrahamScan.convexHull([[0, 0], [1, 0], [2, 0], [0, 2], [2, 2]]);
    expect(hull.length).toBeGreaterThanOrEqual(3);
  });

  it("few points returns them", () => {
    const hull = GrahamScan.convexHull([[0, 0], [1, 1]]);
    expect(hull.length).toBe(2);
  });
});
