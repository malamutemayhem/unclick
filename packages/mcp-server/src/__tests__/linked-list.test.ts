import { describe, it, expect } from "vitest";
import { DoublyLinkedList } from "../linked-list.js";

describe("DoublyLinkedList", () => {
  it("starts empty", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.size).toBe(0);
    expect(list.peekFront()).toBeUndefined();
    expect(list.peekBack()).toBeUndefined();
  });

  it("pushFront adds to front", () => {
    const list = new DoublyLinkedList<number>();
    list.pushFront(1);
    list.pushFront(2);
    expect(list.peekFront()).toBe(2);
    expect(list.toArray()).toEqual([2, 1]);
  });

  it("pushBack adds to back", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    expect(list.peekBack()).toBe(2);
    expect(list.toArray()).toEqual([1, 2]);
  });

  it("popFront removes from front", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    expect(list.popFront()).toBe(1);
    expect(list.size).toBe(1);
  });

  it("popBack removes from back", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    expect(list.popBack()).toBe(2);
    expect(list.size).toBe(1);
  });

  it("popFront returns undefined on empty", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.popFront()).toBeUndefined();
  });

  it("popBack returns undefined on empty", () => {
    const list = new DoublyLinkedList<number>();
    expect(list.popBack()).toBeUndefined();
  });

  it("contains checks membership", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    expect(list.contains(1)).toBe(true);
    expect(list.contains(3)).toBe(false);
  });

  it("remove removes a value", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.remove(2)).toBe(true);
    expect(list.toArray()).toEqual([1, 3]);
    expect(list.size).toBe(2);
  });

  it("remove returns false for missing value", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    expect(list.remove(5)).toBe(false);
  });

  it("remove handles head removal", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.remove(1);
    expect(list.peekFront()).toBe(2);
  });

  it("remove handles tail removal", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.remove(2);
    expect(list.peekBack()).toBe(1);
  });

  it("toArrayReverse returns reversed order", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.toArrayReverse()).toEqual([3, 2, 1]);
  });

  it("clear empties the list", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.clear();
    expect(list.size).toBe(0);
    expect(list.toArray()).toEqual([]);
  });

  it("is iterable", () => {
    const list = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect([...list]).toEqual([1, 2, 3]);
  });

  it("handles single element lifecycle", () => {
    const list = new DoublyLinkedList<string>();
    list.pushBack("only");
    expect(list.popFront()).toBe("only");
    expect(list.size).toBe(0);
    expect(list.peekFront()).toBeUndefined();
    expect(list.peekBack()).toBeUndefined();
  });
});
