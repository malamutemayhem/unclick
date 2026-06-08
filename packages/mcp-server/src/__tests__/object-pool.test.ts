import { describe, it, expect } from "vitest";
import { ObjectPool } from "../object-pool.js";

describe("ObjectPool", () => {
  it("acquires and releases objects", () => {
    const pool = new ObjectPool({ factory: () => ({ value: 0 }) });
    const obj = pool.acquire();
    expect(obj).toBeDefined();
    expect(pool.inUseCount).toBe(1);
    pool.release(obj);
    expect(pool.inUseCount).toBe(0);
    expect(pool.availableCount).toBe(1);
  });

  it("reuses released objects", () => {
    const pool = new ObjectPool({ factory: () => ({ value: 0 }) });
    const obj1 = pool.acquire();
    pool.release(obj1);
    const obj2 = pool.acquire();
    expect(obj2).toBe(obj1);
  });

  it("calls reset on release", () => {
    let resetCalled = false;
    const pool = new ObjectPool({
      factory: () => ({ value: 0 }),
      reset: () => { resetCalled = true; },
    });
    const obj = pool.acquire();
    pool.release(obj);
    expect(resetCalled).toBe(true);
  });

  it("pre-allocates initial size", () => {
    const pool = new ObjectPool({ factory: () => ({}), initialSize: 5 });
    expect(pool.availableCount).toBe(5);
  });

  it("respects maxSize for available pool", () => {
    const pool = new ObjectPool({ factory: () => ({}), maxSize: 2 });
    const objs = [pool.acquire(), pool.acquire(), pool.acquire()];
    for (const o of objs) pool.release(o);
    expect(pool.availableCount).toBe(2);
  });

  it("tracks total count", () => {
    const pool = new ObjectPool({ factory: () => ({}), initialSize: 3 });
    const obj = pool.acquire();
    expect(pool.totalCount).toBe(3);
    pool.release(obj);
    expect(pool.totalCount).toBe(3);
  });

  it("clear empties everything", () => {
    const pool = new ObjectPool({ factory: () => ({}), initialSize: 3 });
    pool.acquire();
    pool.clear();
    expect(pool.totalCount).toBe(0);
  });

  it("drain only empties available", () => {
    const pool = new ObjectPool({ factory: () => ({}), initialSize: 3 });
    const obj = pool.acquire();
    pool.drain();
    expect(pool.availableCount).toBe(0);
    expect(pool.inUseCount).toBe(1);
    pool.release(obj);
  });

  it("ignores releasing unknown object", () => {
    const pool = new ObjectPool({ factory: () => ({}) });
    pool.release({});
    expect(pool.availableCount).toBe(0);
  });
});
