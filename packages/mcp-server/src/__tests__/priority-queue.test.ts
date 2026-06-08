import { describe, it, expect } from "vitest";
import { PriorityQueue } from "../priority-queue.js";

describe("PriorityQueue", () => {
  it("dequeues lowest priority first", () => {
    const q = new PriorityQueue<string>();
    q.enqueue("low", 3);
    q.enqueue("high", 1);
    q.enqueue("mid", 2);
    expect(q.dequeue()).toBe("high");
    expect(q.dequeue()).toBe("mid");
    expect(q.dequeue()).toBe("low");
  });

  it("peek returns lowest without removing", () => {
    const q = new PriorityQueue<string>();
    q.enqueue("a", 5);
    q.enqueue("b", 1);
    expect(q.peek()).toBe("b");
    expect(q.size).toBe(2);
  });

  it("returns undefined when empty", () => {
    const q = new PriorityQueue<string>();
    expect(q.dequeue()).toBeUndefined();
    expect(q.peek()).toBeUndefined();
  });

  it("tracks size", () => {
    const q = new PriorityQueue<number>();
    expect(q.size).toBe(0);
    expect(q.isEmpty()).toBe(true);
    q.enqueue(1, 1);
    q.enqueue(2, 2);
    expect(q.size).toBe(2);
    expect(q.isEmpty()).toBe(false);
  });

  it("clear empties the queue", () => {
    const q = new PriorityQueue<number>();
    q.enqueue(1, 1);
    q.enqueue(2, 2);
    q.clear();
    expect(q.size).toBe(0);
  });

  it("toArray returns sorted values", () => {
    const q = new PriorityQueue<string>();
    q.enqueue("c", 3);
    q.enqueue("a", 1);
    q.enqueue("b", 2);
    expect(q.toArray()).toEqual(["a", "b", "c"]);
  });

  it("handles many items correctly", () => {
    const q = new PriorityQueue<number>();
    const values = [5, 3, 8, 1, 9, 2, 7, 4, 6, 0];
    for (const v of values) q.enqueue(v, v);
    const result: number[] = [];
    while (!q.isEmpty()) result.push(q.dequeue()!);
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("handles duplicate priorities", () => {
    const q = new PriorityQueue<string>();
    q.enqueue("a", 1);
    q.enqueue("b", 1);
    const results = [q.dequeue(), q.dequeue()];
    expect(results).toContain("a");
    expect(results).toContain("b");
  });
});
