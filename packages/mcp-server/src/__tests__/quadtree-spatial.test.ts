import { describe, it, expect } from "vitest";
import { QuadtreeSpatial } from "../quadtree-spatial.js";

describe("QuadtreeSpatial", () => {
  it("insert and count points", () => {
    const qt = new QuadtreeSpatial({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 50, y: 50 });
    qt.insert({ x: 90, y: 90 });
    expect(qt.count()).toBe(3);
  });

  it("insert rejects out-of-bounds points", () => {
    const qt = new QuadtreeSpatial({ x: 0, y: 0, width: 10, height: 10 });
    expect(qt.insert({ x: 20, y: 20 })).toBe(false);
    expect(qt.count()).toBe(0);
  });

  it("subdivides when over capacity", () => {
    const qt = new QuadtreeSpatial({ x: 0, y: 0, width: 100, height: 100 }, 2);
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 20, y: 20 });
    qt.insert({ x: 30, y: 30 });
    expect(qt.divided).toBe(true);
    expect(qt.count()).toBe(3);
  });

  it("query returns points in range", () => {
    const qt = new QuadtreeSpatial({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 50, y: 50 });
    qt.insert({ x: 90, y: 90 });
    const results = qt.query({ x: 0, y: 0, width: 30, height: 30 });
    expect(results.length).toBe(1);
    expect(results[0].x).toBe(10);
  });

  it("queryRadius returns points within circle", () => {
    const qt = new QuadtreeSpatial({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 50, y: 50 });
    qt.insert({ x: 51, y: 50 });
    qt.insert({ x: 90, y: 90 });
    const results = qt.queryRadius(50, 50, 5);
    expect(results.length).toBe(2);
  });

  it("all returns every inserted point", () => {
    const qt = new QuadtreeSpatial({ x: 0, y: 0, width: 100, height: 100 }, 2);
    for (let i = 0; i < 10; i++) {
      qt.insert({ x: i * 10, y: i * 10 });
    }
    expect(qt.all().length).toBe(10);
  });

  it("depth increases with subdivisions", () => {
    const qt = new QuadtreeSpatial({ x: 0, y: 0, width: 100, height: 100 }, 1);
    qt.insert({ x: 10, y: 10 });
    expect(qt.depth()).toBe(1);
    qt.insert({ x: 11, y: 11 });
    expect(qt.depth()).toBeGreaterThan(1);
  });

  it("contains checks boundary correctly", () => {
    const qt = new QuadtreeSpatial({ x: 0, y: 0, width: 10, height: 10 });
    expect(qt.contains({ x: 0, y: 0 })).toBe(true);
    expect(qt.contains({ x: 9.99, y: 9.99 })).toBe(true);
    expect(qt.contains({ x: 10, y: 10 })).toBe(false);
  });

  it("intersects detects overlapping ranges", () => {
    const qt = new QuadtreeSpatial({ x: 0, y: 0, width: 10, height: 10 });
    expect(qt.intersects({ x: 5, y: 5, width: 10, height: 10 })).toBe(true);
    expect(qt.intersects({ x: 20, y: 20, width: 5, height: 5 })).toBe(false);
  });
});
