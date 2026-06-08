import { describe, it, expect } from "vitest";
import { topologicalSort, hasCycle, layers } from "../topological-sort.js";

describe("topologicalSort", () => {
  it("sorts a DAG", () => {
    const result = topologicalSort(["a", "b", "c", "d"], [["a", "b"], ["a", "c"], ["b", "d"], ["c", "d"]]);
    expect(result.indexOf("a")).toBeLessThan(result.indexOf("b"));
    expect(result.indexOf("a")).toBeLessThan(result.indexOf("c"));
    expect(result.indexOf("b")).toBeLessThan(result.indexOf("d"));
  });

  it("handles no edges", () => {
    const result = topologicalSort(["a", "b", "c"], []);
    expect(result.length).toBe(3);
  });

  it("throws on cycle", () => {
    expect(() => topologicalSort(["a", "b"], [["a", "b"], ["b", "a"]])).toThrow("Cycle detected");
  });

  it("linear chain", () => {
    const result = topologicalSort(["a", "b", "c"], [["a", "b"], ["b", "c"]]);
    expect(result).toEqual(["a", "b", "c"]);
  });
});

describe("hasCycle", () => {
  it("returns false for DAG", () => {
    expect(hasCycle(["a", "b"], [["a", "b"]])).toBe(false);
  });

  it("returns true for cycle", () => {
    expect(hasCycle(["a", "b", "c"], [["a", "b"], ["b", "c"], ["c", "a"]])).toBe(true);
  });
});

describe("layers", () => {
  it("groups nodes by depth", () => {
    const result = layers(["a", "b", "c", "d"], [["a", "c"], ["b", "c"], ["c", "d"]]);
    expect(result.length).toBe(3);
    expect(result[0].sort()).toEqual(["a", "b"]);
    expect(result[1]).toEqual(["c"]);
    expect(result[2]).toEqual(["d"]);
  });

  it("single layer for no edges", () => {
    const result = layers(["a", "b"], []);
    expect(result.length).toBe(1);
    expect(result[0].sort()).toEqual(["a", "b"]);
  });

  it("throws on cycle", () => {
    expect(() => layers(["a", "b"], [["a", "b"], ["b", "a"]])).toThrow("Cycle detected");
  });
});
