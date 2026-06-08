import { describe, it, expect } from "vitest";
import { RetryQueue } from "../retry-queue.js";

describe("RetryQueue", () => {
  it("processes items successfully", async () => {
    const q = new RetryQueue<string>({ maxRetries: 3, baseDelay: 100 });
    q.enqueue("a");
    const result = await q.process(async () => {});
    expect(result.succeeded).toBe(1);
    expect(q.processedCount).toBe(1);
  });

  it("retries on failure", async () => {
    const q = new RetryQueue<string>({ maxRetries: 3, baseDelay: 100 });
    q.enqueue("a");
    let calls = 0;
    const result = await q.process(async () => {
      calls++;
      if (calls === 1) throw new Error("fail");
    });
    expect(result.retried).toBe(1);
    expect(q.pendingCount).toBe(1);
  });

  it("sends to dead letter after max retries", async () => {
    const q = new RetryQueue<string>({ maxRetries: 1, baseDelay: 0 });
    q.enqueue("a");
    await q.process(async () => { throw new Error("fail"); });
    expect(q.deadLetterCount).toBe(1);
    expect(q.getDeadLetters()).toEqual(["a"]);
  });

  it("requeue from dead letter", async () => {
    const q = new RetryQueue<string>({ maxRetries: 1, baseDelay: 0 });
    q.enqueue("a");
    await q.process(async () => { throw new Error("fail"); });
    expect(q.deadLetterCount).toBe(1);
    q.requeue(0);
    expect(q.deadLetterCount).toBe(0);
    expect(q.pendingCount).toBe(1);
  });

  it("requeueAll moves all dead letters back", async () => {
    const q = new RetryQueue<string>({ maxRetries: 1, baseDelay: 0 });
    q.enqueue("a");
    q.enqueue("b");
    await q.process(async () => { throw new Error("fail"); });
    expect(q.deadLetterCount).toBe(2);
    const count = q.requeueAll();
    expect(count).toBe(2);
    expect(q.pendingCount).toBe(2);
  });

  it("clear empties everything", async () => {
    const q = new RetryQueue<string>({ maxRetries: 1, baseDelay: 0 });
    q.enqueue("a");
    q.clear();
    expect(q.pendingCount).toBe(0);
  });

  it("respects backoff timing", async () => {
    const q = new RetryQueue<string>({ maxRetries: 3, baseDelay: 1000 });
    q.enqueue("a");
    const now = Date.now();
    await q.process(async () => { throw new Error("fail"); }, now);
    const result = await q.process(async () => {}, now + 100);
    expect(result.succeeded).toBe(0);
  });
});
