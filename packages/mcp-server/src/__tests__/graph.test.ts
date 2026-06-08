import { describe, it, expect } from "vitest";
import { Graph } from "../graph.js";

describe("Graph", () => {
  it("adds nodes and edges", () => {
    const g = new Graph();
    g.addNode("a").addEdge("a", "b").addEdge("a", "c");
    expect(g.hasNode("a")).toBe(true);
    expect(g.hasNode("b")).toBe(true);
    expect(g.hasEdge("a", "b")).toBe(true);
    expect(g.hasEdge("b", "a")).toBe(false);
  });

  it("removes edges and nodes", () => {
    const g = new Graph();
    g.addEdge("a", "b").addEdge("a", "c");
    g.removeEdge("a", "b");
    expect(g.hasEdge("a", "b")).toBe(false);
    g.removeNode("c");
    expect(g.hasNode("c")).toBe(false);
    expect(g.hasEdge("a", "c")).toBe(false);
  });

  it("reports neighbors", () => {
    const g = new Graph();
    g.addEdge("a", "b").addEdge("a", "c");
    expect(g.neighbors("a").sort()).toEqual(["b", "c"]);
    expect(g.neighbors("b")).toEqual([]);
  });

  it("counts nodes and edges", () => {
    const g = new Graph();
    g.addEdge("a", "b").addEdge("b", "c");
    expect(g.nodeCount).toBe(3);
    expect(g.edgeCount).toBe(2);
  });

  it("dfs visits in depth-first order", () => {
    const g = new Graph();
    g.addEdge("a", "b").addEdge("a", "c").addEdge("b", "d");
    const visited: string[] = [];
    g.dfs("a", (n: string) => visited.push(n));
    expect(visited[0]).toBe("a");
    expect(visited).toContain("b");
    expect(visited).toContain("d");
  });

  it("bfs visits in breadth-first order", () => {
    const g = new Graph();
    g.addEdge("a", "b").addEdge("a", "c").addEdge("b", "d");
    const visited: string[] = [];
    g.bfs("a", (n: string) => visited.push(n));
    expect(visited[0]).toBe("a");
    const bIdx = visited.indexOf("b");
    const cIdx = visited.indexOf("c");
    const dIdx = visited.indexOf("d");
    expect(bIdx).toBeLessThan(dIdx);
    expect(cIdx).toBeLessThan(dIdx);
  });

  it("finds shortest path", () => {
    const g = new Graph();
    g.addEdge("a", "b").addEdge("b", "c").addEdge("a", "c").addEdge("c", "d");
    expect(g.shortestPath("a", "d")).toEqual(["a", "c", "d"]);
    expect(g.shortestPath("a", "a")).toEqual(["a"]);
    expect(g.shortestPath("d", "a")).toBeNull();
  });

  it("detects cycles", () => {
    const g = new Graph();
    g.addEdge("a", "b").addEdge("b", "c");
    expect(g.hasCycle()).toBe(false);
    g.addEdge("c", "a");
    expect(g.hasCycle()).toBe(true);
  });

  it("computes in/out degree", () => {
    const g = new Graph();
    g.addEdge("a", "b").addEdge("a", "c").addEdge("b", "c");
    expect(g.outDegree("a")).toBe(2);
    expect(g.inDegree("c")).toBe(2);
  });

  it("transposes the graph", () => {
    const g = new Graph();
    g.addEdge("a", "b").addEdge("b", "c");
    const t = g.transpose();
    expect(t.hasEdge("b", "a")).toBe(true);
    expect(t.hasEdge("c", "b")).toBe(true);
    expect(t.hasEdge("a", "b")).toBe(false);
  });
});
