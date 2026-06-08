import { describe, it, expect } from "vitest";
import { PoolAllocator } from "../pool-allocator.js";

describe("PoolAllocator", () => {
  it("alloc and free", () => {
    const pool = new PoolAllocator(4, 3);
    const s1 = pool.alloc();
    const s2 = pool.alloc();
    expect(pool.usedCount).toBe(2);
    expect(pool.freeCount).toBe(1);
    pool.free(s1);
    expect(pool.usedCount).toBe(1);
    expect(pool.freeCount).toBe(2);
  });

  it("throws when exhausted", () => {
    const pool = new PoolAllocator(2, 1);
    pool.alloc();
    expect(() => pool.alloc()).toThrow("Pool exhausted");
  });

  it("set and get values", () => {
    const pool = new PoolAllocator(3, 2);
    const slot = pool.alloc();
    pool.setValue(slot, 0, 10);
    pool.setValue(slot, 1, 20);
    pool.setValue(slot, 2, 30);
    expect(pool.getValue(slot, 0)).toBe(10);
    expect(pool.getValue(slot, 1)).toBe(20);
    expect(pool.getValue(slot, 2)).toBe(30);
  });

  it("getView returns subarray", () => {
    const pool = new PoolAllocator(2, 2);
    const slot = pool.alloc();
    pool.setValue(slot, 0, 42);
    const view = pool.getView(slot);
    expect(view[0]).toBe(42);
    expect(view.length).toBe(2);
  });

  it("free clears slot data", () => {
    const pool = new PoolAllocator(2, 1);
    const slot = pool.alloc();
    pool.setValue(slot, 0, 99);
    pool.free(slot);
    const slot2 = pool.alloc();
    expect(pool.getValue(slot2, 0)).toBe(0);
  });

  it("totalCapacity", () => {
    const pool = new PoolAllocator(4, 10);
    expect(pool.totalCapacity).toBe(10);
  });
});
