import { describe, it, expect } from "vitest";
import { minCostMaxFlow } from "./mincostflow-tool.js";

describe("minCostMaxFlow", () => {
  it("computes min cost max flow in a simple network", async () => {
    const r = (await minCostMaxFlow({
      vertex_count: 4,
      edges: [
        [0, 1, 2, 1],
        [0, 2, 2, 5],
        [1, 3, 2, 2],
        [2, 3, 2, 1],
      ],
      source: 0,
      sink: 3,
    })) as any;
    expect(r.max_flow).toBe(4);
    expect(r.min_cost).toBe(18);
  });

  it("handles single path", async () => {
    const r = (await minCostMaxFlow({
      vertex_count: 3,
      edges: [[0, 1, 5, 3], [1, 2, 5, 2]],
      source: 0,
      sink: 2,
    })) as any;
    expect(r.max_flow).toBe(5);
    expect(r.min_cost).toBe(25);
  });

  it("handles no path", async () => {
    const r = (await minCostMaxFlow({
      vertex_count: 3,
      edges: [[0, 1, 10, 1]],
      source: 0,
      sink: 2,
    })) as any;
    expect(r.max_flow).toBe(0);
    expect(r.min_cost).toBe(0);
  });

  it("chooses cheaper path first", async () => {
    const r = (await minCostMaxFlow({
      vertex_count: 3,
      edges: [[0, 1, 1, 10], [0, 2, 1, 1], [1, 2, 1, 0]],
      source: 0,
      sink: 2,
    })) as any;
    expect(r.max_flow).toBe(2);
  });

  it("stamps meta", async () => {
    const r = (await minCostMaxFlow({
      vertex_count: 2,
      edges: [[0, 1, 1, 1]],
      source: 0,
      sink: 1,
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
