import { describe, it, expect } from "vitest";
import { ObjectPool } from "../object-pool.js";

describe("ObjectPool", () => {
  it("creates and acquires objects", () => {
    const pool = new ObjectPool({ factory: () => ({ value: 0 }) });
    const obj = pool.acquire();
    expect(obj).toEqual({ value: 0 });
    expect(pool.inUseCount).toBe(1);
  });

  it("reuses released objects", () => {
    const pool = new ObjectPool({
      factory: () => ({ value: 0 }),
      reset: (obj) => { obj.value = 0; },
    });
    const obj1 = pool.acquire();
    obj1.value = 42;
    pool.release(obj1);
    const obj2 = pool.acquire();
    expect(obj2.value).toBe(0);
    expect(pool.totalCreated).toBe(1);
  });

  it("respects maxSize", () => {
    const pool = new ObjectPool({
      factory: () => ({}),
      maxSize: 2,
    });
    pool.acquire();
    pool.acquire();
    expect(() => pool.acquire()).toThrow("Pool exhausted");
  });

  it("initialSize pre-creates", () => {
    const pool = new ObjectPool({
      factory: () => ({}),
      initialSize: 3,
    });
    expect(pool.availableCount).toBe(3);
    expect(pool.totalCreated).toBe(3);
  });

  it("drain empties available", () => {
    const pool = new ObjectPool({
      factory: () => ({}),
      initialSize: 5,
    });
    pool.drain();
    expect(pool.availableCount).toBe(0);
  });

  it("release of non-pooled object is ignored", () => {
    const pool = new ObjectPool({ factory: () => ({}) });
    pool.release({});
    expect(pool.availableCount).toBe(0);
  });
});
