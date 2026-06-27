import { describe, it, expect } from "vitest";
import { OrderStatisticTree } from "../order-statistic-tree.js";

describe("OrderStatisticTree", () => {
  it("insert and get", () => {
    const t = new OrderStatisticTree<number, string>();
    t.insert(3, "three");
    t.insert(1, "one");
    t.insert(5, "five");
    expect(t.get(3)).toBe("three");
    expect(t.get(1)).toBe("one");
  });

  it("kth returns k-th smallest", () => {
    const t = new OrderStatisticTree<number, number>();
    t.insert(5, 5);
    t.insert(1, 1);
    t.insert(3, 3);
    t.insert(7, 7);
    expect(t.kth(0)?.key).toBe(1);
    expect(t.kth(1)?.key).toBe(3);
    expect(t.kth(2)?.key).toBe(5);
    expect(t.kth(3)?.key).toBe(7);
  });

  it("kth out of range returns undefined", () => {
    const t = new OrderStatisticTree<number, number>();
    t.insert(1, 1);
    expect(t.kth(-1)).toBeUndefined();
    expect(t.kth(1)).toBeUndefined();
  });

  it("rank returns position", () => {
    const t = new OrderStatisticTree<number, number>();
    t.insert(5, 5);
    t.insert(1, 1);
    t.insert(3, 3);
    t.insert(7, 7);
    expect(t.rank(1)).toBe(0);
    expect(t.rank(5)).toBe(2);
    expect(t.rank(7)).toBe(3);
  });

  it("size tracks count", () => {
    const t = new OrderStatisticTree<number, number>();
    t.insert(1, 1);
    t.insert(2, 2);
    expect(t.size()).toBe(2);
  });

  it("keys returns sorted", () => {
    const t = new OrderStatisticTree<number, number>();
    t.insert(10, 10);
    t.insert(5, 5);
    t.insert(15, 15);
    expect(t.keys()).toEqual([5, 10, 15]);
  });

  it("insert updates existing key", () => {
    const t = new OrderStatisticTree<number, string>();
    t.insert(1, "old");
    t.insert(1, "new");
    expect(t.get(1)).toBe("new");
    expect(t.size()).toBe(1);
  });

  it("handles many elements", () => {
    const t = new OrderStatisticTree<number, number>();
    for (let i = 0; i < 50; i++) t.insert(i, i);
    expect(t.size()).toBe(50);
    expect(t.kth(25)?.key).toBe(25);
    expect(t.rank(25)).toBe(25);
  });
});
