import { describe, it, expect } from "vitest";
import { PromisePool } from "../promise-pool.js";

describe("PromisePool", () => {
  it("limits concurrency", async () => {
    const pool = new PromisePool(2);
    let maxConcurrent = 0;
    let current = 0;
    const tasks = Array.from({ length: 5 }, (_, i: number) =>
      pool.run(async () => {
        current++;
        maxConcurrent = Math.max(maxConcurrent, current);
        await new Promise((r) => setTimeout(r, 10));
        current--;
        return i;
      })
    );
    await Promise.all(tasks);
    expect(maxConcurrent).toBeLessThanOrEqual(2);
  });

  it("run returns the result", async () => {
    const pool = new PromisePool(2);
    const result = await pool.run(async () => 42);
    expect(result).toBe(42);
  });

  it("run propagates errors", async () => {
    const pool = new PromisePool(2);
    await expect(pool.run(async () => { throw new Error("fail"); })).rejects.toThrow("fail");
  });

  it("map processes all items", async () => {
    const pool = new PromisePool(2);
    const results = await pool.map([1, 2, 3], async (n: number) => n * 2);
    expect(results).toEqual([2, 4, 6]);
  });

  it("map preserves order", async () => {
    const pool = new PromisePool(1);
    const results = await pool.map([3, 1, 2], async (n: number) => {
      await new Promise((r) => setTimeout(r, n));
      return n;
    });
    expect(results).toEqual([3, 1, 2]);
  });

  it("settle reports fulfilled and rejected", async () => {
    const pool = new PromisePool(3);
    const results = await pool.settle([1, 2, 3], async (n: number) => {
      if (n === 2) throw new Error("bad");
      return n;
    });
    expect(results[0]).toEqual({ status: "fulfilled", value: 1 });
    expect(results[1].status).toBe("rejected");
    expect(results[2]).toEqual({ status: "fulfilled", value: 3 });
  });

  it("throws for concurrency < 1", () => {
    expect(() => new PromisePool(0)).toThrow();
  });

  it("tracks active and pending", async () => {
    const pool = new PromisePool(1);
    expect(pool.active).toBe(0);
    expect(pool.pending).toBe(0);
  });
});
