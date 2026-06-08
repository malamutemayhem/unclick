import { describe, it, expect } from "vitest";
import { diffLines, diffWords, applyPatch, unifiedDiff } from "../text-diff.js";

describe("diffLines", () => {
  it("detects additions", () => {
    const changes = diffLines("a\nb", "a\nb\nc");
    const adds = changes.filter((c) => c.type === "add");
    expect(adds.length).toBeGreaterThan(0);
    expect(adds.some((a) => a.value.includes("c"))).toBe(true);
  });

  it("detects removals", () => {
    const changes = diffLines("a\nb\nc", "a\nc");
    const removes = changes.filter((c) => c.type === "remove");
    expect(removes.length).toBeGreaterThan(0);
  });

  it("identical texts produce only equal", () => {
    const changes = diffLines("hello\nworld", "hello\nworld");
    expect(changes.every((c) => c.type === "equal")).toBe(true);
  });
});

describe("diffWords", () => {
  it("detects word changes", () => {
    const changes = diffWords("hello world", "hello there");
    expect(changes.some((c) => c.type === "remove")).toBe(true);
    expect(changes.some((c) => c.type === "add")).toBe(true);
  });
});

describe("applyPatch", () => {
  it("reconstructs new text from diff", () => {
    const oldText = "a\nb\nc";
    const newText = "a\nx\nc";
    const changes = diffLines(oldText, newText);
    const result = applyPatch(oldText, changes);
    expect(result).toBe(newText);
  });
});

describe("unifiedDiff", () => {
  it("produces unified format", () => {
    const result = unifiedDiff("a\nb", "a\nc", "old.txt", "new.txt");
    expect(result).toContain("--- old.txt");
    expect(result).toContain("+++ new.txt");
    expect(result).toContain("-b");
    expect(result).toContain("+c");
  });
});
