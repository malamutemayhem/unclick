import { describe, it, expect } from "vitest";
import { ContentAddressableStore, MerkleTree } from "../content-addressable-store.js";

describe("ContentAddressableStore", () => {
  it("stores and retrieves data by hash", () => {
    const store = new ContentAddressableStore();
    const hash = store.put("hello world");
    expect(store.get(hash)).toBe("hello world");
  });

  it("same data produces same hash", () => {
    const store = new ContentAddressableStore();
    const h1 = store.put("data");
    const h2 = store.put("data");
    expect(h1).toBe(h2);
    expect(store.size()).toBe(1);
  });

  it("different data produces different hashes", () => {
    const store = new ContentAddressableStore();
    const h1 = store.put("abc");
    const h2 = store.put("def");
    expect(h1).not.toBe(h2);
  });

  it("checks existence", () => {
    const store = new ContentAddressableStore();
    const hash = store.put("test");
    expect(store.has(hash)).toBe(true);
    expect(store.has("fake")).toBe(false);
  });

  it("tracks references", () => {
    const store = new ContentAddressableStore();
    const child = store.put("child");
    const parent = store.put("parent", [child]);
    expect(store.refs(parent)).toEqual([child]);
  });

  it("removes objects", () => {
    const store = new ContentAddressableStore();
    const hash = store.put("temp");
    expect(store.remove(hash)).toBe(true);
    expect(store.has(hash)).toBe(false);
  });

  it("calculates total bytes", () => {
    const store = new ContentAddressableStore();
    store.put("abc");
    store.put("de");
    expect(store.totalBytes()).toBe(5);
  });

  it("finds reachable objects", () => {
    const store = new ContentAddressableStore();
    const c1 = store.put("child1");
    const c2 = store.put("child2");
    const root = store.put("root", [c1, c2]);
    store.put("orphan");
    const reachable = store.reachable(root);
    expect(reachable.size).toBe(3);
    expect(reachable.has(root)).toBe(true);
    expect(reachable.has(c1)).toBe(true);
  });

  it("garbage collects unreachable objects", () => {
    const store = new ContentAddressableStore();
    const kept = store.put("kept");
    store.put("garbage");
    const removed = store.gc([kept]);
    expect(removed).toBe(1);
    expect(store.size()).toBe(1);
  });

  it("verifies integrity", () => {
    const store = new ContentAddressableStore();
    const hash = store.put("verified");
    expect(store.verify(hash)).toBe(true);
  });
});

describe("MerkleTree", () => {
  it("builds tree from leaves", () => {
    const store = new ContentAddressableStore();
    const tree = new MerkleTree(store);
    tree.addLeaf("a");
    tree.addLeaf("b");
    tree.addLeaf("c");
    const root = tree.root();
    expect(root).toBeTruthy();
    expect(tree.leafCount()).toBe(3);
  });

  it("same leaves produce same root", () => {
    const store1 = new ContentAddressableStore();
    const t1 = new MerkleTree(store1);
    t1.addLeaf("x");
    t1.addLeaf("y");

    const store2 = new ContentAddressableStore();
    const t2 = new MerkleTree(store2);
    t2.addLeaf("x");
    t2.addLeaf("y");

    expect(t1.root()).toBe(t2.root());
  });

  it("different leaves produce different roots", () => {
    const store = new ContentAddressableStore();
    const t1 = new MerkleTree(store);
    t1.addLeaf("a");
    const r1 = t1.root();

    const t2 = new MerkleTree(store);
    t2.addLeaf("b");
    const r2 = t2.root();

    expect(r1).not.toBe(r2);
  });

  it("handles empty tree", () => {
    const store = new ContentAddressableStore();
    const tree = new MerkleTree(store);
    expect(tree.root()).toBe("");
  });
});
