import { describe, it, expect } from "vitest";
import { LeftistHeap } from "../leftist-heap.js";

describe("LeftistHeap", () => {
  it("insert and peekMin return minimum", () => {
    const h = new LeftistHeap<string>();
    h.insert(5, "five");
    h.insert(3, "three");
    h.insert(7, "seven");
    expect(h.peekMin()).toEqual({ key: 3, value: "three" });
  });

  it("extractMin removes in sorted order", () => {
    const h = new LeftistHeap<number>();
    h.insert(4, 4);
    h.insert(1, 1);
    h.insert(3, 3);
    h.insert(2, 2);
    expect(h.extractMin()?.key).toBe(1);
    expect(h.extractMin()?.key).toBe(2);
    expect(h.extractMin()?.key).toBe(3);
    expect(h.extractMin()?.key).toBe(4);
  });

  it("size tracks count", () => {
    const h = new LeftistHeap<string>();
    h.insert(1, "a");
    h.insert(2, "b");
    expect(h.size()).toBe(2);
    h.extractMin();
    expect(h.size()).toBe(1);
  });

  it("isEmpty returns correct state", () => {
    const h = new LeftistHeap<number>();
    expect(h.isEmpty()).toBe(true);
    h.insert(1, 1);
    expect(h.isEmpty()).toBe(false);
  });

  it("merge combines two heaps", () => {
    const a = new LeftistHeap<number>();
    const b = new LeftistHeap<number>();
    a.insert(3, 3);
    a.insert(1, 1);
    b.insert(2, 2);
    b.insert(4, 4);
    const merged = a.merge(b);
    expect(merged.size()).toBe(4);
    expect(merged.peekMin()?.key).toBe(1);
  });

  it("toSortedArray returns sorted elements", () => {
    const h = new LeftistHeap<string>();
    h.insert(5, "e");
    h.insert(1, "a");
    h.insert(3, "c");
    const sorted = h.toSortedArray();
    expect(sorted.map((s) => s.key)).toEqual([1, 3, 5]);
    expect(h.size()).toBe(3);
  });

  it("extractMin on empty returns undefined", () => {
    const h = new LeftistHeap<number>();
    expect(h.extractMin()).toBeUndefined();
  });

  it("peekMin on empty returns undefined", () => {
    const h = new LeftistHeap<number>();
    expect(h.peekMin()).toBeUndefined();
  });
});
