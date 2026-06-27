import { describe, it, expect } from "vitest";
import { MemoryGraph } from "../memory-graph.js";

describe("MemoryGraph", () => {
  it("adds and gets nodes", () => {
    const g = new MemoryGraph();
    g.addNode("alice", "person", { age: 30 });
    expect(g.getNode("alice")?.type).toBe("person");
    expect(g.nodeCount).toBe(1);
  });

  it("removes nodes and related edges", () => {
    const g = new MemoryGraph();
    g.addNode("a", "x").addNode("b", "x");
    g.addEdge("a", "b", "knows");
    g.removeNode("a");
    expect(g.nodeCount).toBe(1);
    expect(g.edgeCount).toBe(0);
  });

  it("adds and queries edges", () => {
    const g = new MemoryGraph();
    g.addNode("a", "person").addNode("b", "person").addNode("c", "company");
    g.addEdge("a", "b", "knows");
    g.addEdge("a", "c", "worksAt");
    expect(g.getEdges("a", "out").length).toBe(2);
    expect(g.getEdges("b", "in").length).toBe(1);
    expect(g.getEdges("a", "both").length).toBe(2);
  });

  it("removes edges", () => {
    const g = new MemoryGraph();
    g.addNode("a", "x").addNode("b", "x");
    g.addEdge("a", "b", "knows");
    g.addEdge("a", "b", "likes");
    expect(g.removeEdge("a", "b", "knows")).toBe(1);
    expect(g.edgeCount).toBe(1);
  });

  it("gets neighbors", () => {
    const g = new MemoryGraph();
    g.addNode("a", "x").addNode("b", "x").addNode("c", "x");
    g.addEdge("a", "b", "knows");
    g.addEdge("c", "a", "knows");
    const neighbors = g.getNeighbors("a");
    expect(neighbors.length).toBe(2);
  });

  it("finds path between nodes", () => {
    const g = new MemoryGraph();
    g.addNode("a", "x").addNode("b", "x").addNode("c", "x").addNode("d", "x");
    g.addEdge("a", "b", "r");
    g.addEdge("b", "c", "r");
    g.addEdge("c", "d", "r");
    const path = g.findPath("a", "d");
    expect(path).toEqual(["a", "b", "c", "d"]);
  });

  it("returns null for no path", () => {
    const g = new MemoryGraph();
    g.addNode("a", "x").addNode("b", "x");
    expect(g.findPath("a", "b")).toBeNull();
  });

  it("gets nodes by type", () => {
    const g = new MemoryGraph();
    g.addNode("a", "person").addNode("b", "company").addNode("c", "person");
    expect(g.getByType("person").length).toBe(2);
  });

  it("gets related nodes by relation", () => {
    const g = new MemoryGraph();
    g.addNode("a", "x").addNode("b", "x").addNode("c", "x");
    g.addEdge("a", "b", "friend");
    g.addEdge("a", "c", "colleague");
    expect(g.getRelated("a", "friend").length).toBe(1);
    expect(g.getRelated("a", "friend")[0].id).toBe("b");
  });

  it("clear empties graph", () => {
    const g = new MemoryGraph();
    g.addNode("a", "x").addEdge("a", "a", "self");
    g.clear();
    expect(g.nodeCount).toBe(0);
    expect(g.edgeCount).toBe(0);
  });
});
