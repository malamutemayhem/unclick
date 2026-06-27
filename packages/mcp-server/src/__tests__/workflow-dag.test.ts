import { describe, it, expect } from "vitest";
import { WorkflowDag } from "../workflow-dag.js";

describe("WorkflowDag", () => {
  it("adds and gets nodes", () => {
    const dag = new WorkflowDag<string>();
    dag.addNode("a", "task-a");
    expect(dag.getNode("a")?.data).toBe("task-a");
    expect(dag.size).toBe(1);
  });

  it("removes nodes and cleans up deps", () => {
    const dag = new WorkflowDag<string>();
    dag.addNode("a", "A");
    dag.addNode("b", "B", ["a"]);
    dag.removeNode("a");
    expect(dag.getNode("b")?.dependencies).toEqual([]);
  });

  it("finds roots (no dependencies)", () => {
    const dag = new WorkflowDag<string>();
    dag.addNode("a", "A");
    dag.addNode("b", "B", ["a"]);
    dag.addNode("c", "C");
    const roots = dag.getRoots();
    expect(roots.map((r) => r.id).sort()).toEqual(["a", "c"]);
  });

  it("finds leaves (no dependents)", () => {
    const dag = new WorkflowDag<string>();
    dag.addNode("a", "A");
    dag.addNode("b", "B", ["a"]);
    dag.addNode("c", "C", ["a"]);
    const leaves = dag.getLeaves();
    expect(leaves.map((l) => l.id).sort()).toEqual(["b", "c"]);
  });

  it("topological sort", () => {
    const dag = new WorkflowDag<string>();
    dag.addNode("a", "A");
    dag.addNode("b", "B", ["a"]);
    dag.addNode("c", "C", ["a"]);
    dag.addNode("d", "D", ["b", "c"]);
    const sorted = dag.topologicalSort();
    expect(sorted.indexOf("a")).toBeLessThan(sorted.indexOf("b"));
    expect(sorted.indexOf("a")).toBeLessThan(sorted.indexOf("c"));
    expect(sorted.indexOf("b")).toBeLessThan(sorted.indexOf("d"));
  });

  it("detects cycles", () => {
    const dag = new WorkflowDag<string>();
    dag.addNode("a", "A", ["b"]);
    dag.addNode("b", "B", ["a"]);
    expect(dag.hasCycle()).toBe(true);
  });

  it("execution layers for parallel processing", () => {
    const dag = new WorkflowDag<string>();
    dag.addNode("a", "A");
    dag.addNode("b", "B");
    dag.addNode("c", "C", ["a", "b"]);
    dag.addNode("d", "D", ["c"]);
    const layers = dag.executionLayers();
    expect(layers.length).toBe(3);
    expect(layers[0].sort()).toEqual(["a", "b"]);
    expect(layers[1]).toEqual(["c"]);
    expect(layers[2]).toEqual(["d"]);
  });

  it("getDependents returns downstream nodes", () => {
    const dag = new WorkflowDag<string>();
    dag.addNode("a", "A");
    dag.addNode("b", "B", ["a"]);
    dag.addNode("c", "C", ["a"]);
    expect(dag.getDependents("a").length).toBe(2);
  });

  it("validate catches missing dependencies", () => {
    const dag = new WorkflowDag<string>();
    dag.addNode("a", "A", ["missing"]);
    const errors = dag.validate();
    expect(errors.some((e) => e.includes("missing"))).toBe(true);
  });

  it("clear empties the dag", () => {
    const dag = new WorkflowDag<string>();
    dag.addNode("a", "A");
    dag.clear();
    expect(dag.size).toBe(0);
  });
});
