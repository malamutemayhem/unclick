import { describe, it, expect } from "vitest";
import { PointQuadtree } from "../quadtree-point.js";

describe("PointQuadtree", () => {
  it("insert and size", () => {
    const qt = new PointQuadtree({ x: 0, y: 0, w: 100, h: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 50, y: 50 });
    qt.insert({ x: 90, y: 90 });
    expect(qt.size()).toBe(3);
  });

  it("rejects out-of-bounds points", () => {
    const qt = new PointQuadtree({ x: 0, y: 0, w: 100, h: 100 });
    expect(qt.insert({ x: 200, y: 200 })).toBe(false);
  });

  it("query returns points in range", () => {
    const qt = new PointQuadtree({ x: 0, y: 0, w: 100, h: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 50, y: 50 });
    qt.insert({ x: 90, y: 90 });
    const result = qt.query({ x: 0, y: 0, w: 60, h: 60 });
    expect(result.length).toBe(2);
  });

  it("all returns every point", () => {
    const qt = new PointQuadtree({ x: 0, y: 0, w: 100, h: 100 });
    for (let i = 0; i < 20; i++) {
      qt.insert({ x: i * 4, y: i * 4 });
    }
    expect(qt.all().length).toBe(20);
  });

  it("subdivides when capacity exceeded", () => {
    const qt = new PointQuadtree({ x: 0, y: 0, w: 100, h: 100 }, 2);
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 20, y: 20 });
    qt.insert({ x: 30, y: 30 });
    expect(qt.size()).toBe(3);
  });

  it("query empty range returns empty", () => {
    const qt = new PointQuadtree({ x: 0, y: 0, w: 100, h: 100 });
    qt.insert({ x: 50, y: 50 });
    const result = qt.query({ x: 200, y: 200, w: 10, h: 10 });
    expect(result.length).toBe(0);
  });

  it("many points query correctness", () => {
    const qt = new PointQuadtree({ x: 0, y: 0, w: 100, h: 100 }, 4);
    for (let i = 0; i < 50; i++) {
      qt.insert({ x: i * 2, y: i * 2 });
    }
    const result = qt.query({ x: 0, y: 0, w: 20, h: 20 });
    expect(result.length).toBe(10);
  });
});
