import { describe, it, expect } from "vitest";
import { bfsSearch } from "./bfs-tool.js";

describe("bfsSearch", () => {
  const edges = [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "C", to: "D" },
    { from: "D", to: "E" },
  ];

  it("finds shortest path", async () => {
    const r = await bfsSearch({ edges, start: "A", target: "E", directed: true }) as any;
    expect(r.path).toEqual(["A", "B", "D", "E"]);
    expect(r.path_length).toBe(3);
  });

  it("traverses all reachable nodes", async () => {
    const r = await bfsSearch({ edges, start: "A", directed: true }) as any;
    expect(r.reachable_count).toBe(5);
    expect(r.visit_order[0]).toBe("A");
  });

  it("returns null path if target unreachable", async () => {
    const r = await bfsSearch({
      edges: [{ from: "A", to: "B" }, { from: "C", to: "D" }],
      start: "A",
      target: "D",
      directed: true,
    }) as any;
    expect(r.path).toBeNull();
  });

  it("undirected mode", async () => {
    const r = await bfsSearch({
      edges: [{ from: "X", to: "Y" }],
      start: "Y",
      target: "X",
      directed: false,
    }) as any;
    expect(r.path).toEqual(["Y", "X"]);
  });

  it("rejects missing start", async () => {
    await expect(bfsSearch({ edges, start: "Z" })).rejects.toThrow("not found");
  });

  it("rejects empty edges", async () => {
    await expect(bfsSearch({ edges: [], start: "A" })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await bfsSearch({ edges: [{ from: "A", to: "B" }], start: "A" }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
