import { describe, it, expect } from "vitest";
import { AsyncQueue } from "../async-queue.js";

describe("AsyncQueue", () => {
  it("push and pop", async () => {
    const q = new AsyncQueue<number>();
    q.push(1);
    q.push(2);
    expect(await q.pop()).toBe(1);
    expect(await q.pop()).toBe(2);
  });

  it("pop waits for push", async () => {
    const q = new AsyncQueue<number>();
    const promise = q.pop();
    q.push(42);
    expect(await promise).toBe(42);
  });

  it("tryPop returns undefined when empty", () => {
    const q = new AsyncQueue<number>();
    expect(q.tryPop()).toBeUndefined();
  });

  it("tryPop returns item when available", () => {
    const q = new AsyncQueue<number>();
    q.push(5);
    expect(q.tryPop()).toBe(5);
  });

  it("size and waiting", () => {
    const q = new AsyncQueue<number>();
    expect(q.size).toBe(0);
    q.push(1);
    expect(q.size).toBe(1);
  });

  it("close prevents new pushes", () => {
    const q = new AsyncQueue<number>();
    q.close();
    expect(q.isClosed).toBe(true);
    expect(() => q.push(1)).toThrow("closed");
  });

  it("drain returns all buffered", () => {
    const q = new AsyncQueue<number>();
    q.push(1);
    q.push(2);
    q.push(3);
    expect(q.drain()).toEqual([1, 2, 3]);
    expect(q.size).toBe(0);
  });
});
