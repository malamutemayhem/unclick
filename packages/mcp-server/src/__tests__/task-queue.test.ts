import { describe, it, expect } from "vitest";
import { TaskQueue } from "../task-queue.js";

describe("task-queue", () => {
  it("runs tasks sequentially by default", async () => {
    const q = new TaskQueue();
    const log: number[] = [];
    await Promise.all([
      q.add(async () => { log.push(1); }),
      q.add(async () => { log.push(2); }),
      q.add(async () => { log.push(3); }),
    ]);
    expect(log).toEqual([1, 2, 3]);
  });

  it("respects concurrency limit", async () => {
    const q = new TaskQueue(2);
    let maxConcurrent = 0;
    let current = 0;
    const tasks = Array.from({ length: 5 }, () =>
      q.add(async () => {
        current++;
        maxConcurrent = Math.max(maxConcurrent, current);
        await new Promise((r) => setTimeout(r, 10));
        current--;
      })
    );
    await Promise.all(tasks);
    expect(maxConcurrent).toBe(2);
  });

  it("returns task result", async () => {
    const q = new TaskQueue();
    const result = await q.add(async () => 42);
    expect(result).toBe(42);
  });

  it("propagates task errors", async () => {
    const q = new TaskQueue();
    await expect(q.add(async () => { throw new Error("oops"); })).rejects.toThrow("oops");
  });

  it("pause and resume", async () => {
    const q = new TaskQueue();
    const log: string[] = [];
    q.pause();
    const p1 = q.add(async () => { log.push("a"); });
    expect(q.pending).toBe(1);
    q.resume();
    await p1;
    expect(log).toEqual(["a"]);
  });

  it("clear rejects pending tasks", async () => {
    const q = new TaskQueue(1);
    q.pause();
    const p = q.add(async () => "ok");
    q.clear();
    await expect(p).rejects.toThrow("cleared");
  });

  it("drain waits for completion", async () => {
    const q = new TaskQueue(2);
    const log: number[] = [];
    q.add(async () => { await new Promise((r) => setTimeout(r, 10)); log.push(1); });
    q.add(async () => { await new Promise((r) => setTimeout(r, 5)); log.push(2); });
    await q.drain();
    expect(log.length).toBe(2);
  });
});
