import { describe, it, expect } from "vitest";
import { AsyncQueue } from "../async-queue.js";

describe("AsyncQueue", () => {
  it("push and pop in order", async () => {
    const q = new AsyncQueue<number>();
    q.push(1);
    q.push(2);
    expect(await q.pop()).toBe(1);
    expect(await q.pop()).toBe(2);
  });

  it("pop waits for push", async () => {
    const q = new AsyncQueue<string>();
    const promise = q.pop();
    q.push("hello");
    expect(await promise).toBe("hello");
  });

  it("tryPop returns item or undefined", () => {
    const q = new AsyncQueue<number>();
    expect(q.tryPop()).toBeUndefined();
    q.push(42);
    expect(q.tryPop()).toBe(42);
  });

  it("peek returns front without removing", () => {
    const q = new AsyncQueue<number>();
    q.push(1);
    expect(q.peek()).toBe(1);
    expect(q.size).toBe(1);
  });

  it("tracks size", () => {
    const q = new AsyncQueue<number>();
    expect(q.size).toBe(0);
    q.push(1);
    q.push(2);
    expect(q.size).toBe(2);
  });

  it("drain returns all items", () => {
    const q = new AsyncQueue<number>();
    q.push(1);
    q.push(2);
    q.push(3);
    expect(q.drain()).toEqual([1, 2, 3]);
    expect(q.size).toBe(0);
  });

  it("close prevents further pushes", () => {
    const q = new AsyncQueue<number>();
    q.close();
    expect(q.isClosed).toBe(true);
    expect(() => q.push(1)).toThrow("closed");
  });

  it("tracks waiting count", async () => {
    const q = new AsyncQueue<number>();
    expect(q.waiting).toBe(0);
    const p = q.pop();
    expect(q.waiting).toBe(1);
    q.push(1);
    await p;
    expect(q.waiting).toBe(0);
  });
});
