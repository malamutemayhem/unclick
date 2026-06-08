import { describe, it, expect } from "vitest";
import { Queue, PriorityQueue } from "../queue.js";

describe("Queue", () => {
  it("enqueue and dequeue FIFO", () => {
    const q = new Queue<number>();
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBe(2);
    expect(q.dequeue()).toBe(3);
  });

  it("peek returns front without removing", () => {
    const q = new Queue<number>();
    q.enqueue(1);
    expect(q.peek()).toBe(1);
    expect(q.size).toBe(1);
  });

  it("empty queue returns undefined", () => {
    const q = new Queue<number>();
    expect(q.dequeue()).toBeUndefined();
    expect(q.peek()).toBeUndefined();
  });

  it("tracks size and isEmpty", () => {
    const q = new Queue<number>();
    expect(q.isEmpty).toBe(true);
    q.enqueue(1);
    expect(q.isEmpty).toBe(false);
    expect(q.size).toBe(1);
  });

  it("clear empties queue", () => {
    const q = new Queue<number>();
    q.enqueue(1);
    q.enqueue(2);
    q.clear();
    expect(q.size).toBe(0);
  });

  it("toArray returns elements in order", () => {
    const q = new Queue<number>();
    q.enqueue(1);
    q.enqueue(2);
    q.dequeue();
    expect(q.toArray()).toEqual([2]);
  });

  it("iterates", () => {
    const q = new Queue<number>();
    q.enqueue(1);
    q.enqueue(2);
    expect([...q]).toEqual([1, 2]);
  });
});

describe("PriorityQueue", () => {
  it("dequeues by priority", () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue("low", 10);
    pq.enqueue("high", 1);
    pq.enqueue("mid", 5);
    expect(pq.dequeue()).toBe("high");
    expect(pq.dequeue()).toBe("mid");
    expect(pq.dequeue()).toBe("low");
  });

  it("peek returns highest priority", () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue("b", 2);
    pq.enqueue("a", 1);
    expect(pq.peek()).toBe("a");
  });

  it("tracks size", () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue("a", 1);
    pq.enqueue("b", 2);
    expect(pq.size).toBe(2);
    pq.dequeue();
    expect(pq.size).toBe(1);
  });

  it("clear empties queue", () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue("a", 1);
    pq.clear();
    expect(pq.isEmpty).toBe(true);
  });
});
