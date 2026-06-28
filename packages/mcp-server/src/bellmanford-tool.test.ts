import { describe, it, expect } from "vitest";
import { bellmanFord } from "./bellmanford-tool.js";

describe("bellmanFord", () => {
  it("finds shortest paths with positive weights", async () => {
    const r = await bellmanFord({
      edges: [
        { from: "A", to: "B", weight: 4 },
        { from: "A", to: "C", weight: 2 },
        { from: "C", to: "B", weight: 1 },
      ],
      start: "A",
      target: "B",
    }) as any;
    expect(r.path).toEqual(["A", "C", "B"]);
    expect(r.path_weight).toBe(3);
  });

  it("handles negative weights", async () => {
    const r = await bellmanFord({
      edges: [
        { from: "A", to: "B", weight: 5 },
        { from: "A", to: "C", weight: 2 },
        { from: "C", to: "B", weight: -1 },
      ],
      start: "A",
      target: "B",
    }) as any;
    expect(r.path_weight).toBe(1);
    expect(r.has_negative_cycle).toBe(false);
  });

  it("detects negative cycle", async () => {
    const r = await bellmanFord({
      edges: [
        { from: "A", to: "B", weight: 1 },
        { from: "B", to: "C", weight: -3 },
        { from: "C", to: "A", weight: 1 },
      ],
      start: "A",
    }) as any;
    expect(r.has_negative_cycle).toBe(true);
  });

  it("returns null path for unreachable target", async () => {
    const r = await bellmanFord({
      edges: [
        { from: "A", to: "B", weight: 1 },
        { from: "C", to: "D", weight: 2 },
      ],
      start: "A",
      target: "D",
    }) as any;
    expect(r.path).toBeNull();
  });

  it("stamps meta", async () => {
    const r = await bellmanFord({
      edges: [{ from: "A", to: "B", weight: 1 }],
      start: "A",
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
