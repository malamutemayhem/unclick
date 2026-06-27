import { describe, it, expect } from "vitest";
import { Semaphore, Mutex, ReadWriteLock, Barrier } from "../semaphore-sim.js";

describe("Semaphore", () => {
  it("acquire succeeds when available", () => {
    const sem = new Semaphore(2);
    expect(sem.acquire("p1")).toBe(true);
    expect(sem.acquire("p2")).toBe(true);
    expect(sem.available).toBe(0);
  });

  it("acquire blocks when exhausted", () => {
    const sem = new Semaphore(1);
    sem.acquire("p1");
    expect(sem.acquire("p2")).toBe(false);
    expect(sem.waiting).toBe(1);
  });

  it("release wakes waiting process", () => {
    const sem = new Semaphore(1);
    sem.acquire("p1");
    sem.acquire("p2");
    const woken = sem.release();
    expect(woken).toBe("p2");
  });

  it("release increments count when no waiters", () => {
    const sem = new Semaphore(2);
    sem.acquire("p1");
    sem.release();
    expect(sem.available).toBe(2);
  });
});

describe("Mutex", () => {
  it("lock and unlock", () => {
    const m = new Mutex();
    expect(m.lock("p1")).toBe(true);
    expect(m.isLocked).toBe(true);
    expect(m.currentOwner).toBe("p1");
    m.unlock("p1");
    expect(m.isLocked).toBe(false);
  });

  it("second lock blocks", () => {
    const m = new Mutex();
    m.lock("p1");
    expect(m.lock("p2")).toBe(false);
    expect(m.waiting).toBe(1);
  });

  it("unlock passes to waiter", () => {
    const m = new Mutex();
    m.lock("p1");
    m.lock("p2");
    const next = m.unlock("p1");
    expect(next).toBe("p2");
    expect(m.currentOwner).toBe("p2");
  });

  it("tryLock returns false when locked", () => {
    const m = new Mutex();
    m.lock("p1");
    expect(m.tryLock("p2")).toBe(false);
    expect(m.waiting).toBe(0);
  });

  it("reentrant lock by same owner", () => {
    const m = new Mutex();
    m.lock("p1");
    expect(m.lock("p1")).toBe(true);
  });
});

describe("ReadWriteLock", () => {
  it("multiple readers allowed", () => {
    const rw = new ReadWriteLock();
    expect(rw.readLock("r1")).toBe(true);
    expect(rw.readLock("r2")).toBe(true);
    expect(rw.readerCount).toBe(2);
  });

  it("writer blocks readers", () => {
    const rw = new ReadWriteLock();
    rw.writeLock("w1");
    expect(rw.readLock("r1")).toBe(false);
    expect(rw.readWaiting).toBe(1);
  });

  it("readers block writer", () => {
    const rw = new ReadWriteLock();
    rw.readLock("r1");
    expect(rw.writeLock("w1")).toBe(false);
    expect(rw.writeWaiting).toBe(1);
  });

  it("writeUnlock promotes next writer", () => {
    const rw = new ReadWriteLock();
    rw.writeLock("w1");
    rw.writeLock("w2");
    rw.writeUnlock("w1");
    expect(rw.currentWriter).toBe("w2");
  });

  it("writeUnlock releases waiting readers when no writers", () => {
    const rw = new ReadWriteLock();
    rw.writeLock("w1");
    rw.readLock("r1");
    rw.readLock("r2");
    rw.writeUnlock("w1");
    expect(rw.readerCount).toBe(2);
    expect(rw.hasWriter).toBe(false);
  });
});

describe("Barrier", () => {
  it("releases when all arrive", () => {
    const b = new Barrier(3);
    expect(b.arrive("p1").released).toBe(false);
    expect(b.arrive("p2").released).toBe(false);
    const result = b.arrive("p3");
    expect(result.released).toBe(true);
    expect(result.waiters).toHaveLength(3);
  });

  it("generation increments on release", () => {
    const b = new Barrier(2);
    b.arrive("p1");
    const r = b.arrive("p2");
    expect(r.generation).toBe(1);
  });

  it("threshold and arrived", () => {
    const b = new Barrier(4);
    b.arrive("p1");
    expect(b.arrived).toBe(1);
    expect(b.threshold).toBe(4);
  });
});
