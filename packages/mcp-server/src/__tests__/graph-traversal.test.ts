import { describe, it, expect } from "vitest";
import { createGraph, addEdge, addUndirectedEdge, bfs, dfs, shortestPath, connectedComponents, hasCycleDFS } from "../graph-traversal.js";

describe("bfs", () => {
  it("traverses breadth-first", () => {
    const g = createGraph();
    addEdge(g, "a", "b");
    addEdge(g, "a", "c");
    addEdge(g, "b", "d");
    const order = bfs(g, "a");
    expect(order).toEqual(["a", "b", "c", "d"]);
  });

  it("handles single node", () => {
    const g = createGraph();
    g.adjacency.set("x", []);
    expect(bfs(g, "x")).toEqual(["x"]);
  });
});

describe("dfs", () => {
  it("traverses depth-first", () => {
    const g = createGraph();
    addEdge(g, "a", "b");
    addEdge(g, "a", "c");
    addEdge(g, "b", "d");
    const order = dfs(g, "a");
    expect(order[0]).toBe("a");
    expect(order).toContain("b");
    expect(order).toContain("d");
    expect(order.indexOf("b")).toBeLessThan(order.indexOf("d"));
  });
});

describe("shortestPath", () => {
  it("finds shortest path", () => {
    const g = createGraph();
    addEdge(g, "a", "b");
    addEdge(g, "b", "c");
    addEdge(g, "a", "c");
    expect(shortestPath(g, "a", "c")).toEqual(["a", "c"]);
  });

  it("returns null if no path", () => {
    const g = createGraph();
    addEdge(g, "a", "b");
    g.adjacency.set("c", []);
    expect(shortestPath(g, "a", "c")).toBeNull();
  });

  it("same start and end", () => {
    const g = createGraph();
    expect(shortestPath(g, "a", "a")).toEqual(["a"]);
  });
});

describe("connectedComponents", () => {
  it("finds components in undirected graph", () => {
    const g = createGraph();
    addUndirectedEdge(g, "a", "b");
    addUndirectedEdge(g, "c", "d");
    const comps = connectedComponents(g);
    expect(comps.length).toBe(2);
  });
});

describe("hasCycleDFS", () => {
  it("detects cycle", () => {
    const g = createGraph();
    addEdge(g, "a", "b");
    addEdge(g, "b", "c");
    addEdge(g, "c", "a");
    expect(hasCycleDFS(g)).toBe(true);
  });

  it("returns false for DAG", () => {
    const g = createGraph();
    addEdge(g, "a", "b");
    addEdge(g, "a", "c");
    addEdge(g, "b", "c");
    expect(hasCycleDFS(g)).toBe(false);
  });
});
