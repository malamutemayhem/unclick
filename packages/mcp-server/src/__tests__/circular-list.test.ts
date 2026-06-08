import { describe, it, expect } from "vitest";
import { CircularList } from "../circular-list.js";

describe("CircularList", () => {
  it("add and size work correctly", () => {
    const cl = new CircularList<number>();
    cl.add(1);
    cl.add(2);
    cl.add(3);
    expect(cl.size()).toBe(3);
  });

  it("next wraps around circularly", () => {
    const cl = new CircularList([10, 20, 30]);
    expect(cl.next()).toBe(10);
    expect(cl.next()).toBe(20);
    expect(cl.next()).toBe(30);
    expect(cl.next()).toBe(10);
  });

  it("prev moves backward circularly", () => {
    const cl = new CircularList([10, 20, 30]);
    expect(cl.prev()).toBe(30);
    expect(cl.prev()).toBe(20);
  });

  it("get wraps negative indices", () => {
    const cl = new CircularList(["a", "b", "c"]);
    expect(cl.get(-1)).toBe("c");
    expect(cl.get(3)).toBe("a");
  });

  it("remove removes element and adjusts cursor", () => {
    const cl = new CircularList([1, 2, 3]);
    const removed = cl.remove(1);
    expect(removed).toBe(2);
    expect(cl.size()).toBe(2);
    expect(cl.toArray()).toEqual([1, 3]);
  });

  it("rotate shifts elements", () => {
    const cl = new CircularList([1, 2, 3, 4]);
    cl.rotate(1);
    expect(cl.toArray()).toEqual([2, 3, 4, 1]);
  });

  it("contains checks membership", () => {
    const cl = new CircularList([5, 10, 15]);
    expect(cl.contains(10)).toBe(true);
    expect(cl.contains(20)).toBe(false);
  });

  it("map transforms elements", () => {
    const cl = new CircularList([1, 2, 3]);
    const doubled = cl.map((x) => x * 2);
    expect(doubled.toArray()).toEqual([2, 4, 6]);
  });

  it("filter keeps matching elements", () => {
    const cl = new CircularList([1, 2, 3, 4, 5]);
    const evens = cl.filter((x) => x % 2 === 0);
    expect(evens.toArray()).toEqual([2, 4]);
  });

  it("clear empties the list", () => {
    const cl = new CircularList([1, 2, 3]);
    cl.clear();
    expect(cl.size()).toBe(0);
    expect(cl.current()).toBeUndefined();
  });
});
