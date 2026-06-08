import { describe, it, expect } from "vitest";
import { Semaphore, Mutex } from "../semaphore.js";

describe("Semaphore", () => {
  it("allows up to maxConcurrency", async () => {
    const sem = new Semaphore(2);
    await sem.acquire();
    await sem.acquire();
    expect(sem.available).toBe(0);
    expect(sem.waitingCount).toBe(0);
  });

  it("queues beyond capacity", async () => {
    const sem = new Semaphore(1);
    await sem.acquire();
    let resolved = false;
    const p = sem.acquire().then(() => { resolved = true; });
    expect(resolved).toBe(false);
    expect(sem.waitingCount).toBe(1);
    sem.release();
    await p;
    expect(resolved).toBe(true);
  });

  it("run acquires and releases automatically", async () => {
    const sem = new Semaphore(1);
    const result = await sem.run(async () => {
      expect(sem.available).toBe(0);
      return 42;
    });
    expect(result).toBe(42);
    expect(sem.available).toBe(1);
  });

  it("run releases on error", async () => {
    const sem = new Semaphore(1);
    await expect(sem.run(async () => { throw new Error("boom"); })).rejects.toThrow("boom");
    expect(sem.available).toBe(1);
  });

  it("limits concurrency in practice", async () => {
    const sem = new Semaphore(2);
    let concurrent = 0;
    let maxConcurrent = 0;
    const task = async () => {
      await sem.acquire();
      concurrent++;
      if (concurrent > maxConcurrent) maxConcurrent = concurrent;
      await new Promise((r) => setTimeout(r, 10));
      concurrent--;
      sem.release();
    };
    await Promise.all([task(), task(), task(), task()]);
    expect(maxConcurrent).toBeLessThanOrEqual(2);
  });
});

describe("Mutex", () => {
  it("starts unlocked", () => {
    const m = new Mutex();
    expect(m.isLocked).toBe(false);
  });

  it("locks on acquire", async () => {
    const m = new Mutex();
    await m.acquire();
    expect(m.isLocked).toBe(true);
  });

  it("serializes access", async () => {
    const m = new Mutex();
    const order: number[] = [];
    const task = async (id: number) => {
      await m.acquire();
      order.push(id);
      await new Promise((r) => setTimeout(r, 5));
      m.release();
    };
    await Promise.all([task(1), task(2), task(3)]);
    expect(order).toEqual([1, 2, 3]);
  });

  it("run acquires and releases", async () => {
    const m = new Mutex();
    const result = await m.run(async () => {
      expect(m.isLocked).toBe(true);
      return "done";
    });
    expect(result).toBe("done");
    expect(m.isLocked).toBe(false);
  });
});
