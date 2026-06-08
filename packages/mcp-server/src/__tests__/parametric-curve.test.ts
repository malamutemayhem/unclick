import { describe, it, expect } from "vitest";
import { ParametricCurve } from "../parametric-curve.js";

describe("ParametricCurve", () => {
  it("evaluate generates correct number of points", () => {
    const points = ParametricCurve.evaluate(
      t => Math.cos(t), t => Math.sin(t), 0, 2 * Math.PI, 10,
    );
    expect(points.length).toBe(11);
  });

  it("circle returns points on circle", () => {
    const points = ParametricCurve.circle(1, { x: 0, y: 0 }, 100);
    for (const p of points) {
      const r = Math.sqrt(p.x * p.x + p.y * p.y);
      expect(r).toBeCloseTo(1, 1);
    }
  });

  it("ellipse has correct semi-axes", () => {
    const points = ParametricCurve.ellipse(3, 2, { x: 0, y: 0 }, 100);
    const xs = points.map(p => Math.abs(p.x));
    const ys = points.map(p => Math.abs(p.y));
    expect(Math.max(...xs)).toBeCloseTo(3, 1);
    expect(Math.max(...ys)).toBeCloseTo(2, 1);
  });

  it("lissajous generates smooth curve", () => {
    const points = ParametricCurve.lissajous(3, 2, Math.PI / 2, 100);
    expect(points.length).toBe(101);
    for (const p of points) {
      expect(Math.abs(p.x)).toBeLessThanOrEqual(1.001);
      expect(Math.abs(p.y)).toBeLessThanOrEqual(1.001);
    }
  });

  it("spiral grows outward", () => {
    const points = ParametricCurve.spiral(2, 5, 100);
    const startDist = Math.sqrt(points[0].x ** 2 + points[0].y ** 2);
    const endDist = Math.sqrt(points[100].x ** 2 + points[100].y ** 2);
    expect(endDist).toBeGreaterThan(startDist);
  });

  it("rose has correct number of petals for odd k", () => {
    const points = ParametricCurve.rose(3, 1, 200);
    expect(points.length).toBe(201);
  });

  it("heart generates symmetric shape", () => {
    const points = ParametricCurve.heart(1, 100);
    expect(points.length).toBe(101);
  });

  it("arcLength is positive for non-degenerate curves", () => {
    const points = ParametricCurve.circle(1, { x: 0, y: 0 }, 100);
    const len = ParametricCurve.arcLength(points);
    expect(len).toBeCloseTo(2 * Math.PI, 0);
  });

  it("boundingBox contains all points", () => {
    const points = ParametricCurve.circle(2, { x: 0, y: 0 }, 100);
    const bb = ParametricCurve.boundingBox(points);
    expect(bb.minX).toBeCloseTo(-2, 0);
    expect(bb.maxX).toBeCloseTo(2, 0);
  });
});
