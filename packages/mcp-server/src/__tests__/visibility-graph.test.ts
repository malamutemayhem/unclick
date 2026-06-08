import { describe, it, expect } from "vitest";
import {
  isVisible, buildVisibilityGraph, shortestPath, polygonToSegments,
} from "../visibility-graph.js";

describe("isVisible", () => {
  it("sees through empty space", () => {
    expect(isVisible({ x: 0, y: 0 }, { x: 10, y: 10 }, [])).toBe(true);
  });

  it("blocked by obstacle", () => {
    const wall = { a: { x: 5, y: 0 }, b: { x: 5, y: 10 } };
    expect(isVisible({ x: 0, y: 5 }, { x: 10, y: 5 }, [wall])).toBe(false);
  });

  it("sees around obstacle endpoints", () => {
    const wall = { a: { x: 5, y: 0 }, b: { x: 5, y: 10 } };
    expect(isVisible({ x: 0, y: 5 }, { x: 5, y: 0 }, [wall])).toBe(true);
  });
});

describe("buildVisibilityGraph", () => {
  it("connects visible points", () => {
    const points = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 5 }];
    const edges = buildVisibilityGraph(points, []);
    expect(edges).toHaveLength(3);
  });

  it("omits blocked edges", () => {
    const points = [{ x: 0, y: 5 }, { x: 10, y: 5 }, { x: 5, y: 0 }];
    const wall = { a: { x: 5, y: 0 }, b: { x: 5, y: 10 } };
    const edges = buildVisibilityGraph(points, [wall]);
    const blocked = edges.find(([a, b]) => (a === 0 && b === 1) || (a === 1 && b === 0));
    expect(blocked).toBeUndefined();
  });
});

describe("shortestPath", () => {
  it("finds direct path", () => {
    const points = [{ x: 0, y: 0 }, { x: 10, y: 0 }];
    const edges: [number, number][] = [[0, 1]];
    const path = shortestPath(points, edges, 0, 1);
    expect(path).toEqual([0, 1]);
  });

  it("finds indirect path", () => {
    const points = [{ x: 0, y: 0 }, { x: 5, y: 5 }, { x: 10, y: 0 }];
    const edges: [number, number][] = [[0, 1], [1, 2]];
    const path = shortestPath(points, edges, 0, 2);
    expect(path).toEqual([0, 1, 2]);
  });

  it("returns empty for no path", () => {
    const points = [{ x: 0, y: 0 }, { x: 10, y: 0 }];
    const path = shortestPath(points, [], 0, 1);
    expect(path).toEqual([]);
  });
});

describe("polygonToSegments", () => {
  it("converts polygon vertices to segments", () => {
    const vertices = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
    const segments = polygonToSegments(vertices);
    expect(segments).toHaveLength(4);
    expect(segments[3].b).toEqual(vertices[0]);
  });
});
