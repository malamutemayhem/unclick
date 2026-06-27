import { describe, it, expect } from "vitest";
import { SpatialIndex, rectIntersects, rectContainsPoint } from "../spatial-index.js";

describe("SpatialIndex", () => {
  it("inserts and queries", () => {
    const idx = new SpatialIndex<string>();
    idx.insert({ x: 0, y: 0, width: 10, height: 10 }, "a");
    idx.insert({ x: 20, y: 20, width: 5, height: 5 }, "b");
    const result = idx.query({ x: 0, y: 0, width: 15, height: 15 });
    expect(result).toEqual(["a"]);
  });

  it("queries point", () => {
    const idx = new SpatialIndex<string>();
    idx.insert({ x: 5, y: 5, width: 10, height: 10 }, "inside");
    expect(idx.queryPoint(10, 10)).toEqual(["inside"]);
    expect(idx.queryPoint(0, 0)).toEqual([]);
  });

  it("finds nearest", () => {
    const idx = new SpatialIndex<string>();
    idx.insert({ x: 0, y: 0, width: 2, height: 2 }, "close");
    idx.insert({ x: 100, y: 100, width: 2, height: 2 }, "far");
    expect(idx.nearest(1, 1)).toBe("close");
  });

  it("removes entries", () => {
    const idx = new SpatialIndex<string>();
    idx.insert({ x: 0, y: 0, width: 5, height: 5 }, "a");
    expect(idx.remove("a")).toBe(true);
    expect(idx.size()).toBe(0);
  });

  it("finds k nearest", () => {
    const idx = new SpatialIndex<string>();
    idx.insert({ x: 0, y: 0, width: 1, height: 1 }, "a");
    idx.insert({ x: 5, y: 0, width: 1, height: 1 }, "b");
    idx.insert({ x: 10, y: 0, width: 1, height: 1 }, "c");
    const result = idx.kNearest(0, 0, 2);
    expect(result).toEqual(["a", "b"]);
  });

  it("computes bounds", () => {
    const idx = new SpatialIndex<string>();
    idx.insert({ x: 0, y: 0, width: 5, height: 5 }, "a");
    idx.insert({ x: 10, y: 10, width: 5, height: 5 }, "b");
    const b = idx.bounds()!;
    expect(b.x).toBe(0);
    expect(b.y).toBe(0);
    expect(b.width).toBe(15);
    expect(b.height).toBe(15);
  });

  it("clears all", () => {
    const idx = new SpatialIndex<string>();
    idx.insert({ x: 0, y: 0, width: 1, height: 1 }, "a");
    idx.clear();
    expect(idx.size()).toBe(0);
  });
});

describe("rect utilities", () => {
  it("intersects detects overlap", () => {
    expect(rectIntersects(
      { x: 0, y: 0, width: 10, height: 10 },
      { x: 5, y: 5, width: 10, height: 10 },
    )).toBe(true);
  });

  it("containsPoint works", () => {
    expect(rectContainsPoint({ x: 0, y: 0, width: 10, height: 10 }, 5, 5)).toBe(true);
    expect(rectContainsPoint({ x: 0, y: 0, width: 10, height: 10 }, 15, 5)).toBe(false);
  });
});
