import { describe, it, expect } from "vitest";
import { RingBuffer } from "../ring-buffer.js";

describe("RingBuffer", () => {
  it("pushes and retrieves items", () => {
    const buf = new RingBuffer<number>(5);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    expect(buf.toArray()).toEqual([1, 2, 3]);
  });

  it("overwrites oldest when full", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    const overwritten = buf.push(4);
    expect(overwritten).toBe(1);
    expect(buf.toArray()).toEqual([2, 3, 4]);
  });

  it("peek returns oldest", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(10);
    buf.push(20);
    expect(buf.peek()).toBe(10);
  });

  it("peekLast returns newest", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(10);
    buf.push(20);
    expect(buf.peekLast()).toBe(20);
  });

  it("reports size and capacity", () => {
    const buf = new RingBuffer<number>(5);
    buf.push(1);
    buf.push(2);
    expect(buf.size).toBe(2);
    expect(buf.maxCapacity).toBe(5);
  });

  it("isFull and isEmpty", () => {
    const buf = new RingBuffer<number>(2);
    expect(buf.isEmpty()).toBe(true);
    buf.push(1);
    buf.push(2);
    expect(buf.isFull()).toBe(true);
  });

  it("at accesses by index", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(10);
    buf.push(20);
    buf.push(30);
    expect(buf.at(0)).toBe(10);
    expect(buf.at(2)).toBe(30);
    expect(buf.at(5)).toBeUndefined();
  });

  it("clear resets buffer", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(1);
    buf.push(2);
    buf.clear();
    expect(buf.size).toBe(0);
    expect(buf.isEmpty()).toBe(true);
  });

  it("throws for invalid capacity", () => {
    expect(() => new RingBuffer(0)).toThrow();
  });

  it("handles wrap-around correctly", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    buf.push(4);
    buf.push(5);
    expect(buf.toArray()).toEqual([3, 4, 5]);
    expect(buf.peek()).toBe(3);
    expect(buf.peekLast()).toBe(5);
  });
});
