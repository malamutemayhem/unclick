import { describe, it, expect } from "vitest";
import { RingBuffer } from "../ring-buffer.js";

describe("RingBuffer", () => {
  it("push and shift", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    expect(rb.shift()).toBe(1);
    expect(rb.shift()).toBe(2);
    expect(rb.shift()).toBe(3);
    expect(rb.shift()).toBeUndefined();
  });

  it("overwrites oldest when full", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    const evicted = rb.push(4);
    expect(evicted).toBe(1);
    expect(rb.toArray()).toEqual([2, 3, 4]);
  });

  it("peek and peekLast", () => {
    const rb = new RingBuffer<number>(5);
    rb.push(10);
    rb.push(20);
    rb.push(30);
    expect(rb.peek()).toBe(10);
    expect(rb.peekLast()).toBe(30);
  });

  it("at for random access", () => {
    const rb = new RingBuffer<string>(5);
    rb.push("a");
    rb.push("b");
    rb.push("c");
    expect(rb.at(0)).toBe("a");
    expect(rb.at(2)).toBe("c");
    expect(rb.at(5)).toBeUndefined();
  });

  it("size and capacity", () => {
    const rb = new RingBuffer<number>(3);
    expect(rb.capacity).toBe(3);
    expect(rb.size).toBe(0);
    rb.push(1);
    rb.push(2);
    expect(rb.size).toBe(2);
    expect(rb.isFull).toBe(false);
    rb.push(3);
    expect(rb.isFull).toBe(true);
  });

  it("clear resets buffer", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.clear();
    expect(rb.size).toBe(0);
    expect(rb.shift()).toBeUndefined();
  });
});
