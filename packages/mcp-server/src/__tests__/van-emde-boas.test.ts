import { describe, it, expect } from "vitest";
import { VanEmdeBoas } from "../van-emde-boas.js";

describe("VanEmdeBoas", () => {
  it("starts empty", () => {
    const veb = new VanEmdeBoas(16);
    expect(veb.isEmpty()).toBe(true);
    expect(veb.getMin()).toBe(-1);
    expect(veb.getMax()).toBe(-1);
  });

  it("inserts and checks membership", () => {
    const veb = new VanEmdeBoas(16);
    veb.insert(5);
    veb.insert(10);
    veb.insert(3);
    expect(veb.member(5)).toBe(true);
    expect(veb.member(10)).toBe(true);
    expect(veb.member(7)).toBe(false);
  });

  it("tracks min and max", () => {
    const veb = new VanEmdeBoas(16);
    veb.insert(5);
    veb.insert(2);
    veb.insert(14);
    expect(veb.getMin()).toBe(2);
    expect(veb.getMax()).toBe(14);
  });

  it("finds successor", () => {
    const veb = new VanEmdeBoas(16);
    veb.insert(2);
    veb.insert(5);
    veb.insert(10);
    expect(veb.successor(2)).toBe(5);
    expect(veb.successor(5)).toBe(10);
    expect(veb.successor(10)).toBe(-1);
  });

  it("finds predecessor", () => {
    const veb = new VanEmdeBoas(16);
    veb.insert(2);
    veb.insert(5);
    veb.insert(10);
    expect(veb.predecessor(10)).toBe(5);
    expect(veb.predecessor(5)).toBe(2);
    expect(veb.predecessor(2)).toBe(-1);
  });

  it("converts to sorted array", () => {
    const veb = new VanEmdeBoas(16);
    veb.insert(8);
    veb.insert(3);
    veb.insert(12);
    veb.insert(1);
    expect(veb.toArray()).toEqual([1, 3, 8, 12]);
  });

  it("handles single element", () => {
    const veb = new VanEmdeBoas(16);
    veb.insert(7);
    expect(veb.member(7)).toBe(true);
    expect(veb.getMin()).toBe(7);
    expect(veb.getMax()).toBe(7);
    expect(veb.successor(7)).toBe(-1);
    expect(veb.predecessor(7)).toBe(-1);
  });

  it("handles larger universe", () => {
    const veb = new VanEmdeBoas(256);
    veb.insert(100);
    veb.insert(200);
    veb.insert(50);
    expect(veb.toArray()).toEqual([50, 100, 200]);
    expect(veb.successor(50)).toBe(100);
  });
});
