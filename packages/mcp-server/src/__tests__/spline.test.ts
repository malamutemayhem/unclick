import { describe, it, expect } from "vitest";
import { Spline } from "../spline.js";

describe("Spline", () => {
  const points = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 3, y: 3 },
  ];

  it("cubicNatural passes through endpoints", () => {
    const curve = Spline.cubicNatural(points);
    const start = curve(0);
    const end = curve(1);
    expect(start.x).toBeCloseTo(0, 2);
    expect(start.y).toBeCloseTo(0, 2);
    expect(end.x).toBeCloseTo(3, 2);
    expect(end.y).toBeCloseTo(3, 2);
  });

  it("interpolate returns correct number of samples", () => {
    const samples = Spline.interpolate(points, 20);
    expect(samples.length).toBe(20);
  });

  it("linearInterp at endpoints matches points", () => {
    const start = Spline.linearInterp(points, 0);
    expect(start.x).toBe(0);
    expect(start.y).toBe(0);
  });

  it("linearInterp at midpoint is between values", () => {
    const mid = Spline.linearInterp(points, 0.5);
    expect(mid.x).toBeGreaterThan(0);
    expect(mid.x).toBeLessThan(3);
  });

  it("length is positive", () => {
    const len = Spline.length(points);
    expect(len).toBeGreaterThan(0);
  });

  it("length of straight line matches distance", () => {
    const straight = [{ x: 0, y: 0 }, { x: 3, y: 4 }];
    const len = Spline.length(straight, 1000);
    expect(len).toBeCloseTo(5, 0);
  });

  it("derivative returns tangent vector", () => {
    const d = Spline.derivative(points, 0.5);
    expect(typeof d.x).toBe("number");
    expect(typeof d.y).toBe("number");
  });

  it("handles single point", () => {
    const curve = Spline.cubicNatural([{ x: 1, y: 2 }]);
    const p = curve(0.5);
    expect(p.x).toBe(1);
    expect(p.y).toBe(2);
  });
});
