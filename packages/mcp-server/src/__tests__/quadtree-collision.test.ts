import { describe, it, expect } from "vitest";
import { QuadTreeCollision } from "../quadtree-collision.js";

describe("QuadTreeCollision", () => {
  it("inserts and queries items", () => {
    const qt = new QuadTreeCollision({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ id: 1, x: 10, y: 10, width: 5, height: 5 });
    qt.insert({ id: 2, x: 50, y: 50, width: 5, height: 5 });
    const found = qt.query({ x: 0, y: 0, width: 20, height: 20 });
    expect(found).toHaveLength(1);
    expect(found[0].id).toBe(1);
  });

  it("rejects out-of-bounds items", () => {
    const qt = new QuadTreeCollision({ x: 0, y: 0, width: 100, height: 100 });
    const result = qt.insert({ id: 1, x: 200, y: 200, width: 5, height: 5 });
    expect(result).toBe(false);
  });

  it("subdivides when capacity exceeded", () => {
    const qt = new QuadTreeCollision({ x: 0, y: 0, width: 100, height: 100 }, 2);
    qt.insert({ id: 1, x: 10, y: 10, width: 2, height: 2 });
    qt.insert({ id: 2, x: 20, y: 20, width: 2, height: 2 });
    qt.insert({ id: 3, x: 30, y: 30, width: 2, height: 2 });
    expect(qt.nodeCount).toBeGreaterThan(1);
  });

  it("finds collisions between overlapping items", () => {
    const qt = new QuadTreeCollision({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ id: 1, x: 10, y: 10, width: 20, height: 20 });
    qt.insert({ id: 2, x: 25, y: 25, width: 20, height: 20 });
    qt.insert({ id: 3, x: 80, y: 80, width: 5, height: 5 });
    const pairs = qt.findCollisions();
    expect(pairs).toHaveLength(1);
    const ids = [pairs[0][0].id, pairs[0][1].id].sort();
    expect(ids).toEqual([1, 2]);
  });

  it("no collisions for separated items", () => {
    const qt = new QuadTreeCollision({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ id: 1, x: 0, y: 0, width: 5, height: 5 });
    qt.insert({ id: 2, x: 50, y: 50, width: 5, height: 5 });
    expect(qt.findCollisions()).toHaveLength(0);
  });

  it("queryPoint finds items containing point", () => {
    const qt = new QuadTreeCollision({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ id: 1, x: 10, y: 10, width: 20, height: 20 });
    qt.insert({ id: 2, x: 50, y: 50, width: 10, height: 10 });
    const found = qt.queryPoint(15, 15);
    expect(found).toHaveLength(1);
    expect(found[0].id).toBe(1);
  });

  it("queryPoint returns empty for miss", () => {
    const qt = new QuadTreeCollision({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ id: 1, x: 10, y: 10, width: 5, height: 5 });
    expect(qt.queryPoint(50, 50)).toHaveLength(0);
  });

  it("clear removes all items", () => {
    const qt = new QuadTreeCollision({ x: 0, y: 0, width: 100, height: 100 });
    qt.insert({ id: 1, x: 10, y: 10, width: 5, height: 5 });
    qt.clear();
    expect(qt.totalItems).toBe(0);
    expect(qt.nodeCount).toBe(1);
  });

  it("handles many items", () => {
    const qt = new QuadTreeCollision({ x: 0, y: 0, width: 1000, height: 1000 });
    for (let i = 0; i < 100; i++) {
      qt.insert({ id: i, x: (i * 7) % 990, y: (i * 13) % 990, width: 3, height: 3 });
    }
    const found = qt.query({ x: 0, y: 0, width: 100, height: 100 });
    expect(found.length).toBeGreaterThan(0);
  });

  it("does not duplicate items in query results", () => {
    const qt = new QuadTreeCollision({ x: 0, y: 0, width: 100, height: 100 }, 2);
    qt.insert({ id: 1, x: 48, y: 48, width: 10, height: 10 });
    const found = qt.query({ x: 0, y: 0, width: 100, height: 100 });
    expect(found).toHaveLength(1);
  });
});
