import { describe, it, expect } from "vitest";
import { ObjectPool } from "../object-pool.js";

describe("ObjectPool", () => {
  it("acquire creates new objects", () => {
    let id = 0;
    const pool = new ObjectPool({ factory: () => ({ id: ++id }) });
    const a = pool.acquire();
    const b = pool.acquire();
    expect(a.id).toBe(1);
    expect(b.id).toBe(2);
  });

  it("release returns objects for reuse", () => {
    let id = 0;
    const pool = new ObjectPool({ factory: () => ({ id: ++id }) });
    const a = pool.acquire();
    pool.release(a);
    const b = pool.acquire();
    expect(b).toBe(a);
    expect(id).toBe(1);
  });

  it("reset function is called on release", () => {
    const pool = new ObjectPool({
      factory: () => ({ value: 0 }),
      reset: (obj) => { obj.value = 0; },
    });
    const obj = pool.acquire();
    obj.value = 42;
    pool.release(obj);
    const reused = pool.acquire();
    expect(reused.value).toBe(0);
  });

  it("initialSize pre-creates objects", () => {
    const pool = new ObjectPool({
      factory: () => ({}),
      initialSize: 5,
    });
    expect(pool.available).toBe(5);
  });

  it("respects maxSize for pool", () => {
    const pool = new ObjectPool({
      factory: () => ({}),
      maxSize: 2,
    });
    const a = pool.acquire();
    const b = pool.acquire();
    const c = pool.acquire();
    pool.release(a);
    pool.release(b);
    pool.release(c);
    expect(pool.available).toBe(2);
  });

  it("prewarm adds objects up to maxSize", () => {
    const pool = new ObjectPool({
      factory: () => ({}),
      maxSize: 3,
    });
    pool.prewarm(10);
    expect(pool.available).toBe(3);
  });

  it("clear empties the pool", () => {
    const pool = new ObjectPool({
      factory: () => ({}),
      initialSize: 5,
    });
    pool.clear();
    expect(pool.available).toBe(0);
  });
});
