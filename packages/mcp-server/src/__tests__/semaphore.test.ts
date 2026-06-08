import { describe, it, expect } from "vitest";
import { Semaphore, Mutex, ReadWriteLock } from "../semaphore.js";

describe("Semaphore", () => {
  it("allows up to N concurrent", async () => {
    const sem = new Semaphore(2);
    let running = 0;
    let peak = 0;

    const task = async () => {
      await sem.acquire();
      running++;
      if (running > peak) peak = running;
      await new Promise((r) => setTimeout(r, 10));
      running--;
      sem.release();
    };

    await Promise.all([task(), task(), task(), task()]);
    expect(peak).toBeLessThanOrEqual(2);
  });

  it("withPermit auto-releases", async () => {
    const sem = new Semaphore(1);
    const result = await sem.withPermit(async () => 42);
    expect(result).toBe(42);
    expect(sem.available).toBe(1);
  });

  it("withPermit releases on error", async () => {
    const sem = new Semaphore(1);
    await expect(sem.withPermit(async () => { throw new Error("boom"); })).rejects.toThrow("boom");
    expect(sem.available).toBe(1);
  });

  it("tracks waiting count", async () => {
    const sem = new Semaphore(1);
    await sem.acquire();
    const p = sem.acquire();
    expect(sem.waitingCount).toBe(1);
    sem.release();
    await p;
    expect(sem.waitingCount).toBe(0);
  });
});

describe("Mutex", () => {
  it("serializes access", async () => {
    const mutex = new Mutex();
    const log: number[] = [];

    const task = async (id: number) => {
      await mutex.lock();
      log.push(id);
      await new Promise((r) => setTimeout(r, 5));
      mutex.unlock();
    };

    await Promise.all([task(1), task(2), task(3)]);
    expect(log.length).toBe(3);
  });

  it("withLock works", async () => {
    const mutex = new Mutex();
    const result = await mutex.withLock(async () => "done");
    expect(result).toBe("done");
  });
});

describe("ReadWriteLock", () => {
  it("allows concurrent reads", async () => {
    const rwl = new ReadWriteLock();
    let readers = 0;
    let peak = 0;

    const read = async () => {
      await rwl.readLock();
      readers++;
      if (readers > peak) peak = readers;
      await new Promise((r) => setTimeout(r, 10));
      readers--;
      rwl.readUnlock();
    };

    await Promise.all([read(), read(), read()]);
    expect(peak).toBe(3);
  });

  it("write excludes reads", async () => {
    const rwl = new ReadWriteLock();
    const log: string[] = [];

    await rwl.writeLock();
    log.push("write-start");

    const readPromise = rwl.readLock().then(() => {
      log.push("read-start");
      rwl.readUnlock();
    });

    await new Promise((r) => setTimeout(r, 10));
    log.push("write-end");
    rwl.writeUnlock();

    await readPromise;
    expect(log).toEqual(["write-start", "write-end", "read-start"]);
  });
});
