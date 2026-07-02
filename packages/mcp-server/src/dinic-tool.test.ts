import { describe, it, expect } from "vitest";
import { dinicMaxFlow } from "./dinic-tool.js";

describe("dinicMaxFlow", () => {
  it("computes max flow in a simple network", async () => {
    const r = (await dinicMaxFlow({
      vertex_count: 4,
      edges: [[0, 1, 10], [0, 2, 10], [1, 3, 10], [2, 3, 10]],
      source: 0,
      sink: 3,
    })) as any;
    expect(r.max_flow).toBe(20);
  });

  it("respects bottleneck capacity", async () => {
    const r = (await dinicMaxFlow({
      vertex_count: 3,
      edges: [[0, 1, 5], [1, 2, 3]],
      source: 0,
      sink: 2,
    })) as any;
    expect(r.max_flow).toBe(3);
  });

  it("handles no path from source to sink", async () => {
    const r = (await dinicMaxFlow({
      vertex_count: 3,
      edges: [[0, 1, 10]],
      source: 0,
      sink: 2,
    })) as any;
    expect(r.max_flow).toBe(0);
  });

  it("handles parallel edges", async () => {
    const r = (await dinicMaxFlow({
      vertex_count: 2,
      edges: [[0, 1, 5], [0, 1, 7]],
      source: 0,
      sink: 1,
    })) as any;
    expect(r.max_flow).toBe(12);
  });

  it("stamps meta", async () => {
    const r = (await dinicMaxFlow({
      vertex_count: 2,
      edges: [[0, 1, 1]],
      source: 0,
      sink: 1,
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
