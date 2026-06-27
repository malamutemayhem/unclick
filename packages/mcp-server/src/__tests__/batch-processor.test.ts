import { describe, it, expect, vi } from "vitest";
import { processBatch, processSequential, chunkArray } from "../batch-processor.js";

describe("batch-processor", () => {
  describe("processBatch", () => {
    it("processes all items", async () => {
      const result = await processBatch([1, 2, 3], async (x) => x * 2);
      expect(result.results).toHaveLength(3);
      expect(result.errors).toHaveLength(0);
      const values = result.results.map((r) => r.result).sort();
      expect(values).toEqual([2, 4, 6]);
    });

    it("captures errors without stopping", async () => {
      const result = await processBatch([1, 2, 3], async (x) => {
        if (x === 2) throw new Error("fail");
        return x * 10;
      });
      expect(result.results).toHaveLength(2);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].item).toBe(2);
    });

    it("respects concurrency limit", async () => {
      let active = 0;
      let maxActive = 0;
      const result = await processBatch([1, 2, 3, 4, 5], async (x) => {
        active++;
        maxActive = Math.max(maxActive, active);
        await new Promise((r) => setTimeout(r, 10));
        active--;
        return x;
      }, { concurrency: 2 });
      expect(maxActive).toBeLessThanOrEqual(2);
      expect(result.results).toHaveLength(5);
    });

    it("calls onProgress", async () => {
      const progress = vi.fn();
      await processBatch([1, 2, 3], async (x) => x, { onProgress: progress });
      expect(progress).toHaveBeenCalledTimes(3);
    });

    it("tracks totalTime", async () => {
      const result = await processBatch([1], async (x) => x);
      expect(result.totalTime).toBeGreaterThanOrEqual(0);
    });

    it("handles empty array", async () => {
      const result = await processBatch([], async (x) => x);
      expect(result.results).toHaveLength(0);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe("processSequential", () => {
    it("processes in order", async () => {
      const order: number[] = [];
      await processSequential([1, 2, 3], async (x) => { order.push(x); return x; });
      expect(order).toEqual([1, 2, 3]);
    });

    it("passes index to fn", async () => {
      const indices: number[] = [];
      await processSequential(["a", "b"], async (_x, i) => { indices.push(i); return _x; });
      expect(indices).toEqual([0, 1]);
    });

    it("captures errors", async () => {
      const result = await processSequential([1, 2], async (x) => {
        if (x === 1) throw new Error("nope");
        return x;
      });
      expect(result.errors).toHaveLength(1);
      expect(result.results).toHaveLength(1);
    });
  });

  describe("chunkArray", () => {
    it("chunks evenly", () => {
      expect(chunkArray([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
    });
    it("handles remainder", () => {
      expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });
    it("handles empty array", () => {
      expect(chunkArray([], 3)).toEqual([]);
    });
    it("single element chunks", () => {
      expect(chunkArray([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });
  });
});
