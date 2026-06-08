import { describe, it, expect } from "vitest";
import { TaskQueue } from "../task-queue.js";

describe("TaskQueue", () => {
  it("executes tasks", async () => {
    const q = new TaskQueue(1);
    const result = await q.add("a", async () => 42);
    expect(result).toBe(42);
  });

  it("respects concurrency", async () => {
    const q = new TaskQueue(1);
    let running = 0;
    let maxRunning = 0;
    const makeTask = () => q.add(Math.random().toString(), async () => {
      running++;
      maxRunning = Math.max(maxRunning, running);
      await new Promise((r) => setTimeout(r, 10));
      running--;
      return 1;
    });
    await Promise.all([makeTask(), makeTask(), makeTask()]);
    expect(maxRunning).toBe(1);
  });

  it("prioritizes high tasks", async () => {
    const q = new TaskQueue(1);
    const order: string[] = [];
    const block = q.add("block", async () => {
      await new Promise((r) => setTimeout(r, 20));
      order.push("block");
    });
    const low = q.add("low", async () => { order.push("low"); }, "low");
    const high = q.add("high", async () => { order.push("high"); }, "high");
    await Promise.all([block, low, high]);
    expect(order[1]).toBe("high");
    expect(order[2]).toBe("low");
  });

  it("tracks pending and active", async () => {
    const q = new TaskQueue(1);
    const p = q.add("a", () => new Promise((r) => setTimeout(() => r(1), 50)));
    q.add("b", async () => 2);
    expect(q.active).toBe(1);
    expect(q.pending).toBe(1);
    await p;
  });

  it("cancels tasks", async () => {
    const q = new TaskQueue(1);
    q.add("block", () => new Promise((r) => setTimeout(r, 100)));
    const p = q.add("cancel-me", async () => "done");
    expect(q.cancel("cancel-me")).toBe(true);
    await expect(p).rejects.toThrow("cancelled");
  });

  it("has checks for task", () => {
    const q = new TaskQueue(1);
    q.add("block", () => new Promise((r) => setTimeout(r, 100)));
    q.add("waiting", async () => 1);
    expect(q.has("waiting")).toBe(true);
    expect(q.has("missing")).toBe(false);
  });

  it("tracks completed and failed counts", async () => {
    const q = new TaskQueue(2);
    await q.add("ok", async () => 1);
    try { await q.add("bad", async () => { throw new Error("fail"); }); } catch {}
    expect(q.completedCount).toBe(1);
    expect(q.failedCount).toBe(1);
  });

  it("clear rejects all pending", async () => {
    const q = new TaskQueue(1);
    q.add("block", () => new Promise((r) => setTimeout(r, 100)));
    const p = q.add("pending", async () => 1);
    q.clear();
    await expect(p).rejects.toThrow("cleared");
  });
});
