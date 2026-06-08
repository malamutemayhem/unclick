import { describe, it, expect } from "vitest";
import {
  add, sub, scale, dot, cross, length, normalize, distance,
  rotate, lerp, reflect, perpendicular, lineIntersection,
  segmentIntersection, pointInTriangle, polygonArea, polygonCentroid,
} from "../geometry-2d.js";

describe("vector operations", () => {
  it("adds vectors", () => {
    expect(add({ x: 1, y: 2 }, { x: 3, y: 4 })).toEqual({ x: 4, y: 6 });
  });

  it("subtracts vectors", () => {
    expect(sub({ x: 5, y: 3 }, { x: 2, y: 1 })).toEqual({ x: 3, y: 2 });
  });

  it("scales vector", () => {
    expect(scale({ x: 2, y: 3 }, 2)).toEqual({ x: 4, y: 6 });
  });

  it("computes dot product", () => {
    expect(dot({ x: 1, y: 0 }, { x: 0, y: 1 })).toBe(0);
    expect(dot({ x: 1, y: 2 }, { x: 3, y: 4 })).toBe(11);
  });

  it("computes cross product", () => {
    expect(cross({ x: 1, y: 0 }, { x: 0, y: 1 })).toBe(1);
  });

  it("computes length", () => {
    expect(length({ x: 3, y: 4 })).toBe(5);
  });

  it("normalizes vector", () => {
    const n = normalize({ x: 3, y: 4 });
    expect(length(n)).toBeCloseTo(1);
  });

  it("computes distance", () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });
});

describe("transformations", () => {
  it("rotates vector", () => {
    const r = rotate({ x: 1, y: 0 }, Math.PI / 2);
    expect(r.x).toBeCloseTo(0);
    expect(r.y).toBeCloseTo(1);
  });

  it("lerps between vectors", () => {
    expect(lerp({ x: 0, y: 0 }, { x: 10, y: 10 }, 0.5)).toEqual({ x: 5, y: 5 });
  });

  it("reflects vector", () => {
    const r = reflect({ x: 1, y: -1 }, { x: 0, y: 1 });
    expect(r.x).toBeCloseTo(1);
    expect(r.y).toBeCloseTo(1);
  });

  it("computes perpendicular", () => {
    const p = perpendicular({ x: 1, y: 0 });
    expect(p.y).toBe(1);
    expect(Math.abs(p.x)).toBe(0);
  });
});

describe("intersections", () => {
  it("finds line intersection", () => {
    const p = lineIntersection({ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 0, y: 2 });
    expect(p!.x).toBeCloseTo(1);
    expect(p!.y).toBeCloseTo(1);
  });

  it("returns null for parallel lines", () => {
    expect(lineIntersection({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 })).toBeNull();
  });

  it("finds segment intersection", () => {
    const p = segmentIntersection({ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 0, y: 2 });
    expect(p).not.toBeNull();
  });

  it("returns null for non-intersecting segments", () => {
    expect(segmentIntersection({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 })).toBeNull();
  });
});

describe("polygon operations", () => {
  it("checks point in triangle", () => {
    expect(pointInTriangle({ x: 0.5, y: 0.5 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 })).toBe(true);
    expect(pointInTriangle({ x: 5, y: 5 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 })).toBe(false);
  });

  it("calculates polygon area", () => {
    const square = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }];
    expect(polygonArea(square)).toBe(4);
  });

  it("calculates polygon centroid", () => {
    const square = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }];
    const c = polygonCentroid(square);
    expect(c.x).toBe(1);
    expect(c.y).toBe(1);
  });
});
