import { describe, it, expect } from "vitest";
import { Deque } from "../deque.js";

describe("deque", () => {
  it("pushBack and popFront works like a queue", () => {
    const d = new Deque<number>();
    d.pushBack(1);
    d.pushBack(2);
    d.pushBack(3);
    expect(d.popFront()).toBe(1);
    expect(d.popFront()).toBe(2);
    expect(d.popFront()).toBe(3);
  });

  it("pushFront and popBack works like a queue", () => {
    const d = new Deque<number>();
    d.pushFront(1);
    d.pushFront(2);
    d.pushFront(3);
    expect(d.popBack()).toBe(1);
    expect(d.popBack()).toBe(2);
  });

  it("pushBack and popBack works like a stack", () => {
    const d = new Deque<number>();
    d.pushBack(1);
    d.pushBack(2);
    expect(d.popBack()).toBe(2);
    expect(d.popBack()).toBe(1);
  });

  it("peekFront and peekBack without removing", () => {
    const d = new Deque<string>();
    d.pushBack("a");
    d.pushBack("b");
    expect(d.peekFront()).toBe("a");
    expect(d.peekBack()).toBe("b");
    expect(d.size).toBe(2);
  });

  it("toArray returns elements in order", () => {
    const d = new Deque<number>();
    d.pushBack(1);
    d.pushBack(2);
    d.pushFront(0);
    expect(d.toArray()).toEqual([0, 1, 2]);
  });

  it("grows when capacity exceeded", () => {
    const d = new Deque<number>(4);
    for (let i = 0; i < 20; i++) d.pushBack(i);
    expect(d.size).toBe(20);
    expect(d.popFront()).toBe(0);
    expect(d.popBack()).toBe(19);
  });

  it("clear empties the deque", () => {
    const d = new Deque<number>();
    d.pushBack(1);
    d.pushBack(2);
    d.clear();
    expect(d.size).toBe(0);
    expect(d.isEmpty).toBe(true);
  });

  it("pop on empty returns undefined", () => {
    const d = new Deque<number>();
    expect(d.popFront()).toBeUndefined();
    expect(d.popBack()).toBeUndefined();
    expect(d.peekFront()).toBeUndefined();
    expect(d.peekBack()).toBeUndefined();
  });
});
