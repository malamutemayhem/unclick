import { describe, it, expect } from "vitest";
import { PersistentList } from "../persistent-list.js";

describe("PersistentList", () => {
  it("creates empty list", () => {
    const list = PersistentList.empty<number>();
    expect(list.size).toBe(0);
    expect(list.isEmpty).toBe(true);
  });

  it("creates from values", () => {
    const list = PersistentList.of(1, 2, 3);
    expect(list.toArray()).toEqual([1, 2, 3]);
    expect(list.size).toBe(3);
  });

  it("prepend creates new list", () => {
    const a = PersistentList.of(2, 3);
    const b = a.prepend(1);
    expect(b.toArray()).toEqual([1, 2, 3]);
    expect(a.toArray()).toEqual([2, 3]);
  });

  it("first returns head value", () => {
    const list = PersistentList.of(10, 20);
    expect(list.first()).toBe(10);
  });

  it("first on empty returns undefined", () => {
    expect(PersistentList.empty().first()).toBeUndefined();
  });

  it("rest returns tail", () => {
    const list = PersistentList.of(1, 2, 3);
    expect(list.rest().toArray()).toEqual([2, 3]);
  });

  it("rest on empty returns empty", () => {
    const list = PersistentList.empty();
    expect(list.rest().isEmpty).toBe(true);
  });

  it("get by index", () => {
    const list = PersistentList.of("a", "b", "c");
    expect(list.get(0)).toBe("a");
    expect(list.get(1)).toBe("b");
    expect(list.get(2)).toBe("c");
    expect(list.get(5)).toBeUndefined();
  });

  it("map transforms values", () => {
    const list = PersistentList.of(1, 2, 3);
    const doubled = list.map((x) => x * 2);
    expect(doubled.toArray()).toEqual([2, 4, 6]);
  });

  it("filter selects values", () => {
    const list = PersistentList.of(1, 2, 3, 4, 5);
    const evens = list.filter((x) => x % 2 === 0);
    expect(evens.toArray()).toEqual([2, 4]);
  });

  it("reduce accumulates", () => {
    const list = PersistentList.of(1, 2, 3);
    expect(list.reduce((acc, x) => acc + x, 0)).toBe(6);
  });

  it("reverse", () => {
    const list = PersistentList.of(1, 2, 3);
    expect(list.reverse().toArray()).toEqual([3, 2, 1]);
  });

  it("concat", () => {
    const a = PersistentList.of(1, 2);
    const b = PersistentList.of(3, 4);
    expect(a.concat(b).toArray()).toEqual([1, 2, 3, 4]);
  });

  it("find", () => {
    const list = PersistentList.of(1, 2, 3, 4);
    expect(list.find((x) => x > 2)).toBe(3);
    expect(list.find((x) => x > 10)).toBeUndefined();
  });

  it("includes", () => {
    const list = PersistentList.of("a", "b", "c");
    expect(list.includes("b")).toBe(true);
    expect(list.includes("z")).toBe(false);
  });

  it("is iterable", () => {
    const list = PersistentList.of(1, 2, 3);
    expect([...list]).toEqual([1, 2, 3]);
  });

  it("structural sharing preserves old versions", () => {
    const v1 = PersistentList.of(1, 2, 3);
    const v2 = v1.prepend(0);
    const v3 = v2.rest();
    expect(v1.toArray()).toEqual([1, 2, 3]);
    expect(v2.toArray()).toEqual([0, 1, 2, 3]);
    expect(v3.toArray()).toEqual([1, 2, 3]);
  });
});
