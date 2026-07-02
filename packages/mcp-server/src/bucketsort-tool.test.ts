import { describe, it, expect } from "vitest";
import { bucketSort } from "./bucketsort-tool.js";

describe("bucketSort", () => {
  it("sorts an array of numbers", async () => {
    const r = (await bucketSort({ array: [5, 3, 8, 1, 9, 2] })) as any;
    expect(r.sorted).toEqual([1, 2, 3, 5, 8, 9]);
    expect(r.element_count).toBe(6);
  });

  it("respects custom bucket_count", async () => {
    const r = (await bucketSort({ array: [10, 20, 30, 40], bucket_count: 2 })) as any;
    expect(r.sorted).toEqual([10, 20, 30, 40]);
    expect(r.bucket_count).toBe(2);
    expect(r.bucket_sizes.length).toBe(2);
  });

  it("handles duplicate values", async () => {
    const r = (await bucketSort({ array: [3, 3, 3, 3] })) as any;
    expect(r.sorted).toEqual([3, 3, 3, 3]);
    expect(r.min).toBe(3);
    expect(r.max).toBe(3);
  });

  it("handles single element", async () => {
    const r = (await bucketSort({ array: [42] })) as any;
    expect(r.sorted).toEqual([42]);
  });

  it("stamps meta", async () => {
    const r = (await bucketSort({ array: [1, 2] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
