import { describe, it, expect } from "vitest";
import { BiMap } from "../bimap.js";

describe("BiMap", () => {
  it("maps both directions", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.getByLeft("a")).toBe(1);
    expect(bm.getByRight(1)).toBe("a");
  });

  it("overwrites conflicting left", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("a", 2);
    expect(bm.getByLeft("a")).toBe(2);
    expect(bm.hasRight(1)).toBe(false);
  });

  it("overwrites conflicting right", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("b", 1);
    expect(bm.getByRight(1)).toBe("b");
    expect(bm.hasLeft("a")).toBe(false);
  });

  it("deleteByLeft", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.deleteByLeft("a");
    expect(bm.hasLeft("a")).toBe(false);
    expect(bm.hasRight(1)).toBe(false);
  });

  it("deleteByRight", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.deleteByRight(1);
    expect(bm.size).toBe(0);
  });

  it("tracks size", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("b", 2);
    expect(bm.size).toBe(2);
  });

  it("inverse", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("b", 2);
    const inv = bm.inverse();
    expect(inv.getByLeft(1)).toBe("a");
    expect(inv.getByRight("b")).toBe(2);
  });

  it("clear", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.clear();
    expect(bm.size).toBe(0);
  });
});
