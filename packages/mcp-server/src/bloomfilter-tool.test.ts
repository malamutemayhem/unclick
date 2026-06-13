import { describe, it, expect } from "vitest";
import { bloomFilter } from "./bloomfilter-tool.js";

describe("bloomFilter", () => {
  it("finds inserted items", async () => {
    const r = await bloomFilter({
      items: ["apple", "banana", "cherry"],
      query: ["apple", "banana", "cherry"],
    }) as any;
    expect(r.positives).toBe(3);
    expect(r.results.every((x: any) => x.probably_in_set)).toBe(true);
  });

  it("rejects items not inserted (low fp)", async () => {
    const r = await bloomFilter({
      items: ["apple", "banana", "cherry"],
      query: ["xyz123", "nothere999"],
      fp_rate: 0.001,
    }) as any;
    expect(r.negatives).toBeGreaterThanOrEqual(1);
  });

  it("returns filter parameters", async () => {
    const r = await bloomFilter({
      items: ["a", "b", "c"],
      query: ["a"],
    }) as any;
    expect(r.bit_array_size).toBeGreaterThan(0);
    expect(r.hash_functions).toBeGreaterThan(0);
    expect(r.items_inserted).toBe(3);
  });

  it("rejects empty items", async () => {
    await expect(bloomFilter({ items: [], query: ["a"] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await bloomFilter({
      items: ["a"],
      query: ["a"],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
