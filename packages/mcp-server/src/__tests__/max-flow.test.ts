import { describe, it, expect } from "vitest";
import { MaxFlow } from "../max-flow.js";

describe("MaxFlow", () => {
  it("edmondsKarp computes max flow on simple graph", () => {
    const mf = new MaxFlow(4);
    mf.addEdge(0, 1, 10);
    mf.addEdge(0, 2, 10);
    mf.addEdge(1, 3, 10);
    mf.addEdge(2, 3, 10);
    expect(mf.edmondsKarp(0, 3)).toBe(20);
  });

  it("edmondsKarp respects bottleneck", () => {
    const mf = new MaxFlow(3);
    mf.addEdge(0, 1, 100);
    mf.addEdge(1, 2, 5);
    expect(mf.edmondsKarp(0, 2)).toBe(5);
  });

  it("edmondsKarp returns 0 when no path exists", () => {
    const mf = new MaxFlow(3);
    mf.addEdge(0, 1, 10);
    expect(mf.edmondsKarp(0, 2)).toBe(0);
  });

  it("edmondsKarp handles parallel edges", () => {
    const mf = new MaxFlow(2);
    mf.addEdge(0, 1, 5);
    mf.addEdge(0, 1, 3);
    expect(mf.edmondsKarp(0, 1)).toBe(8);
  });

  it("minCut returns flow and cut edges", () => {
    const mf = new MaxFlow(4);
    mf.addEdge(0, 1, 3);
    mf.addEdge(0, 2, 2);
    mf.addEdge(1, 3, 2);
    mf.addEdge(2, 3, 3);
    const result = mf.minCut(0, 3);
    expect(result.flow).toBe(4);
    expect(result.cut.length).toBeGreaterThan(0);
  });

  it("minCut value equals max flow", () => {
    const mf = new MaxFlow(4);
    mf.addEdge(0, 1, 10);
    mf.addEdge(0, 2, 10);
    mf.addEdge(1, 3, 10);
    mf.addEdge(2, 3, 10);
    const { flow } = mf.minCut(0, 3);
    expect(flow).toBe(20);
  });

  it("nodeCount returns graph size", () => {
    const mf = new MaxFlow(5);
    expect(mf.nodeCount()).toBe(5);
  });

  it("handles diamond graph correctly", () => {
    const mf = new MaxFlow(4);
    mf.addEdge(0, 1, 1);
    mf.addEdge(0, 2, 1);
    mf.addEdge(1, 3, 1);
    mf.addEdge(2, 3, 1);
    expect(mf.edmondsKarp(0, 3)).toBe(2);
  });
});
