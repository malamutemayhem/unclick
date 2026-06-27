import { describe, it, expect } from "vitest";
import { Mutex, ReadWriteLock } from "../mutex.js";

describe("Mutex", () => {
  it("acquire and release work", async () => {
    const m = new Mutex();
    await m.acquire();
    expect(m.isLocked()).toBe(true);
    m.release();
    expect(m.isLocked()).toBe(false);
  });

  it("tryAcquire returns false when locked", async () => {
    const m = new Mutex();
    await m.acquire();
    expect(m.tryAcquire()).toBe(false);
    m.release();
    expect(m.tryAcquire()).toBe(true);
  });

  it("withLock provides exclusive access", async () => {
    const m = new Mutex();
    const result = await m.withLock(async () => 42);
    expect(result).toBe(42);
    expect(m.isLocked()).toBe(false);
  });

  it("queues waiters in order", async () => {
    const m = new Mutex();
    const order: number[] = [];
    await m.acquire();
    const p1 = m.acquire().then(() => { order.push(1); m.release(); });
    const p2 = m.acquire().then(() => { order.push(2); m.release(); });
    expect(m.queueLength()).toBe(2);
    m.release();
    await Promise.all([p1, p2]);
    expect(order).toEqual([1, 2]);
  });

  it("tracks owner", async () => {
    const m = new Mutex();
    await m.acquire("worker-1");
    expect(m.getOwner()).toBe("worker-1");
    m.release();
    expect(m.getOwner()).toBeNull();
  });
});

describe("ReadWriteLock", () => {
  it("allows multiple concurrent readers", async () => {
    const rw = new ReadWriteLock();
    await rw.acquireRead();
    await rw.acquireRead();
    expect(rw.readerCount()).toBe(2);
    rw.releaseRead();
    rw.releaseRead();
  });

  it("write lock is exclusive", async () => {
    const rw = new ReadWriteLock();
    await rw.acquireWrite();
    expect(rw.isWriteLocked()).toBe(true);
    rw.releaseWrite();
    expect(rw.isWriteLocked()).toBe(false);
  });

  it("readers wait for writer to finish", async () => {
    const rw = new ReadWriteLock();
    await rw.acquireWrite();
    let readDone = false;
    const p = rw.acquireRead().then(() => { readDone = true; rw.releaseRead(); });
    expect(readDone).toBe(false);
    rw.releaseWrite();
    await p;
    expect(readDone).toBe(true);
  });
});
