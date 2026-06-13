import { describe, it, expect } from "vitest";
import { histogramCreate } from "./histogram-tool.js";

describe("histogram-tool", () => {
  it("creates histogram with bins", async () => {
    const r = await histogramCreate({ values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], bins: 5 }) as Record<string, unknown>;
    const buckets = r.buckets as Array<{ from: number; to: number; count: number }>;
    expect(buckets.length).toBe(5);
    expect(r.count).toBe(10);
    expect(r.min).toBe(1);
    expect(r.max).toBe(10);
    expect(r.unclick_meta).toBeDefined();
  });

  it("includes ASCII visualization", async () => {
    const r = await histogramCreate({ values: [1, 1, 2, 3, 3, 3], bins: 3 }) as Record<string, unknown>;
    expect(typeof r.ascii).toBe("string");
    expect((r.ascii as string)).toContain("#");
  });

  it("defaults to 10 bins", async () => {
    const r = await histogramCreate({ values: Array.from({ length: 100 }, (_, i) => i) }) as Record<string, unknown>;
    const buckets = r.buckets as Array<unknown>;
    expect(buckets.length).toBe(10);
  });

  it("rejects empty values", async () => {
    const r = await histogramCreate({}) as Record<string, unknown>;
    expect(r.error).toMatch(/values/i);
  });
});
