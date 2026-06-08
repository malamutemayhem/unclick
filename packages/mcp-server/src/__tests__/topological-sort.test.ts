import { describe, it, expect } from "vitest";
import { topologicalSort, hasCycle, dependencyOrder } from "../topological-sort.js";

describe("topologicalSort", () => {
  it("sorts nodes respecting edges", () => {
    const result = topologicalSort(["a", "b", "c"], [["a", "b"], ["b", "c"]]);
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("handles multiple valid orderings", () => {
    const result = topologicalSort(["a", "b", "c"], [["a", "c"], ["b", "c"]]);
    expect(result.indexOf("a")).toBeLessThan(result.indexOf("c"));
    expect(result.indexOf("b")).toBeLessThan(result.indexOf("c"));
  });

  it("returns nodes with no edges in some order", () => {
    const result = topologicalSort(["x", "y", "z"], []);
    expect(result.sort()).toEqual(["x", "y", "z"]);
  });

  it("throws on cycle", () => {
    expect(() => topologicalSort(["a", "b"], [["a", "b"], ["b", "a"]])).toThrow("Cycle detected");
  });
});

describe("hasCycle", () => {
  it("returns false for DAG", () => {
    expect(hasCycle(["a", "b", "c"], [["a", "b"], ["b", "c"]])).toBe(false);
  });

  it("returns true for cycle", () => {
    expect(hasCycle(["a", "b"], [["a", "b"], ["b", "a"]])).toBe(true);
  });
});

describe("dependencyOrder", () => {
  it("resolves dependency map", () => {
    const items = new Map<string, string[]>();
    items.set("app", ["lib"]);
    items.set("lib", ["core"]);
    items.set("core", []);
    const result = dependencyOrder(items);
    expect(result).toEqual(["core", "lib", "app"]);
  });
});
