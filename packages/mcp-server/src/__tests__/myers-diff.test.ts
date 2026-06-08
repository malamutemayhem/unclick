import { describe, it, expect } from "vitest";
import { diff, diffLines, diffChars, unifiedDiff, applyPatch, editDistance, lcs } from "../myers-diff.js";

describe("MyersDiff", () => {
  it("diffs identical arrays", () => {
    const result = diff(["a", "b", "c"], ["a", "b", "c"]);
    expect(result.every((e) => e.type === "equal")).toBe(true);
  });

  it("detects insertions", () => {
    const result = diff(["a", "c"], ["a", "b", "c"]);
    const inserts = result.filter((e) => e.type === "insert");
    expect(inserts).toHaveLength(1);
    expect(inserts[0].value).toBe("b");
  });

  it("detects deletions", () => {
    const result = diff(["a", "b", "c"], ["a", "c"]);
    const deletes = result.filter((e) => e.type === "delete");
    expect(deletes).toHaveLength(1);
    expect(deletes[0].value).toBe("b");
  });

  it("handles complete replacement", () => {
    const result = diff(["a"], ["b"]);
    expect(result.some((e) => e.type === "delete")).toBe(true);
    expect(result.some((e) => e.type === "insert")).toBe(true);
  });

  it("handles empty arrays", () => {
    expect(diff([], []).length).toBe(0);
    const result = diff([], ["a"]);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("insert");
  });

  it("diffLines works on strings", () => {
    const result = diffLines("a\nb\nc", "a\nx\nc");
    expect(result.some((e) => e.type === "delete" && e.value === "b")).toBe(true);
    expect(result.some((e) => e.type === "insert" && e.value === "x")).toBe(true);
  });

  it("diffChars works on characters", () => {
    const result = diffChars("abc", "adc");
    expect(result.some((e) => e.type === "delete" && e.value === "b")).toBe(true);
    expect(result.some((e) => e.type === "insert" && e.value === "d")).toBe(true);
  });

  it("unifiedDiff produces diff output", () => {
    const result = unifiedDiff("line1\nline2\nline3", "line1\nchanged\nline3");
    expect(result).toContain("---");
    expect(result).toContain("+++");
    expect(result).toContain("@@");
    expect(result).toContain("-line2");
    expect(result).toContain("+changed");
  });

  it("unifiedDiff with custom filenames", () => {
    const result = unifiedDiff("a", "b", { oldFile: "old.txt", newFile: "new.txt" });
    expect(result).toContain("--- old.txt");
    expect(result).toContain("+++ new.txt");
  });

  it("unifiedDiff returns empty for identical", () => {
    expect(unifiedDiff("same", "same")).toBe("");
  });

  it("applyPatch reconstructs new text", () => {
    const edits = diffLines("hello\nworld", "hello\nthere");
    const result = applyPatch("hello\nworld", edits);
    expect(result).toBe("hello\nthere");
  });

  it("editDistance computes correctly", () => {
    expect(editDistance(["a", "b", "c"], ["a", "c"])).toBe(1);
    expect(editDistance(["a"], ["b"])).toBe(2);
  });

  it("lcs finds longest common subsequence", () => {
    expect(lcs(["a", "b", "c", "d"], ["a", "c", "d"])).toEqual(["a", "c", "d"]);
  });
});
