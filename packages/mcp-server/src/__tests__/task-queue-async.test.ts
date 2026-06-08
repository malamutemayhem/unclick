import { describe, it, expect } from "vitest";
import { TaskQueueAsync } from "../task-queue-async.js";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("TaskQueueAsync", () => {
  it("executes tasks sequentially with concurrency 1", async () => {
    const queue = new TaskQueueAsync(1);
    const order: number[] = [];
    const p1 = queue.add(async () => { await delay(10); order.push(1); return 1; });
    const p2 = queue.add(async () => { order.push(2); return 2; });
    await Promise.all([p1, p2]);
    expect(order).toEqual([1, 2]);
  });

  it("executes tasks concurrently", async () => {
    const queue = new TaskQueueAsync(3);
    let maxConcurrent = 0;
    let current = 0;
    const tasks = Array.from({ length: 6 }, (_, i) =>
      queue.add(async () => {
        current++;
        if (current > maxConcurrent) maxConcurrent = current;
        await delay(10);
        current--;
        return i;
      })
    );
    await Promise.all(tasks);
    expect(maxConcurrent).toBeLessThanOrEqual(3);
    expect(maxConcurrent).toBeGreaterThan(1);
  });

  it("respects priority ordering", async () => {
    const queue = new TaskQueueAsync(1);
    const order: string[] = [];
    const blocker = queue.add(async () => { await delay(20); order.push("blocker"); });
    const low = queue.add(async () => { order.push("low"); }, 1);
    const high = queue.add(async () => { order.push("high"); }, 10);
    await Promise.all([blocker, low, high]);
    expect(order).toEqual(["blocker", "high", "low"]);
  });

  it("tracks completed and failed counts", async () => {
    const queue = new TaskQueueAsync(2);
    await queue.add(async () => "ok");
    try { await queue.add(async () => { throw new Error("fail"); }); } catch {}
    expect(queue.completedCount).toBe(1);
    expect(queue.failedCount).toBe(1);
  });

  it("pause and resume", async () => {
    const queue = new TaskQueueAsync(1);
    await queue.add(async () => "first");
    queue.pause();
    expect(queue.isPaused).toBe(true);
    const results: string[] = [];
    const p = queue.add(async () => { results.push("after-resume"); return "done"; });
    await delay(20);
    expect(results).toEqual([]);
    queue.resume();
    await p;
    expect(results).toEqual(["after-resume"]);
  });

  it("clear rejects pending tasks", async () => {
    const queue = new TaskQueueAsync(1);
    const blocker = queue.add(async () => { await delay(50); });
    const pending = queue.add(async () => "never");
    const cleared = queue.clear();
    expect(cleared).toBe(1);
    await expect(pending).rejects.toThrow("Queue cleared");
    await blocker;
  });

  it("static map processes all items", async () => {
    const results = await TaskQueueAsync.map(
      [1, 2, 3, 4],
      async (n) => n * 10,
      2
    );
    expect(results).toEqual([10, 20, 30, 40]);
  });

  it("drain waits for completion", async () => {
    const queue = new TaskQueueAsync(2);
    const results: number[] = [];
    queue.add(async () => { await delay(10); results.push(1); });
    queue.add(async () => { await delay(5); results.push(2); });
    await queue.drain();
    expect(results.length).toBe(2);
  });
});
