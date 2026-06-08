import { describe, it, expect } from "vitest";
import { promisePool, promisePoolSettled } from "../promise-pool.js";

describe("promise-pool", () => {
  it("processes all items", async () => {
    const { results, errors } = await promisePool(
      [1, 2, 3],
      2,
      async (n) => n * 2
    );
    expect(results).toEqual([2, 4, 6]);
    expect(errors).toEqual([]);
  });

  it("respects concurrency", async () => {
    let maxConcurrent = 0;
    let current = 0;
    await promisePool([1, 2, 3, 4, 5], 2, async () => {
      current++;
      maxConcurrent = Math.max(maxConcurrent, current);
      await new Promise((r) => setTimeout(r, 10));
      current--;
    });
    expect(maxConcurrent).toBe(2);
  });

  it("collects errors without stopping", async () => {
    const { results, errors } = await promisePool(
      [1, 2, 3],
      2,
      async (n) => {
        if (n === 2) throw new Error("fail");
        return n;
      }
    );
    expect(results[0]).toBe(1);
    expect(results[2]).toBe(3);
    expect(errors.length).toBe(1);
    expect(errors[0].index).toBe(1);
  });

  it("handles empty input", async () => {
    const { results } = await promisePool([], 5, async (n: number) => n);
    expect(results).toEqual([]);
  });

  it("promisePoolSettled returns settled results", async () => {
    const results = await promisePoolSettled(
      [1, 2],
      2,
      async (n) => {
        if (n === 2) throw new Error("boom");
        return n * 10;
      }
    );
    expect(results[0]).toEqual({ status: "fulfilled", value: 10 });
    expect(results[1].status).toBe("rejected");
  });
});
