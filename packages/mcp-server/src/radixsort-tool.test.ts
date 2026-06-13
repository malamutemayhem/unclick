import { describe, it, expect } from "vitest";
import { radixSort } from "./radixsort-tool.js";

describe("radixSort", () => {
  it("sorts integers", async () => {
    const r = (await radixSort({ values: [170, 45, 75, 90, 802, 24, 2, 66] })) as any;
    expect(r.sorted).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
  });

  it("handles single element", async () => {
    const r = (await radixSort({ values: [42] })) as any;
    expect(r.sorted).toEqual([42]);
    expect(r.passes).toBe(2);
  });

  it("handles all zeros", async () => {
    const r = (await radixSort({ values: [0, 0, 0] })) as any;
    expect(r.sorted).toEqual([0, 0, 0]);
  });

  it("supports custom base", async () => {
    const r = (await radixSort({ values: [5, 3, 8, 1], base: 2 })) as any;
    expect(r.sorted).toEqual([1, 3, 5, 8]);
    expect(r.base).toBe(2);
  });

  it("rejects empty values", async () => {
    await expect(radixSort({ values: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await radixSort({ values: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
