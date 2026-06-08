import { describe, it, expect } from "vitest";
import { PriorityQueue, nSmallest, nLargest } from "../priority-queue.js";

describe("PriorityQueue", () => {
  it("dequeues in priority order (min-heap)", () => {
    const pq = new PriorityQueue<number>();
    pq.enqueue(5);
    pq.enqueue(1);
    pq.enqueue(3);
    expect(pq.dequeue()).toBe(1);
    expect(pq.dequeue()).toBe(3);
    expect(pq.dequeue()).toBe(5);
  });

  it("custom comparator (max-heap)", () => {
    const pq = new PriorityQueue<number>((a, b) => b - a);
    pq.enqueue(1);
    pq.enqueue(5);
    pq.enqueue(3);
    expect(pq.dequeue()).toBe(5);
  });

  it("peek returns top", () => {
    const pq = new PriorityQueue<number>();
    pq.enqueue(10);
    pq.enqueue(5);
    expect(pq.peek()).toBe(5);
  });

  it("tracks size", () => {
    const pq = new PriorityQueue<number>();
    expect(pq.isEmpty).toBe(true);
    pq.enqueue(1);
    expect(pq.size).toBe(1);
    expect(pq.isEmpty).toBe(false);
  });

  it("dequeue returns undefined when empty", () => {
    expect(new PriorityQueue<number>().dequeue()).toBeUndefined();
  });

  it("toArray returns sorted", () => {
    const pq = new PriorityQueue<number>();
    pq.enqueue(3);
    pq.enqueue(1);
    pq.enqueue(2);
    expect(pq.toArray()).toEqual([1, 2, 3]);
    expect(pq.size).toBe(3);
  });

  it("clear empties queue", () => {
    const pq = new PriorityQueue<number>();
    pq.enqueue(1);
    pq.enqueue(2);
    pq.clear();
    expect(pq.size).toBe(0);
  });

  it("works with objects", () => {
    const pq = new PriorityQueue<{ p: number }>((a, b) => a.p - b.p);
    pq.enqueue({ p: 3 });
    pq.enqueue({ p: 1 });
    pq.enqueue({ p: 2 });
    expect(pq.dequeue()?.p).toBe(1);
  });
});

describe("nSmallest", () => {
  it("returns n smallest", () => {
    expect(nSmallest([5, 3, 1, 4, 2], 3)).toEqual([1, 2, 3]);
  });
});

describe("nLargest", () => {
  it("returns n largest", () => {
    expect(nLargest([5, 3, 1, 4, 2], 3)).toEqual([5, 4, 3]);
  });
});
