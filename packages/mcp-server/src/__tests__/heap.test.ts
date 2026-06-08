import { describe, it, expect } from "vitest";
import { MinHeap, MaxHeap, heapSort, kSmallest } from "../heap.js";

describe("MinHeap", () => {
  it("maintains min order", () => {
    const h = new MinHeap<number>();
    h.push(5); h.push(1); h.push(3);
    expect(h.peek()).toBe(1);
    expect(h.pop()).toBe(1);
    expect(h.pop()).toBe(3);
    expect(h.pop()).toBe(5);
  });

  it("size and isEmpty", () => {
    const h = new MinHeap<number>();
    expect(h.isEmpty()).toBe(true);
    h.push(1);
    expect(h.size).toBe(1);
    expect(h.isEmpty()).toBe(false);
  });

  it("pushPop returns smallest", () => {
    const h = new MinHeap<number>();
    h.push(3); h.push(5);
    expect(h.pushPop(1)).toBe(1);
    expect(h.pushPop(10)).toBe(3);
  });

  it("from builds heap from array", () => {
    const h = MinHeap.from([5, 3, 8, 1, 2]);
    expect(h.pop()).toBe(1);
    expect(h.pop()).toBe(2);
  });

  it("toArray returns sorted", () => {
    const h = MinHeap.from([9, 1, 5, 3]);
    expect(h.toArray()).toEqual([1, 3, 5, 9]);
  });

  it("clear empties the heap", () => {
    const h = MinHeap.from([1, 2, 3]);
    h.clear();
    expect(h.isEmpty()).toBe(true);
  });

  it("custom comparator", () => {
    const h = new MinHeap<string>((a, b) => a.length - b.length);
    h.push("medium"); h.push("hi"); h.push("longword");
    expect(h.pop()).toBe("hi");
  });
});

describe("MaxHeap", () => {
  it("maintains max order", () => {
    const h = new MaxHeap<number>();
    h.push(1); h.push(5); h.push(3);
    expect(h.peek()).toBe(5);
    expect(h.pop()).toBe(5);
    expect(h.pop()).toBe(3);
    expect(h.pop()).toBe(1);
  });

  it("from builds max heap", () => {
    const h = MaxHeap.from([1, 9, 3]);
    expect(h.pop()).toBe(9);
  });
});

describe("heapSort", () => {
  it("sorts numbers ascending", () => {
    expect(heapSort([5, 2, 8, 1, 9, 3])).toEqual([1, 2, 3, 5, 8, 9]);
  });

  it("empty array", () => {
    expect(heapSort([])).toEqual([]);
  });
});

describe("kSmallest", () => {
  it("finds k smallest elements", () => {
    expect(kSmallest([5, 2, 8, 1, 9, 3], 3)).toEqual([1, 2, 3]);
  });

  it("k larger than array", () => {
    expect(kSmallest([3, 1], 5)).toEqual([1, 3]);
  });
});
