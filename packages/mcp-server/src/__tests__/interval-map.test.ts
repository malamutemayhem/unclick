import { describe, it, expect } from "vitest";
import { IntervalMap } from "../interval-map.js";

describe("IntervalMap", () => {
  it("set and get", () => {
    const m = new IntervalMap<string>();
    m.set(1, 5, "a");
    m.set(3, 7, "b");
    expect(m.get(4)).toEqual(["a", "b"]);
    expect(m.get(6)).toEqual(["b"]);
    expect(m.get(0)).toEqual([]);
  });

  it("getFirst returns first match", () => {
    const m = new IntervalMap<string>();
    m.set(1, 5, "first");
    m.set(3, 7, "second");
    expect(m.getFirst(4)).toBe("first");
    expect(m.getFirst(10)).toBeUndefined();
  });

  it("overlapping finds intersecting intervals", () => {
    const m = new IntervalMap<number>();
    m.set(1, 3, 1);
    m.set(5, 7, 2);
    m.set(6, 9, 3);
    const result = m.overlapping(4, 6);
    expect(result.length).toBe(2);
  });

  it("remove deletes interval", () => {
    const m = new IntervalMap<string>();
    m.set(1, 5, "a");
    expect(m.remove(1, 5)).toBe(true);
    expect(m.size()).toBe(0);
    expect(m.remove(1, 5)).toBe(false);
  });

  it("containsPoint checks coverage", () => {
    const m = new IntervalMap<number>();
    m.set(10, 20, 1);
    expect(m.containsPoint(15)).toBe(true);
    expect(m.containsPoint(25)).toBe(false);
  });

  it("span returns overall range", () => {
    const m = new IntervalMap<number>();
    m.set(5, 10, 1);
    m.set(1, 3, 2);
    m.set(8, 15, 3);
    expect(m.span()).toEqual({ lo: 1, hi: 15 });
  });

  it("clear empties map", () => {
    const m = new IntervalMap<number>();
    m.set(1, 5, 1);
    m.clear();
    expect(m.size()).toBe(0);
  });

  it("empty span returns undefined", () => {
    const m = new IntervalMap<number>();
    expect(m.span()).toBeUndefined();
  });
});
