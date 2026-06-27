import { describe, it, expect } from "vitest";
import { BinomialHeap } from "../binomial-heap.js";

describe("BinomialHeap", () => {
  it("insert and peekMin return minimum", () => {
    const h = new BinomialHeap<string>();
    h.insert(5, "five");
    h.insert(2, "two");
    h.insert(8, "eight");
    expect(h.peekMin()).toEqual({ key: 2, value: "two" });
  });

  it("extractMin removes in sorted order", () => {
    const h = new BinomialHeap<number>();
    h.insert(3, 3);
    h.insert(1, 1);
    h.insert(4, 4);
    h.insert(2, 2);
    expect(h.extractMin()?.key).toBe(1);
    expect(h.extractMin()?.key).toBe(2);
    expect(h.extractMin()?.key).toBe(3);
    expect(h.extractMin()?.key).toBe(4);
  });

  it("size tracks count", () => {
    const h = new BinomialHeap<string>();
    h.insert(1, "a");
    h.insert(2, "b");
    expect(h.size()).toBe(2);
    h.extractMin();
    expect(h.size()).toBe(1);
  });

  it("isEmpty works", () => {
    const h = new BinomialHeap<number>();
    expect(h.isEmpty()).toBe(true);
    h.insert(1, 1);
    expect(h.isEmpty()).toBe(false);
  });

  it("merge combines two heaps", () => {
    const a = new BinomialHeap<number>();
    const b = new BinomialHeap<number>();
    a.insert(5, 5);
    a.insert(1, 1);
    b.insert(3, 3);
    b.insert(7, 7);
    a.merge(b);
    expect(a.size()).toBe(4);
    expect(a.peekMin()?.key).toBe(1);
  });

  it("handles many insertions and extractions", () => {
    const h = new BinomialHeap<number>();
    const values = [10, 5, 15, 2, 8, 20, 1, 12];
    for (const v of values) h.insert(v, v);
    const sorted: number[] = [];
    while (!h.isEmpty()) sorted.push(h.extractMin()!.key);
    expect(sorted).toEqual([...values].sort((a, b) => a - b));
  });

  it("extractMin on empty returns undefined", () => {
    const h = new BinomialHeap<number>();
    expect(h.extractMin()).toBeUndefined();
  });

  it("peekMin on empty returns undefined", () => {
    const h = new BinomialHeap<number>();
    expect(h.peekMin()).toBeUndefined();
  });
});
