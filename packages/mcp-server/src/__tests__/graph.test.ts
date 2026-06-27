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
  it("undirected edges work both ways", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    expect(g.hasEdge("b", "a")).toBe(true);
  });
  it("directed edges are one-way", () => {
    const g = new Graph(true);
    g.addEdge("a", "b");
    expect(g.hasEdge("a", "b")).toBe(true);
    expect(g.hasEdge("b", "a")).toBe(false);
  });
  it("neighbors", () => {
    const g = new Graph();
    g.addEdge("a", "b"); g.addEdge("a", "c");
    expect(g.neighbors("a").sort()).toEqual(["b", "c"]);
  });
  it("removeEdge", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.removeEdge("a", "b");
    expect(g.hasEdge("a", "b")).toBe(false);
  });
  it("removeNode", () => {
    const g = new Graph();
    g.addEdge("a", "b"); g.addEdge("b", "c");
    g.removeNode("b");
    expect(g.hasNode("b")).toBe(false);
    expect(g.neighbors("a")).toEqual([]);
  });
  it("bfs traversal", () => {
    const g = new Graph();
    g.addEdge("a", "b"); g.addEdge("b", "c"); g.addEdge("a", "d");
    const result = g.bfs("a");
    expect(result[0]).toBe("a");
    expect(result).toHaveLength(4);
  });
  it("dfs traversal", () => {
    const g = new Graph();
    g.addEdge("a", "b"); g.addEdge("b", "c");
    const result = g.dfs("a");
    expect(result[0]).toBe("a");
    expect(result).toHaveLength(3);
  });
  it("shortestPath", () => {
    const g = new Graph();
    g.addEdge("a", "b"); g.addEdge("b", "c"); g.addEdge("a", "c");
    const path = g.shortestPath("a", "c");
    expect(path).toEqual(["a", "c"]);
  });
  it("shortestPath returns null for disconnected", () => {
    const g = new Graph();
    g.addNode("a"); g.addNode("b");
    expect(g.shortestPath("a", "b")).toBeNull();
  });
  it("isConnected", () => {
    const g = new Graph();
    g.addEdge("a", "b"); g.addEdge("b", "c");
    expect(g.isConnected()).toBe(true);
  });
  it("isConnected false for disconnected", () => {
    const g = new Graph();
    g.addNode("a"); g.addNode("b");
    expect(g.isConnected()).toBe(false);
  });
});
