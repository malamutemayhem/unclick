import { describe, it, expect } from "vitest";
import { topoCount } from "./topocount-tool.js";

describe("topoCount", () => {
  it("counts orderings of a simple chain", async () => {
    // 0 -> 1 -> 2: only one valid ordering
    const r = (await topoCount({ num_nodes: 3, edges: [[0, 1], [1, 2]] })) as any;
    expect(r.count).toBe(1);
    expect(r.is_dag).toBe(true);
  });

  it("counts orderings of a graph with no edges", async () => {
    // 3 nodes, no edges: 3! = 6 orderings
    const r = (await topoCount({ num_nodes: 3, edges: [] })) as any;
    expect(r.count).toBe(6);
    expect(r.is_dag).toBe(true);
  });

  it("detects a cycle and returns count 0", async () => {
    const r = (await topoCount({
      num_nodes: 3,
      edges: [[0, 1], [1, 2], [2, 0]],
    })) as any;
    expect(r.count).toBe(0);
    expect(r.is_dag).toBe(false);
  });

  it("counts orderings of a diamond DAG", async () => {
    // 0 -> 1, 0 -> 2, 1 -> 3, 2 -> 3
    // Valid orderings: 0,1,2,3 and 0,2,1,3 = 2
    const r = (await topoCount({
      num_nodes: 4,
      edges: [[0, 1], [0, 2], [1, 3], [2, 3]],
    })) as any;
    expect(r.count).toBe(2);
    expect(r.is_dag).toBe(true);
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await topoCount({ num_nodes: 2, edges: [[0, 1]] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
