import { describe, it, expect } from "vitest";
import { AsyncQueue } from "../async-queue.js";

describe("AsyncQueue", () => {
  it("processes tasks in order", async () => {
    const q = new AsyncQueue(1);
    const results: number[] = [];
    q.push(async () => { results.push(1); });
    q.push(async () => { results.push(2); });
    q.push(async () => { results.push(3); });
    await q.drain();
    expect(results).toEqual([1, 2, 3]);
  });

  it("limits concurrency", async () => {
    const q = new AsyncQueue(2);
    let running = 0;
    let maxRunning = 0;
    const task = async () => {
      running++;
      if (running > maxRunning) maxRunning = running;
      await new Promise((r) => setTimeout(r, 10));
      running--;
    };
    q.push(task);
    q.push(task);
    q.push(task);
    q.push(task);
    await q.drain();
    expect(maxRunning).toBeLessThanOrEqual(2);
  });

  it("returns task result", async () => {
    const q = new AsyncQueue(1);
    const result = await q.push(async () => 42);
    expect(result).toBe(42);
  });

  it("propagates errors", async () => {
    const q = new AsyncQueue(1);
    await expect(q.push(async () => { throw new Error("fail"); })).rejects.toThrow("fail");
  });

  it("pause and resume", async () => {
    const q = new AsyncQueue(1);
    q.pause();
    const results: number[] = [];
    q.push(async () => { results.push(1); });
    await new Promise((r) => setTimeout(r, 20));
    expect(results).toEqual([]);
    expect(q.isPaused).toBe(true);
    q.resume();
    await q.drain();
    expect(results).toEqual([1]);
  });

  it("tracks pending and active", async () => {
    const q = new AsyncQueue(1);
    q.pause();
    q.push(async () => {});
    q.push(async () => {});
    expect(q.pending).toBe(2);
    q.resume();
    await q.drain();
    expect(q.pending).toBe(0);
    expect(q.active).toBe(0);
  });

  it("drain resolves immediately when empty", async () => {
    const q = new AsyncQueue(1);
    await q.drain();
  });
});
