import { describe, it, expect } from "vitest";
import { LinkedList } from "../linked-list.js";

describe("LinkedList", () => {
  it("pushBack and toArray", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1);
    ll.pushBack(2);
    ll.pushBack(3);
    expect(ll.toArray()).toEqual([1, 2, 3]);
  });

  it("pushFront prepends", () => {
    const ll = new LinkedList<number>();
    ll.pushFront(3);
    ll.pushFront(2);
    ll.pushFront(1);
    expect(ll.toArray()).toEqual([1, 2, 3]);
  });

  it("popBack removes last", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1);
    ll.pushBack(2);
    expect(ll.popBack()).toBe(2);
    expect(ll.toArray()).toEqual([1]);
  });

  it("popFront removes first", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1);
    ll.pushBack(2);
    expect(ll.popFront()).toBe(1);
    expect(ll.toArray()).toEqual([2]);
  });

  it("peek without removing", () => {
    const ll = new LinkedList<string>();
    ll.pushBack("a");
    ll.pushBack("b");
    expect(ll.peekFront()).toBe("a");
    expect(ll.peekBack()).toBe("b");
    expect(ll.size).toBe(2);
  });

  it("empty list returns undefined", () => {
    const ll = new LinkedList<number>();
    expect(ll.popFront()).toBeUndefined();
    expect(ll.popBack()).toBeUndefined();
    expect(ll.peekFront()).toBeUndefined();
  });

  it("size tracks count", () => {
    const ll = new LinkedList<number>();
    expect(ll.size).toBe(0);
    expect(ll.isEmpty()).toBe(true);
    ll.pushBack(1);
    expect(ll.size).toBe(1);
    expect(ll.isEmpty()).toBe(false);
  });

  it("find locates value", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1);
    ll.pushBack(2);
    ll.pushBack(3);
    expect(ll.find((v) => v === 2)).toBe(2);
    expect(ll.find((v) => v === 5)).toBeUndefined();
  });

  it("remove deletes matching node", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1);
    ll.pushBack(2);
    ll.pushBack(3);
    expect(ll.remove((v) => v === 2)).toBe(true);
    expect(ll.toArray()).toEqual([1, 3]);
    expect(ll.remove((v) => v === 5)).toBe(false);
  });

  it("clear empties list", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1);
    ll.pushBack(2);
    ll.clear();
    expect(ll.size).toBe(0);
    expect(ll.toArray()).toEqual([]);
  });
});
