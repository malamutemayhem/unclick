import { describe, it, expect } from "vitest";
import { RingAllocator } from "../ring-allocator.js";

describe("RingAllocator", () => {
  it("allocate and release", () => {
    const ring = new RingAllocator<number>(3);
    ring.allocate(1);
    ring.allocate(2);
    expect(ring.release()).toBe(1);
    expect(ring.release()).toBe(2);
  });

  it("size tracks count", () => {
    const ring = new RingAllocator<number>(5);
    expect(ring.size).toBe(0);
    ring.allocate(1);
    ring.allocate(2);
    expect(ring.size).toBe(2);
  });

  it("isEmpty and isFull", () => {
    const ring = new RingAllocator<number>(2);
    expect(ring.isEmpty).toBe(true);
    expect(ring.isFull).toBe(false);
    ring.allocate(1);
    ring.allocate(2);
    expect(ring.isFull).toBe(true);
    expect(ring.isEmpty).toBe(false);
  });

  it("allocate evicts oldest when full", () => {
    const ring = new RingAllocator<number>(2);
    ring.allocate(1);
    ring.allocate(2);
    const evicted = ring.allocate(3);
    expect(evicted).toBe(1);
    expect(ring.size).toBe(2);
  });

  it("allocate returns undefined when not full", () => {
    const ring = new RingAllocator<number>(5);
    expect(ring.allocate(1)).toBeUndefined();
  });

  it("release returns undefined when empty", () => {
    const ring = new RingAllocator<number>(3);
    expect(ring.release()).toBeUndefined();
  });

  it("peek returns oldest without removing", () => {
    const ring = new RingAllocator<number>(3);
    ring.allocate(10);
    ring.allocate(20);
    expect(ring.peek()).toBe(10);
    expect(ring.size).toBe(2);
  });

  it("peekLast returns newest", () => {
    const ring = new RingAllocator<number>(3);
    ring.allocate(10);
    ring.allocate(20);
    expect(ring.peekLast()).toBe(20);
  });

  it("at returns element by index", () => {
    const ring = new RingAllocator<number>(5);
    ring.allocate(10);
    ring.allocate(20);
    ring.allocate(30);
    expect(ring.at(0)).toBe(10);
    expect(ring.at(2)).toBe(30);
    expect(ring.at(5)).toBeUndefined();
  });

  it("toArray returns all elements in order", () => {
    const ring = new RingAllocator<number>(3);
    ring.allocate(1);
    ring.allocate(2);
    ring.allocate(3);
    expect(ring.toArray()).toEqual([1, 2, 3]);
  });

  it("toArray after wrap-around", () => {
    const ring = new RingAllocator<number>(3);
    ring.allocate(1);
    ring.allocate(2);
    ring.allocate(3);
    ring.allocate(4);
    expect(ring.toArray()).toEqual([2, 3, 4]);
  });

  it("clear resets state", () => {
    const ring = new RingAllocator<number>(3);
    ring.allocate(1);
    ring.allocate(2);
    ring.clear();
    expect(ring.size).toBe(0);
    expect(ring.isEmpty).toBe(true);
  });

  it("is iterable", () => {
    const ring = new RingAllocator<number>(3);
    ring.allocate(5);
    ring.allocate(10);
    expect([...ring]).toEqual([5, 10]);
  });
});
