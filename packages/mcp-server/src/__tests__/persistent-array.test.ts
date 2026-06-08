import { describe, it, expect } from "vitest";
import { PersistentArray } from "../persistent-array.js";

describe("PersistentArray", () => {
  it("get returns default value", () => {
    const arr = new PersistentArray<number>(5, 0);
    expect(arr.get(0)).toBe(0);
    expect(arr.get(4)).toBe(0);
  });

  it("set returns new version without mutating original", () => {
    const v0 = new PersistentArray<string>(3, "x");
    const v1 = v0.set(1, "y");
    expect(v0.get(1)).toBe("x");
    expect(v1.get(1)).toBe("y");
    expect(v1.get(0)).toBe("x");
  });

  it("multiple versions coexist", () => {
    const v0 = new PersistentArray<number>(4, 0);
    const v1 = v0.set(0, 10);
    const v2 = v1.set(1, 20);
    const v3 = v0.set(2, 30);
    expect(v0.toArray()).toEqual([0, 0, 0, 0]);
    expect(v1.toArray()).toEqual([10, 0, 0, 0]);
    expect(v2.toArray()).toEqual([10, 20, 0, 0]);
    expect(v3.toArray()).toEqual([0, 0, 30, 0]);
  });

  it("size returns array length", () => {
    const arr = new PersistentArray<number>(7, 0);
    expect(arr.size()).toBe(7);
  });

  it("toArray returns all elements", () => {
    const arr = new PersistentArray<number>(3, 5);
    expect(arr.toArray()).toEqual([5, 5, 5]);
  });

  it("chained sets produce correct array", () => {
    let arr = new PersistentArray<number>(3, 0);
    arr = arr.set(0, 1);
    arr = arr.set(1, 2);
    arr = arr.set(2, 3);
    expect(arr.toArray()).toEqual([1, 2, 3]);
  });

  it("size 1 works", () => {
    const arr = new PersistentArray<string>(1, "hello");
    expect(arr.get(0)).toBe("hello");
    const v2 = arr.set(0, "world");
    expect(v2.get(0)).toBe("world");
    expect(arr.get(0)).toBe("hello");
  });
});
