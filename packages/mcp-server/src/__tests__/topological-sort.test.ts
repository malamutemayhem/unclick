import { describe, it, expect } from "vitest";
import { topologicalSort, hasCycle, dependencyOrder } from "../topological-sort.js";

describe("topologicalSort", () => {
  it("sorts a DAG", () => {
    const result = topologicalSort<string>([["a", "b"], ["a", "c"], ["b", "d"], ["c", "d"]]);
    expect(result.indexOf("a")).toBeLessThan(result.indexOf("b"));
    expect(result.indexOf("a")).toBeLessThan(result.indexOf("c"));
    expect(result.indexOf("b")).toBeLessThan(result.indexOf("d"));
  });

  it("throws on cycle", () => {
    expect(() => topologicalSort([["a", "b"], ["b", "a"]])).toThrow("Cycle");
  });

  it("handles linear chain", () => {
    const result = topologicalSort([["a", "b"], ["b", "c"]]);
    expect(result).toEqual(["a", "b", "c"]);
  });
});

describe("hasCycle", () => {
  it("detects cycle", () => {
    expect(hasCycle([["a", "b"], ["b", "c"], ["c", "a"]])).toBe(true);
  });

  it("no cycle in DAG", () => {
    expect(hasCycle([["a", "b"], ["b", "c"]])).toBe(false);
  });
});

describe("dependencyOrder", () => {
  it("resolves dependency order", () => {
    const deps = new Map<string, string[]>([
      ["app", ["lib", "utils"]],
      ["lib", ["utils"]],
      ["utils", []],
    ]);
    const order = dependencyOrder(deps);
    expect(order.indexOf("utils")).toBeLessThan(order.indexOf("lib"));
    expect(order.indexOf("lib")).toBeLessThan(order.indexOf("app"));
  });
});
