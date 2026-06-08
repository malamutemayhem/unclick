import { describe, it, expect } from "vitest";
import { topologicalSort, hasCycle, layers } from "../topological-sort.js";

describe("topological-sort", () => {
  it("sorts simple dependency chain", () => {
    const result = topologicalSort(["a", "b", "c"], [["a", "b"], ["b", "c"]]);
    expect(result.indexOf("a")).toBeLessThan(result.indexOf("b"));
    expect(result.indexOf("b")).toBeLessThan(result.indexOf("c"));
  });

  it("handles diamond dependency", () => {
    const result = topologicalSort(
      ["a", "b", "c", "d"],
      [["a", "b"], ["a", "c"], ["b", "d"], ["c", "d"]]
    );
    expect(result.indexOf("a")).toBeLessThan(result.indexOf("b"));
    expect(result.indexOf("a")).toBeLessThan(result.indexOf("c"));
    expect(result.indexOf("b")).toBeLessThan(result.indexOf("d"));
    expect(result.indexOf("c")).toBeLessThan(result.indexOf("d"));
  });

  it("throws on cycle", () => {
    expect(() =>
      topologicalSort(["a", "b", "c"], [["a", "b"], ["b", "c"], ["c", "a"]])
    ).toThrow("Cycle detected");
  });

  it("hasCycle returns true for cycle", () => {
    expect(hasCycle(["a", "b"], [["a", "b"], ["b", "a"]])).toBe(true);
  });

  it("hasCycle returns false for DAG", () => {
    expect(hasCycle(["a", "b", "c"], [["a", "b"], ["b", "c"]])).toBe(false);
  });

  it("no edges returns all nodes", () => {
    const result = topologicalSort(["x", "y", "z"], []);
    expect(result.sort()).toEqual(["x", "y", "z"]);
  });

  it("layers groups by depth", () => {
    const result = layers(
      ["a", "b", "c", "d"],
      [["a", "b"], ["a", "c"], ["b", "d"], ["c", "d"]]
    );
    expect(result[0]).toEqual(["a"]);
    expect(result[1].sort()).toEqual(["b", "c"]);
    expect(result[2]).toEqual(["d"]);
  });

  it("works with custom key function", () => {
    const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const edges: [{ id: number }, { id: number }][] = [[nodes[0], nodes[1]], [nodes[1], nodes[2]]];
    const result = topologicalSort(nodes, edges, (n) => String(n.id));
    expect(result[0].id).toBe(1);
    expect(result[2].id).toBe(3);
  });
});
