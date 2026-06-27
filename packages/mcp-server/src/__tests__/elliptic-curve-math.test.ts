import { describe, it, expect } from "vitest";
import { EllipticCurveMath } from "../elliptic-curve-math.js";

describe("EllipticCurveMath", () => {
  const ec = new EllipticCurveMath(2, 3, 97);

  it("isOnCurve validates points", () => {
    const points = ec.allPoints().filter(p => !p.infinity);
    for (const p of points.slice(0, 5)) {
      expect(ec.isOnCurve(p)).toBe(true);
    }
  });

  it("infinity point is on curve", () => {
    expect(ec.isOnCurve({ x: 0, y: 0, infinity: true })).toBe(true);
  });

  it("add identity returns same point", () => {
    const p = ec.allPoints().find(pt => !pt.infinity)!;
    const result = ec.add(p, { x: 0, y: 0, infinity: true });
    expect(result.x).toBe(p.x);
    expect(result.y).toBe(p.y);
  });

  it("add point to its negation gives infinity", () => {
    const p = ec.allPoints().find(pt => !pt.infinity)!;
    const neg = ec.negate(p);
    const result = ec.add(p, neg);
    expect(result.infinity).toBe(true);
  });

  it("multiply by 1 returns same point", () => {
    const p = ec.allPoints().find(pt => !pt.infinity)!;
    const result = ec.multiply(p, 1);
    expect(result.x).toBe(p.x);
    expect(result.y).toBe(p.y);
  });

  it("multiply by 0 returns infinity", () => {
    const p = ec.allPoints().find(pt => !pt.infinity)!;
    const result = ec.multiply(p, 0);
    expect(result.infinity).toBe(true);
  });

  it("multiply by order gives infinity", () => {
    const p = ec.allPoints().find(pt => !pt.infinity)!;
    const ord = ec.order(p);
    const result = ec.multiply(p, ord);
    expect(result.infinity).toBe(true);
  });

  it("allPoints includes infinity", () => {
    const points = ec.allPoints();
    expect(points.some(p => p.infinity)).toBe(true);
  });

  it("discriminant is nonzero for valid curve", () => {
    expect(ec.discriminant()).not.toBe(0);
  });
});
