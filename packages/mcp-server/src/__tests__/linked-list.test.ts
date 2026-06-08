import { describe, it, expect } from "vitest";
import { LinkedList } from "../linked-list.js";

describe("LinkedList", () => {
  it("pushBack and popFront", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.popFront()).toBe(1);
    expect(list.popFront()).toBe(2);
  });

  it("pushFront and popBack", () => {
    const list = new LinkedList<number>();
    list.pushFront(1);
    list.pushFront(2);
    expect(list.popBack()).toBe(1);
    expect(list.popBack()).toBe(2);
  });

  it("peek operations", () => {
    const list = new LinkedList<number>();
    list.pushBack(10);
    list.pushBack(20);
    expect(list.peekFront()).toBe(10);
    expect(list.peekBack()).toBe(20);
  });

  it("size and isEmpty", () => {
    const list = new LinkedList<number>();
    expect(list.isEmpty).toBe(true);
    list.pushBack(1);
    expect(list.size).toBe(1);
    expect(list.isEmpty).toBe(false);
  });

  it("find locates element", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.find((v) => v === 2)).toBe(2);
    expect(list.find((v) => v === 99)).toBeUndefined();
  });

  it("remove deletes element", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.remove((v) => v === 2)).toBe(true);
    expect(list.toArray()).toEqual([1, 3]);
  });

  it("toArray returns ordered", () => {
    const list = new LinkedList<string>();
    list.pushBack("a");
    list.pushBack("b");
    list.pushBack("c");
    expect(list.toArray()).toEqual(["a", "b", "c"]);
  });

  it("clear resets", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.clear();
    expect(list.size).toBe(0);
    expect(list.isEmpty).toBe(true);
  });

  it("reverse flips order", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    list.reverse();
    expect(list.toArray()).toEqual([3, 2, 1]);
  });

  it("iterator works", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    expect([...list]).toEqual([1, 2]);
  });

  it("pop from empty returns undefined", () => {
    const list = new LinkedList<number>();
    expect(list.popFront()).toBeUndefined();
    expect(list.popBack()).toBeUndefined();
  });
});
