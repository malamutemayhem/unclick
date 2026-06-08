import { describe, it, expect } from "vitest";
import { runWithConcurrency } from "../concurrency.js";

describe("runWithConcurrency", () => {
  it("runs all tasks and returns results", async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
    ];
    const result = await runWithConcurrency(tasks);
    expect(result.succeeded).toBe(3);
    expect(result.failed).toBe(0);
    expect(result.results.map((r) => r.ok ? r.value : null)).toEqual([1, 2, 3]);
  });

  it("respects concurrency limit", async () => {
    let peak = 0;
    let running = 0;

    const tasks = Array.from({ length: 10 }, () => async () => {
      running++;
      peak = Math.max(peak, running);
      await new Promise((r) => setTimeout(r, 10));
      running--;
      return running;
    });

    await runWithConcurrency(tasks, { limit: 3 });
    expect(peak).toBeLessThanOrEqual(3);
  });

  it("continues on error by default", async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.reject(new Error("fail")),
      () => Promise.resolve(3),
    ];
    const result = await runWithConcurrency(tasks);
    expect(result.succeeded).toBe(2);
    expect(result.failed).toBe(1);
    expect(result.results[0]).toEqual({ ok: true, value: 1 });
    expect(result.results[1].ok).toBe(false);
    expect(result.results[2]).toEqual({ ok: true, value: 3 });
  });

  it("stops on error when configured", async () => {
    let count = 0;
    const tasks = Array.from({ length: 10 }, (_, i) => async () => {
      count++;
      if (i === 1) throw new Error("stop here");
      await new Promise((r) => setTimeout(r, 5));
      return i;
    });

    const result = await runWithConcurrency(tasks, { limit: 1, onError: "stop" });
    expect(result.failed).toBeGreaterThanOrEqual(1);
    expect(count).toBeLessThan(10);
  });

  it("handles empty task list", async () => {
    const result = await runWithConcurrency([]);
    expect(result.succeeded).toBe(0);
    expect(result.failed).toBe(0);
    expect(result.results).toEqual([]);
  });
});
