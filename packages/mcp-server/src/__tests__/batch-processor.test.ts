import { describe, it, expect } from "vitest";
import { processBatch, chunk, processChunked } from "../batch-processor.js";

describe("processBatch", () => {
  it("processes all items", async () => {
    const results = await processBatch([1, 2, 3], async (n) => n * 2, 2);
    expect(results.length).toBe(3);
    expect(results.every((r) => r.success)).toBe(true);
    const outputs = results.map((r) => r.output).sort();
    expect(outputs).toEqual([2, 4, 6]);
  });

  it("captures errors per item", async () => {
    const results = await processBatch([1, 2, 3], async (n) => {
      if (n === 2) throw new Error("bad");
      return n;
    }, 1);
    expect(results.filter((r) => r.success).length).toBe(2);
    expect(results.filter((r) => !r.success).length).toBe(1);
    expect(results.find((r) => !r.success)?.error?.message).toBe("bad");
  });

  it("handles empty input", async () => {
    const results = await processBatch([], async () => 1);
    expect(results).toEqual([]);
  });
});

describe("chunk", () => {
  it("splits array into chunks", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
  it("single chunk for small array", () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });
  it("empty array returns empty", () => {
    expect(chunk([], 3)).toEqual([]);
  });
});

describe("processChunked", () => {
  it("processes in chunks", async () => {
    const results = await processChunked(
      [1, 2, 3, 4],
      2,
      async (c) => c.map((n) => n * 10),
    );
    expect(results).toEqual([10, 20, 30, 40]);
  });
});
