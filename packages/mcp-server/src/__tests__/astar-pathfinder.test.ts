import { describe, it, expect } from "vitest";
import { AStarPathfinder } from "../astar-pathfinder.js";

describe("AStarPathfinder", () => {
  it("finds a straight path", () => {
    const pf = new AStarPathfinder(5, 1);
    const result = pf.findPath(0, 0, 4, 0);
    expect(result.path.length).toBe(5);
    expect(result.path[0]).toEqual({ x: 0, y: 0 });
    expect(result.path[4]).toEqual({ x: 4, y: 0 });
    expect(result.cost).toBe(4);
  });

  it("finds path around obstacles", () => {
    const pf = new AStarPathfinder(5, 5);
    pf.setWalkable(2, 0, false);
    pf.setWalkable(2, 1, false);
    pf.setWalkable(2, 2, false);
    const result = pf.findPath(0, 0, 4, 0);
    expect(result.path.length).toBeGreaterThan(5);
    expect(result.path[result.path.length - 1]).toEqual({ x: 4, y: 0 });
  });

  it("returns empty path when blocked", () => {
    const pf = new AStarPathfinder(3, 1);
    pf.setWalkable(1, 0, false);
    const result = pf.findPath(0, 0, 2, 0);
    expect(result.path.length).toBe(0);
  });

  it("returns empty path for unwalkable start/end", () => {
    const pf = new AStarPathfinder(3, 3);
    pf.setWalkable(0, 0, false);
    expect(pf.findPath(0, 0, 2, 2).path.length).toBe(0);
  });

  it("handles diagonal movement", () => {
    const pf = new AStarPathfinder(3, 3, true);
    const result = pf.findPath(0, 0, 2, 2);
    expect(result.path.length).toBe(3);
  });

  it("respects custom costs", () => {
    const pf = new AStarPathfinder(3, 1);
    pf.setCost(1, 0, 100);
    const result = pf.findPath(0, 0, 2, 0);
    expect(result.cost).toBe(101);
  });

  it("returns empty path for out-of-bounds", () => {
    const pf = new AStarPathfinder(3, 3);
    expect(pf.findPath(-1, 0, 2, 2).path.length).toBe(0);
  });

  it("reports explored nodes", () => {
    const pf = new AStarPathfinder(5, 5);
    const result = pf.findPath(0, 0, 4, 4);
    expect(result.explored).toBeGreaterThan(0);
  });

  it("gets node info", () => {
    const pf = new AStarPathfinder(3, 3);
    const node = pf.getNode(1, 1);
    expect(node?.walkable).toBe(true);
    expect(node?.cost).toBe(1);
    expect(pf.getNode(-1, 0)).toBeUndefined();
  });

  it("reports dimensions", () => {
    const pf = new AStarPathfinder(10, 8);
    expect(pf.dimensions()).toEqual({ width: 10, height: 8 });
  });
});
