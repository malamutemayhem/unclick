import { describe, it, expect } from "vitest";
import { lerp, lerpPoint, quadratic, cubic, deCasteljau, sampleCurve, curveLength, splitCurve, tangent } from "../bezier.js";

describe("bezier", () => {
  describe("lerp", () => {
    it("interpolates between values", () => {
      expect(lerp(0, 10, 0.5)).toBe(5);
      expect(lerp(0, 10, 0)).toBe(0);
      expect(lerp(0, 10, 1)).toBe(10);
    });
  });

  describe("lerpPoint", () => {
    it("interpolates between points", () => {
      const p = lerpPoint({ x: 0, y: 0 }, { x: 10, y: 20 }, 0.5);
      expect(p.x).toBe(5);
      expect(p.y).toBe(10);
    });
  });

  describe("quadratic", () => {
    it("evaluates at t=0 and t=1", () => {
      const p0 = { x: 0, y: 0 };
      const p1 = { x: 5, y: 10 };
      const p2 = { x: 10, y: 0 };
      expect(quadratic(p0, p1, p2, 0)).toEqual(p0);
      expect(quadratic(p0, p1, p2, 1)).toEqual(p2);
    });

    it("evaluates at midpoint", () => {
      const p = quadratic({ x: 0, y: 0 }, { x: 5, y: 10 }, { x: 10, y: 0 }, 0.5);
      expect(p.x).toBe(5);
      expect(p.y).toBe(5);
    });
  });

  describe("cubic", () => {
    it("evaluates at endpoints", () => {
      const p0 = { x: 0, y: 0 };
      const p3 = { x: 10, y: 10 };
      const r0 = cubic(p0, { x: 3, y: 6 }, { x: 7, y: 6 }, p3, 0);
      const r1 = cubic(p0, { x: 3, y: 6 }, { x: 7, y: 6 }, p3, 1);
      expect(r0.x).toBeCloseTo(0);
      expect(r0.y).toBeCloseTo(0);
      expect(r1.x).toBeCloseTo(10);
      expect(r1.y).toBeCloseTo(10);
    });
  });

  describe("deCasteljau", () => {
    it("matches quadratic formula", () => {
      const pts = [{ x: 0, y: 0 }, { x: 5, y: 10 }, { x: 10, y: 0 }];
      const dc = deCasteljau(pts, 0.5);
      const q = quadratic(pts[0], pts[1], pts[2], 0.5);
      expect(dc.x).toBeCloseTo(q.x);
      expect(dc.y).toBeCloseTo(q.y);
    });

    it("handles single point", () => {
      const p = deCasteljau([{ x: 5, y: 5 }], 0.5);
      expect(p).toEqual({ x: 5, y: 5 });
    });
  });

  describe("sampleCurve", () => {
    it("returns correct number of points", () => {
      const pts = [{ x: 0, y: 0 }, { x: 5, y: 10 }, { x: 10, y: 0 }];
      const samples = sampleCurve(pts, 10);
      expect(samples).toHaveLength(11);
    });

    it("first and last match endpoints", () => {
      const pts = [{ x: 0, y: 0 }, { x: 10, y: 10 }];
      const samples = sampleCurve(pts, 5);
      expect(samples[0]).toEqual({ x: 0, y: 0 });
      expect(samples[5]).toEqual({ x: 10, y: 10 });
    });
  });

  describe("curveLength", () => {
    it("computes length of straight line", () => {
      const pts = [{ x: 0, y: 0 }, { x: 3, y: 4 }];
      expect(curveLength(pts)).toBeCloseTo(5, 1);
    });

    it("curve is longer than chord", () => {
      const pts = [{ x: 0, y: 0 }, { x: 5, y: 20 }, { x: 10, y: 0 }];
      const chord = 10;
      expect(curveLength(pts)).toBeGreaterThan(chord);
    });
  });

  describe("splitCurve", () => {
    it("splits a line at midpoint", () => {
      const pts = [{ x: 0, y: 0 }, { x: 10, y: 10 }];
      const [left, right] = splitCurve(pts, 0.5);
      expect(left[0]).toEqual({ x: 0, y: 0 });
      expect(right[right.length - 1]).toEqual({ x: 10, y: 10 });
    });

    it("handles single point", () => {
      const [left, right] = splitCurve([{ x: 5, y: 5 }], 0.5);
      expect(left).toEqual([{ x: 5, y: 5 }]);
      expect(right).toEqual([{ x: 5, y: 5 }]);
    });
  });

  describe("tangent", () => {
    it("returns unit tangent for a line", () => {
      const pts = [{ x: 0, y: 0 }, { x: 10, y: 0 }];
      const t = tangent(pts, 0.5);
      expect(t.x).toBeCloseTo(1, 1);
      expect(t.y).toBeCloseTo(0, 1);
    });

    it("returns zero for single point", () => {
      const t = tangent([{ x: 5, y: 5 }], 0.5);
      expect(t).toEqual({ x: 0, y: 0 });
    });
  });
});
