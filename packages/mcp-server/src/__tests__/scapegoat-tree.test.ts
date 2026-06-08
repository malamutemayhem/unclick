import { describe, it, expect } from "vitest";
import { ScapegoatTree } from "../scapegoat-tree.js";

describe("ScapegoatTree", () => {
  it("insert and get", () => {
    const t = new ScapegoatTree<number, string>();
    t.insert(5, "five");
    t.insert(3, "three");
    t.insert(7, "seven");
    expect(t.get(5)).toBe("five");
    expect(t.get(3)).toBe("three");
    expect(t.get(9)).toBeUndefined();
  });

  it("has checks existence", () => {
    const t = new ScapegoatTree<number, number>();
    t.insert(1, 1);
    expect(t.has(1)).toBe(true);
    expect(t.has(2)).toBe(false);
  });

  it("keys returns sorted order", () => {
    const t = new ScapegoatTree<number, number>();
    t.insert(5, 5);
    t.insert(1, 1);
    t.insert(3, 3);
    t.insert(7, 7);
    expect(t.keys()).toEqual([1, 3, 5, 7]);
  });

  it("size tracks insertions", () => {
    const t = new ScapegoatTree<number, number>();
    t.insert(1, 1);
    t.insert(2, 2);
    t.insert(3, 3);
    expect(t.size()).toBe(3);
  });

  it("insert overwrites duplicate key", () => {
    const t = new ScapegoatTree<number, string>();
    t.insert(1, "old");
    t.insert(1, "new");
    expect(t.get(1)).toBe("new");
    expect(t.size()).toBe(1);
  });

  it("min and max return extremes", () => {
    const t = new ScapegoatTree<number, number>();
    t.insert(10, 10);
    t.insert(3, 3);
    t.insert(15, 15);
    expect(t.min()?.key).toBe(3);
    expect(t.max()?.key).toBe(15);
  });

  it("handles many sequential inserts with rebalancing", () => {
    const t = new ScapegoatTree<number, number>();
    for (let i = 0; i < 100; i++) t.insert(i, i);
    expect(t.size()).toBe(100);
    expect(t.get(50)).toBe(50);
    expect(t.min()?.key).toBe(0);
    expect(t.max()?.key).toBe(99);
  });

  it("empty tree min/max return undefined", () => {
    const t = new ScapegoatTree<number, number>();
    expect(t.min()).toBeUndefined();
    expect(t.max()).toBeUndefined();
  });
});
