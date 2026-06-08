import { describe, it, expect } from "vitest";
import { RingBuffer } from "../ring-buffer.js";

describe("RingBuffer", () => {
  it("pushes and shifts in FIFO order", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    expect(rb.shift()).toBe(1);
    expect(rb.shift()).toBe(2);
    expect(rb.shift()).toBe(3);
  });

  it("overwrites oldest when full", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    rb.push(4);
    expect(rb.size).toBe(3);
    expect(rb.toArray()).toEqual([2, 3, 4]);
  });

  it("peek and peekLast", () => {
    const rb = new RingBuffer<string>(5);
    rb.push("a");
    rb.push("b");
    rb.push("c");
    expect(rb.peek()).toBe("a");
    expect(rb.peekLast()).toBe("c");
  });

  it("tracks size and capacity", () => {
    const rb = new RingBuffer<number>(3);
    expect(rb.isEmpty).toBe(true);
    expect(rb.isFull).toBe(false);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    expect(rb.isFull).toBe(true);
    expect(rb.capacity).toBe(3);
  });

  it("shift from empty returns undefined", () => {
    const rb = new RingBuffer<number>(3);
    expect(rb.shift()).toBeUndefined();
    expect(rb.peek()).toBeUndefined();
    expect(rb.peekLast()).toBeUndefined();
  });

  it("clear resets", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.clear();
    expect(rb.size).toBe(0);
    expect(rb.isEmpty).toBe(true);
  });

  it("iterates in order", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(10);
    rb.push(20);
    rb.push(30);
    rb.push(40);
    expect([...rb]).toEqual([20, 30, 40]);
  });
});
