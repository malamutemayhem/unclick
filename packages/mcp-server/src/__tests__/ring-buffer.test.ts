import { describe, it, expect } from "vitest";
import { RingBuffer } from "../ring-buffer.js";

describe("RingBuffer", () => {
  it("push and shift", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    expect(rb.shift()).toBe(1);
    expect(rb.shift()).toBe(2);
  });

  it("overwrites on overflow", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    const evicted = rb.push(4);
    expect(evicted).toBe(1);
    expect(rb.toArray()).toEqual([2, 3, 4]);
  });

  it("peek returns front", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(10);
    rb.push(20);
    expect(rb.peek()).toBe(10);
  });

  it("peekLast returns back", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(10);
    rb.push(20);
    expect(rb.peekLast()).toBe(20);
  });

  it("get by index", () => {
    const rb = new RingBuffer<number>(5);
    rb.push(10);
    rb.push(20);
    rb.push(30);
    expect(rb.get(1)).toBe(20);
    expect(rb.get(5)).toBeUndefined();
  });

  it("tracks size", () => {
    const rb = new RingBuffer<number>(3);
    expect(rb.size).toBe(0);
    expect(rb.isEmpty).toBe(true);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    expect(rb.size).toBe(3);
    expect(rb.isFull).toBe(true);
  });

  it("clear resets", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.clear();
    expect(rb.size).toBe(0);
    expect(rb.isEmpty).toBe(true);
  });

  it("shift returns undefined when empty", () => {
    const rb = new RingBuffer<number>(3);
    expect(rb.shift()).toBeUndefined();
  });

  it("iterator works", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    expect([...rb]).toEqual([1, 2, 3]);
  });

  it("toArray after wraparound", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    rb.push(4);
    rb.push(5);
    expect(rb.toArray()).toEqual([3, 4, 5]);
  });
});
