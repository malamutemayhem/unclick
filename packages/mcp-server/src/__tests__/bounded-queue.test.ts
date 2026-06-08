import { describe, it, expect } from "vitest";
import { BoundedQueue } from "../bounded-queue.js";

describe("BoundedQueue", () => {
  it("enqueue and dequeue in FIFO order", () => {
    const q = new BoundedQueue<number>(5);
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBe(2);
  });

  it("drop-oldest evicts when full", () => {
    const q = new BoundedQueue<number>(2, "drop-oldest");
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.size).toBe(2);
    expect(q.dequeue()).toBe(2);
    expect(q.dequeue()).toBe(3);
  });

  it("drop-newest rejects new items when full", () => {
    const q = new BoundedQueue<number>(2, "drop-newest");
    q.enqueue(1);
    q.enqueue(2);
    expect(q.enqueue(3)).toBe(false);
    expect(q.size).toBe(2);
    expect(q.dequeue()).toBe(1);
  });

  it("reject throws when full", () => {
    const q = new BoundedQueue<number>(1, "reject");
    q.enqueue(1);
    expect(() => q.enqueue(2)).toThrow("Queue is full");
  });

  it("peek returns front without removing", () => {
    const q = new BoundedQueue<string>(5);
    q.enqueue("a");
    q.enqueue("b");
    expect(q.peek()).toBe("a");
    expect(q.size).toBe(2);
  });

  it("isEmpty and isFull", () => {
    const q = new BoundedQueue<number>(2);
    expect(q.isEmpty).toBe(true);
    expect(q.isFull).toBe(false);
    q.enqueue(1);
    q.enqueue(2);
    expect(q.isFull).toBe(true);
    expect(q.isEmpty).toBe(false);
  });

  it("drain returns all items and empties queue", () => {
    const q = new BoundedQueue<number>(5);
    q.enqueue(1);
    q.enqueue(2);
    const items = q.drain();
    expect(items).toEqual([1, 2]);
    expect(q.size).toBe(0);
  });

  it("clear empties queue", () => {
    const q = new BoundedQueue<number>(5);
    q.enqueue(1);
    q.clear();
    expect(q.size).toBe(0);
  });

  it("capacity returns max size", () => {
    const q = new BoundedQueue<number>(10);
    expect(q.capacity).toBe(10);
  });
});
