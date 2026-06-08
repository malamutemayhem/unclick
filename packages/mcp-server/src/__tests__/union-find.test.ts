import { describe, it, expect } from "vitest";
import { UnionFind } from "../union-find.js";

describe("UnionFind", () => {
  it("starts disconnected", () => {
    const uf = new UnionFind(5);
    expect(uf.count).toBe(5);
    expect(uf.connected(0, 1)).toBe(false);
  });
  it("union connects elements", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    expect(uf.connected(0, 1)).toBe(true);
    expect(uf.count).toBe(4);
  });
  it("transitive connection", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    uf.union(1, 2);
    expect(uf.connected(0, 2)).toBe(true);
  });
  it("union returns false if already connected", () => {
    const uf = new UnionFind(3);
    expect(uf.union(0, 1)).toBe(true);
    expect(uf.union(0, 1)).toBe(false);
  });
  it("componentSize", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    uf.union(1, 2);
    expect(uf.componentSize(0)).toBe(3);
    expect(uf.componentSize(3)).toBe(1);
  });
  it("components returns groups", () => {
    const uf = new UnionFind(4);
    uf.union(0, 1);
    uf.union(2, 3);
    const comps = uf.components();
    expect(comps).toHaveLength(2);
  });
});
