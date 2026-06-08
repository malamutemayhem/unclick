import { describe, it, expect } from "vitest";
import { BoundedQueue } from "../bounded-queue.js";

describe("BoundedQueue", () => {
  it("enqueue and dequeue", () => {
    const q = new BoundedQueue<number>(5);
    q.enqueue(1);
    q.enqueue(2);
    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBe(2);
  });

  it("rejects when full", () => {
    const q = new BoundedQueue<number>(2);
    expect(q.enqueue(1)).toBe(true);
    expect(q.enqueue(2)).toBe(true);
    expect(q.enqueue(3)).toBe(false);
    expect(q.dropped).toBe(1);
  });

  it("enqueueForce evicts oldest", () => {
    const q = new BoundedQueue<number>(2);
    q.enqueue(1);
    q.enqueue(2);
    const evicted = q.enqueueForce(3);
    expect(evicted).toBe(1);
    expect(q.toArray()).toEqual([2, 3]);
  });

  it("peek returns front without removing", () => {
    const q = new BoundedQueue<string>(5);
    q.enqueue("a");
    expect(q.peek()).toBe("a");
    expect(q.size).toBe(1);
  });

  it("size, full, empty", () => {
    const q = new BoundedQueue<number>(2);
    expect(q.empty).toBe(true);
    expect(q.full).toBe(false);
    q.enqueue(1);
    q.enqueue(2);
    expect(q.full).toBe(true);
    expect(q.empty).toBe(false);
    expect(q.size).toBe(2);
  });

  it("clear empties the queue", () => {
    const q = new BoundedQueue<number>(5);
    q.enqueue(1);
    q.clear();
    expect(q.size).toBe(0);
    expect(q.empty).toBe(true);
  });

  it("drain returns all and empties", () => {
    const q = new BoundedQueue<number>(5);
    q.enqueue(1);
    q.enqueue(2);
    expect(q.drain()).toEqual([1, 2]);
    expect(q.size).toBe(0);
  });
});
