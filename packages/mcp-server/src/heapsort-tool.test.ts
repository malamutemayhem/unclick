import { describe, it, expect } from "vitest";
import { heapSort } from "./heapsort-tool.js";

describe("heapSort", () => {
  it("sorts an array of numbers", async () => {
    const r = (await heapSort({ array: [5, 3, 8, 1, 9, 2] })) as any;
    expect(r.sorted).toEqual([1, 2, 3, 5, 8, 9]);
    expect(r.element_count).toBe(6);
  });

  it("tracks swap count", async () => {
    const r = (await heapSort({ array: [3, 1, 2] })) as any;
    expect(r.sorted).toEqual([1, 2, 3]);
    expect(r.swaps).toBeGreaterThan(0);
  });

  it("handles already sorted array", async () => {
    const r = (await heapSort({ array: [1, 2, 3, 4] })) as any;
    expect(r.sorted).toEqual([1, 2, 3, 4]);
  });

  it("handles single element", async () => {
    const r = (await heapSort({ array: [42] })) as any;
    expect(r.sorted).toEqual([42]);
    expect(r.min).toBe(42);
    expect(r.max).toBe(42);
  });

  it("stamps meta", async () => {
    const r = (await heapSort({ array: [1, 2] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
