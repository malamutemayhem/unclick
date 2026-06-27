import { describe, it, expect } from "vitest";
import { AsyncSemaphore, AsyncMutex, AsyncBarrier } from "../semaphore-async.js";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("AsyncSemaphore", () => {
  it("allows up to max concurrent access", async () => {
    const sem = new AsyncSemaphore(2);
    let current = 0;
    let maxConcurrent = 0;
    const tasks = Array.from({ length: 5 }, () =>
      sem.withPermit(async () => {
        current++;
        if (current > maxConcurrent) maxConcurrent = current;
        await delay(10);
        current--;
      })
    );
    await Promise.all(tasks);
    expect(maxConcurrent).toBeLessThanOrEqual(2);
  });

  it("tryAcquire returns false when exhausted", () => {
    const sem = new AsyncSemaphore(1);
    expect(sem.tryAcquire()).toBe(true);
    expect(sem.tryAcquire()).toBe(false);
    expect(sem.available).toBe(0);
  });

  it("release restores permits", () => {
    const sem = new AsyncSemaphore(2);
    sem.tryAcquire();
    expect(sem.available).toBe(1);
    sem.release();
    expect(sem.available).toBe(2);
  });

  it("tracks acquire and release counts", async () => {
    const sem = new AsyncSemaphore(3);
    await sem.acquire();
    await sem.acquire();
    sem.release();
    sem.release();
    expect(sem.totalAcquires).toBe(2);
    expect(sem.totalReleases).toBe(2);
  });

  it("weighted acquire works", async () => {
    const sem = new AsyncSemaphore(3);
    await sem.acquire(2);
    expect(sem.available).toBe(1);
    expect(sem.tryAcquire(2)).toBe(false);
    sem.release(2);
    expect(sem.available).toBe(3);
  });

  it("rejects weight exceeding max", async () => {
    const sem = new AsyncSemaphore(2);
    await expect(sem.acquire(5)).rejects.toThrow("exceeds max permits");
  });

  it("drain zeros permits", () => {
    const sem = new AsyncSemaphore(5);
    sem.drain();
    expect(sem.available).toBe(0);
  });
});

describe("AsyncMutex", () => {
  it("provides mutual exclusion", async () => {
    const mutex = new AsyncMutex();
    const results: string[] = [];
    const t1 = mutex.withLock(async () => {
      await delay(10);
      results.push("first");
    });
    const t2 = mutex.withLock(async () => {
      results.push("second");
    });
    await Promise.all([t1, t2]);
    expect(results).toEqual(["first", "second"]);
  });

  it("tryLock returns false when locked", () => {
    const mutex = new AsyncMutex();
    expect(mutex.tryLock()).toBe(true);
    expect(mutex.isLocked).toBe(true);
    expect(mutex.tryLock()).toBe(false);
    mutex.unlock();
    expect(mutex.isLocked).toBe(false);
  });
});

describe("AsyncBarrier", () => {
  it("waits for all parties", async () => {
    const barrier = new AsyncBarrier(3);
    const arrived: number[] = [];
    const tasks = [0, 1, 2].map(async (id) => {
      await delay(id * 5);
      arrived.push(id);
      await barrier.wait();
    });
    await Promise.all(tasks);
    expect(arrived.length).toBe(3);
    expect(barrier.currentGeneration).toBe(1);
  });

  it("tracks waiting count", async () => {
    const barrier = new AsyncBarrier(2);
    expect(barrier.waiting).toBe(0);
    const p = barrier.wait();
    expect(barrier.waiting).toBe(1);
    const p2 = barrier.wait();
    await Promise.all([p, p2]);
    expect(barrier.waiting).toBe(0);
  });
});
