import { describe, it, expect } from "vitest";
import { Graph } from "../graph.js";

describe("graph", () => {
  it("adds nodes and edges", () => {
    const g = new Graph<string>();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    expect(g.hasNode("a")).toBe(true);
    expect(g.hasEdge("a", "b")).toBe(true);
    expect(g.nodeCount).toBe(3);
  });

  it("undirected graph has bidirectional edges", () => {
    const g = new Graph<string>();
    g.addEdge("a", "b");
    expect(g.hasEdge("b", "a")).toBe(true);
  });

  it("directed graph has one-way edges", () => {
    const g = new Graph<string>(true);
    g.addEdge("a", "b");
    expect(g.hasEdge("a", "b")).toBe(true);
    expect(g.hasEdge("b", "a")).toBe(false);
  });

  it("bfs traverses breadth-first", () => {
    const g = new Graph<string>();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    g.addEdge("b", "d");
    const result = g.bfs("a");
    expect(result[0]).toBe("a");
    expect(result).toContain("b");
    expect(result).toContain("c");
    expect(result).toContain("d");
    expect(result.indexOf("b")).toBeLessThan(result.indexOf("d"));
  });

  it("dfs traverses depth-first", () => {
    const g = new Graph<string>();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    g.addEdge("b", "d");
    const result = g.dfs("a");
    expect(result[0]).toBe("a");
    expect(result.length).toBe(4);
  });

  it("shortestPath finds shortest route", () => {
    const g = new Graph<string>();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    g.addEdge("a", "c");
    const path = g.shortestPath("a", "c");
    expect(path).toEqual(["a", "c"]);
  });

  it("shortestPath returns null for disconnected nodes", () => {
    const g = new Graph<string>();
    g.addNode("a");
    g.addNode("b");
    expect(g.shortestPath("a", "b")).toBeNull();
  });

  it("hasCycle detects cycles in undirected graph", () => {
    const g = new Graph<string>();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    expect(g.hasCycle()).toBe(false);
    g.addEdge("c", "a");
    expect(g.hasCycle()).toBe(true);
  });

  it("hasCycle detects cycles in directed graph", () => {
    const g = new Graph<string>(true);
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    expect(g.hasCycle()).toBe(false);
    g.addEdge("c", "a");
    expect(g.hasCycle()).toBe(true);
  });

  it("neighbors returns adjacent nodes", () => {
    const g = new Graph<string>();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    expect(g.neighbors("a").sort()).toEqual(["b", "c"]);
  });
});
