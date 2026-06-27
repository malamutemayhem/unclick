import { describe, it, expect } from "vitest";
import { PoolAllocator } from "../pool-allocator.js";

describe("PoolAllocator", () => {
  it("alloc and free", () => {
    const pool = new PoolAllocator(16, 4);
    expect(pool.available).toBe(4);
    const b1 = pool.alloc();
    expect(b1).toBeGreaterThanOrEqual(0);
    expect(pool.used).toBe(1);
    expect(pool.available).toBe(3);
    pool.free(b1);
    expect(pool.used).toBe(0);
  });

  it("returns -1 when full", () => {
    const pool = new PoolAllocator(8, 2);
    pool.alloc();
    pool.alloc();
    expect(pool.alloc()).toBe(-1);
  });

  it("read and write bytes", () => {
    const pool = new PoolAllocator(16, 2);
    const b = pool.alloc();
    pool.write(b, 0, 42);
    pool.write(b, 1, 99);
    expect(pool.read(b, 0)).toBe(42);
    expect(pool.read(b, 1)).toBe(99);
  });

  it("read and write floats", () => {
    const pool = new PoolAllocator(16, 2);
    const b = pool.alloc();
    pool.writeFloat(b, 0, 3.14);
    expect(pool.readFloat(b, 0)).toBeCloseTo(3.14);
  });

  it("capacity is fixed", () => {
    const pool = new PoolAllocator(8, 10);
    expect(pool.capacity).toBe(10);
  });

  it("reset frees all blocks", () => {
    const pool = new PoolAllocator(8, 4);
    pool.alloc();
    pool.alloc();
    pool.alloc();
    pool.reset();
    expect(pool.available).toBe(4);
    expect(pool.used).toBe(0);
  });
});
