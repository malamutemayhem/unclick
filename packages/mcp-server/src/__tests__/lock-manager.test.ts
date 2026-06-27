import { describe, it, expect } from "vitest";
import { LockManager } from "../lock-manager.js";

describe("LockManager", () => {
  it("acquires and releases exclusive locks", () => {
    const lm = new LockManager();
    expect(lm.acquire("file.txt", "exclusive", "alice")).toBe(true);
    expect(lm.isLocked("file.txt")).toBe(true);
    expect(lm.release("file.txt", "alice")).toBe(true);
    expect(lm.isLocked("file.txt")).toBe(false);
  });

  it("blocks exclusive when already locked", () => {
    const lm = new LockManager();
    lm.acquire("file.txt", "exclusive", "alice");
    expect(lm.acquire("file.txt", "exclusive", "bob")).toBe(false);
  });

  it("allows multiple shared locks", () => {
    const lm = new LockManager();
    expect(lm.acquire("doc.txt", "shared", "alice")).toBe(true);
    expect(lm.acquire("doc.txt", "shared", "bob")).toBe(true);
    expect(lm.activeLocks()).toBe(2);
  });

  it("blocks exclusive when shared locks exist", () => {
    const lm = new LockManager();
    lm.acquire("doc.txt", "shared", "alice");
    expect(lm.acquire("doc.txt", "exclusive", "bob")).toBe(false);
  });

  it("blocks shared when exclusive lock exists", () => {
    const lm = new LockManager();
    lm.acquire("doc.txt", "exclusive", "alice");
    expect(lm.acquire("doc.txt", "shared", "bob")).toBe(false);
  });

  it("checks lock holder", () => {
    const lm = new LockManager();
    lm.acquire("file.txt", "exclusive", "alice");
    expect(lm.holdsLock("file.txt", "alice")).toBe(true);
    expect(lm.holdsLock("file.txt", "bob")).toBe(false);
  });

  it("reports lock mode", () => {
    const lm = new LockManager();
    expect(lm.lockMode("none")).toBeNull();
    lm.acquire("a", "shared", "alice");
    expect(lm.lockMode("a")).toBe("shared");
    lm.acquire("b", "exclusive", "bob");
    expect(lm.lockMode("b")).toBe("exclusive");
  });

  it("releases all locks for a holder", () => {
    const lm = new LockManager();
    lm.acquire("a", "exclusive", "alice");
    lm.acquire("b", "shared", "alice");
    lm.acquire("c", "exclusive", "bob");
    expect(lm.releaseAll("alice")).toBe(2);
    expect(lm.activeLocks()).toBe(1);
  });

  it("processes wait queue on release", () => {
    const lm = new LockManager({ deadlockDetection: false });
    lm.acquire("file", "exclusive", "alice");
    lm.acquire("file", "exclusive", "bob");
    expect(lm.waitQueueSize()).toBe(1);
    lm.release("file", "alice");
    expect(lm.holdsLock("file", "bob")).toBe(true);
    expect(lm.waitQueueSize()).toBe(0);
  });

  it("lists locked resources", () => {
    const lm = new LockManager();
    lm.acquire("b.txt", "exclusive", "alice");
    lm.acquire("a.txt", "shared", "bob");
    expect(lm.lockedResources()).toEqual(["a.txt", "b.txt"]);
  });

  it("returns false releasing unheld lock", () => {
    const lm = new LockManager();
    expect(lm.release("missing", "alice")).toBe(false);
  });
});
