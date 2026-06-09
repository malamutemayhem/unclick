import { describe, it, expect } from "vitest";
import { dijkstraPath } from "./dijkstra-tool.js";

describe("dijkstraPath", () => {
  it("finds shortest path in undirected graph", async () => {
    const r = await dijkstraPath({
      source: "A",
      target: "D",
      edges: [
        ["A", "B", 1],
        ["B", "C", 2],
        ["A", "C", 4],
        ["C", "D", 1],
      ],
    }) as any;
    expect(r.distance).toBe(4);
    expect(r.path).toEqual(["A", "B", "C", "D"]);
    expect(r.reachable).toBe(true);
  });

  it("finds shortest path in directed graph", async () => {
    const r = await dijkstraPath({
      source: "A",
      target: "C",
      directed: true,
      edges: [
        ["A", "B", 1],
        ["B", "C", 1],
        ["A", "C", 10],
      ],
    }) as any;
    expect(r.distance).toBe(2);
    expect(r.path).toEqual(["A", "B", "C"]);
  });

  it("reports unreachable target", async () => {
    const r = await dijkstraPath({
      source: "A",
      target: "C",
      directed: true,
      edges: [
        ["A", "B", 1],
        ["C", "B", 1],
      ],
    }) as any;
    expect(r.reachable).toBe(false);
    expect(r.distance).toBeNull();
  });

  it("rejects negative weights", async () => {
    await expect(
      dijkstraPath({
        source: "A",
        target: "B",
        edges: [["A", "B", -1]],
      }),
    ).rejects.toThrow("Negative");
  });

  it("handles same source and target", async () => {
    const r = await dijkstraPath({
      source: "A",
      target: "A",
      edges: [["A", "B", 5]],
    }) as any;
    expect(r.distance).toBe(0);
    expect(r.path).toEqual(["A"]);
  });

  it("stamps meta", async () => {
    const r = await dijkstraPath({
      source: "A",
      target: "B",
      edges: [["A", "B", 1]],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
