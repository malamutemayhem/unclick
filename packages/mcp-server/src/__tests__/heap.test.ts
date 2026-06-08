import { describe, it, expect } from "vitest";
import { Heap } from "../heap.js";

describe("heap", () => {
  it("min heap pops smallest first", () => {
    const h = Heap.minHeap<number>();
    h.push(5);
    h.push(1);
    h.push(3);
    expect(h.pop()).toBe(1);
    expect(h.pop()).toBe(3);
    expect(h.pop()).toBe(5);
  });

  it("max heap pops largest first", () => {
    const h = Heap.maxHeap<number>();
    h.push(5);
    h.push(1);
    h.push(3);
    expect(h.pop()).toBe(5);
    expect(h.pop()).toBe(3);
    expect(h.pop()).toBe(1);
  });

  it("peek returns top without removing", () => {
    const h = Heap.minHeap<number>();
    h.push(3);
    h.push(1);
    expect(h.peek()).toBe(1);
    expect(h.size).toBe(2);
  });

  it("from builds heap from array", () => {
    const h = Heap.from([5, 3, 1, 4, 2]);
    expect(h.pop()).toBe(1);
    expect(h.pop()).toBe(2);
  });

  it("pop on empty returns undefined", () => {
    const h = Heap.minHeap<number>();
    expect(h.pop()).toBeUndefined();
    expect(h.peek()).toBeUndefined();
  });

  it("isEmpty reflects state", () => {
    const h = Heap.minHeap<number>();
    expect(h.isEmpty).toBe(true);
    h.push(1);
    expect(h.isEmpty).toBe(false);
  });

  it("toArray returns sorted elements", () => {
    const h = Heap.minHeap<number>();
    h.push(3);
    h.push(1);
    h.push(2);
    expect(h.toArray()).toEqual([1, 2, 3]);
  });

  it("works with custom comparator", () => {
    const h = new Heap<string>((a, b) => a.length - b.length);
    h.push("bbb");
    h.push("a");
    h.push("cc");
    expect(h.pop()).toBe("a");
    expect(h.pop()).toBe("cc");
  });
});
