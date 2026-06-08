import { describe, it, expect } from "vitest";
import { PromisePool, mapPool } from "../promise-pool.js";

describe("PromisePool", () => {
  it("runs all tasks", async () => {
    const pool = new PromisePool(2);
    const results = await pool.run([
      async () => 1,
      async () => 2,
      async () => 3,
    ]);
    expect(results).toEqual([1, 2, 3]);
  });

  it("limits concurrency", async () => {
    const pool = new PromisePool(2);
    let running = 0;
    let maxRunning = 0;
    const task = async () => {
      running++;
      if (running > maxRunning) maxRunning = running;
      await new Promise((r) => setTimeout(r, 10));
      running--;
      return running;
    };
    await pool.run([task, task, task, task]);
    expect(maxRunning).toBeLessThanOrEqual(2);
  });

  it("preserves order", async () => {
    const pool = new PromisePool(3);
    const results = await pool.run([
      async () => { await new Promise((r) => setTimeout(r, 30)); return "a"; },
      async () => { await new Promise((r) => setTimeout(r, 10)); return "b"; },
      async () => "c",
    ]);
    expect(results).toEqual(["a", "b", "c"]);
  });

  it("settled captures errors", async () => {
    const pool = new PromisePool(2);
    const results = await pool.settled([
      async () => 1,
      async () => { throw new Error("fail"); },
      async () => 3,
    ]);
    expect(results[0]).toEqual({ status: "fulfilled", value: 1 });
    expect(results[1].status).toBe("rejected");
    expect(results[2]).toEqual({ status: "fulfilled", value: 3 });
  });

  it("handles empty task list", async () => {
    const pool = new PromisePool(2);
    const results = await pool.run([]);
    expect(results).toEqual([]);
  });
});

describe("mapPool", () => {
  it("maps items with concurrency limit", async () => {
    const results = await mapPool([1, 2, 3], async (n: number) => n * 2, 2);
    expect(results).toEqual([2, 4, 6]);
  });
});
