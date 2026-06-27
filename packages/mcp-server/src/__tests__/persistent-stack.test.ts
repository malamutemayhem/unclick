import { describe, it, expect } from "vitest";
import { PersistentStack } from "../persistent-stack.js";

describe("PersistentStack", () => {
  it("push and peek", () => {
    const s0 = new PersistentStack<number>();
    const s1 = s0.push(1);
    const s2 = s1.push(2);
    expect(s2.peek()).toBe(2);
    expect(s1.peek()).toBe(1);
  });

  it("pop returns value and new stack", () => {
    const s = new PersistentStack<string>().push("a").push("b");
    const result = s.pop()!;
    expect(result.value).toBe("b");
    expect(result.stack.peek()).toBe("a");
  });

  it("pop on empty returns undefined", () => {
    const s = new PersistentStack<number>();
    expect(s.pop()).toBeUndefined();
  });

  it("size tracks count", () => {
    const s = new PersistentStack<number>().push(1).push(2).push(3);
    expect(s.size()).toBe(3);
  });

  it("isEmpty works", () => {
    const s = new PersistentStack<number>();
    expect(s.isEmpty()).toBe(true);
    expect(s.push(1).isEmpty()).toBe(false);
  });

  it("toArray returns stack contents top-first", () => {
    const s = new PersistentStack<number>().push(1).push(2).push(3);
    expect(s.toArray()).toEqual([3, 2, 1]);
  });

  it("versions are independent", () => {
    const s0 = new PersistentStack<number>();
    const s1 = s0.push(10);
    const s2 = s0.push(20);
    expect(s1.peek()).toBe(10);
    expect(s2.peek()).toBe(20);
    expect(s0.isEmpty()).toBe(true);
  });

  it("from creates stack from array", () => {
    const s = PersistentStack.from([1, 2, 3]);
    expect(s.peek()).toBe(1);
    expect(s.size()).toBe(3);
    expect(s.toArray()).toEqual([1, 2, 3]);
  });

  it("reverse flips order", () => {
    const s = PersistentStack.from([1, 2, 3]);
    const r = s.reverse();
    expect(r.toArray()).toEqual([3, 2, 1]);
  });
});
