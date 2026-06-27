import { describe, it, expect } from "vitest";
import { QuadTree } from "../quadtree.js";

describe("quadtree", () => {
  it("inserts and queries points", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 50, y: 50 });
    qt.insert({ x: 90, y: 90 });
    const found = qt.query({ x: 0, y: 0, width: 30, height: 30 });
    expect(found.length).toBe(1);
    expect(found[0].x).toBe(10);
  });

  it("rejects points outside boundary", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 10, height: 10 });
    expect(qt.insert({ x: 20, y: 20 })).toBe(false);
  });

  it("tracks size", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 1, y: 1 });
    qt.insert({ x: 2, y: 2 });
    qt.insert({ x: 3, y: 3 });
    expect(qt.size).toBe(3);
  });

  it("subdivides when capacity exceeded", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 }, 2);
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 20, y: 20 });
    qt.insert({ x: 30, y: 30 });
    expect(qt.size).toBe(3);
  });

  it("query returns empty for non-overlapping range", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    const found = qt.query({ x: 50, y: 50, width: 10, height: 10 });
    expect(found.length).toBe(0);
  });

  it("all returns every inserted point", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 }, 2);
    for (let i = 0; i < 20; i++) {
      qt.insert({ x: i * 4, y: i * 4 });
    }
    expect(qt.all().length).toBe(20);
  });

  it("handles many points in same quadrant", () => {
    const qt = new QuadTree({ x: 0, y: 0, width: 100, height: 100 }, 2);
    for (let i = 0; i < 10; i++) {
      qt.insert({ x: i, y: i });
    }
    const found = qt.query({ x: 0, y: 0, width: 5, height: 5 });
    expect(found.length).toBe(5);
  });
});
