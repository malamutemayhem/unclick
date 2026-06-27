import { describe, it, expect } from "vitest";
import { LinkedList } from "../linked-list.js";

describe("LinkedList", () => {
  it("pushBack and popFront", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1); ll.pushBack(2); ll.pushBack(3);
    expect(ll.popFront()).toBe(1);
    expect(ll.popFront()).toBe(2);
    expect(ll.size).toBe(1);
  });
  it("pushFront and popBack", () => {
    const ll = new LinkedList<number>();
    ll.pushFront(1); ll.pushFront(2);
    expect(ll.popBack()).toBe(1);
    expect(ll.popBack()).toBe(2);
  });
  it("peek", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(10); ll.pushBack(20);
    expect(ll.peekFront()).toBe(10);
    expect(ll.peekBack()).toBe(20);
  });
  it("has", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(5);
    expect(ll.has(5)).toBe(true);
    expect(ll.has(99)).toBe(false);
  });
  it("remove", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1); ll.pushBack(2); ll.pushBack(3);
    expect(ll.remove(2)).toBe(true);
    expect(ll.toArray()).toEqual([1, 3]);
    expect(ll.remove(99)).toBe(false);
  });
  it("toArray", () => {
    const ll = new LinkedList<string>();
    ll.pushBack("a"); ll.pushBack("b");
    expect(ll.toArray()).toEqual(["a", "b"]);
  });
  it("clear", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1); ll.clear();
    expect(ll.size).toBe(0);
    expect(ll.peekFront()).toBeUndefined();
  });
  it("iterator", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1); ll.pushBack(2);
    expect([...ll]).toEqual([1, 2]);
  });
  it("empty pops return undefined", () => {
    const ll = new LinkedList<number>();
    expect(ll.popFront()).toBeUndefined();
    expect(ll.popBack()).toBeUndefined();
  });
});
