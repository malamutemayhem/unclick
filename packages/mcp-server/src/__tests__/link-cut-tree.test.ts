import { describe, it, expect } from "vitest";
import { LinkCutTree } from "../link-cut-tree.js";

describe("LinkCutTree", () => {
  it("makeTree and nodeCount", () => {
    const lct = new LinkCutTree();
    lct.makeTree(1, 10);
    lct.makeTree(2, 20);
    lct.makeTree(3, 30);
    expect(lct.nodeCount()).toBe(3);
  });

  it("link connects two trees", () => {
    const lct = new LinkCutTree();
    lct.makeTree(1, 10);
    lct.makeTree(2, 20);
    expect(lct.connected(1, 2)).toBe(false);
    lct.link(1, 2);
    expect(lct.connected(1, 2)).toBe(true);
  });

  it("cut disconnects two nodes", () => {
    const lct = new LinkCutTree();
    lct.makeTree(1, 10);
    lct.makeTree(2, 20);
    lct.link(1, 2);
    expect(lct.connected(1, 2)).toBe(true);
    lct.cut(1, 2);
    expect(lct.connected(1, 2)).toBe(false);
  });

  it("connected detects same tree through chain", () => {
    const lct = new LinkCutTree();
    lct.makeTree(1, 1);
    lct.makeTree(2, 2);
    lct.makeTree(3, 3);
    lct.link(1, 2);
    lct.link(2, 3);
    expect(lct.connected(1, 3)).toBe(true);
  });

  it("link returns false for cycle", () => {
    const lct = new LinkCutTree();
    lct.makeTree(1, 1);
    lct.makeTree(2, 2);
    lct.link(1, 2);
    expect(lct.link(2, 1)).toBe(false);
  });

  it("pathAggregate sums values on path", () => {
    const lct = new LinkCutTree();
    lct.makeTree(1, 10);
    lct.makeTree(2, 20);
    lct.makeTree(3, 30);
    lct.link(1, 2);
    lct.link(2, 3);
    expect(lct.pathAggregate(1, 3)).toBe(60);
  });

  it("connected returns true for same node", () => {
    const lct = new LinkCutTree();
    lct.makeTree(1, 5);
    expect(lct.connected(1, 1)).toBe(true);
  });

  it("link returns false for missing nodes", () => {
    const lct = new LinkCutTree();
    expect(lct.link(1, 2)).toBe(false);
  });

  it("makeTree does not duplicate", () => {
    const lct = new LinkCutTree();
    lct.makeTree(1, 10);
    lct.makeTree(1, 20);
    expect(lct.nodeCount()).toBe(1);
  });
});
