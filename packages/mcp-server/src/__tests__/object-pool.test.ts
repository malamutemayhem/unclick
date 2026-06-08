import { describe, it, expect } from "vitest";
import { ObjectPool } from "../object-pool.js";

describe("ObjectPool", () => {
  it("creates objects via factory", () => {
    let id = 0;
    const pool = new ObjectPool(() => ({ id: id++ }));
    const obj = pool.acquire();
    expect(obj.id).toBe(0);
    expect(pool.inUse).toBe(1);
  });

  it("reuses released objects", () => {
    const pool = new ObjectPool(() => ({ val: 0 }));
    const a = pool.acquire();
    a.val = 42;
    pool.release(a);
    const b = pool.acquire();
    expect(b.val).toBe(42);
    expect(pool.totalSize).toBe(1);
  });

  it("calls reset on release", () => {
    const pool = new ObjectPool(() => ({ val: 0 }), { reset: (o) => { o.val = 0; } });
    const obj = pool.acquire();
    obj.val = 99;
    pool.release(obj);
    const reused = pool.acquire();
    expect(reused.val).toBe(0);
  });

  it("prewarms the pool", () => {
    const pool = new ObjectPool(() => ({}), { prewarm: 5 });
    expect(pool.available).toBe(5);
    expect(pool.inUse).toBe(0);
  });

  it("respects maxSize for pooled objects", () => {
    const pool = new ObjectPool(() => ({}), { maxSize: 1 });
    const a = pool.acquire();
    const b = pool.acquire();
    pool.release(a);
    pool.release(b);
    expect(pool.available).toBe(1);
  });

  it("release returns false for unknown objects", () => {
    const pool = new ObjectPool(() => ({}));
    expect(pool.release({})).toBe(false);
  });

  it("tracks totalSize", () => {
    const pool = new ObjectPool(() => ({}));
    const a = pool.acquire();
    const b = pool.acquire();
    pool.release(a);
    expect(pool.totalSize).toBe(2);
  });

  it("clear empties everything", () => {
    const pool = new ObjectPool(() => ({}), { prewarm: 3 });
    pool.acquire();
    pool.clear();
    expect(pool.available).toBe(0);
    expect(pool.inUse).toBe(0);
  });
});
