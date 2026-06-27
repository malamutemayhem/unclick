import { describe, it, expect } from "vitest";
import { Treap } from "../treap.js";

describe("Treap", () => {
  it("sets and gets", () => {
    const t = new Treap<number, string>();
    t.set(5, "five");
    t.set(3, "three");
    expect(t.get(5)).toBe("five");
    expect(t.get(3)).toBe("three");
  });

  it("returns undefined for missing", () => {
    const t = new Treap<number, number>();
    expect(t.get(42)).toBeUndefined();
  });

  it("overwrites value", () => {
    const t = new Treap<number, string>();
    t.set(1, "a");
    t.set(1, "b");
    expect(t.get(1)).toBe("b");
    expect(t.size).toBe(1);
  });

  it("has checks existence", () => {
    const t = new Treap<number, number>();
    t.set(10, 100);
    expect(t.has(10)).toBe(true);
    expect(t.has(20)).toBe(false);
  });

  it("deletes key", () => {
    const t = new Treap<number, string>();
    t.set(1, "a");
    t.set(2, "b");
    t.set(3, "c");
    expect(t.delete(2)).toBe(true);
    expect(t.has(2)).toBe(false);
    expect(t.size).toBe(2);
  });

  it("delete returns false for missing", () => {
    const t = new Treap<number, number>();
    expect(t.delete(99)).toBe(false);
  });

  it("finds min and max", () => {
    const t = new Treap<number, string>();
    t.set(5, "five");
    t.set(1, "one");
    t.set(9, "nine");
    expect(t.min()!.key).toBe(1);
    expect(t.max()!.key).toBe(9);
  });

  it("min/max on empty returns undefined", () => {
    const t = new Treap<number, number>();
    expect(t.min()).toBeUndefined();
    expect(t.max()).toBeUndefined();
  });

  it("keys are in sorted order", () => {
    const t = new Treap<number, number>();
    t.set(5, 0);
    t.set(1, 0);
    t.set(3, 0);
    t.set(7, 0);
    t.set(2, 0);
    expect(t.keys()).toEqual([1, 2, 3, 5, 7]);
  });

  it("handles many insertions", () => {
    const t = new Treap<number, number>();
    for (let i = 0; i < 100; i++) t.set(i, i);
    expect(t.size).toBe(100);
    for (let i = 0; i < 100; i++) expect(t.get(i)).toBe(i);
  });

  it("handles custom comparator", () => {
    const t = new Treap<string, number>((a, b) => a.localeCompare(b));
    t.set("banana", 1);
    t.set("apple", 2);
    t.set("cherry", 3);
    expect(t.keys()).toEqual(["apple", "banana", "cherry"]);
  });

  it("delete and re-insert", () => {
    const t = new Treap<number, string>();
    t.set(1, "a");
    t.delete(1);
    t.set(1, "b");
    expect(t.get(1)).toBe("b");
    expect(t.size).toBe(1);
  });
});
