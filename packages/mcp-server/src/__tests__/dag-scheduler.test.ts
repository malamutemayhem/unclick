import { describe, it, expect } from "vitest";
import { topologicalSort, executeDAG, findRoots, findLeaves, criticalPath } from "../dag-scheduler.js";

describe("topologicalSort", () => {
  it("sorts simple chain", () => {
    const nodes = [
      { id: "a", data: null, deps: [] },
      { id: "b", data: null, deps: ["a"] },
      { id: "c", data: null, deps: ["b"] },
    ];
    const phases = topologicalSort(nodes);
    expect(phases[0]).toEqual(["a"]);
    expect(phases[1]).toEqual(["b"]);
    expect(phases[2]).toEqual(["c"]);
  });

  it("groups parallel tasks", () => {
    const nodes = [
      { id: "a", data: null, deps: [] },
      { id: "b", data: null, deps: [] },
      { id: "c", data: null, deps: ["a", "b"] },
    ];
    const phases = topologicalSort(nodes);
    expect(phases[0].sort()).toEqual(["a", "b"]);
    expect(phases[1]).toEqual(["c"]);
  });

  it("detects cycles", () => {
    const nodes = [
      { id: "a", data: null, deps: ["b"] },
      { id: "b", data: null, deps: ["a"] },
    ];
    expect(() => topologicalSort(nodes)).toThrow("Cycle");
  });

  it("detects missing deps", () => {
    const nodes = [{ id: "a", data: null, deps: ["missing"] }];
    expect(() => topologicalSort(nodes)).toThrow("Missing dependency");
  });
});

describe("executeDAG", () => {
  it("executes in order", async () => {
    const order: string[] = [];
    const nodes = [
      { id: "a", data: 1, deps: [] },
      { id: "b", data: 2, deps: ["a"] },
    ];
    const results = await executeDAG(nodes, async (node) => {
      order.push(node.id);
      return node.data;
    });
    expect(order).toEqual(["a", "b"]);
    expect(results.length).toBe(2);
    expect(results[0].result).toBe(1);
    expect(results[1].result).toBe(2);
  });

  it("passes prior results to executor", async () => {
    const nodes = [
      { id: "a", data: 10, deps: [] },
      { id: "b", data: 20, deps: ["a"] },
    ];
    const results = await executeDAG(nodes, async (node, prior) => {
      if (node.deps.length > 0) {
        return (prior.get("a") as number) + (node.data as number);
      }
      return node.data;
    });
    expect(results[1].result).toBe(30);
  });
});

describe("findRoots", () => {
  it("finds nodes with no deps", () => {
    const nodes = [
      { id: "a", data: null, deps: [] },
      { id: "b", data: null, deps: ["a"] },
    ];
    expect(findRoots(nodes)).toEqual(["a"]);
  });
});

describe("findLeaves", () => {
  it("finds nodes not depended on", () => {
    const nodes = [
      { id: "a", data: null, deps: [] },
      { id: "b", data: null, deps: ["a"] },
    ];
    expect(findLeaves(nodes)).toEqual(["b"]);
  });
});

describe("criticalPath", () => {
  it("finds longest chain", () => {
    const nodes = [
      { id: "a", data: null, deps: [] },
      { id: "b", data: null, deps: ["a"] },
      { id: "c", data: null, deps: ["b"] },
      { id: "d", data: null, deps: ["a"] },
    ];
    const path = criticalPath(nodes);
    expect(path).toEqual(["a", "b", "c"]);
  });
});
