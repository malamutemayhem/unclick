import { describe, it, expect } from "vitest";
import { topoSort } from "./toposort-tool.js";

describe("topoSort", () => {
  it("sorts a DAG correctly", async () => {
    const r = await topoSort({
      edges: [
        ["A", "B"],
        ["A", "C"],
        ["B", "D"],
        ["C", "D"],
      ],
    }) as any;
    const sorted = r.sorted as string[];
    expect(sorted.indexOf("A")).toBeLessThan(sorted.indexOf("B"));
    expect(sorted.indexOf("A")).toBeLessThan(sorted.indexOf("C"));
    expect(sorted.indexOf("B")).toBeLessThan(sorted.indexOf("D"));
    expect(r.has_cycle).toBe(false);
    expect(r.node_count).toBe(4);
  });

  it("detects cycles", async () => {
    const r = await topoSort({
      edges: [
        ["A", "B"],
        ["B", "C"],
        ["C", "A"],
      ],
    }) as any;
    expect(r.has_cycle).toBe(true);
    expect((r.cycle_nodes as string[]).length).toBeGreaterThan(0);
  });

  it("handles linear chain", async () => {
    const r = await topoSort({
      edges: [
        ["1", "2"],
        ["2", "3"],
        ["3", "4"],
      ],
    }) as any;
    expect(r.sorted).toEqual(["1", "2", "3", "4"]);
    expect(r.has_cycle).toBe(false);
  });

  it("rejects empty edges", async () => {
    await expect(topoSort({ edges: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await topoSort({ edges: [["a", "b"]] }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
