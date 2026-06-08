import { describe, it, expect, vi } from "vitest";
import { ObjectPool } from "../object-pool.js";

describe("ObjectPool", () => {
  it("creates new objects via factory", () => {
    const pool = new ObjectPool(() => ({ x: 0 }));
    const obj = pool.acquire();
    expect(obj).toEqual({ x: 0 });
    expect(pool.created).toBe(1);
  });

  it("reuses released objects", () => {
    const pool = new ObjectPool(() => ({ x: 0 }));
    const obj = pool.acquire();
    pool.release(obj);
    const obj2 = pool.acquire();
    expect(obj2).toBe(obj);
    expect(pool.reused).toBe(1);
  });

  it("calls reset on release", () => {
    const reset = vi.fn();
    const pool = new ObjectPool(() => ({ x: 0 }), reset);
    const obj = pool.acquire();
    pool.release(obj);
    expect(reset).toHaveBeenCalledWith(obj);
  });

  it("respects maxSize limit", () => {
    const pool = new ObjectPool(() => ({}), undefined, 2);
    const a = pool.acquire();
    const b = pool.acquire();
    const c = pool.acquire();
    pool.release(a);
    pool.release(b);
    pool.release(c);
    expect(pool.available).toBe(2);
  });

  it("tracks available count", () => {
    const pool = new ObjectPool(() => ({}));
    expect(pool.available).toBe(0);
    const obj = pool.acquire();
    pool.release(obj);
    expect(pool.available).toBe(1);
  });

  it("drains the pool", () => {
    const pool = new ObjectPool(() => ({}));
    const obj = pool.acquire();
    pool.release(obj);
    pool.drain();
    expect(pool.available).toBe(0);
  });

  it("fills the pool with pre-created objects", () => {
    const pool = new ObjectPool(() => ({ v: 1 }));
    pool.fill(3);
    expect(pool.available).toBe(3);
    expect(pool.created).toBe(3);
  });

  it("fill respects maxSize", () => {
    const pool = new ObjectPool(() => ({}), undefined, 2);
    pool.fill(5);
    expect(pool.available).toBe(2);
  });

  it("tracks created and reused counts", () => {
    const pool = new ObjectPool(() => ({}));
    pool.acquire();
    pool.acquire();
    const obj = pool.acquire();
    pool.release(obj);
    pool.acquire();
    expect(pool.created).toBe(3);
    expect(pool.reused).toBe(1);
  });
});
