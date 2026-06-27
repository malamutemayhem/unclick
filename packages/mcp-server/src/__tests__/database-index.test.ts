import { describe, it, expect } from "vitest";
import { BTreeIndex, HashIndex, CompositeIndex } from "../database-index.js";

describe("BTreeIndex", () => {
  it("inserts and finds entries", () => {
    const idx = new BTreeIndex();
    idx.insert("alice", 1);
    idx.insert("bob", 2);
    expect(idx.find("alice")).toEqual([1]);
  });

  it("handles duplicate keys", () => {
    const idx = new BTreeIndex();
    idx.insert("name", 1);
    idx.insert("name", 2);
    expect(idx.find("name")).toEqual([1, 2]);
  });

  it("range query", () => {
    const idx = new BTreeIndex();
    idx.insert(1, 10);
    idx.insert(3, 30);
    idx.insert(5, 50);
    idx.insert(7, 70);
    expect(idx.range(2, 6)).toEqual([30, 50]);
  });

  it("removes entries", () => {
    const idx = new BTreeIndex();
    idx.insert("key", 1);
    expect(idx.remove("key", 1)).toBe(true);
    expect(idx.find("key")).toEqual([]);
  });

  it("min and max", () => {
    const idx = new BTreeIndex();
    idx.insert(5, 50);
    idx.insert(1, 10);
    idx.insert(9, 90);
    expect(idx.min()!.key).toBe(1);
    expect(idx.max()!.key).toBe(9);
  });

  it("returns null min/max for empty", () => {
    const idx = new BTreeIndex();
    expect(idx.min()).toBeNull();
    expect(idx.max()).toBeNull();
  });

  it("tracks size", () => {
    const idx = new BTreeIndex();
    idx.insert("a", 1);
    idx.insert("b", 2);
    expect(idx.size()).toBe(2);
  });
});

describe("HashIndex", () => {
  it("inserts and finds entries", () => {
    const idx = new HashIndex();
    idx.insert("alice", 1);
    expect(idx.find("alice")).toEqual([1]);
  });

  it("handles multiple row ids per key", () => {
    const idx = new HashIndex();
    idx.insert("name", 1);
    idx.insert("name", 2);
    expect(idx.find("name")).toEqual([1, 2]);
  });

  it("checks key existence", () => {
    const idx = new HashIndex();
    idx.insert("key", 1);
    expect(idx.has("key")).toBe(true);
    expect(idx.has("missing")).toBe(false);
  });

  it("removes entries", () => {
    const idx = new HashIndex();
    idx.insert("key", 1);
    idx.insert("key", 2);
    expect(idx.remove("key", 1)).toBe(true);
    expect(idx.find("key")).toEqual([2]);
  });

  it("tracks size and buckets", () => {
    const idx = new HashIndex();
    idx.insert("a", 1);
    idx.insert("a", 2);
    idx.insert("b", 3);
    expect(idx.size()).toBe(3);
    expect(idx.bucketCount()).toBe(2);
  });

  it("lists keys", () => {
    const idx = new HashIndex();
    idx.insert("b", 1);
    idx.insert("a", 2);
    expect(idx.keys()).toEqual(["a", "b"]);
  });
});

describe("CompositeIndex", () => {
  it("inserts and finds by composite key", () => {
    const idx = new CompositeIndex();
    idx.insert(["users", "alice"], 1);
    idx.insert(["users", "bob"], 2);
    expect(idx.find(["users", "alice"])).toEqual([1]);
  });

  it("prefix search", () => {
    const idx = new CompositeIndex();
    idx.insert(["users", "alice"], 1);
    idx.insert(["users", "bob"], 2);
    idx.insert(["orders", "123"], 3);
    expect(idx.prefixSearch(["users"]).sort()).toEqual([1, 2]);
  });

  it("removes entries", () => {
    const idx = new CompositeIndex();
    idx.insert(["a", "b"], 1);
    expect(idx.remove(["a", "b"], 1)).toBe(true);
    expect(idx.size()).toBe(0);
  });

  it("tracks size", () => {
    const idx = new CompositeIndex();
    idx.insert(["a"], 1);
    idx.insert(["b"], 2);
    expect(idx.size()).toBe(2);
  });
});
