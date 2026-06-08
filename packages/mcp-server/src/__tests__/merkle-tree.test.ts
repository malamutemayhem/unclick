import { describe, it, expect } from "vitest";
import { MerkleTree } from "../merkle-tree.js";

describe("MerkleTree", () => {
  it("computes root hash", () => {
    const tree = new MerkleTree(["a", "b", "c", "d"]);
    expect(tree.rootHash).not.toBeNull();
  });

  it("root hash is null for empty data", () => {
    const tree = new MerkleTree([]);
    expect(tree.rootHash).toBeNull();
  });

  it("same data produces same hash", () => {
    const t1 = new MerkleTree(["a", "b", "c"]);
    const t2 = new MerkleTree(["a", "b", "c"]);
    expect(t1.rootHash).toBe(t2.rootHash);
  });

  it("different data produces different hash", () => {
    const t1 = new MerkleTree(["a", "b", "c"]);
    const t2 = new MerkleTree(["a", "b", "d"]);
    expect(t1.rootHash).not.toBe(t2.rootHash);
  });

  it("generates proof", () => {
    const tree = new MerkleTree(["a", "b", "c", "d"]);
    const proof = tree.getProof(0);
    expect(proof.length).toBeGreaterThan(0);
  });

  it("verifies valid proof", () => {
    const tree = new MerkleTree(["a", "b", "c", "d"]);
    const proof = tree.getProof(0);
    expect(tree.verify("a", 0, proof)).toBe(true);
  });

  it("rejects invalid data", () => {
    const tree = new MerkleTree(["a", "b", "c", "d"]);
    const proof = tree.getProof(0);
    expect(tree.verify("z", 0, proof)).toBe(false);
  });

  it("reports leaf count", () => {
    const tree = new MerkleTree(["a", "b", "c"]);
    expect(tree.leafCount).toBe(3);
  });

  it("gets leaf hashes", () => {
    const tree = new MerkleTree(["a", "b"]);
    const hashes = tree.getLeafHashes();
    expect(hashes).toHaveLength(2);
    expect(hashes[0]).not.toBe(hashes[1]);
  });

  it("handles single element", () => {
    const tree = new MerkleTree(["only"]);
    expect(tree.rootHash).not.toBeNull();
    expect(tree.leafCount).toBe(1);
  });

  it("handles odd number of leaves", () => {
    const tree = new MerkleTree(["a", "b", "c"]);
    expect(tree.rootHash).not.toBeNull();
    const proof = tree.getProof(2);
    expect(tree.verify("c", 2, proof)).toBe(true);
  });

  it("proof for out of range returns empty", () => {
    const tree = new MerkleTree(["a", "b"]);
    expect(tree.getProof(-1)).toEqual([]);
    expect(tree.getProof(5)).toEqual([]);
  });

  it("custom hash function", () => {
    const tree = new MerkleTree(["a", "b"], (d) => d.split("").reverse().join(""));
    expect(tree.rootHash).not.toBeNull();
  });
});
