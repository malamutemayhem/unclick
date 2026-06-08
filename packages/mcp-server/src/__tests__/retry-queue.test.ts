import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { RetryQueue } from "../retry-queue.js";

describe("RetryQueue", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("enqueues items as immediately ready", () => {
    const q = new RetryQueue();
    q.enqueue("a");
    q.enqueue("b");
    expect(q.size).toBe(2);
    expect(q.getReady()).toHaveLength(2);
  });

  it("recordSuccess removes item", () => {
    const q = new RetryQueue();
    q.enqueue("a");
    q.recordSuccess(0);
    expect(q.size).toBe(0);
  });

  it("recordFailure increments attempts and delays", () => {
    const q = new RetryQueue();
    q.enqueue("a");
    const kept = q.recordFailure(0, "timeout");
    expect(kept).toBe(true);
    expect(q.getReady()).toHaveLength(0);
    vi.advanceTimersByTime(1500);
    expect(q.getReady()).toHaveLength(1);
  });

  it("removes item after max attempts", () => {
    const q = new RetryQueue({ maxAttempts: 2 });
    q.enqueue("a");
    q.recordFailure(0);
    const kept = q.recordFailure(0);
    expect(kept).toBe(false);
    expect(q.size).toBe(0);
  });

  it("clear empties the queue", () => {
    const q = new RetryQueue();
    q.enqueue("a");
    q.enqueue("b");
    q.clear();
    expect(q.size).toBe(0);
  });

  it("pending counts items not yet ready", () => {
    const q = new RetryQueue();
    q.enqueue("a");
    q.recordFailure(0);
    expect(q.pending).toBe(1);
  });
});
