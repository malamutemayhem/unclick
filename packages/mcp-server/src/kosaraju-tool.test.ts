import { describe, it, expect } from "vitest";
import { kosarajuScc } from "./kosaraju-tool.js";

describe("kosarajuScc", () => {
  it("finds SCCs in a directed graph", async () => {
    const r = (await kosarajuScc({
      vertices: 5,
      edges: [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]],
    })) as any;
    expect(r.scc_count).toBe(3);
    const scc012 = r.components.find((c: number[]) => c.includes(0));
    expect(scc012).toEqual([0, 1, 2]);
  });

  it("detects strongly connected graph", async () => {
    const r = (await kosarajuScc({
      vertices: 3,
      edges: [[0, 1], [1, 2], [2, 0]],
    })) as any;
    expect(r.is_strongly_connected).toBe(true);
    expect(r.scc_count).toBe(1);
  });

  it("handles DAG (each vertex is its own SCC)", async () => {
    const r = (await kosarajuScc({
      vertices: 4,
      edges: [[0, 1], [1, 2], [2, 3]],
    })) as any;
    expect(r.scc_count).toBe(4);
  });

  it("handles isolated vertices", async () => {
    const r = (await kosarajuScc({ vertices: 3, edges: [] })) as any;
    expect(r.scc_count).toBe(3);
  });

  it("stamps meta", async () => {
    const r = (await kosarajuScc({ vertices: 1, edges: [] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
