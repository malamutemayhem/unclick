import { describe, it, expect } from "vitest";
import { reservoirSample } from "./reservoir-tool.js";

describe("reservoirSample", () => {
  it("samples k items from array", async () => {
    const r = await reservoirSample({
      items: [1,2,3,4,5,6,7,8,9,10],
      k: 3,
    }) as any;
    expect(r.sample_size).toBe(3);
    expect(r.sample).toHaveLength(3);
    expect(r.total_items).toBe(10);
  });

  it("samples single item by default", async () => {
    const r = await reservoirSample({
      items: ["a", "b", "c"],
    }) as any;
    expect(r.sample_size).toBe(1);
    expect(r.sample).toHaveLength(1);
  });

  it("returns deterministic results with seed", async () => {
    const r1 = await reservoirSample({ items: [1,2,3,4,5], k: 2, seed: 42 }) as any;
    const r2 = await reservoirSample({ items: [1,2,3,4,5], k: 2, seed: 42 }) as any;
    expect(r1.sample).toEqual(r2.sample);
  });

  it("rejects k > items.length", async () => {
    await expect(reservoirSample({ items: [1,2], k: 5 })).rejects.toThrow("exceed");
  });

  it("rejects empty items", async () => {
    await expect(reservoirSample({ items: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await reservoirSample({ items: [1,2,3], k: 1 }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
