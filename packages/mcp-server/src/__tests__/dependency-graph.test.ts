import { describe, it, expect } from "vitest";
import { DependencyGraph } from "../dependency-graph.js";

describe("DependencyGraph", () => {
  it("tracks direct dependencies", () => {
    const g = new DependencyGraph();
    g.addDependency("app", "lib");
    g.addDependency("app", "utils");
    expect(g.directDeps("app").sort()).toEqual(["lib", "utils"]);
  });

  it("computes transitive dependencies", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.addDependency("b", "c");
    g.addDependency("c", "d");
    expect(g.allDeps("a").sort()).toEqual(["b", "c", "d"]);
  });

  it("finds dependents", () => {
    const g = new DependencyGraph();
    g.addDependency("app", "lib");
    g.addDependency("cli", "lib");
    expect(g.dependents("lib").sort()).toEqual(["app", "cli"]);
  });

  it("detects cycle", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.addDependency("b", "a");
    expect(g.hasCycle()).toBe(true);
  });

  it("no cycle in DAG", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.addDependency("b", "c");
    expect(g.hasCycle()).toBe(false);
  });

  it("removeNode cleans up", () => {
    const g = new DependencyGraph();
    g.addDependency("a", "b");
    g.removeNode("b");
    expect(g.directDeps("a")).toEqual([]);
    expect(g.nodes).toEqual(["a"]);
  });

  it("nodes lists all", () => {
    const g = new DependencyGraph();
    g.addNode("x");
    g.addNode("y");
    expect(g.nodes.sort()).toEqual(["x", "y"]);
  });
});
