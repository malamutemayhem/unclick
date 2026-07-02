import { describe, it, expect } from "vitest";
import { gabowScc } from "./gabow-tool.js";

describe("gabowScc", () => {
  it("finds SCCs in a simple cycle", async () => {
    const r = (await gabowScc({
      vertex_count: 3,
      edges: [[0, 1], [1, 2], [2, 0]],
    })) as any;
    expect(r.scc_count).toBe(1);
    expect(r.components[0]).toEqual([0, 1, 2]);
  });

  it("finds isolated vertices as individual SCCs", async () => {
    const r = (await gabowScc({
      vertex_count: 3,
      edges: [],
    })) as any;
    expect(r.scc_count).toBe(3);
  });

  it("finds SCCs in a DAG", async () => {
    const r = (await gabowScc({
      vertex_count: 4,
      edges: [[0, 1], [1, 2], [2, 3]],
    })) as any;
    expect(r.scc_count).toBe(4);
  });

  it("finds two SCCs", async () => {
    const r = (await gabowScc({
      vertex_count: 4,
      edges: [[0, 1], [1, 0], [2, 3], [3, 2]],
    })) as any;
    expect(r.scc_count).toBe(2);
  });

  it("stamps meta", async () => {
    const r = (await gabowScc({
      vertex_count: 2,
      edges: [[0, 1]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
