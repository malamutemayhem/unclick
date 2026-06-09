import { describe, it, expect } from "vitest";
import { GridPathfinder, manhattan, euclidean, chebyshev } from "../astar.js";

describe("heuristics", () => {
  it("manhattan distance", () => {
    expect(manhattan({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(7);
  });

  it("euclidean distance", () => {
    expect(euclidean({ x: 0, y: 0 }, { x: 3, y: 4 })).toBeCloseTo(5);
  });

  it("chebyshev distance", () => {
    expect(chebyshev({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(4);
  });
});

describe("GridPathfinder", () => {
  it("finds straight path", () => {
    const pf = new GridPathfinder(5, 5);
    const result = pf.findPath({ x: 0, y: 0 }, { x: 4, y: 0 });
    expect(result).not.toBeNull();
    expect(result!.path[0]).toEqual({ x: 0, y: 0 });
    expect(result!.path[result!.path.length - 1]).toEqual({ x: 4, y: 0 });
  });

  it("avoids blocked cells", () => {
    const pf = new GridPathfinder(5, 5);
    pf.setBlocked(2, 0, true);
    pf.setBlocked(2, 1, true);
    pf.setBlocked(2, 2, true);
    const result = pf.findPath({ x: 0, y: 0 }, { x: 4, y: 0 });
    expect(result).not.toBeNull();
    for (const node of result!.path) {
      expect(pf.isBlocked(node.x, node.y)).toBe(false);
    }
  });

  it("returns null when no path exists", () => {
    const pf = new GridPathfinder(5, 1);
    pf.setBlocked(2, 0, true);
    const result = pf.findPath({ x: 0, y: 0 }, { x: 4, y: 0 });
    expect(result).toBeNull();
  });

  it("start equals goal", () => {
    const pf = new GridPathfinder(5, 5);
    const result = pf.findPath({ x: 2, y: 2 }, { x: 2, y: 2 });
    expect(result).not.toBeNull();
    expect(result!.path).toHaveLength(1);
    expect(result!.cost).toBe(0);
  });

  it("respects weighted cells", () => {
    const pf = new GridPathfinder(5, 3);
    pf.setWeight(1, 0, 100);
    pf.setWeight(2, 0, 100);
    pf.setWeight(3, 0, 100);
    const result = pf.findPath({ x: 0, y: 0 }, { x: 4, y: 0 });
    expect(result).not.toBeNull();
    const goesAround = result!.path.some(n => n.y > 0);
    expect(goesAround).toBe(true);
  });

  it("diagonal pathfinding", () => {
    const pf = new GridPathfinder(5, 5, true);
    const result = pf.findPath({ x: 0, y: 0 }, { x: 4, y: 4 });
    expect(result).not.toBeNull();
    expect(result!.path.length).toBeLessThanOrEqual(5);
  });

  it("dimensions", () => {
    const pf = new GridPathfinder(10, 20);
    expect(pf.gridWidth).toBe(10);
    expect(pf.gridHeight).toBe(20);
  });

  it("explored count is tracked", () => {
    const pf = new GridPathfinder(10, 10);
    const result = pf.findPath({ x: 0, y: 0 }, { x: 9, y: 9 });
    expect(result).not.toBeNull();
    expect(result!.explored).toBeGreaterThan(0);
  });
});
