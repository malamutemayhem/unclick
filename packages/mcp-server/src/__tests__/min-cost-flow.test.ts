import { describe, it, expect } from "vitest";
import { MinCostFlow } from "../min-cost-flow.js";

describe("MinCostFlow", () => {
  it("computes min cost for simple graph", () => {
    const mcf = new MinCostFlow(4);
    mcf.addEdge(0, 1, 2, 1);
    mcf.addEdge(0, 2, 2, 5);
    mcf.addEdge(1, 3, 2, 1);
    mcf.addEdge(2, 3, 2, 1);
    const result = mcf.minCostFlow(0, 3, 2);
    expect(result.flow).toBe(2);
    expect(result.cost).toBe(4);
  });

  it("prefers cheaper path", () => {
    const mcf = new MinCostFlow(3);
    mcf.addEdge(0, 1, 10, 1);
    mcf.addEdge(0, 2, 10, 100);
    mcf.addEdge(1, 2, 10, 1);
    const result = mcf.minCostFlow(0, 2, 5);
    expect(result.flow).toBe(5);
    expect(result.cost).toBe(10);
  });

  it("respects max flow limit", () => {
    const mcf = new MinCostFlow(2);
    mcf.addEdge(0, 1, 10, 1);
    const result = mcf.minCostFlow(0, 1, 5);
    expect(result.flow).toBe(5);
    expect(result.cost).toBe(5);
  });

  it("zero flow when no path", () => {
    const mcf = new MinCostFlow(3);
    mcf.addEdge(0, 1, 5, 1);
    const result = mcf.minCostFlow(0, 2, 5);
    expect(result.flow).toBe(0);
    expect(result.cost).toBe(0);
  });

  it("multiple paths with different costs", () => {
    const mcf = new MinCostFlow(4);
    mcf.addEdge(0, 1, 1, 1);
    mcf.addEdge(0, 2, 1, 2);
    mcf.addEdge(1, 3, 1, 1);
    mcf.addEdge(2, 3, 1, 1);
    const result = mcf.minCostFlow(0, 3, 2);
    expect(result.flow).toBe(2);
    expect(result.cost).toBe(5);
  });

  it("nodeCount returns size", () => {
    const mcf = new MinCostFlow(6);
    expect(mcf.nodeCount()).toBe(6);
  });
});
