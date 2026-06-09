import { describe, it, expect } from "vitest";
import { mstFind } from "./mst-tool.js";

describe("mstFind", () => {
  it("finds MST of a simple graph", async () => {
    const r = await mstFind({
      edges: [
        { from: "A", to: "B", weight: 1 },
        { from: "B", to: "C", weight: 2 },
        { from: "A", to: "C", weight: 3 },
      ],
    }) as any;
    expect(r.mst_edges).toBe(2);
    expect(r.total_weight).toBe(3);
    expect(r.is_connected).toBe(true);
  });

  it("picks lighter edges", async () => {
    const r = await mstFind({
      edges: [
        { from: "A", to: "B", weight: 10 },
        { from: "A", to: "B", weight: 1 },
        { from: "B", to: "C", weight: 5 },
      ],
    }) as any;
    expect(r.total_weight).toBe(6);
  });

  it("handles disconnected graph", async () => {
    const r = await mstFind({
      edges: [
        { from: "A", to: "B", weight: 1 },
        { from: "C", to: "D", weight: 2 },
      ],
    }) as any;
    expect(r.is_connected).toBe(false);
    expect(r.mst_edges).toBe(2);
  });

  it("single edge", async () => {
    const r = await mstFind({
      edges: [{ from: "X", to: "Y", weight: 7 }],
    }) as any;
    expect(r.mst_edges).toBe(1);
    expect(r.total_weight).toBe(7);
  });

  it("rejects empty edges", async () => {
    await expect(mstFind({ edges: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await mstFind({
      edges: [{ from: "A", to: "B", weight: 1 }],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
