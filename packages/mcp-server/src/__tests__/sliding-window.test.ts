import { describe, it, expect } from "vitest";
import { SlidingWindow } from "../sliding-window.js";

describe("SlidingWindow", () => {
  it("pushes values and retrieves them", () => {
    const w = new SlidingWindow<number>(3);
    w.push(1);
    w.push(2);
    expect(w.toArray()).toEqual([1, 2]);
  });

  it("evicts oldest when full", () => {
    const w = new SlidingWindow<number>(3);
    w.push(1);
    w.push(2);
    w.push(3);
    const evicted = w.push(4);
    expect(evicted).toBe(1);
    expect(w.toArray()).toEqual([2, 3, 4]);
  });

  it("returns undefined when not evicting", () => {
    const w = new SlidingWindow<number>(5);
    expect(w.push(1)).toBeUndefined();
  });

  it("tracks size and capacity", () => {
    const w = new SlidingWindow<number>(3);
    expect(w.capacity).toBe(3);
    expect(w.size).toBe(0);
    w.push(1);
    w.push(2);
    expect(w.size).toBe(2);
    expect(w.isFull).toBe(false);
    w.push(3);
    expect(w.isFull).toBe(true);
  });

  it("gets latest and oldest", () => {
    const w = new SlidingWindow<string>(3);
    w.push("a");
    w.push("b");
    w.push("c");
    expect(w.oldest()).toBe("a");
    expect(w.latest()).toBe("c");
  });

  it("accesses by index with at()", () => {
    const w = new SlidingWindow<number>(5);
    w.push(10);
    w.push(20);
    w.push(30);
    expect(w.at(0)).toBe(10);
    expect(w.at(2)).toBe(30);
    expect(w.at(-1)).toBe(30);
  });

  it("clears the window", () => {
    const w = new SlidingWindow<number>(3);
    w.push(1);
    w.push(2);
    w.clear();
    expect(w.size).toBe(0);
    expect(w.toArray()).toEqual([]);
  });

  it("reduces over values", () => {
    const w = new SlidingWindow<number>(5);
    w.push(1);
    w.push(2);
    w.push(3);
    expect(w.reduce((sum, v) => sum + v, 0)).toBe(6);
  });

  it("some and every predicates", () => {
    const w = new SlidingWindow<number>(5);
    w.push(2);
    w.push(4);
    w.push(6);
    expect(w.every((v) => v % 2 === 0)).toBe(true);
    expect(w.some((v) => v > 5)).toBe(true);
    expect(w.some((v) => v > 10)).toBe(false);
  });

  it("is iterable", () => {
    const w = new SlidingWindow<number>(3);
    w.push(1);
    w.push(2);
    w.push(3);
    expect([...w]).toEqual([1, 2, 3]);
  });

  it("throws on invalid capacity", () => {
    expect(() => new SlidingWindow(0)).toThrow();
    expect(() => new SlidingWindow(-1)).toThrow();
  });

  it("returns undefined for empty latest/oldest", () => {
    const w = new SlidingWindow<number>(3);
    expect(w.latest()).toBeUndefined();
    expect(w.oldest()).toBeUndefined();
  });
});
