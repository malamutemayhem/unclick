import { describe, it, expect } from "vitest";
import { DependencyGraph } from "../dependency-graph.js";

describe("DependencyGraph", () => {
  it("adds nodes", () => {
    const g = new DependencyGraph();
    g.addNode("a");
    g.addNode("b");
    expect(g.nodes().sort()).toEqual(["a", "b"]);
  });

  it("adds dependencies", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    expect(g.dependenciesOf("a")).toEqual(["b"]);
    expect(g.dependantsOf("b")).toEqual(["a"]);
  });

  it("detects no cycle in DAG", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.addDependency("b", "c");
    expect(g.hasCycle()).toBe(false);
  });

  it("detects cycle", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.addDependency("b", "c");
    g.addDependency("c", "a");
    expect(g.hasCycle()).toBe(true);
  });

  it("topological order for DAG", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.addDependency("a", "c");
    g.addDependency("b", "c");
    const order = g.topologicalOrder();
    expect(order.indexOf("a")).toBeLessThan(order.indexOf("b"));
    expect(order.indexOf("b")).toBeLessThan(order.indexOf("c"));
  });

  it("topological order throws on cycle", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.addDependency("b", "a");
    expect(() => g.topologicalOrder()).toThrow("Cycle detected");
  });

  it("transitive dependencies", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.addDependency("b", "c");
    g.addDependency("c", "d");
    expect(g.transitiveDependencies("a").sort()).toEqual(["b", "c", "d"]);
  });

  it("transitive dependencies with no deps returns empty", () => {
    const g = new DependencyGraph();
    g.addNode("a");
    expect(g.transitiveDependencies("a")).toEqual([]);
  });

  it("handles diamond dependency", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.addDependency("a", "c");
    g.addDependency("b", "d");
    g.addDependency("c", "d");
    expect(g.transitiveDependencies("a").sort()).toEqual(["b", "c", "d"]);
  });
});
