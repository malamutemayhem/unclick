import { describe, it, expect } from "vitest";
import { astar, manhattanDistance, chebyshevDistance, euclideanDistance } from "../pathfinding-astar.js";

describe("astar", () => {
  it("finds path in open grid", () => {
    const grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = astar(grid, { x: 0, y: 0 }, { x: 2, y: 2 });
    expect(result).not.toBeNull();
    expect(result!.path[0]).toEqual({ x: 0, y: 0 });
    expect(result!.path[result!.path.length - 1]).toEqual({ x: 2, y: 2 });
  });

  it("navigates around walls", () => {
    const grid = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const result = astar(grid, { x: 0, y: 0 }, { x: 2, y: 0 });
    expect(result).not.toBeNull();
    expect(result!.path.length).toBeGreaterThan(3);
  });

  it("returns null when no path exists", () => {
    const grid = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const result = astar(grid, { x: 0, y: 0 }, { x: 2, y: 0 });
    expect(result).toBeNull();
  });

  it("finds direct path", () => {
    const grid = [
      [0, 0, 0, 0, 0],
    ];
    const result = astar(grid, { x: 0, y: 0 }, { x: 4, y: 0 });
    expect(result).not.toBeNull();
    expect(result!.path).toHaveLength(5);
    expect(result!.cost).toBe(4);
  });

  it("handles start equals end", () => {
    const grid = [[0]];
    const result = astar(grid, { x: 0, y: 0 }, { x: 0, y: 0 });
    expect(result).not.toBeNull();
    expect(result!.path).toHaveLength(1);
    expect(result!.cost).toBe(0);
  });

  it("supports diagonal movement", () => {
    const grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = astar(grid, { x: 0, y: 0 }, { x: 2, y: 2 }, true);
    expect(result).not.toBeNull();
    expect(result!.path).toHaveLength(3);
  });

  it("tracks explored nodes", () => {
    const grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = astar(grid, { x: 0, y: 0 }, { x: 2, y: 2 });
    expect(result!.explored).toBeGreaterThan(0);
  });
});

describe("distance functions", () => {
  it("manhattan distance", () => {
    expect(manhattanDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(7);
  });

  it("chebyshev distance", () => {
    expect(chebyshevDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(4);
  });

  it("euclidean distance", () => {
    expect(euclideanDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBeCloseTo(5);
  });
});
