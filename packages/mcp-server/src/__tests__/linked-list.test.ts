import { describe, it, expect } from "vitest";
import { LinkedList } from "../linked-list.js";

describe("LinkedList", () => {
  it("pushFront and pushBack", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1).pushBack(2).pushFront(0);
    expect(ll.toArray()).toEqual([0, 1, 2]);
  });

  it("popFront and popBack", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1).pushBack(2).pushBack(3);
    expect(ll.popFront()).toBe(1);
    expect(ll.popBack()).toBe(3);
    expect(ll.size).toBe(1);
  });

  it("peek front and back", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1).pushBack(2);
    expect(ll.peekFront()).toBe(1);
    expect(ll.peekBack()).toBe(2);
  });

  it("returns undefined on empty pop/peek", () => {
    const ll = new LinkedList<number>();
    expect(ll.popFront()).toBeUndefined();
    expect(ll.popBack()).toBeUndefined();
    expect(ll.peekFront()).toBeUndefined();
    expect(ll.peekBack()).toBeUndefined();
  });

  it("contains", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1).pushBack(2);
    expect(ll.contains(1)).toBe(true);
    expect(ll.contains(3)).toBe(false);
  });

  it("remove", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1).pushBack(2).pushBack(3);
    expect(ll.remove(2)).toBe(true);
    expect(ll.toArray()).toEqual([1, 3]);
    expect(ll.remove(5)).toBe(false);
  });

  it("tracks size and isEmpty", () => {
    const ll = new LinkedList<number>();
    expect(ll.isEmpty).toBe(true);
    expect(ll.size).toBe(0);
    ll.pushBack(1);
    expect(ll.isEmpty).toBe(false);
    expect(ll.size).toBe(1);
  });

  it("clear empties list", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1).pushBack(2);
    ll.clear();
    expect(ll.size).toBe(0);
    expect(ll.toArray()).toEqual([]);
  });

  it("toArrayReverse", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1).pushBack(2).pushBack(3);
    expect(ll.toArrayReverse()).toEqual([3, 2, 1]);
  });

  it("iterates", () => {
    const ll = new LinkedList<number>();
    ll.pushBack(1).pushBack(2).pushBack(3);
    expect([...ll]).toEqual([1, 2, 3]);
  });
});
