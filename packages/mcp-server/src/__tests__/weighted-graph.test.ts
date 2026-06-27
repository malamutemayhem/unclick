import { describe, it, expect } from "vitest";
import { WeightedGraph } from "../weighted-graph.js";

describe("WeightedGraph", () => {
  it("adds nodes", () => {
    const g = new WeightedGraph();
    g.addNode("A");
    g.addNode("B");
    expect(g.hasNode("A")).toBe(true);
    expect(g.hasNode("B")).toBe(true);
    expect(g.nodeCount).toBe(2);
  });

  it("adds bidirectional edges", () => {
    const g = new WeightedGraph();
    g.addEdge("A", "B", 5);
    expect(g.edgeWeight("A", "B")).toBe(5);
    expect(g.edgeWeight("B", "A")).toBe(5);
  });

  it("adds directed edges", () => {
    const g = new WeightedGraph();
    g.addEdge("A", "B", 3, false);
    expect(g.edgeWeight("A", "B")).toBe(3);
    expect(g.edgeWeight("B", "A")).toBeUndefined();
  });

  it("lists nodes", () => {
    const g = new WeightedGraph();
    g.addEdge("X", "Y", 1);
    expect(g.nodes.sort()).toEqual(["X", "Y"]);
  });

  it("lists neighbors", () => {
    const g = new WeightedGraph();
    g.addEdge("A", "B", 2);
    g.addEdge("A", "C", 3);
    const n = g.neighbors("A");
    expect(n).toHaveLength(2);
    expect(n.map((e) => e.to).sort()).toEqual(["B", "C"]);
  });

  it("returns empty neighbors for unknown node", () => {
    const g = new WeightedGraph();
    expect(g.neighbors("X")).toEqual([]);
  });

  it("runs dijkstra from source", () => {
    const g = new WeightedGraph();
    g.addEdge("A", "B", 1);
    g.addEdge("B", "C", 2);
    g.addEdge("A", "C", 10);
    const { distances } = g.dijkstra("A");
    expect(distances.get("A")).toBe(0);
    expect(distances.get("B")).toBe(1);
    expect(distances.get("C")).toBe(3);
  });

  it("finds shortest path", () => {
    const g = new WeightedGraph();
    g.addEdge("A", "B", 1);
    g.addEdge("B", "C", 2);
    g.addEdge("A", "C", 10);
    const result = g.shortestPath("A", "C");
    expect(result).not.toBeNull();
    expect(result!.path).toEqual(["A", "B", "C"]);
    expect(result!.distance).toBe(3);
  });

  it("returns null for unreachable path", () => {
    const g = new WeightedGraph();
    g.addNode("A");
    g.addNode("B");
    expect(g.shortestPath("A", "B")).toBeNull();
  });

  it("removes a node", () => {
    const g = new WeightedGraph();
    g.addEdge("A", "B", 1);
    g.addEdge("B", "C", 2);
    expect(g.removeNode("B")).toBe(true);
    expect(g.hasNode("B")).toBe(false);
    expect(g.neighbors("A")).toEqual([]);
    expect(g.neighbors("C")).toEqual([]);
  });

  it("removeNode returns false for missing", () => {
    const g = new WeightedGraph();
    expect(g.removeNode("Z")).toBe(false);
  });

  it("edgeWeight returns undefined for missing", () => {
    const g = new WeightedGraph();
    g.addNode("A");
    expect(g.edgeWeight("A", "B")).toBeUndefined();
    expect(g.edgeWeight("Z", "Q")).toBeUndefined();
  });

  it("handles self-loops", () => {
    const g = new WeightedGraph();
    g.addEdge("A", "A", 0, false);
    expect(g.edgeWeight("A", "A")).toBe(0);
  });
});
