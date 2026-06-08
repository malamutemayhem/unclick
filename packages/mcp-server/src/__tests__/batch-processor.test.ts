import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BatchProcessor } from "../batch-processor.js";

describe("BatchProcessor", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("batches items and returns results", async () => {
    const bp = new BatchProcessor<number, number>({
      maxBatchSize: 3,
      maxWaitMs: 100,
      executor: async (items) => items.map((n) => n * 2),
    });

    const p1 = bp.add(1);
    const p2 = bp.add(2);
    const p3 = bp.add(3);

    const results = await Promise.all([p1, p2, p3]);
    expect(results).toEqual([2, 4, 6]);
  });

  it("flushes on timer when under batch size", async () => {
    const bp = new BatchProcessor<string, string>({
      maxBatchSize: 10,
      maxWaitMs: 50,
      executor: async (items) => items.map((s) => s.toUpperCase()),
    });

    const p = bp.add("hello");
    vi.advanceTimersByTime(50);
    expect(await p).toBe("HELLO");
  });

  it("rejects all items on executor failure", async () => {
    const bp = new BatchProcessor<number, number>({
      maxBatchSize: 2,
      maxWaitMs: 100,
      executor: async () => { throw new Error("batch fail"); },
    });

    const p1 = bp.add(1);
    const p2 = bp.add(2);

    await expect(p1).rejects.toThrow("batch fail");
    await expect(p2).rejects.toThrow("batch fail");
  });

  it("tracks pending count", () => {
    const bp = new BatchProcessor<number, number>({
      maxBatchSize: 10,
      maxWaitMs: 1000,
      executor: async (items) => items,
    });

    bp.add(1);
    bp.add(2);
    expect(bp.pending).toBe(2);
  });

  it("dispose rejects pending items", async () => {
    const bp = new BatchProcessor<number, number>({
      maxBatchSize: 10,
      maxWaitMs: 1000,
      executor: async (items) => items,
    });

    const p = bp.add(1);
    bp.dispose();
    await expect(p).rejects.toThrow("disposed");
  });

  it("handles partial results from executor", async () => {
    const bp = new BatchProcessor<number, number>({
      maxBatchSize: 3,
      maxWaitMs: 100,
      executor: async () => [10],
    });

    const p1 = bp.add(1);
    const p2 = bp.add(2);
    const p3 = bp.add(3);

    expect(await p1).toBe(10);
    await expect(p2).rejects.toThrow("missing");
    await expect(p3).rejects.toThrow("missing");
  });
});
