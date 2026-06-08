import { describe, it, expect } from "vitest";
import { ObjectPool, TypedPool } from "../object-pool-advanced.js";

describe("ObjectPool", () => {
  it("acquires and releases objects", () => {
    const pool = new ObjectPool(() => ({ x: 0 }));
    const obj = pool.acquire()!;
    expect(obj).toBeDefined();
    expect(pool.inUse()).toBe(1);
    pool.release(obj);
    expect(pool.inUse()).toBe(0);
    expect(pool.available()).toBe(1);
  });

  it("reuses released objects", () => {
    const pool = new ObjectPool(() => ({ id: Math.random() }));
    const obj1 = pool.acquire()!;
    pool.release(obj1);
    const obj2 = pool.acquire()!;
    expect(obj2).toBe(obj1);
  });

  it("calls reset on release", () => {
    const pool = new ObjectPool(() => ({ value: 0 }), { reset: (o) => { o.value = 0; } });
    const obj = pool.acquire()!;
    obj.value = 42;
    pool.release(obj);
    const reused = pool.acquire()!;
    expect(reused.value).toBe(0);
  });

  it("respects max size", () => {
    const pool = new ObjectPool(() => ({}), { maxSize: 2 });
    const a = pool.acquire();
    const b = pool.acquire();
    const c = pool.acquire();
    expect(a).toBeDefined();
    expect(b).toBeDefined();
    expect(c).toBeUndefined();
  });

  it("prewarms the pool", () => {
    const pool = new ObjectPool(() => ({}));
    pool.prewarm(5);
    expect(pool.available()).toBe(5);
  });

  it("drains available objects", () => {
    const pool = new ObjectPool(() => ({}), { initialSize: 3 });
    pool.drain();
    expect(pool.available()).toBe(0);
  });

  it("tracks stats", () => {
    const pool = new ObjectPool(() => ({}), { initialSize: 2 });
    pool.acquire();
    pool.acquire();
    const stats = pool.stats();
    expect(stats.created).toBe(2);
    expect(stats.acquired).toBe(2);
  });

  it("returns false when releasing untracked object", () => {
    const pool = new ObjectPool(() => ({}));
    expect(pool.release({} as any)).toBe(false);
  });

  it("reports total size", () => {
    const pool = new ObjectPool(() => ({}), { initialSize: 3 });
    pool.acquire();
    expect(pool.totalSize()).toBe(3);
    expect(pool.inUse()).toBe(1);
    expect(pool.available()).toBe(2);
  });
});

describe("TypedPool", () => {
  it("manages multiple types", () => {
    const tp = new TypedPool();
    tp.register("bullet", () => ({ x: 0, y: 0 }));
    tp.register("particle", () => ({ alpha: 1 }));
    const b = tp.acquire<{ x: number }>("bullet")!;
    expect(b.x).toBe(0);
    const p = tp.acquire<{ alpha: number }>("particle")!;
    expect(p.alpha).toBe(1);
    expect(tp.types()).toContain("bullet");
  });

  it("releases back to correct pool", () => {
    const tp = new TypedPool();
    tp.register("item", () => ({ id: 0 }));
    const obj = tp.acquire<{ id: number }>("item")!;
    expect(tp.release("item", obj)).toBe(true);
    expect(tp.release("unknown", obj)).toBe(false);
  });

  it("reports stats per type", () => {
    const tp = new TypedPool();
    tp.register("t", () => ({}));
    tp.acquire("t");
    const stats = tp.stats("t");
    expect(stats?.acquired).toBe(1);
  });
});
