import { describe, it, expect } from "vitest";
import { countingSort } from "./countingsort-tool.js";

describe("countingSort", () => {
  it("sorts integers", async () => {
    const r = (await countingSort({ values: [4, 2, 7, 1, 3] })) as any;
    expect(r.sorted).toEqual([1, 2, 3, 4, 7]);
    expect(r.input_length).toBe(5);
  });

  it("handles duplicates", async () => {
    const r = (await countingSort({ values: [3, 1, 3, 1, 2] })) as any;
    expect(r.sorted).toEqual([1, 1, 2, 3, 3]);
    expect(r.unique_values).toBe(3);
  });

  it("handles negative numbers", async () => {
    const r = (await countingSort({ values: [-3, 0, -1, 2] })) as any;
    expect(r.sorted).toEqual([-3, -1, 0, 2]);
    expect(r.min).toBe(-3);
    expect(r.max).toBe(2);
  });

  it("reports frequency", async () => {
    const r = (await countingSort({ values: [5, 5, 5, 3, 3] })) as any;
    const freq5 = r.frequency.find((f: any) => f.value === 5);
    expect(freq5.count).toBe(3);
  });

  it("rejects empty values", async () => {
    await expect(countingSort({ values: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await countingSort({ values: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
