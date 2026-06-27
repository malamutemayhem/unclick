import { describe, it, expect } from "vitest";
import { BezierSurface } from "../bezier-surface.js";

describe("BezierSurface", () => {
  const flatGrid = [
    [{ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }],
    [{ x: 0, y: 1, z: 0 }, { x: 1, y: 1, z: 0 }],
  ];

  it("evaluates corners correctly", () => {
    const surface = new BezierSurface(flatGrid);
    const p00 = surface.evaluate(0, 0);
    expect(p00.x).toBeCloseTo(0);
    expect(p00.y).toBeCloseTo(0);
    const p11 = surface.evaluate(1, 1);
    expect(p11.x).toBeCloseTo(1);
    expect(p11.y).toBeCloseTo(1);
  });

  it("evaluates center of flat surface", () => {
    const surface = new BezierSurface(flatGrid);
    const center = surface.evaluate(0.5, 0.5);
    expect(center.x).toBeCloseTo(0.5);
    expect(center.y).toBeCloseTo(0.5);
    expect(center.z).toBeCloseTo(0);
  });

  it("generates mesh grid", () => {
    const surface = new BezierSurface(flatGrid);
    const mesh = surface.generateMesh(3, 3);
    expect(mesh).toHaveLength(4);
    expect(mesh[0]).toHaveLength(4);
  });

  it("computes surface normal", () => {
    const surface = new BezierSurface(flatGrid);
    const n = surface.normal(0.5, 0.5);
    expect(Math.abs(n.z)).toBeCloseTo(1, 1);
  });

  it("reports degree", () => {
    const surface = new BezierSurface(flatGrid);
    const deg = surface.degree();
    expect(deg.u).toBe(1);
    expect(deg.v).toBe(1);
  });

  it("counts control points", () => {
    const surface = new BezierSurface(flatGrid);
    expect(surface.controlPointCount()).toBe(4);
  });

  it("returns control points copy", () => {
    const surface = new BezierSurface(flatGrid);
    const cp = surface.getControlPoints();
    cp[0][0].x = 999;
    expect(surface.evaluate(0, 0).x).toBeCloseTo(0);
  });

  it("handles higher degree surface", () => {
    const grid = [
      [{ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 1 }, { x: 2, y: 0, z: 0 }],
      [{ x: 0, y: 1, z: 0 }, { x: 1, y: 1, z: 2 }, { x: 2, y: 1, z: 0 }],
      [{ x: 0, y: 2, z: 0 }, { x: 1, y: 2, z: 1 }, { x: 2, y: 2, z: 0 }],
    ];
    const surface = new BezierSurface(grid);
    const center = surface.evaluate(0.5, 0.5);
    expect(center.z).toBeGreaterThan(0);
    expect(surface.degree().u).toBe(2);
  });
});
