import { describe, it, expect } from "vitest";
import { DiffEngine } from "../diff-engine.js";

describe("DiffEngine", () => {
  it("diffs identical texts", () => {
    const ops = DiffEngine.diffLines("a\nb\nc", "a\nb\nc");
    expect(ops.every((o) => o.type === "equal")).toBe(true);
    expect(ops.length).toBe(3);
  });

  it("detects additions", () => {
    const ops = DiffEngine.diffLines("a\nc", "a\nb\nc");
    const added = ops.filter((o) => o.type === "add");
    expect(added.length).toBe(1);
    expect(added[0].value).toBe("b");
  });

  it("detects removals", () => {
    const ops = DiffEngine.diffLines("a\nb\nc", "a\nc");
    const removed = ops.filter((o) => o.type === "remove");
    expect(removed.length).toBe(1);
    expect(removed[0].value).toBe("b");
  });

  it("handles complete replacement", () => {
    const ops = DiffEngine.diffLines("a\nb", "c\nd");
    const stats = DiffEngine.stats(ops);
    expect(stats.added).toBe(2);
    expect(stats.removed).toBe(2);
    expect(stats.unchanged).toBe(0);
  });

  it("diffs arrays", () => {
    const ops = DiffEngine.diffArrays(["x", "y", "z"], ["x", "w", "z"]);
    expect(ops.some((o) => o.type === "remove" && o.value === "y")).toBe(true);
    expect(ops.some((o) => o.type === "add" && o.value === "w")).toBe(true);
  });

  it("generates unified diff", () => {
    const diff = DiffEngine.unifiedDiff("hello\nworld", "hello\nearth");
    expect(diff).toContain(" hello");
    expect(diff).toContain("-world");
    expect(diff).toContain("+earth");
  });

  it("computes similarity", () => {
    expect(DiffEngine.similarity("a\nb\nc", "a\nb\nc")).toBe(1);
    expect(DiffEngine.similarity("a\nb", "c\nd")).toBe(0);
    expect(DiffEngine.similarity("a\nb\nc", "a\nc")).toBeGreaterThan(0);
  });

  it("handles empty texts", () => {
    expect(DiffEngine.similarity("", "")).toBe(1);
    const ops = DiffEngine.diffLines("", "a");
    expect(ops.length).toBe(2);
    expect(ops.some((o) => o.type === "add")).toBe(true);
  });

  it("computes stats", () => {
    const ops = DiffEngine.diffLines("a\nb\nc", "a\nd\nc");
    const stats = DiffEngine.stats(ops);
    expect(stats.unchanged).toBe(2);
  });
});
