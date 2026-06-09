import { describe, it, expect } from "vitest";
import { graphAnalyze } from "./graph-tool.js";

describe("graphAnalyze", () => {
  it("analyzes a simple connected graph", async () => {
    const r = await graphAnalyze({
      edges: [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "C", to: "A" },
      ],
    }) as any;
    expect(r.node_count).toBe(3);
    expect(r.edge_count).toBe(3);
    expect(r.is_connected).toBe(true);
    expect(r.connected_components).toBe(1);
  });

  it("detects disconnected components", async () => {
    const r = await graphAnalyze({
      edges: [
        { from: "A", to: "B" },
        { from: "C", to: "D" },
      ],
    }) as any;
    expect(r.connected_components).toBe(2);
    expect(r.is_connected).toBe(false);
  });

  it("computes degrees", async () => {
    const r = await graphAnalyze({
      edges: [
        { from: "A", to: "B" },
        { from: "A", to: "C" },
      ],
      directed: true,
    }) as any;
    expect(r.degrees["A"]).toBe(2);
    expect(r.directed).toBe(true);
  });

  it("detects self loops", async () => {
    const r = await graphAnalyze({
      edges: [{ from: "A", to: "A" }],
    }) as any;
    expect(r.has_self_loop).toBe(true);
  });

  it("undirected mode", async () => {
    const r = await graphAnalyze({
      edges: [{ from: "X", to: "Y" }],
      directed: false,
    }) as any;
    expect(r.directed).toBe(false);
    expect(r.degrees["X"]).toBe(1);
    expect(r.degrees["Y"]).toBe(1);
  });

  it("rejects empty edges", async () => {
    await expect(graphAnalyze({ edges: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await graphAnalyze({
      edges: [{ from: "A", to: "B" }],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
