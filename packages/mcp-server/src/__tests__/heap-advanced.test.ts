import { describe, it, expect } from "vitest";
import { MinMaxHeap, FibonacciHeap } from "../heap-advanced.js";

describe("MinMaxHeap", () => {
  it("peeks min and max", () => {
    const h = new MinMaxHeap<number>();
    h.push(5);
    h.push(1);
    h.push(10);
    h.push(3);
    expect(h.peekMin()).toBe(1);
    expect(h.peekMax()).toBe(10);
  });

  it("pops min correctly", () => {
    const h = new MinMaxHeap<number>();
    [4, 2, 8, 1, 6].forEach((v) => h.push(v));
    expect(h.popMin()).toBe(1);
    expect(h.popMin()).toBe(2);
    expect(h.popMin()).toBe(4);
  });

  it("pops max correctly", () => {
    const h = new MinMaxHeap<number>();
    [4, 2, 8, 1, 6].forEach((v) => h.push(v));
    expect(h.popMax()).toBe(8);
    expect(h.popMax()).toBe(6);
  });

  it("handles single element", () => {
    const h = new MinMaxHeap<number>();
    h.push(42);
    expect(h.peekMin()).toBe(42);
    expect(h.peekMax()).toBe(42);
    expect(h.popMin()).toBe(42);
    expect(h.isEmpty()).toBe(true);
  });

  it("handles two elements", () => {
    const h = new MinMaxHeap<number>();
    h.push(5);
    h.push(3);
    expect(h.peekMin()).toBe(3);
    expect(h.peekMax()).toBe(5);
  });

  it("reports size and isEmpty", () => {
    const h = new MinMaxHeap<number>();
    expect(h.isEmpty()).toBe(true);
    expect(h.size()).toBe(0);
    h.push(1);
    expect(h.isEmpty()).toBe(false);
    expect(h.size()).toBe(1);
  });

  it("returns undefined on empty pop", () => {
    const h = new MinMaxHeap<number>();
    expect(h.popMin()).toBeUndefined();
    expect(h.popMax()).toBeUndefined();
    expect(h.peekMin()).toBeUndefined();
  });

  it("handles many elements", () => {
    const h = new MinMaxHeap<number>();
    const values = [15, 3, 9, 1, 20, 7, 12, 5, 18, 2];
    values.forEach((v) => h.push(v));
    expect(h.peekMin()).toBe(1);
    expect(h.peekMax()).toBe(20);
    expect(h.size()).toBe(10);
  });
});

describe("FibonacciHeap", () => {
  it("inserts and peeks min", () => {
    const h = new FibonacciHeap<number>();
    h.insert(5);
    h.insert(2);
    h.insert(8);
    expect(h.peekMin()).toBe(2);
  });

  it("extracts min in order", () => {
    const h = new FibonacciHeap<number>();
    [5, 1, 3, 2, 4].forEach((v) => h.insert(v));
    expect(h.extractMin()).toBe(1);
    expect(h.extractMin()).toBe(2);
    expect(h.extractMin()).toBe(3);
  });

  it("reports size and isEmpty", () => {
    const h = new FibonacciHeap<number>();
    expect(h.isEmpty()).toBe(true);
    h.insert(1);
    expect(h.size()).toBe(1);
    h.extractMin();
    expect(h.isEmpty()).toBe(true);
  });

  it("returns undefined on empty extract", () => {
    const h = new FibonacciHeap<number>();
    expect(h.extractMin()).toBeUndefined();
    expect(h.peekMin()).toBeUndefined();
  });
});
