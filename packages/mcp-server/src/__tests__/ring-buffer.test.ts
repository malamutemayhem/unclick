import { describe, it, expect } from "vitest";
import { RingBuffer } from "../ring-buffer.js";

describe("RingBuffer", () => {
  it("stores items up to capacity", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    expect(buf.size).toBe(3);
    expect(buf.toArray()).toEqual([1, 2, 3]);
  });

  it("overwrites oldest when full", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    buf.push(4);
    expect(buf.size).toBe(3);
    expect(buf.toArray()).toEqual([2, 3, 4]);
  });

  it("oldest and newest return correct items", () => {
    const buf = new RingBuffer<string>(3);
    buf.push("a");
    buf.push("b");
    buf.push("c");
    expect(buf.oldest()).toBe("a");
    expect(buf.newest()).toBe("c");
  });

  it("oldest and newest return undefined when empty", () => {
    const buf = new RingBuffer<number>(3);
    expect(buf.oldest()).toBeUndefined();
    expect(buf.newest()).toBeUndefined();
  });

  it("get returns item by index", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(10);
    buf.push(20);
    buf.push(30);
    expect(buf.get(0)).toBe(10);
    expect(buf.get(2)).toBe(30);
    expect(buf.get(3)).toBeUndefined();
    expect(buf.get(-1)).toBeUndefined();
  });

  it("isFull reports correctly", () => {
    const buf = new RingBuffer<number>(2);
    expect(buf.isFull()).toBe(false);
    buf.push(1);
    buf.push(2);
    expect(buf.isFull()).toBe(true);
  });

  it("clear resets the buffer", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(1);
    buf.push(2);
    buf.clear();
    expect(buf.size).toBe(0);
    expect(buf.toArray()).toEqual([]);
  });

  it("forEach iterates in order", () => {
    const buf = new RingBuffer<number>(3);
    buf.push(1);
    buf.push(2);
    buf.push(3);
    buf.push(4);
    const items: number[] = [];
    buf.forEach((item) => items.push(item));
    expect(items).toEqual([2, 3, 4]);
  });

  it("throws for invalid capacity", () => {
    expect(() => new RingBuffer(0)).toThrow();
    expect(() => new RingBuffer(-1)).toThrow();
  });

  it("works with wrap-around after many pushes", () => {
    const buf = new RingBuffer<number>(3);
    for (let i = 0; i < 100; i++) buf.push(i);
    expect(buf.toArray()).toEqual([97, 98, 99]);
  });
});
