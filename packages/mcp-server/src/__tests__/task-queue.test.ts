import { describe, it, expect } from "vitest";
import { TaskQueue } from "../task-queue.js";

describe("TaskQueue", () => {
  it("runs tasks sequentially with concurrency 1", async () => {
    const q = new TaskQueue(1);
    const order: number[] = [];
    await Promise.all([
      q.add(async () => { order.push(1); return 1; }),
      q.add(async () => { order.push(2); return 2; }),
      q.add(async () => { order.push(3); return 3; }),
    ]);
    expect(order).toEqual([1, 2, 3]);
  });

  it("runs tasks with higher concurrency", async () => {
    const q = new TaskQueue(3);
    const results = await Promise.all([
      q.add(async () => "a"),
      q.add(async () => "b"),
      q.add(async () => "c"),
    ]);
    expect(results.sort()).toEqual(["a", "b", "c"]);
  });

  it("tracks completed count", async () => {
    const q = new TaskQueue(2);
    await q.add(async () => 1);
    await q.add(async () => 2);
    expect(q.completed).toBe(2);
  });

  it("handles errors gracefully", async () => {
    const q = new TaskQueue(1);
    await expect(q.add(async () => { throw new Error("fail"); })).rejects.toThrow("fail");
    expect(q.completed).toBe(1);
    const results = q.getResults();
    expect(results[0].error).toContain("fail");
  });

  it("getResults includes durations", async () => {
    const q = new TaskQueue(1);
    await q.add(async () => 42);
    const results = q.getResults();
    expect(results[0].result).toBe(42);
    expect(results[0].duration).toBeGreaterThanOrEqual(0);
  });

  it("clear resets state", async () => {
    const q = new TaskQueue(1);
    await q.add(async () => 1);
    q.clear();
    expect(q.completed).toBe(0);
    expect(q.pending).toBe(0);
  });
});
