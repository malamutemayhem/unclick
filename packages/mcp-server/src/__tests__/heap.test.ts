import { describe, it, expect } from "vitest";
import { BinaryHeap, minHeap, maxHeap } from "../heap.js";

describe("BinaryHeap", () => {
  it("starts empty", () => {
    const h = new BinaryHeap<number>();
    expect(h.size).toBe(0);
    expect(h.peek()).toBeUndefined();
  });

  it("push and peek returns min", () => {
    const h = new BinaryHeap<number>();
    h.push(5);
    h.push(3);
    h.push(7);
    expect(h.peek()).toBe(3);
  });

  it("pop returns elements in order", () => {
    const h = new BinaryHeap<number>();
    h.push(5);
    h.push(1);
    h.push(3);
    expect(h.pop()).toBe(1);
    expect(h.pop()).toBe(3);
    expect(h.pop()).toBe(5);
  });

  it("pop returns undefined on empty", () => {
    const h = new BinaryHeap<number>();
    expect(h.pop()).toBeUndefined();
  });

  it("toArray returns sorted elements", () => {
    const h = new BinaryHeap<number>();
    h.push(3);
    h.push(1);
    h.push(2);
    expect(h.toArray()).toEqual([1, 2, 3]);
  });

  it("clear empties the heap", () => {
    const h = new BinaryHeap<number>();
    h.push(1);
    h.push(2);
    h.clear();
    expect(h.size).toBe(0);
  });

  it("supports custom comparator", () => {
    const h = new BinaryHeap<string>((a: string, b: string) => a.length - b.length);
    h.push("medium");
    h.push("hi");
    h.push("a");
    expect(h.pop()).toBe("a");
    expect(h.pop()).toBe("hi");
  });

  it("fromArray builds heap", () => {
    const h = BinaryHeap.fromArray([5, 3, 1, 4, 2]);
    expect(h.pop()).toBe(1);
    expect(h.pop()).toBe(2);
  });
});

describe("minHeap", () => {
  it("creates a min heap", () => {
    const h = minHeap<number>();
    h.push(5);
    h.push(1);
    expect(h.peek()).toBe(1);
  });
});

describe("maxHeap", () => {
  it("creates a max heap", () => {
    const h = maxHeap<number>();
    h.push(5);
    h.push(1);
    expect(h.peek()).toBe(5);
  });

  it("pop returns largest first", () => {
    const h = maxHeap<number>();
    h.push(1);
    h.push(5);
    h.push(3);
    expect(h.pop()).toBe(5);
    expect(h.pop()).toBe(3);
    expect(h.pop()).toBe(1);
  });
});
