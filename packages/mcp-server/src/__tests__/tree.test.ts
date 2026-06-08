import { describe, it, expect } from "vitest";
import { TreeNode } from "../tree.js";

describe("TreeNode", () => {
  it("creates a node with value", () => {
    const root = new TreeNode("root");
    expect(root.value).toBe("root");
    expect(root.children).toEqual([]);
  });

  it("adds children", () => {
    const root = new TreeNode(1);
    const child = root.addChild(2);
    root.addChild(3);
    expect(root.children.length).toBe(2);
    expect(child.value).toBe(2);
  });

  it("removes children", () => {
    const root = new TreeNode(1);
    root.addChild(2);
    root.addChild(3);
    expect(root.removeChild(2)).toBe(true);
    expect(root.children.length).toBe(1);
    expect(root.removeChild(99)).toBe(false);
  });

  it("finds nodes by predicate", () => {
    const root = new TreeNode(1);
    const a = root.addChild(2);
    a.addChild(4);
    root.addChild(3);
    const found = root.find((v: number) => v === 4);
    expect(found).not.toBeNull();
    expect(found!.value).toBe(4);
    expect(root.find((v: number) => v === 99)).toBeNull();
  });

  it("dfs visits in pre-order", () => {
    const root = new TreeNode("a");
    const b = root.addChild("b");
    b.addChild("d");
    root.addChild("c");
    const visited: string[] = [];
    root.dfs((v: string) => visited.push(v));
    expect(visited).toEqual(["a", "b", "d", "c"]);
  });

  it("dfs provides depth", () => {
    const root = new TreeNode(1);
    const c = root.addChild(2);
    c.addChild(3);
    const depths: number[] = [];
    root.dfs((_: number, d: number) => depths.push(d));
    expect(depths).toEqual([0, 1, 2]);
  });

  it("bfs visits level-order", () => {
    const root = new TreeNode("a");
    const b = root.addChild("b");
    b.addChild("d");
    root.addChild("c");
    const visited: string[] = [];
    root.bfs((v: string) => visited.push(v));
    expect(visited).toEqual(["a", "b", "c", "d"]);
  });

  it("maps tree", () => {
    const root = new TreeNode(1);
    root.addChild(2);
    root.addChild(3);
    const doubled = root.map((v: number) => v * 2);
    expect(doubled.value).toBe(2);
    expect(doubled.toArray()).toEqual([2, 4, 6]);
  });

  it("computes size", () => {
    const root = new TreeNode(1);
    const a = root.addChild(2);
    a.addChild(4);
    a.addChild(5);
    root.addChild(3);
    expect(root.size).toBe(5);
  });

  it("computes depth", () => {
    const root = new TreeNode(1);
    expect(root.depth).toBe(0);
    const a = root.addChild(2);
    expect(root.depth).toBe(1);
    a.addChild(3);
    expect(root.depth).toBe(2);
  });

  it("identifies leaves", () => {
    const root = new TreeNode(1);
    expect(root.isLeaf).toBe(true);
    root.addChild(2);
    expect(root.isLeaf).toBe(false);
  });

  it("toArray returns all values in DFS order", () => {
    const root = new TreeNode(1);
    root.addChild(2);
    root.addChild(3);
    expect(root.toArray()).toEqual([1, 2, 3]);
  });
});
