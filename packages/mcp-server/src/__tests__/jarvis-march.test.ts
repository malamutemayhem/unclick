import { describe, it, expect } from "vitest";
import { JarvisMarch } from "../jarvis-march.js";

describe("JarvisMarch", () => {
  it("convexHull of square with interior point", () => {
    const hull = JarvisMarch.convexHull([[0, 0], [10, 0], [10, 10], [0, 10], [5, 5]]);
    expect(hull.length).toBe(4);
  });

  it("convexHull of triangle", () => {
    const hull = JarvisMarch.convexHull([[0, 0], [5, 10], [10, 0]]);
    expect(hull.length).toBe(3);
  });

  it("pointInHull detects interior point", () => {
    const hull = JarvisMarch.convexHull([[0, 0], [10, 0], [10, 10], [0, 10]]);
    expect(JarvisMarch.pointInHull(hull, [5, 5])).toBe(true);
  });

  it("pointInHull rejects exterior point", () => {
    const hull = JarvisMarch.convexHull([[0, 0], [10, 0], [10, 10], [0, 10]]);
    expect(JarvisMarch.pointInHull(hull, [20, 20])).toBe(false);
  });

  it("hullDiameter returns max distance", () => {
    const hull = JarvisMarch.convexHull([[0, 0], [3, 0], [3, 4], [0, 4]]);
    expect(JarvisMarch.hullDiameter(hull)).toBe(5);
  });

  it("cross product", () => {
    expect(JarvisMarch.cross([0, 0], [1, 0], [0, 1])).toBe(1);
  });

  it("few points", () => {
    expect(JarvisMarch.convexHull([[0, 0]]).length).toBe(1);
    expect(JarvisMarch.convexHull([[0, 0], [1, 1]]).length).toBe(2);
  });
});
