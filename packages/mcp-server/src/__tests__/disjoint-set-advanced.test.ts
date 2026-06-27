import { describe, it, expect } from "vitest";
import { DisjointSetAdvanced } from "../disjoint-set-advanced.js";

describe("DisjointSetAdvanced", () => {
  it("creates sets and finds roots", () => {
    const ds = new DisjointSetAdvanced<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    ds.makeSet(3);
    expect(ds.find(1)).toBe(1);
    expect(ds.find(2)).toBe(2);
    expect(ds.components()).toBe(3);
  });

  it("unions sets", () => {
    const ds = new DisjointSetAdvanced<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    ds.makeSet(3);
    expect(ds.union(1, 2)).toBe(true);
    expect(ds.connected(1, 2)).toBe(true);
    expect(ds.connected(1, 3)).toBe(false);
    expect(ds.components()).toBe(2);
  });

  it("returns false for redundant union", () => {
    const ds = new DisjointSetAdvanced<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    ds.union(1, 2);
    expect(ds.union(1, 2)).toBe(false);
  });

  it("tracks component size", () => {
    const ds = new DisjointSetAdvanced<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    ds.makeSet(3);
    ds.union(1, 2);
    expect(ds.componentSize(1)).toBe(2);
    ds.union(1, 3);
    expect(ds.componentSize(1)).toBe(3);
  });

  it("lists elements", () => {
    const ds = new DisjointSetAdvanced<string>();
    ds.makeSet("a");
    ds.makeSet("b");
    expect(ds.elements()).toContain("a");
    expect(ds.elements()).toContain("b");
    expect(ds.totalElements()).toBe(2);
  });

  it("gets all components", () => {
    const ds = new DisjointSetAdvanced<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    ds.makeSet(3);
    ds.union(1, 3);
    const comps = ds.getComponents();
    expect(comps.size).toBe(2);
  });

  it("finds largest component", () => {
    const ds = new DisjointSetAdvanced<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    ds.makeSet(3);
    ds.makeSet(4);
    ds.union(1, 2);
    ds.union(1, 3);
    const largest = ds.largestComponent();
    expect(largest.length).toBe(3);
  });

  it("tracks history", () => {
    const ds = new DisjointSetAdvanced<number>();
    ds.makeSet(1);
    ds.makeSet(2);
    ds.union(1, 2);
    const history = ds.getHistory();
    expect(history.length).toBe(3);
    expect(history[0].type).toBe("make");
    expect(history[2].type).toBe("union");
  });

  it("handles duplicate makeSet", () => {
    const ds = new DisjointSetAdvanced<number>();
    ds.makeSet(1);
    ds.makeSet(1);
    expect(ds.totalElements()).toBe(1);
    expect(ds.components()).toBe(1);
  });

  it("works with string keys", () => {
    const ds = new DisjointSetAdvanced<string>();
    ds.makeSet("alice");
    ds.makeSet("bob");
    ds.makeSet("charlie");
    ds.union("alice", "bob");
    expect(ds.connected("alice", "bob")).toBe(true);
    expect(ds.connected("alice", "charlie")).toBe(false);
  });
});
