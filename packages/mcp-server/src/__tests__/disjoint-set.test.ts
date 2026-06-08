import { describe, it, expect } from "vitest";
import { DisjointSet } from "../disjoint-set.js";

describe("DisjointSet", () => {
  it("each element starts in own set", () => {
    const ds = new DisjointSet<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    expect(ds.connected(1, 2)).toBe(false);
    expect(ds.setCount).toBe(2);
  });

  it("union merges sets", () => {
    const ds = new DisjointSet<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    ds.union(1, 2);
    expect(ds.connected(1, 2)).toBe(true);
    expect(ds.setCount).toBe(1);
  });

  it("union returns false for same set", () => {
    const ds = new DisjointSet<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    ds.union(1, 2);
    expect(ds.union(1, 2)).toBe(false);
  });

  it("find is consistent after union", () => {
    const ds = new DisjointSet<string>();
    ds.makeSet("a");
    ds.makeSet("b");
    ds.makeSet("c");
    ds.union("a", "b");
    ds.union("b", "c");
    expect(ds.find("a")).toBe(ds.find("c"));
  });

  it("sets returns all groups", () => {
    const ds = new DisjointSet<number>();
    [1, 2, 3, 4].forEach((n) => ds.makeSet(n));
    ds.union(1, 2);
    ds.union(3, 4);
    const groups = ds.sets();
    expect(groups).toHaveLength(2);
  });

  it("makeSet is idempotent", () => {
    const ds = new DisjointSet<number>();
    ds.makeSet(1);
    ds.makeSet(1);
    expect(ds.setCount).toBe(1);
  });

  it("find throws for unknown element", () => {
    const ds = new DisjointSet<number>();
    expect(() => ds.find(99)).toThrow("not in set");
  });
});
