import { describe, it, expect } from "vitest";
import { KahnTopologicalSort } from "../topological-sort-kahn.js";

describe("KahnTopologicalSort", () => {
  it("sorts a DAG", () => {
    const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3]];
    const ts = new KahnTopologicalSort(edges);
    const result = ts.sort()!;
    expect(result.indexOf(0)).toBeLessThan(result.indexOf(1));
    expect(result.indexOf(0)).toBeLessThan(result.indexOf(2));
    expect(result.indexOf(1)).toBeLessThan(result.indexOf(3));
  });

  it("returns null for cyclic graph", () => {
    const edges: [number, number][] = [[0, 1], [1, 2], [2, 0]];
    const ts = new KahnTopologicalSort(edges);
    expect(ts.sort()).toBeNull();
  });

  it("hasCycle detects cycles", () => {
    const edges: [number, number][] = [[0, 1], [1, 0]];
    const ts = new KahnTopologicalSort(edges);
    expect(ts.hasCycle()).toBe(true);
  });

  it("hasCycle is false for DAG", () => {
    const edges: [number, number][] = [[0, 1], [1, 2]];
    const ts = new KahnTopologicalSort(edges);
    expect(ts.hasCycle()).toBe(false);
  });

  it("levels groups by depth", () => {
    const edges: [number, number][] = [[0, 2], [1, 2], [2, 3]];
    const ts = new KahnTopologicalSort(edges);
    const lvls = ts.levels()!;
    expect(lvls.length).toBe(3);
    expect(lvls[0].sort()).toEqual([0, 1]);
    expect(lvls[1]).toEqual([2]);
    expect(lvls[2]).toEqual([3]);
  });

  it("levels returns null for cycle", () => {
    const edges: [number, number][] = [[0, 1], [1, 0]];
    const ts = new KahnTopologicalSort(edges);
    expect(ts.levels()).toBeNull();
  });

  it("nodeCount matches", () => {
    const edges: [number, number][] = [[0, 1], [2, 3]];
    const ts = new KahnTopologicalSort(edges);
    expect(ts.nodeCount()).toBe(4);
  });

  it("linear chain sorted correctly", () => {
    const edges: [number, number][] = [[3, 2], [2, 1], [1, 0]];
    const ts = new KahnTopologicalSort(edges);
    expect(ts.sort()).toEqual([3, 2, 1, 0]);
  });
});
