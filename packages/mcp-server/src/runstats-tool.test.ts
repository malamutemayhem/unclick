import { describe, it, expect } from "vitest";
import { runningStats } from "./runstats-tool.js";

describe("runningStats", () => {
  it("computes running mean with window 3", async () => {
    const r = await runningStats({ data: [1, 2, 3, 4, 5], window: 3 }) as any;
    expect(r.running_means).toEqual([2, 3, 4]);
    expect(r.output_length).toBe(3);
  });

  it("computes running min/max", async () => {
    const r = await runningStats({ data: [5, 1, 3, 2, 4], window: 3 }) as any;
    expect(r.running_mins).toEqual([1, 1, 2]);
    expect(r.running_maxs).toEqual([5, 3, 4]);
  });

  it("computes global stats", async () => {
    const r = await runningStats({ data: [2, 4, 6, 8, 10], window: 2 }) as any;
    expect(r.global_mean).toBe(6);
    expect(r.data_length).toBe(5);
  });

  it("window equals data length", async () => {
    const r = await runningStats({ data: [10, 20, 30], window: 3 }) as any;
    expect(r.output_length).toBe(1);
    expect(r.running_means[0]).toBe(20);
  });

  it("rejects empty data", async () => {
    await expect(runningStats({ data: [] })).rejects.toThrow("non-empty");
  });

  it("rejects window larger than data", async () => {
    await expect(runningStats({ data: [1, 2], window: 5 })).rejects.toThrow("window");
  });

  it("stamps meta", async () => {
    const r = await runningStats({ data: [1, 2, 3], window: 2 }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
