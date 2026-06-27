import { describe, it, expect } from "vitest";
import { Semaphore, Mutex, ReadWriteLock } from "../semaphore.js";

describe("Semaphore", () => {
  it("rejects permits < 1", () => {
    expect(() => new Semaphore(0)).toThrow();
  });

  it("acquire decrements permits", async () => {
    const s = new Semaphore(2);
    expect(s.available).toBe(2);
    await s.acquire();
    expect(s.available).toBe(1);
    await s.acquire();
    expect(s.available).toBe(0);
  });

  it("release increments permits", async () => {
    const s = new Semaphore(1);
    await s.acquire();
    s.release();
    expect(s.available).toBe(1);
  });

  it("queues when no permits available", async () => {
    const s = new Semaphore(1);
    await s.acquire();
    let resolved = false;
    const p = s.acquire().then(() => { resolved = true; });
    expect(s.waiting).toBe(1);
    s.release();
    await p;
    expect(resolved).toBe(true);
  });

  it("tryAcquire returns true when available", () => {
    const s = new Semaphore(1);
    expect(s.tryAcquire()).toBe(true);
    expect(s.tryAcquire()).toBe(false);
  });

  it("run acquires and releases automatically", async () => {
    const s = new Semaphore(1);
    const result = await s.run(async () => {
      expect(s.available).toBe(0);
      return 42;
    });
    expect(result).toBe(42);
    expect(s.available).toBe(1);
  });

  it("run releases on error", async () => {
    const s = new Semaphore(1);
    await expect(s.run(async () => { throw new Error("fail"); })).rejects.toThrow("fail");
    expect(s.available).toBe(1);
  });
});

describe("Mutex", () => {
  it("starts unlocked", () => {
    const m = new Mutex();
    expect(m.locked).toBe(false);
  });

  it("acquire locks", async () => {
    const m = new Mutex();
    await m.acquire();
    expect(m.locked).toBe(true);
  });

  it("release unlocks", async () => {
    const m = new Mutex();
    await m.acquire();
    m.release();
    expect(m.locked).toBe(false);
  });

  it("run provides mutual exclusion", async () => {
    const m = new Mutex();
    const order: number[] = [];
    await Promise.all([
      m.run(async () => { order.push(1); }),
      m.run(async () => { order.push(2); }),
    ]);
    expect(order).toHaveLength(2);
  });

  it("tryAcquire", () => {
    const m = new Mutex();
    expect(m.tryAcquire()).toBe(true);
    expect(m.locked).toBe(true);
    expect(m.tryAcquire()).toBe(false);
  });
});

describe("ReadWriteLock", () => {
  it("allows multiple concurrent reads", async () => {
    const rw = new ReadWriteLock();
    await rw.acquireRead();
    await rw.acquireRead();
    rw.releaseRead();
    rw.releaseRead();
  });

  it("write blocks reads", async () => {
    const rw = new ReadWriteLock();
    await rw.acquireWrite();
    let readAcquired = false;
    const readPromise = rw.acquireRead().then(() => { readAcquired = true; });
    await new Promise((r) => setTimeout(r, 10));
    expect(readAcquired).toBe(false);
    rw.releaseWrite();
    await readPromise;
    expect(readAcquired).toBe(true);
    rw.releaseRead();
  });

  it("read blocks writes", async () => {
    const rw = new ReadWriteLock();
    await rw.acquireRead();
    let writeAcquired = false;
    const writePromise = rw.acquireWrite().then(() => { writeAcquired = true; });
    await new Promise((r) => setTimeout(r, 10));
    expect(writeAcquired).toBe(false);
    rw.releaseRead();
    await writePromise;
    expect(writeAcquired).toBe(true);
    rw.releaseWrite();
  });
});
