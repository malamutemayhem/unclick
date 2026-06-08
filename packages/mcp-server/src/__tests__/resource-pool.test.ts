import { describe, it, expect } from "vitest";
import { ResourcePool } from "../resource-pool.js";

describe("ResourcePool", () => {
  let counter = 0;
  const factory = () => ({ id: ++counter });

  it("acquires a resource", () => {
    counter = 0;
    const pool = new ResourcePool(factory, { maxSize: 3 });
    const r = pool.acquire();
    expect(r).toBeDefined();
    expect(r!.id).toBe(1);
    expect(pool.inUseCount).toBe(1);
  });

  it("release returns resource to pool", () => {
    counter = 0;
    const pool = new ResourcePool(factory, { maxSize: 3 });
    const r = pool.acquire()!;
    pool.release(r);
    expect(pool.availableCount).toBe(1);
    expect(pool.inUseCount).toBe(0);
  });

  it("reuses released resources", () => {
    counter = 0;
    const pool = new ResourcePool(factory, { maxSize: 3 });
    const r1 = pool.acquire()!;
    pool.release(r1);
    const r2 = pool.acquire()!;
    expect(r2.id).toBe(r1.id);
  });

  it("returns undefined when max size reached", () => {
    counter = 0;
    const pool = new ResourcePool(factory, { maxSize: 2 });
    pool.acquire();
    pool.acquire();
    expect(pool.acquire()).toBeUndefined();
  });

  it("destroy removes from in-use without returning to pool", () => {
    counter = 0;
    const pool = new ResourcePool(factory, { maxSize: 3 });
    const r = pool.acquire()!;
    pool.destroy(r);
    expect(pool.inUseCount).toBe(0);
    expect(pool.availableCount).toBe(0);
  });

  it("destroy returns false for unknown resource", () => {
    const pool = new ResourcePool(factory, { maxSize: 3 });
    expect(pool.destroy({ id: 999 })).toBe(false);
  });

  it("tracks total size", () => {
    counter = 0;
    const pool = new ResourcePool(factory, { maxSize: 5 });
    pool.acquire();
    const r = pool.acquire()!;
    pool.release(r);
    expect(pool.totalSize).toBe(2);
  });

  it("drain clears everything", () => {
    counter = 0;
    const pool = new ResourcePool(factory, { maxSize: 5 });
    pool.acquire();
    pool.acquire();
    pool.drain();
    expect(pool.totalSize).toBe(0);
  });

  it("stats returns pool state", () => {
    counter = 0;
    const pool = new ResourcePool(factory, { maxSize: 5 });
    pool.acquire();
    const r = pool.acquire()!;
    pool.release(r);
    const s = pool.stats();
    expect(s.inUse).toBe(1);
    expect(s.available).toBe(1);
    expect(s.total).toBe(2);
    expect(s.maxSize).toBe(5);
  });

  it("release returns false for unknown resource", () => {
    const pool = new ResourcePool(factory, { maxSize: 3 });
    expect(pool.release({ id: 999 })).toBe(false);
  });
});
