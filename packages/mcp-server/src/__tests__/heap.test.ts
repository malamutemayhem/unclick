import { describe, it, expect } from "vitest";
import { Heap, minHeap, maxHeap, heapSort } from "../heap.js";

describe("Heap", () => {
  it("min heap returns smallest first", () => {
    const h = minHeap();
    h.push(5); h.push(2); h.push(8); h.push(1);
    expect(h.pop()).toBe(1);
    expect(h.pop()).toBe(2);
    expect(h.pop()).toBe(5);
    expect(h.pop()).toBe(8);
  });

  it("max heap returns largest first", () => {
    const h = maxHeap();
    h.push(5); h.push(2); h.push(8); h.push(1);
    expect(h.pop()).toBe(8);
    expect(h.pop()).toBe(5);
    expect(h.pop()).toBe(2);
    expect(h.pop()).toBe(1);
  });

  it("peek returns top without removing", () => {
    const h = minHeap();
    h.push(3);
    h.push(1);
    expect(h.peek()).toBe(1);
    expect(h.size).toBe(2);
  });

  it("handles empty heap", () => {
    const h = minHeap();
    expect(h.pop()).toBeUndefined();
    expect(h.peek()).toBeUndefined();
    expect(h.size).toBe(0);
  });

  it("custom comparator", () => {
    const h = new Heap<{ name: string; age: number }>((a, b) => a.age - b.age);
    h.push({ name: "Alice", age: 30 });
    h.push({ name: "Bob", age: 20 });
    h.push({ name: "Carol", age: 25 });
    expect(h.pop()!.name).toBe("Bob");
    expect(h.pop()!.name).toBe("Carol");
  });

  it("toArray returns sorted copy", () => {
    const h = minHeap();
    h.push(3); h.push(1); h.push(2);
    expect(h.toArray()).toEqual([1, 2, 3]);
    expect(h.size).toBe(3);
  });
});

describe("heapSort", () => {
  it("sorts numbers", () => {
    expect(heapSort([5, 3, 8, 1, 2], (a, b) => a - b)).toEqual([1, 2, 3, 5, 8]);
  });

  it("handles empty", () => {
    expect(heapSort([], (a, b) => a - b)).toEqual([]);
  });
});
