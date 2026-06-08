import { describe, it, expect } from "vitest";
import { UnionFind } from "../union-find.js";

describe("UnionFind", () => {
  it("starts with each element as its own component", () => {
    const uf = new UnionFind(5);
    expect(uf.components).toBe(5);
    expect(uf.connected(0, 1)).toBe(false);
  });

  it("union joins components", () => {
    const uf = new UnionFind(5);
    expect(uf.union(0, 1)).toBe(true);
    expect(uf.connected(0, 1)).toBe(true);
    expect(uf.components).toBe(4);
  });

  it("union returns false for already connected", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    expect(uf.union(0, 1)).toBe(false);
  });

  it("transitive connectivity", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    uf.union(1, 2);
    expect(uf.connected(0, 2)).toBe(true);
    expect(uf.connected(0, 3)).toBe(false);
  });

  it("componentSize", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    uf.union(1, 2);
    expect(uf.componentSize(0)).toBe(3);
    expect(uf.componentSize(3)).toBe(1);
  });

  it("size returns total elements", () => {
    const uf = new UnionFind(10);
    expect(uf.size).toBe(10);
  });
});
