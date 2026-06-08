import { describe, it, expect } from "vitest";
import { asyncPool, asyncPoolSettled } from "../async-pool.js";

describe("asyncPool", () => {
  it("processes all items", async () => {
    const results = await asyncPool([1, 2, 3], 2, async (n) => n * 2);
    expect(results).toEqual([2, 4, 6]);
  });

  it("preserves order", async () => {
    const results = await asyncPool([3, 1, 2], 2, async (n) => {
      await new Promise((r) => setTimeout(r, n));
      return n;
    });
    expect(results).toEqual([3, 1, 2]);
  });

  it("respects concurrency limit", async () => {
    let running = 0;
    let maxRunning = 0;
    await asyncPool([1, 2, 3, 4], 2, async () => {
      running++;
      maxRunning = Math.max(maxRunning, running);
      await new Promise((r) => setTimeout(r, 10));
      running--;
    });
    expect(maxRunning).toBeLessThanOrEqual(2);
  });

  it("handles empty array", async () => {
    const results = await asyncPool([], 5, async (n: number) => n);
    expect(results).toEqual([]);
  });

  it("propagates errors", async () => {
    await expect(
      asyncPool([1, 2, 3], 2, async (n) => {
        if (n === 2) throw new Error("boom");
        return n;
      }),
    ).rejects.toThrow("boom");
  });

  it("passes index to callback", async () => {
    const indices: number[] = [];
    await asyncPool(["a", "b", "c"], 3, async (_, idx) => { indices.push(idx); });
    expect(indices.sort()).toEqual([0, 1, 2]);
  });
});

describe("asyncPoolSettled", () => {
  it("collects fulfilled and rejected results", async () => {
    const results = await asyncPoolSettled([1, 2, 3], 2, async (n) => {
      if (n === 2) throw new Error("fail");
      return n;
    });
    expect(results[0]).toEqual({ status: "fulfilled", value: 1 });
    expect(results[1].status).toBe("rejected");
    expect(results[2]).toEqual({ status: "fulfilled", value: 3 });
  });

  it("never throws even if all fail", async () => {
    const results = await asyncPoolSettled([1, 2], 2, async () => {
      throw new Error("all bad");
    });
    expect(results.every((r) => r.status === "rejected")).toBe(true);
  });
});
