import { describe, it, expect } from "vitest";
import { DAG } from "../dag.js";

describe("DAG", () => {
  it("adds nodes and edges", () => {
    const dag = new DAG<string>();
    dag.addNode("a", "A").addNode("b", "B").addEdge("a", "b");
    expect(dag.getNode("a")).toBe("A");
    expect(dag.getDependencies("a")).toEqual(["b"]);
    expect(dag.getDependents("b")).toEqual(["a"]);
  });

  it("topological sort", () => {
    const dag = new DAG<string>();
    dag.addNode("a", "A").addNode("b", "B").addNode("c", "C");
    dag.addEdge("a", "b").addEdge("b", "c");
    const sorted = dag.topologicalSort();
    expect(sorted.indexOf("a")).toBeLessThan(sorted.indexOf("b"));
    expect(sorted.indexOf("b")).toBeLessThan(sorted.indexOf("c"));
  });

  it("detects cycles", () => {
    const dag = new DAG<string>();
    dag.addNode("a", "A").addNode("b", "B");
    dag.addEdge("a", "b").addEdge("b", "a");
    expect(dag.hasCycle()).toBe(true);
    expect(() => dag.topologicalSort()).toThrow("Cycle");
  });

  it("roots have no incoming edges", () => {
    const dag = new DAG<string>();
    dag.addNode("a", "A").addNode("b", "B").addNode("c", "C");
    dag.addEdge("a", "b").addEdge("a", "c");
    expect(dag.roots()).toEqual(["a"]);
  });

  it("leaves have no outgoing edges", () => {
    const dag = new DAG<string>();
    dag.addNode("a", "A").addNode("b", "B").addNode("c", "C");
    dag.addEdge("a", "b").addEdge("a", "c");
    expect(dag.leaves().sort()).toEqual(["b", "c"]);
  });

  it("size and nodeIds", () => {
    const dag = new DAG<number>();
    dag.addNode("x", 1).addNode("y", 2);
    expect(dag.size).toBe(2);
    expect(dag.nodeIds().sort()).toEqual(["x", "y"]);
  });
});
