import { describe, it, expect } from "vitest";
import { RetryQueue } from "../retry-queue.js";

describe("RetryQueue", () => {
  it("enqueues and dequeues", () => {
    const q = new RetryQueue<string>();
    const id = q.enqueue("task1");
    expect(q.size).toBe(1);
    const item = q.dequeue();
    expect(item?.id).toBe(id);
    expect(item?.payload).toBe("task1");
  });

  it("ack removes item", () => {
    const q = new RetryQueue<string>();
    const id = q.enqueue("task1");
    expect(q.ack(id)).toBe(true);
    expect(q.size).toBe(0);
    expect(q.ack(id)).toBe(false);
  });

  it("nack increments attempts", () => {
    const q = new RetryQueue<string>(5);
    const id = q.enqueue("task1");
    q.nack(id, "fail");
    const item = q.dequeue(Date.now() + 100000);
    expect(item?.attempts).toBe(1);
    expect(item?.lastError).toBe("fail");
  });

  it("moves to dead letter after max attempts", () => {
    const q = new RetryQueue<string>(2, 0);
    const id = q.enqueue("task1");
    q.nack(id, "err1");
    q.nack(id, "err2");
    expect(q.size).toBe(0);
    expect(q.deadLetterSize).toBe(1);
    expect(q.getDeadLetter()[0].lastError).toBe("err2");
  });

  it("retry moves from dead letter back to queue", () => {
    const q = new RetryQueue<string>(1, 0);
    const id = q.enqueue("task1");
    q.nack(id);
    expect(q.deadLetterSize).toBe(1);
    expect(q.retry(id)).toBe(true);
    expect(q.deadLetterSize).toBe(0);
    expect(q.size).toBe(1);
  });

  it("retry returns false for unknown id", () => {
    const q = new RetryQueue<string>();
    expect(q.retry("nope")).toBe(false);
  });

  it("nack returns false for unknown id", () => {
    const q = new RetryQueue<string>();
    expect(q.nack("nope")).toBe(false);
  });

  it("dequeue respects nextAttemptAt delay", () => {
    const q = new RetryQueue<string>(3, 10000);
    const id = q.enqueue("task1");
    q.nack(id, "fail");
    expect(q.dequeue()).toBeUndefined();
    expect(q.dequeue(Date.now() + 100000)).toBeDefined();
  });

  it("pending counts ready items", () => {
    const q = new RetryQueue<string>();
    q.enqueue("a");
    q.enqueue("b");
    expect(q.pending()).toBe(2);
  });

  it("clear empties everything", () => {
    const q = new RetryQueue<string>(1, 0);
    q.enqueue("a");
    const id = q.enqueue("b");
    q.nack(id);
    q.clear();
    expect(q.size).toBe(0);
    expect(q.deadLetterSize).toBe(0);
  });

  it("custom maxAttempts per item", () => {
    const q = new RetryQueue<string>(3, 0);
    const id = q.enqueue("task1", 1);
    q.nack(id);
    expect(q.deadLetterSize).toBe(1);
  });
});
