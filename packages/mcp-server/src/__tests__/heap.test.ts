import { describe, it, expect } from "vitest";
import { MinHeap, MaxHeap } from "../heap.js";

describe("MinHeap", () => {
  it("pops in ascending order", () => {
    const h = new MinHeap<number>();
    h.push(5); h.push(1); h.push(3);
    expect(h.pop()).toBe(1);
    expect(h.pop()).toBe(3);
    expect(h.pop()).toBe(5);
  });
  it("peek returns min without removing", () => {
    const h = MinHeap.from([3, 1, 2]);
    expect(h.peek()).toBe(1);
    expect(h.size).toBe(3);
  });
  it("handles empty pop", () => {
    const h = new MinHeap<number>();
    expect(h.pop()).toBeUndefined();
  });
  it("tracks size", () => {
    const h = new MinHeap<number>();
    expect(h.size).toBe(0);
    h.push(1);
    expect(h.size).toBe(1);
    h.pop();
    expect(h.size).toBe(0);
  });
  it("toArray returns all elements", () => {
    const h = MinHeap.from([3, 1, 2]);
    expect(h.toArray().sort()).toEqual([1, 2, 3]);
  });
  it("custom comparator", () => {
    const h = new MinHeap<{ v: number }>((a, b) => a.v - b.v);
    h.push({ v: 5 }); h.push({ v: 1 }); h.push({ v: 3 });
    expect(h.pop()?.v).toBe(1);
  });
  it("clear empties heap", () => {
    const h = MinHeap.from([1, 2, 3]);
    h.clear();
    expect(h.size).toBe(0);
  });
});

describe("MaxHeap", () => {
  it("pops in descending order", () => {
    const h = new MaxHeap<number>();
    h.push(5); h.push(1); h.push(3);
    expect(h.pop()).toBe(5);
    expect(h.pop()).toBe(3);
    expect(h.pop()).toBe(1);
  });
  it("peek returns max", () => {
    const h = MaxHeap.from([3, 1, 2]);
    expect(h.peek()).toBe(3);
  });
  it("tracks size", () => {
    const h = MaxHeap.from([1, 2]);
    expect(h.size).toBe(2);
  });
});
