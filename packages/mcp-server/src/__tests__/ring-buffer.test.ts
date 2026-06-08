import { describe, it, expect } from "vitest";
import { RingBuffer } from "../ring-buffer.js";

describe("RingBuffer", () => {
  it("pushes and retrieves", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1); rb.push(2); rb.push(3);
    expect(rb.toArray()).toEqual([1, 2, 3]);
  });

  it("overwrites oldest when full", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1); rb.push(2); rb.push(3);
    const evicted = rb.push(4);
    expect(evicted).toBe(1);
    expect(rb.toArray()).toEqual([2, 3, 4]);
  });

  it("shift removes from front", () => {
    const rb = new RingBuffer<number>(5);
    rb.push(1); rb.push(2); rb.push(3);
    expect(rb.shift()).toBe(1);
    expect(rb.toArray()).toEqual([2, 3]);
  });

  it("peek and peekLast", () => {
    const rb = new RingBuffer<number>(5);
    rb.push(10); rb.push(20); rb.push(30);
    expect(rb.peek()).toBe(10);
    expect(rb.peekLast()).toBe(30);
  });

  it("tracks size, isEmpty, isFull", () => {
    const rb = new RingBuffer<number>(2);
    expect(rb.isEmpty).toBe(true);
    rb.push(1);
    expect(rb.isFull).toBe(false);
    rb.push(2);
    expect(rb.isFull).toBe(true);
    expect(rb.size).toBe(2);
  });

  it("clears buffer", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1); rb.push(2);
    rb.clear();
    expect(rb.size).toBe(0);
    expect(rb.isEmpty).toBe(true);
  });

  it("is iterable", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1); rb.push(2); rb.push(3);
    expect([...rb]).toEqual([1, 2, 3]);
  });

  it("handles wraparound correctly", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1); rb.push(2); rb.push(3);
    rb.shift(); rb.push(4);
    rb.shift(); rb.push(5);
    expect(rb.toArray()).toEqual([3, 4, 5]);
  });

  it("throws on invalid capacity", () => {
    expect(() => new RingBuffer(0)).toThrow();
  });
});
