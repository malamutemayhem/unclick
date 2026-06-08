import { describe, it, expect } from "vitest";
import { CommandQueue, LaneQueue } from "../command-queue.js";

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

describe("CommandQueue", () => {
  it("executes commands in order", async () => {
    const order: number[] = [];
    const queue = new CommandQueue({ concurrency: 1 });

    const p1 = queue.enqueue({ id: "1", execute: async () => { order.push(1); return 1; } });
    const p2 = queue.enqueue({ id: "2", execute: async () => { order.push(2); return 2; } });
    const p3 = queue.enqueue({ id: "3", execute: async () => { order.push(3); return 3; } });

    await Promise.all([p1, p2, p3]);
    expect(order).toEqual([1, 2, 3]);
  });

  it("runs up to concurrency limit in parallel", async () => {
    let maxConcurrent = 0;
    let current = 0;
    const queue = new CommandQueue({ concurrency: 2 });

    const makeCmd = (id: string) => ({
      id,
      execute: async () => {
        current++;
        maxConcurrent = Math.max(maxConcurrent, current);
        await delay(20);
        current--;
      },
    });

    await Promise.all([
      queue.enqueue(makeCmd("1")),
      queue.enqueue(makeCmd("2")),
      queue.enqueue(makeCmd("3")),
      queue.enqueue(makeCmd("4")),
    ]);

    expect(maxConcurrent).toBe(2);
  });

  it("deduplicates by key", async () => {
    let calls = 0;
    const queue = new CommandQueue({
      concurrency: 2,
      deduplicateKey: (cmd) => cmd.id,
    });

    const cmd = {
      id: "same",
      execute: async () => { calls++; await delay(30); return "result"; },
    };

    const [r1, r2] = await Promise.all([
      queue.enqueue(cmd),
      queue.enqueue({ ...cmd }),
    ]);

    expect(calls).toBe(1);
    expect(r1).toBe("result");
    expect(r2).toBe("result");
  });

  it("propagates errors", async () => {
    const queue = new CommandQueue();
    await expect(
      queue.enqueue({ id: "bad", execute: async () => { throw new Error("boom"); } }),
    ).rejects.toThrow("boom");
  });

  it("tracks size and running", async () => {
    const queue = new CommandQueue({ concurrency: 1 });
    let resolve1!: () => void;
    const p1 = new Promise<void>((r) => { resolve1 = r; });

    queue.enqueue({ id: "1", execute: () => p1 });
    queue.enqueue({ id: "2", execute: async () => {} });

    expect(queue.running).toBe(1);
    expect(queue.size).toBe(1);

    resolve1();
    await delay(10);
    expect(queue.size).toBe(0);
  });
});

describe("LaneQueue", () => {
  it("runs different lanes independently", async () => {
    const lane = new LaneQueue(1);
    const order: string[] = [];

    const pA = lane.enqueue("a", { id: "a1", execute: async () => { await delay(10); order.push("a1"); } });
    const pB = lane.enqueue("b", { id: "b1", execute: async () => { order.push("b1"); } });

    await Promise.all([pA, pB]);
    expect(order[0]).toBe("b1");
  });

  it("runs same lane commands in order", async () => {
    const lane = new LaneQueue(1);
    const order: number[] = [];

    const p1 = lane.enqueue("x", { id: "1", execute: async () => { order.push(1); } });
    const p2 = lane.enqueue("x", { id: "2", execute: async () => { order.push(2); } });

    await Promise.all([p1, p2]);
    expect(order).toEqual([1, 2]);
  });

  it("reports lane size", () => {
    const lane = new LaneQueue(1);
    expect(lane.getLaneSize("missing")).toBe(0);
  });
});
