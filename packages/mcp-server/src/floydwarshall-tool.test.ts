import { describe, it, expect } from "vitest";
import { floydWarshall } from "./floydwarshall-tool.js";

describe("floydWarshall", () => {
  it("computes all-pairs shortest paths", async () => {
    const r = await floydWarshall({
      edges: [
        { from: "A", to: "B", weight: 1 },
        { from: "B", to: "C", weight: 2 },
        { from: "A", to: "C", weight: 10 },
      ],
    }) as any;
    expect(r.distance_matrix["A"]["C"]).toBe(3);
    expect(r.distance_matrix["A"]["B"]).toBe(1);
    expect(r.node_count).toBe(3);
  });

  it("handles undirected graph", async () => {
    const r = await floydWarshall({
      edges: [
        { from: "A", to: "B", weight: 5 },
        { from: "B", to: "C", weight: 3 },
      ],
      directed: false,
    }) as any;
    expect(r.distance_matrix["C"]["A"]).toBe(8);
    expect(r.directed).toBe(false);
  });

  it("returns null for unreachable pairs", async () => {
    const r = await floydWarshall({
      edges: [
        { from: "A", to: "B", weight: 1 },
        { from: "C", to: "D", weight: 2 },
      ],
    }) as any;
    expect(r.distance_matrix["A"]["C"]).toBeNull();
  });

  it("detects negative cycle", async () => {
    const r = await floydWarshall({
      edges: [
        { from: "A", to: "B", weight: 1 },
        { from: "B", to: "C", weight: -3 },
        { from: "C", to: "A", weight: 1 },
      ],
    }) as any;
    expect(r.has_negative_cycle).toBe(true);
  });

  it("stamps meta", async () => {
    const r = await floydWarshall({
      edges: [{ from: "A", to: "B", weight: 1 }],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
