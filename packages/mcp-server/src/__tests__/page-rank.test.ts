import { describe, it, expect } from "vitest";
import { Graph, pageRank, hitsAlgorithm } from "../page-rank.js";

describe("Graph", () => {
  it("adds nodes and edges", () => {
    const g = new Graph();
    g.addNode("a");
    g.addNode("b");
    g.addEdge("a", "b");
    expect(g.nodeCount()).toBe(2);
    expect(g.edgeCount()).toBe(1);
  });

  it("computes degree", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    g.addEdge("b", "c");
    expect(g.outDegree("a")).toBe(2);
    expect(g.inDegree("c")).toBe(2);
  });

  it("removes edges", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    expect(g.removeEdge("a", "b")).toBe(true);
    expect(g.hasEdge("a", "b")).toBe(false);
  });

  it("lists neighbors", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("a", "c");
    expect(g.neighbors("a").sort()).toEqual(["b", "c"]);
  });
});

describe("pageRank", () => {
  it("computes ranks for simple graph", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addEdge("b", "c");
    g.addEdge("c", "a");
    const ranks = pageRank(g);
    const values = [...ranks.values()];
    const sum = values.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 3);
  });

  it("gives higher rank to more linked pages", () => {
    const g = new Graph();
    g.addEdge("a", "hub");
    g.addEdge("b", "hub");
    g.addEdge("c", "hub");
    g.addEdge("hub", "a");
    const ranks = pageRank(g);
    expect(ranks.get("hub")!).toBeGreaterThan(ranks.get("a")!);
  });

  it("returns empty for empty graph", () => {
    const g = new Graph();
    expect(pageRank(g).size).toBe(0);
  });

  it("handles dangling nodes", () => {
    const g = new Graph();
    g.addEdge("a", "b");
    g.addNode("c");
    const ranks = pageRank(g);
    expect(ranks.size).toBe(3);
  });
});

describe("hitsAlgorithm", () => {
  it("computes authority and hub scores", () => {
    const g = new Graph();
    g.addEdge("h1", "a1");
    g.addEdge("h1", "a2");
    g.addEdge("h2", "a1");
    const result = hitsAlgorithm(g);
    expect(result.authorities.get("a1")!).toBeGreaterThan(0);
    expect(result.hubs.get("h1")!).toBeGreaterThan(0);
  });

  it("returns empty for empty graph", () => {
    const g = new Graph();
    const result = hitsAlgorithm(g);
    expect(result.authorities.size).toBe(0);
  });
});
