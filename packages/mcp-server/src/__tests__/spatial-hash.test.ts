import { describe, it, expect } from "vitest";
import { SpatialHash } from "../spatial-hash.js";

describe("SpatialHash", () => {
  it("inserts and queries point items", () => {
    const sh = new SpatialHash<string>(10);
    sh.insert("a", 5, 5);
    sh.insert("b", 25, 25);
    const near = sh.query(0, 0, 9, 9);
    expect(near).toContain("a");
    expect(near).not.toContain("b");
  });

  it("queries overlapping regions", () => {
    const sh = new SpatialHash<string>(10);
    sh.insert("wide", 5, 5, 20, 0);
    expect(sh.query(15, 5)).toContain("wide");
  });

  it("removes items", () => {
    const sh = new SpatialHash<string>(10);
    sh.insert("x", 5, 5);
    expect(sh.remove("x")).toBe(true);
    expect(sh.query(0, 0, 10, 10)).not.toContain("x");
    expect(sh.remove("x")).toBe(false);
  });

  it("tracks size", () => {
    const sh = new SpatialHash<string>(10);
    sh.insert("a", 0, 0);
    sh.insert("b", 10, 10);
    expect(sh.size).toBe(2);
    sh.remove("a");
    expect(sh.size).toBe(1);
  });

  it("clear empties everything", () => {
    const sh = new SpatialHash<string>(10);
    sh.insert("a", 0, 0);
    sh.insert("b", 10, 10);
    sh.clear();
    expect(sh.size).toBe(0);
    expect(sh.query(0, 0, 100, 100)).toEqual([]);
  });

  it("updates position on re-insert", () => {
    const sh = new SpatialHash<string>(10);
    sh.insert("mover", 5, 5);
    sh.insert("mover", 95, 95);
    expect(sh.query(0, 0, 10, 10)).not.toContain("mover");
    expect(sh.query(90, 90, 10, 10)).toContain("mover");
    expect(sh.size).toBe(1);
  });
});
