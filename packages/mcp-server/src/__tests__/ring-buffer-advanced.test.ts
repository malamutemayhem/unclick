import { describe, it, expect } from "vitest";
import { RingBuffer } from "../ring-buffer-advanced.js";

describe("RingBuffer", () => {
  it("pushes and pops items", () => {
    const buf = new RingBuffer<number>(5);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    expect(buf.pop()).toBe(3);
    expect(buf.pop()).toBe(2);
    expect(buf.pop()).toBe(1);
    expect(buf.pop()).toBeUndefined();
  });

  it("pushes and shifts items (FIFO)", () => {
    const buf = new RingBuffer<string>(5);
    buf.push("a");
    buf.push("b");
    buf.push("c");
    expect(buf.shift()).toBe("a");
    expect(buf.shift()).toBe("b");
    expect(buf.shift()).toBe("c");
    expect(buf.shift()).toBeUndefined();
  });

  it("evicts oldest items when full", () => {
    const buf = new RingBuffer<number>(3);
    expect(buf.push(1)).toBeUndefined();
    expect(buf.push(2)).toBeUndefined();
    expect(buf.push(3)).toBeUndefined();
    expect(buf.push(4)).toBe(1); // evicts 1
    expect(buf.push(5)).toBe(2); // evicts 2
    expect(buf.toArray()).toEqual([3, 4, 5]);
  });

  it("peeks at first and last", () => {
    const buf = new RingBuffer<number>(5);
    buf.push(10);
    buf.push(20);
    buf.push(30);
    expect(buf.peek()).toBe(10);
    expect(buf.peekLast()).toBe(30);
  });

  it("returns undefined for peek on empty buffer", () => {
    const buf = new RingBuffer<number>(3);
    expect(buf.peek()).toBeUndefined();
    expect(buf.peekLast()).toBeUndefined();
  });

  it("gets by index", () => {
    const buf = new RingBuffer<string>(5);
    buf.push("a");
    buf.push("b");
    buf.push("c");
    expect(buf.get(0)).toBe("a");
    expect(buf.get(1)).toBe("b");
    expect(buf.get(2)).toBe("c");
    expect(buf.get(3)).toBeUndefined();
    expect(buf.get(-1)).toBeUndefined();
  });

  it("reports size, isEmpty, isFull, capacity", () => {
    const buf = new RingBuffer<number>(3);
    expect(buf.isEmpty()).toBe(true);
    expect(buf.isFull()).toBe(false);
    expect(buf.size()).toBe(0);
    expect(buf.getCapacity()).toBe(3);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    expect(buf.isFull()).toBe(true);
    expect(buf.size()).toBe(3);
    expect(buf.isEmpty()).toBe(false);
  });

  it("clears the buffer", () => {
    const buf = new RingBuffer<number>(5);
    buf.push(1);
    buf.push(2);
    buf.clear();
    expect(buf.size()).toBe(0);
    expect(buf.isEmpty()).toBe(true);
    expect(buf.toArray()).toEqual([]);
  });

  it("converts to array", () => {
    const buf = new RingBuffer<number>(4);
    buf.push(10);
    buf.push(20);
    buf.push(30);
    expect(buf.toArray()).toEqual([10, 20, 30]);
  });

  it("forEach iterates in order", () => {
    const buf = new RingBuffer<number>(5);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    const items: number[] = [];
    buf.forEach((item) => items.push(item));
    expect(items).toEqual([1, 2, 3]);
  });

  it("find returns first match", () => {
    const buf = new RingBuffer<number>(5);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    expect(buf.find((x) => x > 1)).toBe(2);
    expect(buf.find((x) => x > 10)).toBeUndefined();
  });

  it("filter returns matching items", () => {
    const buf = new RingBuffer<number>(5);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    buf.push(4);
    expect(buf.filter((x) => x % 2 === 0)).toEqual([2, 4]);
  });

  it("drain empties and returns all items", () => {
    const buf = new RingBuffer<number>(5);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    const drained = buf.drain();
    expect(drained).toEqual([1, 2, 3]);
    expect(buf.size()).toBe(0);
    expect(buf.isEmpty()).toBe(true);
  });

  it("handles wrap-around correctly", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    buf.shift(); // remove 1
    buf.push(4); // wraps around
    expect(buf.toArray()).toEqual([2, 3, 4]);
    expect(buf.get(0)).toBe(2);
    expect(buf.get(2)).toBe(4);
  });
});
