import { describe, it, expect } from "vitest";
import { MinHeap, MaxHeap } from "../heap.js";

describe("MinHeap", () => {
  it("pops in priority order", () => {
    const h = new MinHeap<string>();
    h.push("low", 10);
    h.push("high", 1);
    h.push("mid", 5);
    expect(h.pop()).toBe("high");
    expect(h.pop()).toBe("mid");
    expect(h.pop()).toBe("low");
  });

  it("peek returns min without removing", () => {
    const h = new MinHeap<string>();
    h.push("a", 5);
    h.push("b", 1);
    expect(h.peek()).toBe("b");
    expect(h.size).toBe(2);
  });

  it("peekPriority returns min priority", () => {
    const h = new MinHeap<string>();
    h.push("a", 5);
    h.push("b", 1);
    expect(h.peekPriority()).toBe(1);
  });

  it("handles empty heap", () => {
    const h = new MinHeap();
    expect(h.pop()).toBeUndefined();
    expect(h.peek()).toBeUndefined();
    expect(h.isEmpty()).toBe(true);
  });

  it("toArray returns sorted", () => {
    const h = new MinHeap<string>();
    h.push("c", 3);
    h.push("a", 1);
    h.push("b", 2);
    expect(h.toArray()).toEqual(["a", "b", "c"]);
  });

  it("clear empties heap", () => {
    const h = new MinHeap<number>();
    h.push(1, 1);
    h.clear();
    expect(h.size).toBe(0);
  });
});

describe("MaxHeap", () => {
  it("pops highest priority first", () => {
    const h = new MaxHeap<string>();
    h.push("low", 1);
    h.push("high", 10);
    h.push("mid", 5);
    expect(h.pop()).toBe("high");
    expect(h.pop()).toBe("mid");
    expect(h.pop()).toBe("low");
  });

  it("peek returns max", () => {
    const h = new MaxHeap<string>();
    h.push("a", 1);
    h.push("b", 10);
    expect(h.peek()).toBe("b");
  });

  it("isEmpty and size", () => {
    const h = new MaxHeap<string>();
    expect(h.isEmpty()).toBe(true);
    h.push("a", 1);
    expect(h.size).toBe(1);
    expect(h.isEmpty()).toBe(false);
  });
});
