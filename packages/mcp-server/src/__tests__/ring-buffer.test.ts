import { describe, it, expect } from "vitest";
import { RingBuffer } from "../ring-buffer.js";

describe("RingBuffer", () => {
  it("rejects capacity < 1", () => {
    expect(() => new RingBuffer(0)).toThrow();
  });

  it("push and shift", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    expect(rb.shift()).toBe(1);
    expect(rb.shift()).toBe(2);
    expect(rb.shift()).toBeUndefined();
  });

  it("overwrites oldest when full", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    const overwritten = rb.push(4);
    expect(overwritten).toBe(1);
    expect(rb.toArray()).toEqual([2, 3, 4]);
  });

  it("returns undefined when push does not overwrite", () => {
    const rb = new RingBuffer<number>(3);
    expect(rb.push(1)).toBeUndefined();
  });

  it("size tracks items", () => {
    const rb = new RingBuffer<number>(3);
    expect(rb.size).toBe(0);
    rb.push(1);
    expect(rb.size).toBe(1);
    rb.push(2);
    rb.push(3);
    expect(rb.size).toBe(3);
    rb.push(4);
    expect(rb.size).toBe(3);
  });

  it("full and empty", () => {
    const rb = new RingBuffer<number>(2);
    expect(rb.empty).toBe(true);
    expect(rb.full).toBe(false);
    rb.push(1);
    rb.push(2);
    expect(rb.full).toBe(true);
    expect(rb.empty).toBe(false);
  });

  it("peek returns first without removing", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    expect(rb.peek()).toBe(1);
    expect(rb.size).toBe(2);
  });

  it("peekLast returns last item", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    expect(rb.peekLast()).toBe(2);
  });

  it("at returns item by index", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(10);
    rb.push(20);
    rb.push(30);
    expect(rb.at(0)).toBe(10);
    expect(rb.at(1)).toBe(20);
    expect(rb.at(2)).toBe(30);
    expect(rb.at(3)).toBeUndefined();
    expect(rb.at(-1)).toBeUndefined();
  });

  it("clear empties the buffer", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.clear();
    expect(rb.size).toBe(0);
    expect(rb.empty).toBe(true);
  });

  it("toArray returns in order", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    rb.push(3);
    rb.push(4);
    expect(rb.toArray()).toEqual([2, 3, 4]);
  });

  it("Symbol.iterator", () => {
    const rb = new RingBuffer<number>(3);
    rb.push(1);
    rb.push(2);
    expect([...rb]).toEqual([1, 2]);
  });

  it("peek/peekLast on empty returns undefined", () => {
    const rb = new RingBuffer<number>(3);
    expect(rb.peek()).toBeUndefined();
    expect(rb.peekLast()).toBeUndefined();
  });
});
