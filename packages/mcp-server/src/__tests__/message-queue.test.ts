import { describe, it, expect } from "vitest";
import { MessageQueue, PriorityQueue } from "../message-queue.js";

describe("MessageQueue", () => {
  it("enqueues and dequeues messages", () => {
    const q = new MessageQueue<string>();
    q.enqueue("hello");
    const msg = q.dequeue();
    expect(msg).not.toBeNull();
    expect(msg!.body).toBe("hello");
  });

  it("returns null when empty", () => {
    const q = new MessageQueue<string>();
    expect(q.dequeue()).toBeNull();
  });

  it("acknowledges messages", () => {
    const q = new MessageQueue<string>();
    const id = q.enqueue("task");
    q.dequeue();
    expect(q.ack(id)).toBe(true);
    expect(q.size()).toBe(0);
    expect(q.processedCount()).toBe(1);
  });

  it("nacks and retries messages", () => {
    const q = new MessageQueue<string>(5, 0);
    const id = q.enqueue("retry");
    q.dequeue();
    q.nack(id);
    const msg2 = q.dequeue();
    expect(msg2).not.toBeNull();
    expect(msg2!.attempts).toBe(2);
  });

  it("moves to DLQ after max retries", () => {
    const q = new MessageQueue<string>(2, 0);
    const id = q.enqueue("failing");
    q.dequeue();
    q.nack(id);
    q.dequeue();
    q.nack(id);
    expect(q.dlqSize()).toBe(1);
    expect(q.size()).toBe(0);
  });

  it("replays DLQ", () => {
    const q = new MessageQueue<string>(1, 0);
    const id = q.enqueue("fail");
    q.dequeue();
    q.nack(id);
    expect(q.dlqSize()).toBe(1);
    const replayed = q.replayDLQ();
    expect(replayed).toBe(1);
    expect(q.size()).toBe(1);
    expect(q.dlqSize()).toBe(0);
  });

  it("peeks without consuming", () => {
    const q = new MessageQueue<string>();
    q.enqueue("peek");
    const peeked = q.peek();
    expect(peeked!.body).toBe("peek");
    expect(q.size()).toBe(1);
  });

  it("purges all messages", () => {
    const q = new MessageQueue<string>();
    q.enqueue("a");
    q.enqueue("b");
    expect(q.purge()).toBe(2);
    expect(q.size()).toBe(0);
  });

  it("FIFO order", () => {
    const q = new MessageQueue<number>(3, 0);
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    const m1 = q.dequeue();
    q.ack(m1!.id);
    const m2 = q.dequeue();
    q.ack(m2!.id);
    const m3 = q.dequeue();
    expect(m1!.body).toBe(1);
    expect(m2!.body).toBe(2);
    expect(m3!.body).toBe(3);
  });
});

describe("PriorityQueue", () => {
  it("dequeues highest priority first", () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue("low", 1);
    pq.enqueue("high", 10);
    pq.enqueue("mid", 5);
    expect(pq.dequeue()).toBe("high");
    expect(pq.dequeue()).toBe("mid");
    expect(pq.dequeue()).toBe("low");
  });

  it("returns null when empty", () => {
    const pq = new PriorityQueue<string>();
    expect(pq.dequeue()).toBeNull();
    expect(pq.isEmpty()).toBe(true);
  });

  it("peeks at highest priority", () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue("a", 1);
    pq.enqueue("b", 5);
    expect(pq.peek()).toBe("b");
    expect(pq.size()).toBe(2);
  });
});
