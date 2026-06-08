import { describe, it, expect, vi } from "vitest";
import { Pool } from "../pool.js";

describe("Pool", () => {
  it("creates items on demand", async () => {
    let count = 0;
    const pool = new Pool({ factory: () => ++count, maxSize: 3 });
    const item = await pool.acquire();
    expect(item).toBe(1);
    expect(pool.activeCount).toBe(1);
  });

  it("reuses released items", async () => {
    let count = 0;
    const pool = new Pool({ factory: () => ++count, maxSize: 3 });
    const a = await pool.acquire();
    pool.release(a);
    const b = await pool.acquire();
    expect(b).toBe(a);
    expect(count).toBe(1);
  });

  it("queues when at max", async () => {
    let count = 0;
    const pool = new Pool({ factory: () => ++count, maxSize: 1 });
    const a = await pool.acquire();
    let resolved = false;
    const p = pool.acquire().then((item) => { resolved = true; return item; });
    expect(pool.waitingCount).toBe(1);
    pool.release(a);
    const b = await p;
    expect(resolved).toBe(true);
    expect(b).toBe(a);
  });

  it("initialSize pre-creates items", async () => {
    let count = 0;
    const pool = new Pool({ factory: () => ++count, maxSize: 5, initialSize: 3 });
    expect(pool.idleCount).toBe(3);
    expect(count).toBe(3);
  });

  it("use acquires and releases", async () => {
    let count = 0;
    const pool = new Pool({ factory: () => ++count, maxSize: 2 });
    const result = await pool.use(async (item) => item * 10);
    expect(result).toBe(10);
    expect(pool.idleCount).toBe(1);
    expect(pool.activeCount).toBe(0);
  });

  it("use releases on error", async () => {
    let count = 0;
    const pool = new Pool({ factory: () => ++count, maxSize: 2 });
    await expect(pool.use(async () => { throw new Error("fail"); })).rejects.toThrow("fail");
    expect(pool.idleCount).toBe(1);
    expect(pool.activeCount).toBe(0);
  });

  it("drain clears idle items", async () => {
    const destroy = vi.fn();
    let count = 0;
    const pool = new Pool({ factory: () => ++count, destroy, maxSize: 3 });
    const a = await pool.acquire();
    pool.release(a);
    pool.drain();
    expect(pool.idleCount).toBe(0);
    expect(destroy).toHaveBeenCalledWith(a);
  });

  it("destroyAll clears everything", async () => {
    const destroy = vi.fn();
    let count = 0;
    const pool = new Pool({ factory: () => ++count, destroy, maxSize: 3, initialSize: 2 });
    const a = await pool.acquire();
    pool.destroyAll();
    expect(pool.size).toBe(0);
    expect(destroy).toHaveBeenCalledTimes(2);
  });

  it("size reports total", async () => {
    let count = 0;
    const pool = new Pool({ factory: () => ++count, maxSize: 5 });
    const a = await pool.acquire();
    const b = await pool.acquire();
    pool.release(a);
    expect(pool.size).toBe(2);
  });

  it("release ignores unknown items", () => {
    let count = 0;
    const pool = new Pool({ factory: () => ++count, maxSize: 3 });
    pool.release(999);
    expect(pool.size).toBe(0);
  });
});
