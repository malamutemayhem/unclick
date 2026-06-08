import { describe, it, expect } from "vitest";
import { PromisePool, pMap, pFilter } from "../promise-pool.js";

describe("PromisePool", () => {
  it("respects concurrency limit", async () => {
    const pool = new PromisePool(2);
    let peak = 0;
    let running = 0;

    const task = () => new Promise<void>((resolve) => {
      running++;
      if (running > peak) peak = running;
      setTimeout(() => { running--; resolve(); }, 10);
    });

    await Promise.all([pool.add(task), pool.add(task), pool.add(task), pool.add(task)]);
    expect(peak).toBeLessThanOrEqual(2);
  });

  it("map returns results in order", async () => {
    const pool = new PromisePool(2);
    const results = await pool.map([1, 2, 3], async (x) => x * 2);
    expect(results).toEqual([2, 4, 6]);
  });

  it("settle captures rejections", async () => {
    const pool = new PromisePool(2);
    const results = await pool.settle([1, 2, 3], async (x) => {
      if (x === 2) throw new Error("fail");
      return x;
    });
    expect(results[0].status).toBe("fulfilled");
    expect(results[1].status).toBe("rejected");
    expect(results[2].status).toBe("fulfilled");
  });

  it("tracks counts", async () => {
    const pool = new PromisePool(1);
    await pool.map([1, 2], async (x) => x);
    expect(pool.settledCount).toBe(2);
    expect(pool.errorCount).toBe(0);
  });

  it("tracks error count", async () => {
    const pool = new PromisePool(1);
    await pool.settle([1], async () => { throw new Error("oops"); });
    expect(pool.errorCount).toBe(1);
  });
});

describe("pMap", () => {
  it("maps with concurrency", async () => {
    const results = await pMap([10, 20, 30], async (x) => x + 1, 2);
    expect(results).toEqual([11, 21, 31]);
  });
});

describe("pFilter", () => {
  it("filters async", async () => {
    const results = await pFilter([1, 2, 3, 4], async (x) => x % 2 === 0, 2);
    expect(results).toEqual([2, 4]);
  });
});
