import { describe, it, expect } from "vitest";
import { Graph } from "../graph.js";

describe("Graph", () => {
  it("adds nodes and edges", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    expect(g.hasNode("a")).toBe(true);
    expect(g.hasEdge("a", "b")).toBe(true);
    expect(g.nodeCount).toBe(2);
  });

  it("undirected edges go both ways", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    expect(g.hasEdge("b", "a")).toBe(true);
    expect(g.edgeCount).toBe(1);
  });

  it("directed edges are one-way", () => {
    const g = new Graph(true);
    g.addEdge("a", "b");
    expect(g.hasEdge("a", "b")).toBe(true);
    expect(g.hasEdge("b", "a")).toBe(false);
  });

  it("neighbors returns adjacent", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    expect(g.neighbors("a").sort()).toEqual(["b", "c"]);
  });

  it("bfs traverses breadth-first", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    g.addEdge("b", "d");
    const result = g.bfs("a");
    expect(result[0]).toBe("a");
    expect(result.length).toBe(4);
  });

  it("dfs traverses depth-first", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    const result = g.dfs("a");
    expect(result[0]).toBe("a");
    expect(result.length).toBe(3);
  });

  it("shortestPath finds shortest", () => {
    const g = new Graph();
    g.addEdge("a", "b", 1);
    g.addEdge("b", "c", 2);
    g.addEdge("a", "c", 10);
    const result = g.shortestPath("a", "c");
    expect(result).not.toBeNull();
    expect(result!.distance).toBe(3);
    expect(result!.path).toEqual(["a", "b", "c"]);
  });

  it("shortestPath returns null for disconnected", () => {
    const g = new Graph();
    g.addNode("a");
    g.addNode("z");
    expect(g.shortestPath("a", "z")).toBeNull();
  });

  it("hasCycle detects cycle", () => {
    const g = new Graph(true);
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    g.addEdge("c", "a");
    expect(g.hasCycle()).toBe(true);
  });

  it("hasCycle returns false for DAG", () => {
    const g = new Graph(true);
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    g.addEdge("b", "c");
    expect(g.hasCycle()).toBe(false);
  });

  it("getWeight returns edge weight", () => {
    const g = new Graph();
    g.addEdge("a", "b", 5);
    expect(g.getWeight("a", "b")).toBe(5);
  });
});
