import { describe, it, expect } from "vitest";
import { QuadTree } from "../quad-tree.js";

describe("QuadTree", () => {
  it("inserts and queries points", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 25, y: 25 });
    qt.insert({ x: 75, y: 75 });
    qt.insert({ x: 50, y: 50 });
    const found = qt.query({ x: 0, y: 0, width: 50, height: 50 });
    expect(found.length).toBe(1);
    expect(found[0].x).toBe(25);
  });

  it("rejects points outside boundary", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    expect(qt.insert({ x: 150, y: 150 })).toBe(false);
    expect(qt.size()).toBe(0);
  });

  it("subdivides when capacity exceeded", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 }, 2);
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 20, y: 20 });
    qt.insert({ x: 30, y: 30 });
    expect(qt.size()).toBe(3);
    expect(qt.depth()).toBeGreaterThan(1);
  });

  it("queries radius", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 50, y: 50 });
    qt.insert({ x: 51, y: 51 });
    qt.insert({ x: 90, y: 90 });
    const found = qt.queryRadius(50, 50, 5);
    expect(found.length).toBe(2);
  });

  it("finds nearest point", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 50, y: 50 });
    qt.insert({ x: 90, y: 90 });
    const nearest = qt.nearest(12, 12);
    expect(nearest?.x).toBe(10);
    expect(nearest?.y).toBe(10);
  });

  it("returns all points", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 20, y: 20 });
    qt.insert({ x: 30, y: 30 });
    expect(qt.allPoints().length).toBe(3);
  });

  it("clears the tree", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 20, y: 20 });
    qt.clear();
    expect(qt.size()).toBe(0);
    expect(qt.allPoints().length).toBe(0);
  });

  it("handles many points", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 1000, height: 1000 }, 4);
    for (let i = 0; i < 100; i++) {
      qt.insert({ x: i * 9.5, y: i * 9.5, data: i });
    }
    expect(qt.size()).toBe(100);
    const found = qt.query({ x: 0, y: 0, width: 100, height: 100 });
    expect(found.length).toBeGreaterThan(0);
  });

  it("returns null nearest on empty tree", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    expect(qt.nearest(50, 50)).toBeNull();
  });

  it("stores data with points", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 50, y: 50, data: "center" });
    const found = qt.query({ x: 40, y: 40, width: 20, height: 20 });
    expect(found[0].data).toBe("center");
  });
});
