import { describe, it, expect } from "vitest";
import { DependencyGraph, CyclicDependencyError } from "../dependency-graph.js";

describe("DependencyGraph", () => {
  it("adds nodes", () => {
    const g = new DependencyGraph();
    g.addNode("a");
    g.addNode("b");
    expect(g.size).toBe(2);
  });

  it("adds dependencies", () => {
    const g = new DependencyGraph();
    g.addDependency("app", "db");
    g.addDependency("app", "cache");
    expect(g.dependenciesOf("app")).toEqual(expect.arrayContaining(["db", "cache"]));
  });

  it("finds dependents", () => {
    const g = new DependencyGraph();
    g.addDependency("app", "db");
    g.addDependency("api", "db");
    expect(g.dependentsOf("db")).toEqual(expect.arrayContaining(["app", "api"]));
  });

  it("topological sort puts dependencies first", () => {
    const g = new DependencyGraph();
    g.addDependency("app", "db");
    g.addDependency("app", "cache");
    g.addDependency("db", "config");
    const order = g.topologicalSort();
    expect(order.indexOf("config")).toBeLessThan(order.indexOf("db"));
    expect(order.indexOf("db")).toBeLessThan(order.indexOf("app"));
  });

  it("detects cycles", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.addDependency("b", "c");
    g.addDependency("c", "a");
    expect(g.hasCycle()).toBe(true);
    expect(() => g.topologicalSort()).toThrow(CyclicDependencyError);
  });

  it("handles isolated nodes", () => {
    const g = new DependencyGraph();
    g.addNode("standalone");
    g.addDependency("a", "b");
    const order = g.topologicalSort();
    expect(order).toContain("standalone");
    expect(order).toHaveLength(3);
  });

  it("no cycle in a DAG", () => {
    const g = new DependencyGraph();
    g.addDependency("d", "b");
    g.addDependency("d", "c");
    g.addDependency("b", "a");
    g.addDependency("c", "a");
    expect(g.hasCycle()).toBe(false);
  });
});
