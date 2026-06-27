import { describe, it, expect } from "vitest";
import { MerklePatriciaTrie } from "../merkle-patricia.js";

describe("MerklePatriciaTrie", () => {
  it("puts and gets values", () => {
    const trie = new MerklePatriciaTrie();
    trie.put("hello", 42);
    trie.put("world", "val");
    expect(trie.get("hello")).toBe(42);
    expect(trie.get("world")).toBe("val");
    expect(trie.get("missing")).toBeUndefined();
  });

  it("checks existence with has", () => {
    const trie = new MerklePatriciaTrie();
    trie.put("key", true);
    expect(trie.has("key")).toBe(true);
    expect(trie.has("other")).toBe(false);
  });

  it("deletes entries", () => {
    const trie = new MerklePatriciaTrie();
    trie.put("abc", 1);
    expect(trie.delete("abc")).toBe(true);
    expect(trie.has("abc")).toBe(false);
    expect(trie.size()).toBe(0);
    expect(trie.delete("abc")).toBe(false);
  });

  it("counts entries", () => {
    const trie = new MerklePatriciaTrie();
    trie.put("a", 1);
    trie.put("ab", 2);
    trie.put("abc", 3);
    expect(trie.size()).toBe(3);
  });

  it("lists keys in sorted order", () => {
    const trie = new MerklePatriciaTrie();
    trie.put("banana", 1);
    trie.put("apple", 2);
    trie.put("cherry", 3);
    expect(trie.keys()).toEqual(["apple", "banana", "cherry"]);
  });

  it("lists entries", () => {
    const trie = new MerklePatriciaTrie();
    trie.put("x", 10);
    trie.put("y", 20);
    const entries = trie.entries();
    expect(entries.length).toBe(2);
  });

  it("finds keys with prefix", () => {
    const trie = new MerklePatriciaTrie();
    trie.put("app", 1);
    trie.put("apple", 2);
    trie.put("application", 3);
    trie.put("banana", 4);
    const result = trie.keysWithPrefix("app");
    expect(result).toEqual(["app", "apple", "application"]);
    expect(trie.keysWithPrefix("ban")).toEqual(["banana"]);
    expect(trie.keysWithPrefix("xyz")).toEqual([]);
  });

  it("updates root hash on modifications", () => {
    const trie = new MerklePatriciaTrie();
    const h0 = trie.rootHash();
    trie.put("key", "value");
    const h1 = trie.rootHash();
    expect(h1).not.toBe(h0);
    trie.put("key", "other");
    const h2 = trie.rootHash();
    expect(h2).not.toBe(h1);
  });

  it("verifies integrity", () => {
    const trie = new MerklePatriciaTrie();
    trie.put("a", 1);
    trie.put("b", 2);
    trie.put("c", 3);
    expect(trie.verify()).toBe(true);
  });

  it("same data produces same root hash", () => {
    const t1 = new MerklePatriciaTrie();
    const t2 = new MerklePatriciaTrie();
    t1.put("a", 1);
    t1.put("b", 2);
    t2.put("a", 1);
    t2.put("b", 2);
    expect(t1.rootHash()).toBe(t2.rootHash());
  });
});
