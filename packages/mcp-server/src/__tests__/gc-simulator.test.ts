import { describe, it, expect } from "vitest";
import { GCHeap } from "../gc-simulator.js";

describe("GCHeap", () => {
  it("allocates objects", () => {
    const heap = new GCHeap();
    const id = heap.alloc(100);
    expect(heap.isAlive(id)).toBe(true);
    expect(heap.objectCount()).toBe(1);
    expect(heap.heapSize()).toBe(100);
  });

  it("collects unreachable objects", () => {
    const heap = new GCHeap();
    const a = heap.alloc(50);
    heap.alloc(30);
    heap.addRoot(a);
    const collected = heap.markSweep();
    expect(collected).toBe(30);
    expect(heap.objectCount()).toBe(1);
  });

  it("preserves reachable via references", () => {
    const heap = new GCHeap();
    const a = heap.alloc(10);
    const b = heap.alloc(20);
    heap.addRef(a, b);
    heap.addRoot(a);
    heap.markSweep();
    expect(heap.isAlive(a)).toBe(true);
    expect(heap.isAlive(b)).toBe(true);
  });

  it("collects cycles without roots", () => {
    const heap = new GCHeap();
    const a = heap.alloc(10);
    const b = heap.alloc(10);
    heap.addRef(a, b);
    heap.addRef(b, a);
    const collected = heap.markSweep();
    expect(collected).toBe(20);
    expect(heap.objectCount()).toBe(0);
  });

  it("removes root makes object collectible", () => {
    const heap = new GCHeap();
    const a = heap.alloc(10);
    heap.addRoot(a);
    heap.removeRoot(a);
    heap.markSweep();
    expect(heap.isAlive(a)).toBe(false);
  });

  it("generational collection promotes survivors", () => {
    const heap = new GCHeap();
    const a = heap.alloc(10);
    heap.addRoot(a);
    heap.generationalCollect(0);
    heap.generationalCollect(0);
    expect(heap.isAlive(a)).toBe(true);
  });

  it("tracks stats", () => {
    const heap = new GCHeap();
    heap.alloc(50);
    heap.alloc(30);
    heap.markSweep();
    const stats = heap.stats();
    expect(stats.totalAllocated).toBe(80);
    expect(stats.totalCollected).toBe(80);
    expect(stats.collections).toBe(1);
  });

  it("removeRef breaks reference chain", () => {
    const heap = new GCHeap();
    const a = heap.alloc(10);
    const b = heap.alloc(10);
    heap.addRef(a, b);
    heap.addRoot(a);
    heap.removeRef(a, b);
    heap.markSweep();
    expect(heap.isAlive(a)).toBe(true);
    expect(heap.isAlive(b)).toBe(false);
  });
});
