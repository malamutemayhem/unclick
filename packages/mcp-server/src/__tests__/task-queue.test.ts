import { describe, it, expect } from "vitest";
import { TaskQueue } from "../task-queue.js";

describe("TaskQueue", () => {
  it("runs tasks with concurrency limit", async () => {
    const q = new TaskQueue(2);
    const order: number[] = [];
    const task = (id: number, ms: number) => () =>
      new Promise<number>((resolve) => setTimeout(() => { order.push(id); resolve(id); }, ms));

    const results = await Promise.all([
      q.add(task(1, 30)),
      q.add(task(2, 10)),
      q.add(task(3, 10)),
    ]);
    expect(results).toEqual([1, 2, 3]);
  });

  it("tracks completed and failed counts", async () => {
    const q = new TaskQueue(1);
    await q.add(() => Promise.resolve(1));
    try { await q.add(() => Promise.reject(new Error("fail"))); } catch {}
    expect(q.completed).toBe(1);
    expect(q.failed).toBe(1);
  });

  it("priority ordering", async () => {
    const q = new TaskQueue(1);
    const order: string[] = [];
    const blocker = q.add(() => new Promise((r) => setTimeout(r, 50)));
    q.add(() => { order.push("low"); return Promise.resolve(); }, 0);
    q.add(() => { order.push("high"); return Promise.resolve(); }, 10);
    await blocker;
    await new Promise((r) => setTimeout(r, 50));
    expect(order).toEqual(["high", "low"]);
  });

  it("pending and active", async () => {
    const q = new TaskQueue(1);
    let innerResolve: () => void;
    const p = q.add(() => new Promise<void>((r) => { innerResolve = r; }));
    q.add(() => Promise.resolve());
    expect(q.active).toBe(1);
    expect(q.pending).toBe(1);
    innerResolve!();
    await p;
  });
});
