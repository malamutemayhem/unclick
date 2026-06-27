import { describe, it, expect } from "vitest";
import { AsyncSemaphore, AsyncMutex } from "../async-semaphore.js";

describe("AsyncSemaphore", () => {
  it("acquire and release", async () => {
    const sem = new AsyncSemaphore(2);
    await sem.acquire();
    expect(sem.available).toBe(1);
    sem.release();
    expect(sem.available).toBe(2);
  });

  it("blocks when no permits", async () => {
    const sem = new AsyncSemaphore(1);
    await sem.acquire();
    let resolved = false;
    const p = sem.acquire().then(() => { resolved = true; });
    await Promise.resolve();
    expect(resolved).toBe(false);
    sem.release();
    await p;
    expect(resolved).toBe(true);
  });

  it("waiting tracks queued acquires", async () => {
    const sem = new AsyncSemaphore(1);
    await sem.acquire();
    const p = sem.acquire();
    expect(sem.waiting).toBe(1);
    sem.release();
    await p;
    expect(sem.waiting).toBe(0);
  });

  it("tryAcquire returns true when available", () => {
    const sem = new AsyncSemaphore(1);
    expect(sem.tryAcquire()).toBe(true);
    expect(sem.available).toBe(0);
  });

  it("tryAcquire returns false when exhausted", async () => {
    const sem = new AsyncSemaphore(1);
    await sem.acquire();
    expect(sem.tryAcquire()).toBe(false);
    sem.release();
  });

  it("withPermit manages acquire/release", async () => {
    const sem = new AsyncSemaphore(1);
    const result = await sem.withPermit(async () => {
      expect(sem.available).toBe(0);
      return 42;
    });
    expect(result).toBe(42);
    expect(sem.available).toBe(1);
  });

  it("withPermit releases on error", async () => {
    const sem = new AsyncSemaphore(1);
    await expect(sem.withPermit(async () => {
      throw new Error("boom");
    })).rejects.toThrow("boom");
    expect(sem.available).toBe(1);
  });

  it("drain sets permits to zero", () => {
    const sem = new AsyncSemaphore(5);
    sem.drain();
    expect(sem.available).toBe(0);
  });

  it("throws for invalid permits", () => {
    expect(() => new AsyncSemaphore(0)).toThrow();
  });
});

describe("AsyncMutex", () => {
  it("lock and unlock", async () => {
    const mutex = new AsyncMutex();
    await mutex.lock();
    expect(mutex.isLocked).toBe(true);
    mutex.unlock();
    expect(mutex.isLocked).toBe(false);
  });

  it("withLock manages lock lifecycle", async () => {
    const mutex = new AsyncMutex();
    const result = await mutex.withLock(async () => {
      expect(mutex.isLocked).toBe(true);
      return "done";
    });
    expect(result).toBe("done");
    expect(mutex.isLocked).toBe(false);
  });

  it("ensures mutual exclusion", async () => {
    const mutex = new AsyncMutex();
    const order: number[] = [];
    await Promise.all([
      mutex.withLock(async () => { order.push(1); }),
      mutex.withLock(async () => { order.push(2); }),
    ]);
    expect(order).toEqual([1, 2]);
  });
});
