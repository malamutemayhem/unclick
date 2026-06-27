import { describe, it, expect } from "vitest";
import { CircularBuffer } from "../circular-buffer.js";

describe("circular-buffer", () => {
  it("push and shift in order", () => {
    const cb = new CircularBuffer<number>(5);
    cb.push(1);
    cb.push(2);
    cb.push(3);
    expect(cb.shift()).toBe(1);
    expect(cb.shift()).toBe(2);
  });

  it("overwrites oldest when full", () => {
    const cb = new CircularBuffer<number>(3);
    cb.push(1);
    cb.push(2);
    cb.push(3);
    const evicted = cb.push(4);
    expect(evicted).toBe(1);
    expect(cb.toArray()).toEqual([2, 3, 4]);
  });

  it("peek and peekLast", () => {
    const cb = new CircularBuffer<string>(5);
    cb.push("a");
    cb.push("b");
    cb.push("c");
    expect(cb.peek()).toBe("a");
    expect(cb.peekLast()).toBe("c");
  });

  it("at accesses by index", () => {
    const cb = new CircularBuffer<number>(5);
    cb.push(10);
    cb.push(20);
    cb.push(30);
    expect(cb.at(0)).toBe(10);
    expect(cb.at(2)).toBe(30);
    expect(cb.at(5)).toBeUndefined();
  });

  it("isFull reflects capacity", () => {
    const cb = new CircularBuffer<number>(2);
    expect(cb.isFull).toBe(false);
    cb.push(1);
    cb.push(2);
    expect(cb.isFull).toBe(true);
  });

  it("clear empties the buffer", () => {
    const cb = new CircularBuffer<number>(3);
    cb.push(1);
    cb.push(2);
    cb.clear();
    expect(cb.size).toBe(0);
    expect(cb.toArray()).toEqual([]);
  });

  it("shift on empty returns undefined", () => {
    const cb = new CircularBuffer<number>(3);
    expect(cb.shift()).toBeUndefined();
  });

  it("throws on invalid capacity", () => {
    expect(() => new CircularBuffer(0)).toThrow();
  });
});
