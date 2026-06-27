import { describe, it, expect } from "vitest";
import { FibonacciHeap } from "../fibonacci-heap.js";

describe("FibonacciHeap", () => {
  it("insert and peekMin return minimum", () => {
    const h = new FibonacciHeap<string>();
    h.insert(5, "five");
    h.insert(3, "three");
    h.insert(7, "seven");
    expect(h.peekMin()).toEqual({ key: 3, value: "three" });
  });

  it("extractMin removes minimum element", () => {
    const h = new FibonacciHeap<string>();
    h.insert(10, "ten");
    h.insert(1, "one");
    h.insert(5, "five");
    expect(h.extractMin()).toEqual({ key: 1, value: "one" });
    expect(h.extractMin()).toEqual({ key: 5, value: "five" });
    expect(h.extractMin()).toEqual({ key: 10, value: "ten" });
  });

  it("size tracks count", () => {
    const h = new FibonacciHeap<number>();
    expect(h.size()).toBe(0);
    h.insert(1, 100);
    h.insert(2, 200);
    expect(h.size()).toBe(2);
    h.extractMin();
    expect(h.size()).toBe(1);
  });

  it("isEmpty returns correct state", () => {
    const h = new FibonacciHeap<number>();
    expect(h.isEmpty()).toBe(true);
    h.insert(1, 1);
    expect(h.isEmpty()).toBe(false);
  });

  it("extractMin from empty returns undefined", () => {
    const h = new FibonacciHeap<number>();
    expect(h.extractMin()).toBeUndefined();
  });

  it("peekMin from empty returns undefined", () => {
    const h = new FibonacciHeap<number>();
    expect(h.peekMin()).toBeUndefined();
  });

  it("handles many insertions and extractions", () => {
    const h = new FibonacciHeap<number>();
    const values = [15, 3, 8, 1, 12, 7, 20, 2, 9, 5];
    for (const v of values) h.insert(v, v);
    const sorted: number[] = [];
    while (!h.isEmpty()) {
      sorted.push(h.extractMin()!.key);
    }
    expect(sorted).toEqual([...values].sort((a, b) => a - b));
  });

  it("merge combines two heaps", () => {
    const a = new FibonacciHeap<string>();
    const b = new FibonacciHeap<string>();
    a.insert(5, "a5");
    a.insert(3, "a3");
    b.insert(1, "b1");
    b.insert(7, "b7");
    a.merge(b);
    expect(a.size()).toBe(4);
    expect(a.peekMin()?.key).toBe(1);
  });

  it("extracts in sorted order after merge", () => {
    const a = new FibonacciHeap<number>();
    const b = new FibonacciHeap<number>();
    a.insert(4, 4);
    a.insert(2, 2);
    b.insert(3, 3);
    b.insert(1, 1);
    a.merge(b);
    const result: number[] = [];
    while (!a.isEmpty()) result.push(a.extractMin()!.key);
    expect(result).toEqual([1, 2, 3, 4]);
  });
});
