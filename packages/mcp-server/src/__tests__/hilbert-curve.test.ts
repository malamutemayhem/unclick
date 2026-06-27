import { describe, it, expect } from "vitest";
import { HilbertCurve } from "../hilbert-curve.js";

describe("HilbertCurve", () => {
  it("xyToIndex and indexToXY round-trip", () => {
    const order = 3;
    for (let i = 0; i < 16; i++) {
      const { x, y } = HilbertCurve.indexToXY(i, order);
      const idx = HilbertCurve.xyToIndex(x, y, order);
      expect(idx).toBe(i);
    }
  });

  it("indexToXY returns valid coordinates", () => {
    const order = 2;
    const n = HilbertCurve.gridSize(order);
    for (let i = 0; i < HilbertCurve.totalPoints(order); i++) {
      const { x, y } = HilbertCurve.indexToXY(i, order);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(n);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThan(n);
    }
  });

  it("generatePath returns correct number of points", () => {
    const path = HilbertCurve.generatePath(2);
    expect(path.length).toBe(16);
  });

  it("generatePath visits all cells", () => {
    const path = HilbertCurve.generatePath(2);
    const visited = new Set(path.map((p) => `${p.x},${p.y}`));
    expect(visited.size).toBe(16);
  });

  it("distance returns non-negative value", () => {
    const d = HilbertCurve.distance(0, 0, 3, 3, 2);
    expect(d).toBeGreaterThanOrEqual(0);
  });

  it("totalPoints computes grid cell count", () => {
    expect(HilbertCurve.totalPoints(1)).toBe(4);
    expect(HilbertCurve.totalPoints(3)).toBe(64);
  });

  it("gridSize computes side length", () => {
    expect(HilbertCurve.gridSize(1)).toBe(2);
    expect(HilbertCurve.gridSize(4)).toBe(16);
  });

  it("consecutive indices are adjacent in grid", () => {
    const order = 2;
    for (let i = 0; i < HilbertCurve.totalPoints(order) - 1; i++) {
      const a = HilbertCurve.indexToXY(i, order);
      const b = HilbertCurve.indexToXY(i + 1, order);
      const dist = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
      expect(dist).toBe(1);
    }
  });
});
