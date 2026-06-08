import { describe, it, expect } from "vitest";
import { TaskQueue } from "../task-queue.js";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("TaskQueue", () => {
  it("runs tasks sequentially with concurrency 1", async () => {
    const queue = new TaskQueue({ concurrency: 1 });
    const order: number[] = [];
    await queue.addAll([
      async () => { order.push(1); },
      async () => { order.push(2); },
      async () => { order.push(3); },
    ]);
    expect(order).toEqual([1, 2, 3]);
  });

  it("returns task results", async () => {
    const queue = new TaskQueue({ concurrency: 2 });
    const results = await queue.addAll([
      async () => "a",
      async () => "b",
    ]);
    expect(results).toEqual(["a", "b"]);
  });

  it("respects concurrency limit", async () => {
    const queue = new TaskQueue({ concurrency: 2 });
    let maxConcurrent = 0;
    let current = 0;

    const tasks = Array.from({ length: 5 }, () => async () => {
      current++;
      if (current > maxConcurrent) maxConcurrent = current;
      await delay(10);
      current--;
    });

    await queue.addAll(tasks);
    expect(maxConcurrent).toBeLessThanOrEqual(2);
  });

  it("tracks pending and active counts", async () => {
    const queue = new TaskQueue({ concurrency: 1 });
    const p1 = queue.add(async () => { await delay(50); return 1; });
    queue.add(async () => 2);
    expect(queue.active).toBe(1);
    expect(queue.pending).toBe(1);
    await p1;
  });

  it("propagates errors", async () => {
    const queue = new TaskQueue({ concurrency: 1 });
    await expect(queue.add(async () => { throw new Error("boom"); })).rejects.toThrow("boom");
  });

  it("continues after error", async () => {
    const queue = new TaskQueue({ concurrency: 1 });
    const p1 = queue.add(async () => { throw new Error("fail"); }).catch(() => "caught");
    const p2 = queue.add(async () => "ok");
    expect(await p1).toBe("caught");
    expect(await p2).toBe("ok");
  });

  it("clears pending tasks", async () => {
    const queue = new TaskQueue({ concurrency: 1 });
    queue.add(async () => { await delay(100); });
    const p2 = queue.add(async () => "should not run");
    queue.clear();
    await expect(p2).rejects.toThrow("Queue cleared");
  });

  it("times out slow tasks", async () => {
    const queue = new TaskQueue({ concurrency: 1, timeout: 20 });
    await expect(
      queue.add(async () => { await delay(200); })
    ).rejects.toThrow("Task timed out");
  });
});
