import { describe, it, expect } from "vitest";
import { UnionFind } from "../union-find.js";

describe("UnionFind", () => {
  it("starts with each element in its own set", () => {
    const uf = new UnionFind(5);
    expect(uf.componentCount).toBe(5);
    expect(uf.connected(0, 1)).toBe(false);
  });

  it("union merges sets", () => {
    const uf = new UnionFind(5);
    expect(uf.union(0, 1)).toBe(true);
    expect(uf.connected(0, 1)).toBe(true);
    expect(uf.componentCount).toBe(4);
  });

  it("union returns false for same set", () => {
    const uf = new UnionFind(3);
    uf.union(0, 1);
    expect(uf.union(0, 1)).toBe(false);
  });

  it("transitive connection", () => {
    const uf = new UnionFind(4);
    uf.union(0, 1);
    uf.union(1, 2);
    expect(uf.connected(0, 2)).toBe(true);
    expect(uf.connected(0, 3)).toBe(false);
  });

  it("find with path compression", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    uf.union(1, 2);
    uf.union(2, 3);
    const root = uf.find(3);
    expect(uf.find(0)).toBe(root);
    expect(uf.find(1)).toBe(root);
  });

  it("components returns groups", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    uf.union(2, 3);
    const comps = uf.components();
    expect(comps.length).toBe(3);
    const sizes = comps.map((c) => c.length).sort();
    expect(sizes).toEqual([1, 2, 2]);
  });
});
