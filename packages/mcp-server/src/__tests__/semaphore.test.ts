import { describe, it, expect } from "vitest";
import { Semaphore, Mutex } from "../semaphore.js";

describe("Semaphore", () => {
  it("allows up to max permits", async () => {
    const sem = new Semaphore(2);
    await sem.acquire();
    await sem.acquire();
    expect(sem.available).toBe(0);
  });

  it("blocks when no permits available", async () => {
    const sem = new Semaphore(1);
    await sem.acquire();
    let resolved = false;
    const p = sem.acquire().then(() => { resolved = true; });
    await new Promise((r) => setTimeout(r, 10));
    expect(resolved).toBe(false);
    sem.release();
    await p;
    expect(resolved).toBe(true);
  });

  it("tryAcquire returns boolean", () => {
    const sem = new Semaphore(1);
    expect(sem.tryAcquire()).toBe(true);
    expect(sem.tryAcquire()).toBe(false);
  });

  it("reports available and waiting", async () => {
    const sem = new Semaphore(2);
    expect(sem.available).toBe(2);
    expect(sem.waiting).toBe(0);
    await sem.acquire();
    await sem.acquire();
    const p = sem.acquire();
    expect(sem.waiting).toBe(1);
    sem.release();
    await p;
  });

  it("withPermit auto-releases", async () => {
    const sem = new Semaphore(1);
    const result = await sem.withPermit(async () => 42);
    expect(result).toBe(42);
    expect(sem.available).toBe(1);
  });

  it("withPermit releases on error", async () => {
    const sem = new Semaphore(1);
    await expect(sem.withPermit(async () => { throw new Error("fail"); })).rejects.toThrow("fail");
    expect(sem.available).toBe(1);
  });

  it("max returns max permits", () => {
    expect(new Semaphore(5).max).toBe(5);
  });

  it("throws for invalid max", () => {
    expect(() => new Semaphore(0)).toThrow();
  });
});

describe("Mutex", () => {
  it("allows one at a time", async () => {
    const mutex = new Mutex();
    expect(mutex.max).toBe(1);
    await mutex.acquire();
    expect(mutex.available).toBe(0);
    mutex.release();
    expect(mutex.available).toBe(1);
  });

  it("withLock provides mutual exclusion", async () => {
    const mutex = new Mutex();
    const result = await mutex.withLock(async () => "done");
    expect(result).toBe("done");
  });
});
