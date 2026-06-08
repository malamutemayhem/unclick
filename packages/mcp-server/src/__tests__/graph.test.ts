import { describe, it, expect } from "vitest";
import { Graph } from "../graph.js";

describe("Graph (undirected)", () => {
  it("adds nodes and edges", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    expect(g.hasNode("a")).toBe(true);
    expect(g.hasNode("b")).toBe(true);
    expect(g.hasEdge("a", "b")).toBe(true);
    expect(g.hasEdge("b", "a")).toBe(true);
  });

  it("removes edges", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.removeEdge("a", "b");
    expect(g.hasEdge("a", "b")).toBe(false);
  });

  it("removes nodes", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    g.removeNode("a");
    expect(g.hasNode("a")).toBe(false);
    expect(g.hasEdge("b", "a")).toBe(false);
  });

  it("lists neighbors", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    const n = g.neighbors("a");
    expect(n).toContain("b");
    expect(n).toContain("c");
  });

  it("bfs traversal", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    g.addEdge("a", "d");
    const result = g.bfs("a");
    expect(result[0]).toBe("a");
    expect(result).toContain("b");
    expect(result).toContain("c");
    expect(result).toContain("d");
  });

  it("dfs traversal", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    const result = g.dfs("a");
    expect(result[0]).toBe("a");
    expect(result).toContain("b");
    expect(result).toContain("c");
  });

  it("shortest path", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    g.addEdge("a", "c");
    const path = g.shortestPath("a", "c");
    expect(path).toEqual(["a", "c"]);
  });

  it("shortest path returns null for disconnected", () => {
    const g = new Graph();
    g.addNode("a");
    g.addNode("b");
    expect(g.shortestPath("a", "b")).toBeNull();
  });

  it("detects cycle in undirected graph", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    g.addEdge("c", "a");
    expect(g.hasCycle()).toBe(true);
  });

  it("no cycle in tree", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    expect(g.hasCycle()).toBe(false);
  });
});

describe("Graph (directed)", () => {
  it("respects edge direction", () => {
    const g = new Graph(true);
    g.addEdge("a", "b");
    expect(g.hasEdge("a", "b")).toBe(true);
    expect(g.hasEdge("b", "a")).toBe(false);
  });

  it("detects cycle in directed graph", () => {
    const g = new Graph(true);
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    g.addEdge("c", "a");
    expect(g.hasCycle()).toBe(true);
  });

  it("no cycle in DAG", () => {
    const g = new Graph(true);
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    expect(g.hasCycle()).toBe(false);
  });

  it("nodeCount", () => {
    const g = new Graph(true);
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    expect(g.nodeCount).toBe(3);
  });
});
