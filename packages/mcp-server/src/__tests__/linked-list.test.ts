import { describe, it, expect } from "vitest";
import { LinkedList } from "../linked-list.js";

describe("linked-list", () => {
  it("pushBack adds to the end", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.toArray()).toEqual([1, 2, 3]);
    expect(list.size).toBe(3);
  });

  it("pushFront adds to the start", () => {
    const list = new LinkedList<number>();
    list.pushFront(1);
    list.pushFront(2);
    list.pushFront(3);
    expect(list.toArray()).toEqual([3, 2, 1]);
  });

  it("popBack removes from end", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    expect(list.popBack()).toBe(2);
    expect(list.toArray()).toEqual([1]);
  });

  it("popFront removes from start", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    expect(list.popFront()).toBe(1);
    expect(list.toArray()).toEqual([2]);
  });

  it("remove deletes a specific node", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    const node = list.pushBack(2);
    list.pushBack(3);
    list.remove(node);
    expect(list.toArray()).toEqual([1, 3]);
    expect(list.size).toBe(2);
  });

  it("find locates a node by predicate", () => {
    const list = new LinkedList<string>();
    list.pushBack("a");
    list.pushBack("b");
    list.pushBack("c");
    const found = list.find((v) => v === "b");
    expect(found?.value).toBe("b");
    expect(list.find((v) => v === "z")).toBeNull();
  });

  it("toArrayReverse walks backwards", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.toArrayReverse()).toEqual([3, 2, 1]);
  });

  it("clear empties the list", () => {
    const list = new LinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.clear();
    expect(list.size).toBe(0);
    expect(list.toArray()).toEqual([]);
  });

  it("is iterable", () => {
    const list = new LinkedList<number>();
    list.pushBack(10);
    list.pushBack(20);
    expect([...list]).toEqual([10, 20]);
  });

  it("popBack on empty returns undefined", () => {
    const list = new LinkedList<number>();
    expect(list.popBack()).toBeUndefined();
    expect(list.popFront()).toBeUndefined();
  });
});
