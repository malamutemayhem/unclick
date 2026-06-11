import { describe, it, expect } from "vitest";
import { descriptiveStats } from "./descriptive-tool.js";

describe("descriptiveStats", () => {
  it("computes mean and median", async () => {
    const r = await descriptiveStats({ data: [1, 2, 3, 4, 5] }) as any;
    expect(r.mean).toBe(3);
    expect(r.median).toBe(3);
    expect(r.n).toBe(5);
  });

  it("computes even-length median", async () => {
    const r = await descriptiveStats({ data: [1, 2, 3, 4] }) as any;
    expect(r.median).toBe(2.5);
  });

  it("computes range and sum", async () => {
    const r = await descriptiveStats({ data: [10, 20, 30] }) as any;
    expect(r.min).toBe(10);
    expect(r.max).toBe(30);
    expect(r.range).toBe(20);
    expect(r.sum).toBe(60);
  });

  it("computes std and variance", async () => {
    const r = await descriptiveStats({ data: [2, 4, 4, 4, 5, 5, 7, 9] }) as any;
    expect(r.mean).toBe(5);
    expect(r.variance).toBeCloseTo(4, 4);
    expect(r.std).toBeCloseTo(2, 4);
  });

  it("finds mode", async () => {
    const r = await descriptiveStats({ data: [1, 2, 2, 3, 3, 3] }) as any;
    expect(r.mode).toEqual([3]);
  });

  it("rejects empty data", async () => {
    await expect(descriptiveStats({ data: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await descriptiveStats({ data: [1, 2] }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
