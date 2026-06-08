import { describe, it, expect } from "vitest";
import { RingBuffer } from "../ring-buffer.js";

describe("RingBuffer", () => {
  it("pushes and shifts in order", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    expect(rb.shift()).toBe(1);
    expect(rb.shift()).toBe(2);
  });

  it("overwrites oldest when full", () => {
    const rb = new RingBuffer<number>(2);
    rb.push(1);
    rb.push(2);
    const evicted = rb.push(3);
    expect(evicted).toBe(1);
    expect(rb.toArray()).toEqual([2, 3]);
  });

  it("peek and peekLast", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(10);
    rb.push(20);
    expect(rb.peek()).toBe(10);
    expect(rb.peekLast()).toBe(20);
  });

  it("at returns correct index", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    expect(rb.at(0)).toBe(1);
    expect(rb.at(2)).toBe(3);
    expect(rb.at(5)).toBeUndefined();
  });

  it("tracks size and isFull", () => {
    const rb = new RingBuffer<number>(2);
    expect(rb.size).toBe(0);
    rb.push(1);
    expect(rb.size).toBe(1);
    expect(rb.isFull()).toBe(false);
    rb.push(2);
    expect(rb.isFull()).toBe(true);
  });

  it("clear resets", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.clear();
    expect(rb.size).toBe(0);
    expect(rb.toArray()).toEqual([]);
  });

  it("throws for invalid capacity", () => {
    expect(() => new RingBuffer(0)).toThrow();
  });
});
