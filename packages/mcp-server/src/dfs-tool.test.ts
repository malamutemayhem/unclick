import { describe, it, expect } from "vitest";
import { dfsSearch } from "./dfs-tool.js";

describe("dfsSearch", () => {
  const edges = [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "C", to: "D" },
    { from: "D", to: "E" },
  ];

  it("finds a path to target", async () => {
    const r = await dfsSearch({ edges, start: "A", target: "E", directed: true }) as any;
    expect(r.path).not.toBeNull();
    expect(r.path[0]).toBe("A");
    expect(r.path[r.path.length - 1]).toBe("E");
    expect(r.path_length).toBeGreaterThan(0);
  });

  it("traverses all reachable nodes", async () => {
    const r = await dfsSearch({ edges, start: "A", directed: true }) as any;
    expect(r.reachable_count).toBe(5);
    expect(r.visit_order[0]).toBe("A");
  });

  it("detects cycles", async () => {
    const r = await dfsSearch({
      edges: [{ from: "A", to: "B" }, { from: "B", to: "A" }],
      start: "A",
      directed: true,
    }) as any;
    expect(r.has_cycle).toBe(true);
  });

  it("no cycle in a DAG", async () => {
    const r = await dfsSearch({ edges, start: "A", directed: true }) as any;
    expect(r.has_cycle).toBe(false);
  });

  it("returns null path if unreachable", async () => {
    const r = await dfsSearch({
      edges: [{ from: "A", to: "B" }, { from: "C", to: "D" }],
      start: "A",
      target: "D",
      directed: true,
    }) as any;
    expect(r.path).toBeNull();
  });

  it("rejects empty edges", async () => {
    await expect(dfsSearch({ edges: [], start: "A" })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await dfsSearch({ edges: [{ from: "A", to: "B" }], start: "A" }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
