import { describe, it, expect } from "vitest";
import { eulerPath } from "./eulerpath-tool.js";

describe("eulerPath", () => {
  it("detects Euler circuit in undirected graph", async () => {
    const r = (await eulerPath({
      vertices: 3,
      edges: [[0, 1], [1, 2], [2, 0]],
    })) as any;
    expect(r.has_euler_circuit).toBe(true);
    expect(r.has_euler_path).toBe(true);
  });

  it("detects Euler path (not circuit) in undirected graph", async () => {
    const r = (await eulerPath({
      vertices: 3,
      edges: [[0, 1], [1, 2]],
    })) as any;
    expect(r.has_euler_path).toBe(true);
    expect(r.has_euler_circuit).toBe(false);
    expect(r.odd_degree_count).toBe(2);
  });

  it("detects no Euler path when >2 odd-degree vertices", async () => {
    const r = (await eulerPath({
      vertices: 4,
      edges: [[0, 1], [0, 2], [0, 3]],
    })) as any;
    expect(r.has_euler_path).toBe(false);
  });

  it("handles directed graph with Euler circuit", async () => {
    const r = (await eulerPath({
      vertices: 3,
      edges: [[0, 1], [1, 2], [2, 0]],
      directed: true,
    })) as any;
    expect(r.has_euler_circuit).toBe(true);
    expect(r.directed).toBe(true);
  });

  it("stamps meta", async () => {
    const r = (await eulerPath({ vertices: 2, edges: [[0, 1]] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
