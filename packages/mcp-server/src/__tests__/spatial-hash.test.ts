import { describe, it, expect } from "vitest";
import { SpatialHash } from "../spatial-hash.js";

describe("spatial-hash", () => {
  it("inserts and queries by radius", () => {
    const sh = new SpatialHash(10);
    sh.insert({ x: 5, y: 5 });
    sh.insert({ x: 50, y: 50 });
    const near = sh.query(0, 0, 10);
    expect(near.length).toBe(1);
    expect(near[0].x).toBe(5);
  });

  it("tracks size", () => {
    const sh = new SpatialHash(10);
    sh.insert({ x: 0, y: 0 });
    sh.insert({ x: 1, y: 1 });
    expect(sh.size).toBe(2);
  });

  it("queryRect returns items in rectangle", () => {
    const sh = new SpatialHash(10);
    sh.insert({ x: 5, y: 5 });
    sh.insert({ x: 15, y: 15 });
    sh.insert({ x: 50, y: 50 });
    const found = sh.queryRect(0, 0, 20, 20);
    expect(found.length).toBe(2);
  });

  it("query returns empty when nothing nearby", () => {
    const sh = new SpatialHash(10);
    sh.insert({ x: 100, y: 100 });
    expect(sh.query(0, 0, 5).length).toBe(0);
  });

  it("clear empties everything", () => {
    const sh = new SpatialHash(10);
    sh.insert({ x: 1, y: 1 });
    sh.clear();
    expect(sh.size).toBe(0);
    expect(sh.query(1, 1, 10).length).toBe(0);
  });

  it("handles many items in same cell", () => {
    const sh = new SpatialHash(100);
    for (let i = 0; i < 20; i++) {
      sh.insert({ x: i, y: i });
    }
    const near = sh.query(10, 10, 5);
    expect(near.length).toBeGreaterThan(0);
  });
});
