import { describe, it, expect } from "vitest";
import { RingBuffer } from "../ring-buffer.js";

describe("RingBuffer", () => {
  it("pushes and shifts items", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    expect(rb.shift()).toBe(1);
    expect(rb.shift()).toBe(2);
  });

  it("tracks size", () => {
    const rb = new RingBuffer<number>(5);
    rb.push(1);
    rb.push(2);
    expect(rb.size).toBe(2);
  });

  it("evicts oldest when full", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    const evicted = rb.push(4);
    expect(evicted).toBe(1);
    expect(rb.toArray()).toEqual([2, 3, 4]);
  });

  it("peek returns head", () => {
    const rb = new RingBuffer<string>(3);
    rb.push("a");
    rb.push("b");
    expect(rb.peek()).toBe("a");
  });

  it("peekLast returns tail", () => {
    const rb = new RingBuffer<string>(3);
    rb.push("a");
    rb.push("b");
    expect(rb.peekLast()).toBe("b");
  });

  it("isEmpty and isFull", () => {
    const rb = new RingBuffer<number>(2);
    expect(rb.isEmpty()).toBe(true);
    rb.push(1);
    expect(rb.isEmpty()).toBe(false);
    rb.push(2);
    expect(rb.isFull()).toBe(true);
  });

  it("clear empties the buffer", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.clear();
    expect(rb.isEmpty()).toBe(true);
    expect(rb.size).toBe(0);
  });

  it("iterates in order", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    expect([...rb]).toEqual([1, 2, 3]);
  });

  it("throws on zero capacity", () => {
    expect(() => new RingBuffer(0)).toThrow("at least 1");
  });

  it("shift on empty returns undefined", () => {
    const rb = new RingBuffer<number>(3);
    expect(rb.shift()).toBeUndefined();
  });

  it("peek on empty returns undefined", () => {
    const rb = new RingBuffer<number>(3);
    expect(rb.peek()).toBeUndefined();
    expect(rb.peekLast()).toBeUndefined();
  });
});
