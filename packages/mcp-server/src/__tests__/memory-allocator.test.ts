import { describe, it, expect } from "vitest";
import { BuddyAllocator, FirstFitAllocator } from "../memory-allocator.js";

describe("BuddyAllocator", () => {
  it("allocates and returns offset", () => {
    const a = new BuddyAllocator(64, 8);
    const offset = a.alloc(8);
    expect(offset).toBe(0);
    expect(a.usedMemory()).toBe(8);
  });

  it("allocates multiple blocks", () => {
    const a = new BuddyAllocator(64, 8);
    const o1 = a.alloc(8);
    const o2 = a.alloc(8);
    expect(o1).not.toBe(o2);
    expect(a.usedMemory()).toBe(16);
  });

  it("returns null when full", () => {
    const a = new BuddyAllocator(16, 8);
    a.alloc(8);
    a.alloc(8);
    expect(a.alloc(8)).toBeNull();
  });

  it("frees and coalesces", () => {
    const a = new BuddyAllocator(32, 8);
    const o1 = a.alloc(8)!;
    const o2 = a.alloc(8)!;
    a.free(o1);
    a.free(o2);
    expect(a.freeMemory()).toBe(32);
    expect(a.getBlocks().length).toBe(1);
  });

  it("rounds up to power of 2", () => {
    const a = new BuddyAllocator(64, 4);
    a.alloc(5);
    expect(a.usedMemory()).toBe(8);
  });

  it("reports fragmentation", () => {
    const a = new BuddyAllocator(32, 8);
    a.alloc(8);
    a.alloc(8);
    a.alloc(8);
    a.free(0);
    a.free(16);
    expect(a.fragmentation()).toBeGreaterThan(0);
  });

  it("tags allocations", () => {
    const a = new BuddyAllocator(32, 8);
    a.alloc(8, "data");
    const blocks = a.getBlocks();
    const used = blocks.find((b) => !b.free);
    expect(used?.tag).toBe("data");
  });
});

describe("FirstFitAllocator", () => {
  it("allocates first available", () => {
    const a = new FirstFitAllocator(100);
    expect(a.alloc(30)).toBe(0);
    expect(a.alloc(20)).toBe(30);
  });

  it("frees and merges adjacent", () => {
    const a = new FirstFitAllocator(100);
    const o1 = a.alloc(30)!;
    const o2 = a.alloc(30)!;
    a.free(o1);
    a.free(o2);
    expect(a.freeMemory()).toBe(100);
    expect(a.getBlocks().length).toBe(1);
  });

  it("reuses freed space", () => {
    const a = new FirstFitAllocator(100);
    const o1 = a.alloc(30)!;
    a.alloc(30);
    a.free(o1);
    expect(a.alloc(20)).toBe(0);
  });

  it("returns null when no space", () => {
    const a = new FirstFitAllocator(10);
    a.alloc(10);
    expect(a.alloc(1)).toBeNull();
  });
});
