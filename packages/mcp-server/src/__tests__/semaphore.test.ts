import { describe, it, expect } from "vitest";
import { Semaphore, Mutex } from "../semaphore.js";

describe("Semaphore", () => {
  it("allows up to N concurrent acquires", async () => {
    const sem = new Semaphore(2);
    expect(sem.available).toBe(2);
    await sem.acquire();
    expect(sem.available).toBe(1);
    await sem.acquire();
    expect(sem.available).toBe(0);
  });

  it("queues when no permits available", async () => {
    const sem = new Semaphore(1);
    await sem.acquire();
    let acquired = false;
    const p = sem.acquire().then(() => { acquired = true; });
    expect(acquired).toBe(false);
    expect(sem.waiting).toBe(1);
    sem.release();
    await p;
    expect(acquired).toBe(true);
  });

  it("withPermit acquires and releases", async () => {
    const sem = new Semaphore(1);
    const result = await sem.withPermit(async () => {
      expect(sem.available).toBe(0);
      return 42;
    });
    expect(result).toBe(42);
    expect(sem.available).toBe(1);
  });

  it("withPermit releases on error", async () => {
    const sem = new Semaphore(1);
    await expect(sem.withPermit(async () => { throw new Error("fail"); })).rejects.toThrow("fail");
    expect(sem.available).toBe(1);
  });

  it("limits concurrency", async () => {
    const sem = new Semaphore(2);
    let running = 0;
    let maxRunning = 0;
    const task = async () => {
      await sem.acquire();
      running++;
      if (running > maxRunning) maxRunning = running;
      await new Promise((r) => setTimeout(r, 10));
      running--;
      sem.release();
    };
    await Promise.all([task(), task(), task(), task()]);
    expect(maxRunning).toBeLessThanOrEqual(2);
  });
});

describe("Mutex", () => {
  it("locks and unlocks", async () => {
    const m = new Mutex();
    expect(m.isLocked).toBe(false);
    await m.lock();
    expect(m.isLocked).toBe(true);
    m.unlock();
    expect(m.isLocked).toBe(false);
  });

  it("withLock provides mutual exclusion", async () => {
    const m = new Mutex();
    const order: number[] = [];
    const task = async (id: number) => {
      await m.withLock(async () => {
        order.push(id);
        await new Promise((r) => setTimeout(r, 5));
      });
    };
    await Promise.all([task(1), task(2), task(3)]);
    expect(order).toHaveLength(3);
  });
});
