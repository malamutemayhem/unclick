import { describe, it, expect } from "vitest";
import { Graph } from "../graph.js";

describe("Graph (undirected)", () => {
  it("adds nodes and edges", () => {
    const g = new Graph<string>();
    g.addNode("a", "A").addNode("b", "B").addEdge("a", "b");
    expect(g.hasNode("a")).toBe(true);
    expect(g.hasEdge("a", "b")).toBe(true);
    expect(g.hasEdge("b", "a")).toBe(true);
  });

  it("neighbors returns adjacent nodes", () => {
    const g = new Graph<string>();
    g.addNode("a", "A").addNode("b", "B").addNode("c", "C");
    g.addEdge("a", "b").addEdge("a", "c");
    expect(g.neighbors("a").sort()).toEqual(["b", "c"]);
  });

  it("bfs traverses breadth-first", () => {
    const g = new Graph<string>();
    g.addNode("a", "A").addNode("b", "B").addNode("c", "C").addNode("d", "D");
    g.addEdge("a", "b").addEdge("a", "c").addEdge("b", "d");
    const result = g.bfs("a");
    expect(result[0]).toBe("a");
    expect(result).toContain("d");
  });

  it("dfs traverses depth-first", () => {
    const g = new Graph<string>();
    g.addNode("a", "A").addNode("b", "B").addNode("c", "C");
    g.addEdge("a", "b").addEdge("b", "c");
    const result = g.dfs("a");
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("shortestPath finds path", () => {
    const g = new Graph<string>();
    g.addNode("a", "").addNode("b", "").addNode("c", "").addNode("d", "");
    g.addEdge("a", "b").addEdge("b", "c").addEdge("a", "d").addEdge("d", "c");
    const path = g.shortestPath("a", "c");
    expect(path).not.toBeNull();
    expect(path!.length).toBeLessThanOrEqual(3);
  });

  it("shortestPath returns null if no path", () => {
    const g = new Graph<string>();
    g.addNode("a", "").addNode("b", "");
    expect(g.shortestPath("a", "b")).toBeNull();
  });

  it("removeNode removes node and edges", () => {
    const g = new Graph<string>();
    g.addNode("a", "A").addNode("b", "B").addEdge("a", "b");
    g.removeNode("b");
    expect(g.hasNode("b")).toBe(false);
    expect(g.neighbors("a")).toEqual([]);
  });
});

describe("Graph (directed)", () => {
  it("edges are one-directional", () => {
    const g = new Graph<string>(true);
    g.addNode("a", "A").addNode("b", "B").addEdge("a", "b");
    expect(g.hasEdge("a", "b")).toBe(true);
    expect(g.hasEdge("b", "a")).toBe(false);
  });
});
