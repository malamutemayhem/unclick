import { describe, it, expect } from "vitest";
import { topologicalSort, parallelLevels, hasCycle } from "../topological-sort.js";

describe("topologicalSort", () => {
  it("sorts DAG", () => {
    const result = topologicalSort(
      ["a", "b", "c", "d"],
      [["a", "b"], ["a", "c"], ["b", "d"], ["c", "d"]],
    );
    expect(result.indexOf("a")).toBeLessThan(result.indexOf("b"));
    expect(result.indexOf("a")).toBeLessThan(result.indexOf("c"));
    expect(result.indexOf("b")).toBeLessThan(result.indexOf("d"));
  });

  it("throws on cycle", () => {
    expect(() =>
      topologicalSort(["a", "b", "c"], [["a", "b"], ["b", "c"], ["c", "a"]])
    ).toThrow("Cycle");
  });

  it("handles single node", () => {
    expect(topologicalSort(["a"], [])).toEqual(["a"]);
  });

  it("handles disconnected nodes", () => {
    const result = topologicalSort(["a", "b", "c"], []);
    expect(result.length).toBe(3);
  });
});

describe("parallelLevels", () => {
  it("groups by parallel execution levels", () => {
    const levels = parallelLevels(
      ["a", "b", "c", "d"],
      [["a", "c"], ["b", "c"], ["c", "d"]],
    );
    expect(levels[0].sort()).toEqual(["a", "b"]);
    expect(levels[1]).toEqual(["c"]);
    expect(levels[2]).toEqual(["d"]);
  });

  it("throws on cycle", () => {
    expect(() =>
      parallelLevels(["a", "b"], [["a", "b"], ["b", "a"]])
    ).toThrow("Cycle");
  });
});

describe("hasCycle", () => {
  it("returns true for cycle", () => {
    expect(hasCycle(["a", "b"], [["a", "b"], ["b", "a"]])).toBe(true);
  });

  it("returns false for DAG", () => {
    expect(hasCycle(["a", "b", "c"], [["a", "b"], ["b", "c"]])).toBe(false);
  });
});
