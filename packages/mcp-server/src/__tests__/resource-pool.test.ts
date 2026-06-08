import { describe, it, expect } from "vitest";
import { ResourcePool } from "../resource-pool.js";

describe("ResourcePool", () => {
  it("creates resource via factory on acquire", async () => {
    let id = 0;
    const pool = new ResourcePool({ maxSize: 3, factory: () => ++id });
    const r = await pool.acquire();
    expect(r).toBe(1);
    expect(pool.inUseCount).toBe(1);
  });

  it("reuses released resources", async () => {
    let id = 0;
    const pool = new ResourcePool({ maxSize: 3, factory: () => ++id });
    const r1 = await pool.acquire();
    pool.release(r1);
    const r2 = await pool.acquire();
    expect(r2).toBe(r1);
    expect(id).toBe(1);
  });

  it("throws when pool is exhausted", async () => {
    const pool = new ResourcePool({ maxSize: 1, factory: () => "x" });
    await pool.acquire();
    await expect(pool.acquire()).rejects.toThrow("Pool exhausted");
  });

  it("tracks available and in-use counts", async () => {
    let id = 0;
    const pool = new ResourcePool({ maxSize: 5, factory: () => ++id });
    const r1 = await pool.acquire();
    const r2 = await pool.acquire();
    expect(pool.inUseCount).toBe(2);
    expect(pool.availableCount).toBe(0);
    expect(pool.totalCount).toBe(2);
    pool.release(r1);
    expect(pool.inUseCount).toBe(1);
    expect(pool.availableCount).toBe(1);
    pool.release(r2);
    expect(pool.availableCount).toBe(2);
  });

  it("destroy removes resource and calls destroyer", async () => {
    const destroyed: number[] = [];
    let id = 0;
    const pool = new ResourcePool({
      maxSize: 3,
      factory: () => ++id,
      destroyer: (r) => { destroyed.push(r); },
    });
    const r = await pool.acquire();
    await pool.destroy(r);
    expect(destroyed).toEqual([1]);
    expect(pool.inUseCount).toBe(0);
  });

  it("destroyAll cleans up everything", async () => {
    const destroyed: number[] = [];
    let id = 0;
    const pool = new ResourcePool({
      maxSize: 5,
      factory: () => ++id,
      destroyer: (r) => { destroyed.push(r); },
    });
    const r1 = await pool.acquire();
    const r2 = await pool.acquire();
    pool.release(r1);
    await pool.destroyAll();
    expect(destroyed.sort()).toEqual([1, 2]);
    expect(pool.totalCount).toBe(0);
  });

  it("release ignores unknown resources", async () => {
    const pool = new ResourcePool({ maxSize: 3, factory: () => "x" });
    pool.release("unknown");
    expect(pool.availableCount).toBe(0);
  });

  it("supports async factory", async () => {
    const pool = new ResourcePool({
      maxSize: 2,
      factory: async () => {
        return { conn: true };
      },
    });
    const r = await pool.acquire();
    expect(r).toEqual({ conn: true });
  });
});
