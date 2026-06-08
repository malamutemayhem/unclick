import { describe, it, expect } from "vitest";
import { CatmullRomSpline } from "../catmull-rom.js";

describe("CatmullRomSpline", () => {
  const points = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 0 },
  ];

  it("interpolates at t=0 to segment start", () => {
    const spline = new CatmullRomSpline(points);
    const p = spline.interpolate(1, 0);
    expect(p.x).toBeCloseTo(1, 1);
    expect(p.y).toBeCloseTo(2, 1);
  });

  it("interpolates at t=1 to segment end", () => {
    const spline = new CatmullRomSpline(points);
    const p = spline.interpolate(1, 1);
    expect(p.x).toBeCloseTo(3, 1);
    expect(p.y).toBeCloseTo(3, 1);
  });

  it("generates a smooth curve", () => {
    const spline = new CatmullRomSpline(points);
    const curve = spline.generateCurve(10);
    expect(curve.length).toBeGreaterThan(points.length);
  });

  it("starts and ends at control points", () => {
    const spline = new CatmullRomSpline(points);
    const curve = spline.generateCurve(10);
    expect(curve[0].x).toBeCloseTo(0, 1);
    expect(curve[curve.length - 1].x).toBeCloseTo(4, 1);
  });

  it("adds points", () => {
    const spline = new CatmullRomSpline([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
    spline.addPoint({ x: 2, y: 0 });
    expect(spline.getPoints()).toHaveLength(3);
  });

  it("reports segment count", () => {
    const spline = new CatmullRomSpline(points);
    expect(spline.segmentCount()).toBe(3);
  });

  it("calculates total length", () => {
    const spline = new CatmullRomSpline(points);
    const length = spline.totalLength();
    expect(length).toBeGreaterThan(0);
  });

  it("throws with too few points", () => {
    const spline = new CatmullRomSpline([{ x: 0, y: 0 }]);
    expect(() => spline.interpolate(0, 0.5)).toThrow();
  });
});
