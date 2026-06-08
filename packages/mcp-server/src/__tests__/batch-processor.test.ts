import { describe, it, expect } from "vitest";
import { processBatch, processBatchSequential, chunk, mapConcurrent } from "../batch-processor.js";

describe("chunk", () => {
  it("splits array into chunks", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("handles empty array", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it("single chunk for small arrays", () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });
});

describe("processBatch", () => {
  it("processes all items in batches", async () => {
    const results = await processBatch(
      [1, 2, 3, 4],
      async (n) => n * 2,
      { batchSize: 2 }
    );
    expect(results).toEqual([2, 4, 6, 8]);
  });

  it("calls onBatch callback", async () => {
    const batches: number[] = [];
    await processBatch(
      [1, 2, 3],
      async (n) => n,
      { batchSize: 2, onBatch: (_b, i) => batches.push(i) }
    );
    expect(batches).toEqual([0, 1]);
  });
});

describe("processBatchSequential", () => {
  it("processes items one at a time within batches", async () => {
    const order: number[] = [];
    await processBatchSequential(
      [1, 2, 3],
      async (n) => { order.push(n); return n; },
      { batchSize: 2 }
    );
    expect(order).toEqual([1, 2, 3]);
  });
});

describe("mapConcurrent", () => {
  it("limits concurrency", async () => {
    let active = 0;
    let maxActive = 0;
    const results = await mapConcurrent(
      [1, 2, 3, 4, 5],
      async (n) => {
        active++;
        if (active > maxActive) maxActive = active;
        await new Promise((r) => setTimeout(r, 10));
        active--;
        return n * 2;
      },
      2
    );
    expect(results).toEqual([2, 4, 6, 8, 10]);
    expect(maxActive).toBeLessThanOrEqual(2);
  });
});
