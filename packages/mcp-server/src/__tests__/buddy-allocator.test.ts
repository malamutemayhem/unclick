import { describe, it, expect } from "vitest";
import { BuddyAllocator } from "../buddy-allocator.js";

describe("BuddyAllocator", () => {
  it("allocates block", () => {
    const alloc = new BuddyAllocator(64);
    const addr = alloc.alloc(16);
    expect(addr).not.toBeNull();
    expect(alloc.isAllocated(addr!)).toBe(true);
  });

  it("allocates power-of-two blocks", () => {
    const alloc = new BuddyAllocator(64);
    const a = alloc.alloc(10);
    expect(a).not.toBeNull();
    const block = alloc.getBlock(a!);
    expect(block!.size).toBe(16);
  });

  it("multiple allocations", () => {
    const alloc = new BuddyAllocator(64);
    const a = alloc.alloc(16);
    const b = alloc.alloc(16);
    expect(a).not.toBeNull();
    expect(b).not.toBeNull();
    expect(a).not.toBe(b);
    expect(alloc.allocatedCount).toBe(2);
  });

  it("free releases block", () => {
    const alloc = new BuddyAllocator(64);
    const addr = alloc.alloc(16)!;
    expect(alloc.free(addr)).toBe(true);
    expect(alloc.isAllocated(addr)).toBe(false);
  });

  it("free invalid address returns false", () => {
    const alloc = new BuddyAllocator(64);
    expect(alloc.free(999)).toBe(false);
  });

  it("merges buddy blocks on free", () => {
    const alloc = new BuddyAllocator(64);
    const a = alloc.alloc(16)!;
    const b = alloc.alloc(16)!;
    alloc.free(a);
    alloc.free(b);
    const c = alloc.alloc(32);
    expect(c).not.toBeNull();
  });

  it("returns null when full", () => {
    const alloc = new BuddyAllocator(16);
    alloc.alloc(16);
    expect(alloc.alloc(16)).toBeNull();
  });

  it("size returns total", () => {
    const alloc = new BuddyAllocator(64);
    expect(alloc.size).toBe(64);
  });

  it("size rounds up to power of 2", () => {
    const alloc = new BuddyAllocator(48);
    expect(alloc.size).toBe(64);
  });

  it("stats reports usage", () => {
    const alloc = new BuddyAllocator(64);
    alloc.alloc(16);
    const s = alloc.stats();
    expect(s.total).toBe(64);
    expect(s.allocated).toBe(16);
    expect(s.free).toBe(48);
  });

  it("allocatedCount tracks allocations", () => {
    const alloc = new BuddyAllocator(64);
    expect(alloc.allocatedCount).toBe(0);
    alloc.alloc(8);
    alloc.alloc(8);
    expect(alloc.allocatedCount).toBe(2);
  });

  it("small allocations respect minBlockSize", () => {
    const alloc = new BuddyAllocator(64, 4);
    const addr = alloc.alloc(1);
    const block = alloc.getBlock(addr!);
    expect(block!.size).toBe(4);
  });
});
