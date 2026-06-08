import { describe, it, expect } from "vitest";
import { PairingHeap } from "../pairing-heap.js";

describe("PairingHeap", () => {
  it("insert and peekMin return minimum", () => {
    const h = new PairingHeap<string>();
    h.insert(5, "five");
    h.insert(2, "two");
    h.insert(8, "eight");
    expect(h.peekMin()).toEqual({ key: 2, value: "two" });
  });

  it("extractMin removes in sorted order", () => {
    const h = new PairingHeap<number>();
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
    const h = new PairingHeap<string>();
    h.insert(1, "a");
    h.insert(2, "b");
    expect(h.size()).toBe(2);
    h.extractMin();
    expect(h.size()).toBe(1);
  });

  it("isEmpty works", () => {
    const h = new PairingHeap<number>();
    expect(h.isEmpty()).toBe(true);
    h.insert(1, 1);
    expect(h.isEmpty()).toBe(false);
  });

  it("merge combines two heaps", () => {
    const a = new PairingHeap<number>();
    const b = new PairingHeap<number>();
    a.insert(5, 5);
    a.insert(1, 1);
    b.insert(3, 3);
    b.insert(7, 7);
    a.merge(b);
    expect(a.size()).toBe(4);
    expect(a.peekMin()?.key).toBe(1);
    expect(b.isEmpty()).toBe(true);
  });

  it("toSortedArray returns elements in order", () => {
    const h = new PairingHeap<string>();
    h.insert(5, "e");
    h.insert(1, "a");
    h.insert(3, "c");
    const sorted = h.toSortedArray();
    expect(sorted.map((s) => s.key)).toEqual([1, 3, 5]);
    expect(h.size()).toBe(3);
  });

  it("handles many elements", () => {
    const h = new PairingHeap<number>();
    const values = [10, 5, 15, 2, 8, 20, 1, 12, 7, 3];
    for (const v of values) h.insert(v, v);
    const sorted: number[] = [];
    while (!h.isEmpty()) sorted.push(h.extractMin()!.key);
    expect(sorted).toEqual([...values].sort((a, b) => a - b));
  });

  it("extractMin and peekMin on empty return undefined", () => {
    const h = new PairingHeap<number>();
    expect(h.extractMin()).toBeUndefined();
    expect(h.peekMin()).toBeUndefined();
  });
});
