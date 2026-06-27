import { describe, it, expect } from "vitest";
import {
  poissonDiskSampling, distance, minPointDistance,
  pointDensity, nearestNeighbor, pointsInRadius, toSVG,
} from "../poisson-disk.js";

describe("poissonDiskSampling", () => {
  it("generates points within bounds", () => {
    const points = poissonDiskSampling({ width: 100, height: 100, minDistance: 10 });
    for (const p of points) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThan(100);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThan(100);
    }
  });

  it("respects minimum distance", () => {
    const points = poissonDiskSampling({ width: 50, height: 50, minDistance: 8 });
    const minDist = minPointDistance(points);
    expect(minDist).toBeGreaterThanOrEqual(7.9);
  });

  it("generates multiple points", () => {
    const points = poissonDiskSampling({ width: 100, height: 100, minDistance: 10 });
    expect(points.length).toBeGreaterThan(10);
  });

  it("is deterministic with same seed", () => {
    const a = poissonDiskSampling({ width: 50, height: 50, minDistance: 10, seed: 123 });
    const b = poissonDiskSampling({ width: 50, height: 50, minDistance: 10, seed: 123 });
    expect(a.length).toBe(b.length);
    for (let i = 0; i < a.length; i++) {
      expect(a[i].x).toBeCloseTo(b[i].x);
      expect(a[i].y).toBeCloseTo(b[i].y);
    }
  });

  it("different seeds produce different results", () => {
    const a = poissonDiskSampling({ width: 50, height: 50, minDistance: 10, seed: 1 });
    const b = poissonDiskSampling({ width: 50, height: 50, minDistance: 10, seed: 2 });
    const same = a.length === b.length && a.every((p, i) =>
      Math.abs(p.x - b[i].x) < 0.001 && Math.abs(p.y - b[i].y) < 0.001
    );
    expect(same).toBe(false);
  });

  it("larger minDistance means fewer points", () => {
    const sparse = poissonDiskSampling({ width: 100, height: 100, minDistance: 20 });
    const dense = poissonDiskSampling({ width: 100, height: 100, minDistance: 10 });
    expect(dense.length).toBeGreaterThan(sparse.length);
  });
});

describe("distance", () => {
  it("calculates euclidean distance", () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });
});

describe("minPointDistance", () => {
  it("returns Infinity for single point", () => {
    expect(minPointDistance([{ x: 0, y: 0 }])).toBe(Infinity);
  });

  it("finds minimum distance", () => {
    const pts = [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 10, y: 0 }];
    expect(minPointDistance(pts)).toBe(3);
  });
});

describe("pointDensity", () => {
  it("calculates density", () => {
    const pts = Array.from({ length: 100 }, (_, i) => ({ x: i, y: 0 }));
    expect(pointDensity(pts, 100, 100)).toBeCloseTo(0.01);
  });
});

describe("nearestNeighbor", () => {
  it("finds closest point", () => {
    const pts = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 5 }];
    const nn = nearestNeighbor(pts, { x: 4, y: 4 });
    expect(nn).toEqual({ x: 5, y: 5 });
  });

  it("returns null for empty set", () => {
    expect(nearestNeighbor([], { x: 0, y: 0 })).toBeNull();
  });
});

describe("pointsInRadius", () => {
  it("finds points within radius", () => {
    const pts = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 10, y: 0 }];
    const result = pointsInRadius(pts, { x: 0, y: 0 }, 5);
    expect(result.length).toBe(2);
  });
});

describe("toSVG", () => {
  it("generates SVG output", () => {
    const pts = [{ x: 10, y: 20 }, { x: 30, y: 40 }];
    const svg = toSVG(pts, 100, 100);
    expect(svg).toContain("<svg");
    expect(svg).toContain("<circle");
    expect(svg).toContain("</svg>");
  });
});
