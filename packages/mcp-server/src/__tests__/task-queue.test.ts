import { describe, it, expect } from "vitest";
import { TaskQueue } from "../task-queue.js";

describe("TaskQueue", () => {
  it("executes tasks", async () => {
    const q = new TaskQueue(1);
    const result = await q.add(async () => 42);
    expect(result).toBe(42);
  });

  it("respects concurrency", async () => {
    const q = new TaskQueue(2);
    let maxConcurrent = 0;
    let current = 0;

    const tasks = Array.from({ length: 4 }, () =>
      q.add(async () => {
        current++;
        maxConcurrent = Math.max(maxConcurrent, current);
        await new Promise((r) => setTimeout(r, 50));
        current--;
      })
    );
    await Promise.all(tasks);
    expect(maxConcurrent).toBeLessThanOrEqual(2);
  });

  it("processes in priority order", async () => {
    const q = new TaskQueue(1);
    const order: number[] = [];

    const blocker = q.add(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const low = q.add(async () => { order.push(1); }, 1);
    const high = q.add(async () => { order.push(3); }, 3);
    const mid = q.add(async () => { order.push(2); }, 2);

    await Promise.all([blocker, low, high, mid]);
    expect(order).toEqual([3, 2, 1]);
  });

  it("tracks completed and failed counts", async () => {
    const q = new TaskQueue(1);
    await q.add(async () => "ok");
    try { await q.add(async () => { throw new Error("fail"); }); } catch {}
    expect(q.completedCount).toBe(1);
    expect(q.failedCount).toBe(1);
  });

  it("pause and resume", async () => {
    const q = new TaskQueue(1);
    q.pause();
    expect(q.isPaused).toBe(true);
    const results: number[] = [];
    const p = q.add(async () => { results.push(1); return 1; });
    expect(q.pendingCount).toBe(1);

    q.resume();
    await p;
    expect(results).toEqual([1]);
  });

  it("clear rejects pending", async () => {
    const q = new TaskQueue(1);
    q.pause();
    const p = q.add(async () => 1);
    q.clear();
    await expect(p).rejects.toThrow("Queue cleared");
  });

  it("size reflects pending", () => {
    const q = new TaskQueue(1);
    q.pause();
    q.add(async () => {});
    q.add(async () => {});
    expect(q.size).toBe(2);
    q.resume();
  });
});
