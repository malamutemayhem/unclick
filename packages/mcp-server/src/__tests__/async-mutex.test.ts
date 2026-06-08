import { describe, it, expect } from "vitest";
import { AsyncMutex, AsyncRWLock } from "../async-mutex.js";

describe("async-mutex", () => {
  it("acquire provides exclusive access", async () => {
    const mutex = new AsyncMutex();
    const log: string[] = [];
    const task = async (name: string) => {
      const release = await mutex.acquire();
      log.push(`${name}-start`);
      await new Promise((r) => setTimeout(r, 10));
      log.push(`${name}-end`);
      release();
    };
    await Promise.all([task("a"), task("b")]);
    expect(log).toEqual(["a-start", "a-end", "b-start", "b-end"]);
  });

  it("runExclusive auto-releases on success", async () => {
    const mutex = new AsyncMutex();
    const result = await mutex.runExclusive(() => 42);
    expect(result).toBe(42);
    expect(mutex.isLocked).toBe(false);
  });

  it("runExclusive auto-releases on error", async () => {
    const mutex = new AsyncMutex();
    await expect(mutex.runExclusive(() => { throw new Error("fail"); })).rejects.toThrow("fail");
    expect(mutex.isLocked).toBe(false);
  });

  it("double release is safe", async () => {
    const mutex = new AsyncMutex();
    const release = await mutex.acquire();
    release();
    release();
    expect(mutex.isLocked).toBe(false);
  });

  it("waiting reflects queue size", async () => {
    const mutex = new AsyncMutex();
    const release = await mutex.acquire();
    expect(mutex.waiting).toBe(0);
    const p = mutex.acquire();
    expect(mutex.waiting).toBe(1);
    release();
    const release2 = await p;
    release2();
  });

  it("AsyncRWLock allows concurrent reads", async () => {
    const lock = new AsyncRWLock();
    const log: string[] = [];
    const read = async (name: string) => {
      const release = await lock.acquireRead();
      log.push(`${name}-read`);
      await new Promise((r) => setTimeout(r, 10));
      release();
    };
    await Promise.all([read("a"), read("b")]);
    expect(log).toEqual(["a-read", "b-read"]);
  });

  it("AsyncRWLock write blocks reads", async () => {
    const lock = new AsyncRWLock();
    const log: string[] = [];
    const writeRelease = await lock.acquireWrite();
    const readP = lock.acquireRead().then(async (release) => {
      log.push("read");
      release();
    });
    log.push("write");
    writeRelease();
    await readP;
    expect(log).toEqual(["write", "read"]);
  });
});
