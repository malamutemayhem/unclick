import { describe, it, expect } from "vitest";
import { XFastTrie } from "../xfast-trie.js";

describe("XFastTrie", () => {
  it("insert and contains", () => {
    const t = new XFastTrie();
    t.insert(5);
    t.insert(10);
    expect(t.contains(5)).toBe(true);
    expect(t.contains(10)).toBe(true);
    expect(t.contains(7)).toBe(false);
  });

  it("delete removes key", () => {
    const t = new XFastTrie();
    t.insert(3);
    expect(t.delete(3)).toBe(true);
    expect(t.contains(3)).toBe(false);
    expect(t.delete(3)).toBe(false);
  });

  it("successor finds next key", () => {
    const t = new XFastTrie();
    t.insert(3);
    t.insert(7);
    t.insert(15);
    expect(t.successor(5)).toBe(7);
    expect(t.successor(7)).toBe(7);
    expect(t.successor(16)).toBeUndefined();
  });

  it("predecessor finds previous key", () => {
    const t = new XFastTrie();
    t.insert(3);
    t.insert(7);
    t.insert(15);
    expect(t.predecessor(10)).toBe(7);
    expect(t.predecessor(3)).toBe(3);
    expect(t.predecessor(1)).toBeUndefined();
  });

  it("min and max", () => {
    const t = new XFastTrie();
    t.insert(20);
    t.insert(5);
    t.insert(12);
    expect(t.min()).toBe(5);
    expect(t.max()).toBe(20);
  });

  it("size tracks count", () => {
    const t = new XFastTrie();
    expect(t.size()).toBe(0);
    t.insert(1);
    t.insert(2);
    expect(t.size()).toBe(2);
    t.delete(1);
    expect(t.size()).toBe(1);
  });

  it("empty min/max return undefined", () => {
    const t = new XFastTrie();
    expect(t.min()).toBeUndefined();
    expect(t.max()).toBeUndefined();
  });

  it("no duplicate inserts", () => {
    const t = new XFastTrie();
    t.insert(5);
    t.insert(5);
    expect(t.size()).toBe(1);
  });
});
