import { describe, it, expect } from "vitest";
import { DinicFlow } from "../dinic-flow.js";

describe("DinicFlow", () => {
  it("computes max flow on simple graph", () => {
    const d = new DinicFlow(4);
    d.addEdge(0, 1, 3);
    d.addEdge(0, 2, 2);
    d.addEdge(1, 3, 2);
    d.addEdge(2, 3, 3);
    expect(d.maxFlow(0, 3)).toBe(4);
  });

  it("parallel edges add capacity", () => {
    const d = new DinicFlow(2);
    d.addEdge(0, 1, 3);
    d.addEdge(0, 1, 2);
    expect(d.maxFlow(0, 1)).toBe(5);
  });

  it("bottleneck limits flow", () => {
    const d = new DinicFlow(3);
    d.addEdge(0, 1, 10);
    d.addEdge(1, 2, 1);
    expect(d.maxFlow(0, 2)).toBe(1);
  });

  it("no path gives zero flow", () => {
    const d = new DinicFlow(3);
    d.addEdge(0, 1, 5);
    expect(d.maxFlow(0, 2)).toBe(0);
  });

  it("diamond graph", () => {
    const d = new DinicFlow(4);
    d.addEdge(0, 1, 10);
    d.addEdge(0, 2, 10);
    d.addEdge(1, 3, 10);
    d.addEdge(2, 3, 10);
    d.addEdge(1, 2, 1);
    expect(d.maxFlow(0, 3)).toBe(20);
  });

  it("nodeCount returns constructor value", () => {
    const d = new DinicFlow(5);
    expect(d.nodeCount()).toBe(5);
  });

  it("getFlow returns flow on edge", () => {
    const d = new DinicFlow(3);
    d.addEdge(0, 1, 5);
    d.addEdge(1, 2, 3);
    d.maxFlow(0, 2);
    expect(d.getFlow(1, 2)).toBe(3);
  });
});
