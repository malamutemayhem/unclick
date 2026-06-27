import { describe, it, expect } from "vitest";
import { Quadtree } from "../quadtree-2d.js";

describe("Quadtree", () => {
  it("inserts and queries points", () => {
    const qt = new Quadtree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 50, y: 50 });
    qt.insert({ x: 90, y: 90 });
    const found = qt.query({ x: 0, y: 0, width: 60, height: 60 });
    expect(found.length).toBe(2);
  });

  it("rejects points outside bounds", () => {
    const qt = new Quadtree({ x: 0, y: 0, width: 50, height: 50 });
    expect(qt.insert({ x: 100, y: 100 })).toBe(false);
    expect(qt.size).toBe(0);
  });

  it("handles subdivision", () => {
    const qt = new Quadtree({ x: 0, y: 0, width: 100, height: 100 }, 2);
    for (let i = 0; i < 10; i++) {
      qt.insert({ x: i * 9 + 1, y: i * 9 + 1 });
    }
    expect(qt.size).toBe(10);
  });

  it("findNearest returns closest point", () => {
    const qt = new Quadtree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.insert({ x: 50, y: 50 });
    qt.insert({ x: 90, y: 90 });
    const nearest = qt.findNearest({ x: 48, y: 52 });
    expect(nearest).toEqual({ x: 50, y: 50 });
  });

  it("query returns empty for no matches", () => {
    const qt = new Quadtree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    const found = qt.query({ x: 50, y: 50, width: 20, height: 20 });
    expect(found.length).toBe(0);
  });

  it("clear resets tree", () => {
    const qt = new Quadtree({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ x: 10, y: 10 });
    qt.clear();
    expect(qt.size).toBe(0);
  });

  it("findNearest on empty tree returns null", () => {
    const qt = new Quadtree({ x: 0, y: 0, width: 100, height: 100 });
    expect(qt.findNearest({ x: 50, y: 50 })).toBeNull();
  });
});
