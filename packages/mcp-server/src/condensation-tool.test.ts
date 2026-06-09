import { describe, it, expect } from "vitest";
import { graphCondensation } from "./condensation-tool.js";

describe("graphCondensation", () => {
  it("finds SCCs and builds DAG", async () => {
    const r = (await graphCondensation({
      vertex_count: 4,
      edges: [[0, 1], [1, 2], [2, 0], [2, 3]],
    })) as any;
    expect(r.scc_count).toBe(2);
    expect(r.dag_edge_count).toBe(1);
  });

  it("handles DAG input (each node is its own SCC)", async () => {
    const r = (await graphCondensation({
      vertex_count: 3,
      edges: [[0, 1], [1, 2]],
    })) as any;
    expect(r.scc_count).toBe(3);
    expect(r.dag_edge_count).toBe(2);
  });

  it("handles single SCC", async () => {
    const r = (await graphCondensation({
      vertex_count: 3,
      edges: [[0, 1], [1, 2], [2, 0]],
    })) as any;
    expect(r.scc_count).toBe(1);
    expect(r.dag_edges).toEqual([]);
  });

  it("handles disconnected vertices", async () => {
    const r = (await graphCondensation({
      vertex_count: 5,
      edges: [[0, 1], [1, 0]],
    })) as any;
    expect(r.scc_count).toBe(4);
    const sizes = r.components.map((c: number[]) => c.length).sort();
    expect(sizes).toEqual([1, 1, 1, 2]);
  });

  it("stamps meta", async () => {
    const r = (await graphCondensation({
      vertex_count: 2,
      edges: [],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
