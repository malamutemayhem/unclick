import { describe, it, expect } from "vitest";
import { UnionFind } from "../union-find.js";

describe("UnionFind", () => {
  it("makeSet and find", () => {
    const uf = new UnionFind<number>();
    uf.makeSet(1);
    uf.makeSet(2);
    expect(uf.find(1)).toBe(1);
    expect(uf.find(2)).toBe(2);
  });

  it("union connects elements", () => {
    const uf = new UnionFind<number>();
    uf.makeSet(1);
    uf.makeSet(2);
    uf.union(1, 2);
    expect(uf.connected(1, 2)).toBe(true);
  });

  it("union returns false for same set", () => {
    const uf = new UnionFind<number>();
    uf.makeSet(1);
    uf.makeSet(2);
    uf.union(1, 2);
    expect(uf.union(1, 2)).toBe(false);
  });

  it("tracks component count", () => {
    const uf = new UnionFind<number>();
    uf.makeSet(1);
    uf.makeSet(2);
    uf.makeSet(3);
    expect(uf.components).toBe(3);
    uf.union(1, 2);
    expect(uf.components).toBe(2);
    uf.union(2, 3);
    expect(uf.components).toBe(1);
  });

  it("componentMembers returns all in set", () => {
    const uf = new UnionFind<string>();
    uf.makeSet("a");
    uf.makeSet("b");
    uf.makeSet("c");
    uf.union("a", "b");
    const members = uf.componentMembers("a").sort();
    expect(members).toEqual(["a", "b"]);
  });

  it("allComponents groups correctly", () => {
    const uf = new UnionFind<number>();
    uf.makeSet(1);
    uf.makeSet(2);
    uf.makeSet(3);
    uf.makeSet(4);
    uf.union(1, 2);
    uf.union(3, 4);
    const groups = uf.allComponents();
    expect(groups.length).toBe(2);
  });

  it("size tracks total elements", () => {
    const uf = new UnionFind<number>();
    uf.makeSet(1);
    uf.makeSet(2);
    expect(uf.size).toBe(2);
  });

  it("throws for unknown element", () => {
    const uf = new UnionFind<number>();
    expect(() => uf.find(99)).toThrow();
  });

  it("duplicate makeSet is no-op", () => {
    const uf = new UnionFind<number>();
    uf.makeSet(1);
    uf.makeSet(1);
    expect(uf.size).toBe(1);
    expect(uf.components).toBe(1);
  });
});
