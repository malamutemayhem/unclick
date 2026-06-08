import { describe, it, expect } from "vitest";
import { TaskQueue } from "../task-queue.js";

describe("TaskQueue", () => {
  it("runs tasks with concurrency limit", async () => {
    const q = new TaskQueue(2);
    const order: number[] = [];
    const task = (id: number, ms: number) => () =>
      new Promise<void>((r) => setTimeout(() => { order.push(id); r(); }, ms));

    q.add(task(1, 30));
    q.add(task(2, 10));
    q.add(task(3, 10));
    await q.onIdle();
    expect(order[0]).toBe(2);
    expect(q.completed).toBe(3);
  });

  it("returns task result", async () => {
    const q = new TaskQueue(1);
    const result = await q.add(() => Promise.resolve(42));
    expect(result).toBe(42);
  });

  it("tracks failed tasks", async () => {
    const q = new TaskQueue(1);
    await q.add(() => Promise.reject(new Error("x"))).catch(() => {});
    expect(q.failed).toBe(1);
  });

  it("respects priority", async () => {
    const q = new TaskQueue(1);
    const order: string[] = [];
    const blocker = q.add(() => new Promise((r) => setTimeout(r, 50)));
    q.add(() => { order.push("low"); return Promise.resolve(); }, 0);
    q.add(() => { order.push("high"); return Promise.resolve(); }, 10);
    await blocker;
    await q.onIdle();
    expect(order[0]).toBe("high");
  });

  it("pause and resume", async () => {
    const q = new TaskQueue(1);
    q.pause();
    let ran = false;
    q.add(() => { ran = true; return Promise.resolve(); });
    await new Promise((r) => setTimeout(r, 30));
    expect(ran).toBe(false);
    q.resume();
    await q.onIdle();
    expect(ran).toBe(true);
  });

  it("clear rejects pending tasks", async () => {
    const q = new TaskQueue(1);
    q.add(() => new Promise((r) => setTimeout(r, 100)));
    const p = q.add(() => Promise.resolve("x"));
    q.clear();
    await expect(p).rejects.toThrow("Queue cleared");
  });

  it("reports pending and active counts", async () => {
    const q = new TaskQueue(1);
    q.add(() => new Promise((r) => setTimeout(r, 100)));
    q.add(() => Promise.resolve());
    await new Promise((r) => setTimeout(r, 10));
    expect(q.active).toBe(1);
    expect(q.pending).toBe(1);
  });
});
