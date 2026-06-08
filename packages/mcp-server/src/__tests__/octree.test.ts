import { describe, it, expect } from "vitest";
import { Octree } from "../octree.js";

describe("Octree", () => {
  const bounds = { cx: 0, cy: 0, cz: 0, half: 50 };

  it("inserts and counts points", () => {
    const tree = new Octree(bounds);
    tree.insert({ x: 10, y: 10, z: 10 });
    tree.insert({ x: -10, y: -10, z: -10 });
    expect(tree.size()).toBe(2);
  });

  it("rejects out-of-bounds points", () => {
    const tree = new Octree(bounds);
    expect(tree.insert({ x: 100, y: 0, z: 0 })).toBe(false);
    expect(tree.size()).toBe(0);
  });

  it("queries range", () => {
    const tree = new Octree(bounds);
    tree.insert({ x: 5, y: 5, z: 5 });
    tree.insert({ x: 40, y: 40, z: 40 });
    tree.insert({ x: -30, y: -30, z: -30 });

    const found = tree.query({ cx: 5, cy: 5, cz: 5, half: 10 });
    expect(found).toHaveLength(1);
    expect(found[0]).toEqual({ x: 5, y: 5, z: 5 });
  });

  it("finds nearest point", () => {
    const tree = new Octree(bounds);
    tree.insert({ x: 10, y: 0, z: 0 });
    tree.insert({ x: 20, y: 0, z: 0 });
    tree.insert({ x: -30, y: 0, z: 0 });

    const nearest = tree.nearest({ x: 8, y: 0, z: 0 });
    expect(nearest).toEqual({ x: 10, y: 0, z: 0 });
  });

  it("handles many points with subdivision", () => {
    const tree = new Octree(bounds, 4);
    for (let i = 0; i < 50; i++) {
      tree.insert({
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 80,
        z: (Math.random() - 0.5) * 80,
      });
    }
    expect(tree.size()).toBe(50);
  });

  it("query returns empty for empty region", () => {
    const tree = new Octree(bounds);
    tree.insert({ x: 40, y: 40, z: 40 });
    const found = tree.query({ cx: -40, cy: -40, cz: -40, half: 5 });
    expect(found).toHaveLength(0);
  });

  it("nearest returns undefined for empty tree", () => {
    const tree = new Octree(bounds);
    expect(tree.nearest({ x: 0, y: 0, z: 0 })).toBeUndefined();
  });
});
