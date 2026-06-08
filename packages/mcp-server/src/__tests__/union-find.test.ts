import { describe, it, expect } from "vitest";
import { UnionFind } from "../union-find.js";

describe("UnionFind", () => {
  it("elements start disconnected", () => {
    const uf = new UnionFind(5);
    expect(uf.connected(0, 1)).toBe(false);
    expect(uf.componentCount).toBe(5);
  });

  it("union connects elements", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    expect(uf.connected(0, 1)).toBe(true);
    expect(uf.componentCount).toBe(4);
  });

  it("union is transitive", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    uf.union(1, 2);
    expect(uf.connected(0, 2)).toBe(true);
  });

  it("union returns false if already connected", () => {
    const uf = new UnionFind(5);
    expect(uf.union(0, 1)).toBe(true);
    expect(uf.union(0, 1)).toBe(false);
  });

  it("find returns root", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    expect(uf.find(0)).toBe(uf.find(1));
  });

  it("componentSize tracks merged groups", () => {
    const uf = new UnionFind(5);
    uf.union(0, 1);
    uf.union(1, 2);
    expect(uf.componentSize(0)).toBe(3);
    expect(uf.componentSize(3)).toBe(1);
  });

  it("handles large union-find", () => {
    const uf = new UnionFind(1000);
    for (let i = 0; i < 999; i++) {
      uf.union(i, i + 1);
    }
    expect(uf.componentCount).toBe(1);
    expect(uf.connected(0, 999)).toBe(true);
  });
});
