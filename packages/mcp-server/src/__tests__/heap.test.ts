import { describe, it, expect } from "vitest";
import { Heap, minHeap, maxHeap } from "../heap.js";

describe("Heap", () => {
  it("min heap by default", () => {
    const h = new Heap<number>();
    h.push(5);
    h.push(1);
    h.push(3);
    expect(h.peek()).toBe(1);
    expect(h.pop()).toBe(1);
    expect(h.pop()).toBe(3);
    expect(h.pop()).toBe(5);
  });

  it("max heap with reversed compare", () => {
    const h = maxHeap<number>();
    h.push(5);
    h.push(1);
    h.push(3);
    expect(h.pop()).toBe(5);
    expect(h.pop()).toBe(3);
    expect(h.pop()).toBe(1);
  });

  it("tracks size", () => {
    const h = minHeap<number>();
    expect(h.size).toBe(0);
    expect(h.isEmpty).toBe(true);
    h.push(1);
    h.push(2);
    expect(h.size).toBe(2);
    expect(h.isEmpty).toBe(false);
  });

  it("pop returns undefined on empty", () => {
    const h = new Heap<number>();
    expect(h.pop()).toBeUndefined();
    expect(h.peek()).toBeUndefined();
  });

  it("from builds heap from array", () => {
    const h = Heap.from([5, 3, 1, 4, 2]);
    const sorted: number[] = [];
    while (!h.isEmpty) sorted.push(h.pop()!);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
  });

  it("custom compare", () => {
    const h = new Heap<{ priority: number }>((a, b) => a.priority - b.priority);
    h.push({ priority: 3 });
    h.push({ priority: 1 });
    h.push({ priority: 2 });
    expect(h.pop()!.priority).toBe(1);
  });

  it("clear empties the heap", () => {
    const h = Heap.from([1, 2, 3]);
    h.clear();
    expect(h.size).toBe(0);
    expect(h.isEmpty).toBe(true);
  });

  it("toArray returns elements", () => {
    const h = Heap.from([3, 1, 2]);
    expect(h.toArray()).toHaveLength(3);
  });

  it("handles large heaps correctly", () => {
    const h = minHeap<number>();
    for (let i = 100; i >= 0; i--) h.push(i);
    let prev = -1;
    while (!h.isEmpty) {
      const v = h.pop()!;
      expect(v).toBeGreaterThan(prev);
      prev = v;
    }
  });
});
