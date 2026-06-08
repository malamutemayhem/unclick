import { describe, it, expect } from "vitest";
import { AsyncQueue } from "../async-queue.js";

describe("AsyncQueue", () => {
  it("processes tasks in order", async () => {
    const q = new AsyncQueue(1);
    const order: number[] = [];
    await Promise.all([
      q.add(async () => { order.push(1); }),
      q.add(async () => { order.push(2); }),
      q.add(async () => { order.push(3); }),
    ]);
    expect(order).toEqual([1, 2, 3]);
  });

  it("returns task results", async () => {
    const q = new AsyncQueue(2);
    const result = await q.add(async () => 42);
    expect(result).toBe(42);
  });

  it("limits concurrency", async () => {
    const q = new AsyncQueue(2);
    let active = 0;
    let maxActive = 0;
    const task = () => q.add(async () => {
      active++;
      if (active > maxActive) maxActive = active;
      await new Promise((r) => setTimeout(r, 20));
      active--;
    });
    await Promise.all([task(), task(), task(), task()]);
    expect(maxActive).toBeLessThanOrEqual(2);
  });

  it("pause and resume", async () => {
    const q = new AsyncQueue(1);
    q.pause();
    let ran = false;
    const p = q.add(async () => { ran = true; });
    await new Promise((r) => setTimeout(r, 50));
    expect(ran).toBe(false);
    expect(q.isPaused).toBe(true);
    q.resume();
    await p;
    expect(ran).toBe(true);
  });

  it("tracks pending and active", async () => {
    const q = new AsyncQueue(1);
    q.pause();
    q.add(async () => {});
    q.add(async () => {});
    expect(q.size).toBe(2);
    q.resume();
  });

  it("propagates errors", async () => {
    const q = new AsyncQueue(1);
    await expect(q.add(async () => { throw new Error("fail"); })).rejects.toThrow("fail");
  });
});
