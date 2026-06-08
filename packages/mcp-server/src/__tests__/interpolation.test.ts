import { describe, it, expect } from "vitest";
import { Interpolation, SplineInterpolator } from "../interpolation.js";

describe("Interpolation", () => {
  it("linear interpolation", () => {
    expect(Interpolation.linear(0, 0, 10)).toBe(0);
    expect(Interpolation.linear(0.5, 0, 10)).toBe(5);
    expect(Interpolation.linear(1, 0, 10)).toBe(10);
    expect(Interpolation.linear(0.25, 100, 200)).toBe(125);
  });

  it("bilinear interpolation", () => {
    const result = Interpolation.bilinear(0.5, 0.5, 0, 10, 10, 20);
    expect(result).toBe(10);
  });

  it("cosine interpolation at boundaries", () => {
    expect(Interpolation.cosine(0, 0, 10)).toBeCloseTo(0, 5);
    expect(Interpolation.cosine(1, 0, 10)).toBeCloseTo(10, 5);
    expect(Interpolation.cosine(0.5, 0, 10)).toBeCloseTo(5, 5);
  });

  it("cubic interpolation", () => {
    const result = Interpolation.cubic(0.5, 0, 1, 2, 3);
    expect(typeof result).toBe("number");
    expect(result).toBeCloseTo(1.5, 0);
  });

  it("hermite interpolation at boundaries", () => {
    expect(Interpolation.hermite(0, 0, 10, 0, 0)).toBe(0);
    expect(Interpolation.hermite(1, 0, 10, 0, 0)).toBe(10);
  });

  it("quadratic bezier", () => {
    expect(Interpolation.bezierQuadratic(0, 0, 5, 10)).toBe(0);
    expect(Interpolation.bezierQuadratic(1, 0, 5, 10)).toBe(10);
    expect(Interpolation.bezierQuadratic(0.5, 0, 5, 10)).toBe(5);
  });

  it("cubic bezier", () => {
    expect(Interpolation.bezierCubic(0, 0, 3, 7, 10)).toBe(0);
    expect(Interpolation.bezierCubic(1, 0, 3, 7, 10)).toBe(10);
  });

  it("smoothstep clamps and interpolates", () => {
    expect(Interpolation.smoothstep(0)).toBe(0);
    expect(Interpolation.smoothstep(1)).toBe(1);
    expect(Interpolation.smoothstep(0.5)).toBeCloseTo(0.5, 1);
    expect(Interpolation.smoothstep(-1)).toBe(0);
    expect(Interpolation.smoothstep(2)).toBe(1);
  });

  it("smootherstep clamps and interpolates", () => {
    expect(Interpolation.smootherstep(0)).toBe(0);
    expect(Interpolation.smootherstep(1)).toBe(1);
    expect(Interpolation.smootherstep(0.5)).toBeCloseTo(0.5, 1);
  });

  it("remap transforms ranges", () => {
    expect(Interpolation.remap(5, 0, 10, 0, 100)).toBe(50);
    expect(Interpolation.remap(0, 0, 10, 20, 40)).toBe(20);
    expect(Interpolation.remap(10, 0, 10, 20, 40)).toBe(40);
  });

  it("clamp restricts values", () => {
    expect(Interpolation.clamp(5, 0, 10)).toBe(5);
    expect(Interpolation.clamp(-5, 0, 10)).toBe(0);
    expect(Interpolation.clamp(15, 0, 10)).toBe(10);
  });

  it("inverseLerp computes t from value", () => {
    expect(Interpolation.inverseLerp(0, 10, 5)).toBe(0.5);
    expect(Interpolation.inverseLerp(0, 10, 0)).toBe(0);
    expect(Interpolation.inverseLerp(0, 10, 10)).toBe(1);
    expect(Interpolation.inverseLerp(5, 5, 5)).toBe(0);
  });
});

describe("SplineInterpolator", () => {
  it("evaluates linear segments", () => {
    const s = new SplineInterpolator();
    s.addPoint(0, 0);
    s.addPoint(10, 100);
    expect(s.evaluate(5)).toBe(50);
    expect(s.evaluate(0)).toBe(0);
    expect(s.evaluate(10)).toBe(100);
  });

  it("clamps at boundaries", () => {
    const s = new SplineInterpolator();
    s.addPoint(0, 10);
    s.addPoint(10, 20);
    expect(s.evaluate(-5)).toBe(10);
    expect(s.evaluate(15)).toBe(20);
  });

  it("handles single point", () => {
    const s = new SplineInterpolator();
    s.addPoint(5, 42);
    expect(s.evaluate(5)).toBe(42);
    expect(s.evaluate(0)).toBe(42);
  });

  it("handles empty spline", () => {
    const s = new SplineInterpolator();
    expect(s.evaluate(5)).toBe(0);
  });

  it("reports point count", () => {
    const s = new SplineInterpolator();
    s.addPoint(0, 0);
    s.addPoint(1, 1);
    expect(s.pointCount()).toBe(2);
    expect(s.getPoints().length).toBe(2);
  });
});
