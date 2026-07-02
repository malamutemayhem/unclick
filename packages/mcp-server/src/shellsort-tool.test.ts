import { describe, it, expect } from "vitest";
import { shellSort } from "./shellsort-tool.js";

describe("shellSort", () => {
  it("sorts an array", async () => {
    const r = (await shellSort({ array: [5, 3, 8, 1, 9, 2] })) as any;
    expect(r.sorted).toEqual([1, 2, 3, 5, 8, 9]);
    expect(r.element_count).toBe(6);
  });

  it("returns gap sequence", async () => {
    const r = (await shellSort({ array: [10, 20, 30, 40, 50, 60, 70, 80] })) as any;
    expect(r.gap_sequence[0]).toBe(4);
    expect(r.gap_sequence).toContain(1);
  });

  it("tracks comparisons and swaps", async () => {
    const r = (await shellSort({ array: [3, 1, 2] })) as any;
    expect(r.sorted).toEqual([1, 2, 3]);
    expect(r.comparisons).toBeGreaterThan(0);
  });

  it("handles single element", async () => {
    const r = (await shellSort({ array: [42] })) as any;
    expect(r.sorted).toEqual([42]);
  });

  it("stamps meta", async () => {
    const r = (await shellSort({ array: [1, 2] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
