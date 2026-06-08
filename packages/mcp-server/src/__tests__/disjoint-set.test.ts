import { describe, it, expect } from "vitest";
import { DisjointSet } from "../disjoint-set.js";

describe("disjoint-set", () => {
  it("makeSet and find work", () => {
    const ds = new DisjointSet<string>();
    ds.makeSet("a");
    ds.makeSet("b");
    expect(ds.find("a")).toBe("a");
    expect(ds.find("b")).toBe("b");
    expect(ds.size).toBe(2);
  });

  it("union joins sets", () => {
    const ds = new DisjointSet<string>();
    ds.makeSet("a");
    ds.makeSet("b");
    expect(ds.union("a", "b")).toBe(true);
    expect(ds.connected("a", "b")).toBe(true);
    expect(ds.componentCount).toBe(1);
  });

  it("union returns false if already connected", () => {
    const ds = new DisjointSet<string>();
    ds.makeSet("a");
    ds.makeSet("b");
    ds.union("a", "b");
    expect(ds.union("a", "b")).toBe(false);
  });

  it("tracks component count", () => {
    const ds = new DisjointSet<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    ds.makeSet(3);
    expect(ds.componentCount).toBe(3);
    ds.union(1, 2);
    expect(ds.componentCount).toBe(2);
    ds.union(2, 3);
    expect(ds.componentCount).toBe(1);
  });

  it("components returns groups", () => {
    const ds = new DisjointSet<string>();
    ds.makeSet("a");
    ds.makeSet("b");
    ds.makeSet("c");
    ds.union("a", "b");
    const groups = ds.components();
    expect(groups.size).toBe(2);
  });

  it("makeSet is idempotent", () => {
    const ds = new DisjointSet<string>();
    ds.makeSet("a");
    ds.makeSet("a");
    expect(ds.size).toBe(1);
    expect(ds.componentCount).toBe(1);
  });

  it("find throws for unknown element", () => {
    const ds = new DisjointSet<string>();
    expect(() => ds.find("x")).toThrow();
  });
});
