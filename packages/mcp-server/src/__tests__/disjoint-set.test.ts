import { describe, it, expect } from "vitest";
import { DisjointSet } from "../disjoint-set.js";

describe("DisjointSet", () => {
  it("starts with each element in its own set", () => {
    const ds = new DisjointSet(5);
    expect(ds.components).toBe(5);
    expect(ds.connected(0, 1)).toBe(false);
  });

  it("unions elements", () => {
    const ds = new DisjointSet(5);
    expect(ds.union(0, 1)).toBe(true);
    expect(ds.connected(0, 1)).toBe(true);
    expect(ds.components).toBe(4);
  });

  it("union returns false for already-connected", () => {
    const ds = new DisjointSet(3);
    ds.union(0, 1);
    expect(ds.union(0, 1)).toBe(false);
  });

  it("transitive connectivity", () => {
    const ds = new DisjointSet(5);
    ds.union(0, 1);
    ds.union(1, 2);
    expect(ds.connected(0, 2)).toBe(true);
    expect(ds.connected(0, 3)).toBe(false);
  });

  it("finds root", () => {
    const ds = new DisjointSet(4);
    ds.union(0, 1);
    ds.union(2, 3);
    expect(ds.find(0)).toBe(ds.find(1));
    expect(ds.find(2)).toBe(ds.find(3));
    expect(ds.find(0)).not.toBe(ds.find(2));
  });

  it("componentSize", () => {
    const ds = new DisjointSet(5);
    ds.union(0, 1);
    ds.union(1, 2);
    expect(ds.componentSize(0)).toBe(3);
    expect(ds.componentSize(3)).toBe(1);
  });
});
