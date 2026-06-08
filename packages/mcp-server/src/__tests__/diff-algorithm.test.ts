import { describe, it, expect } from "vitest";
import {
  diff, diffLines, diffChars, patch, editDistance, unifiedDiff,
} from "../diff-algorithm.js";

describe("diff", () => {
  it("finds no changes for identical arrays", () => {
    const edits = diff(["a", "b", "c"], ["a", "b", "c"]);
    expect(edits.every((e) => e.type === "equal")).toBe(true);
  });

  it("detects insertions", () => {
    const edits = diff(["a", "c"], ["a", "b", "c"]);
    const inserted = edits.filter((e) => e.type === "insert");
    expect(inserted).toHaveLength(1);
    expect(inserted[0].value).toBe("b");
  });

  it("detects deletions", () => {
    const edits = diff(["a", "b", "c"], ["a", "c"]);
    const deleted = edits.filter((e) => e.type === "delete");
    expect(deleted).toHaveLength(1);
    expect(deleted[0].value).toBe("b");
  });

  it("handles empty arrays", () => {
    expect(diff([], [])).toEqual([]);
  });

  it("handles completely different arrays", () => {
    const edits = diff(["a", "b"], ["c", "d"]);
    const inserts = edits.filter((e) => e.type === "insert").length;
    const deletes = edits.filter((e) => e.type === "delete").length;
    expect(inserts).toBe(2);
    expect(deletes).toBe(2);
  });
});

describe("diffLines", () => {
  it("diffs line-by-line", () => {
    const edits = diffLines("hello\nworld", "hello\nearth");
    const changed = edits.filter((e) => e.type !== "equal");
    expect(changed.length).toBeGreaterThan(0);
  });
});

describe("diffChars", () => {
  it("diffs character-by-character", () => {
    const edits = diffChars("cat", "cut");
    const changed = edits.filter((e) => e.type !== "equal");
    expect(changed.length).toBeGreaterThan(0);
  });
});

describe("patch", () => {
  it("applies edits to produce target", () => {
    const a = ["a", "b", "c"];
    const b = ["a", "x", "c"];
    const edits = diff(a, b);
    expect(patch(a, edits)).toEqual(b);
  });
});

describe("editDistance", () => {
  it("counts number of edits", () => {
    const dist = editDistance(["a", "b", "c"], ["a", "c"]);
    expect(dist).toBe(1);
  });

  it("returns 0 for identical", () => {
    expect(editDistance(["a"], ["a"])).toBe(0);
  });
});

describe("unifiedDiff", () => {
  it("produces unified diff format", () => {
    const result = unifiedDiff("hello\nworld", "hello\nearth");
    expect(result).toContain("-world");
    expect(result).toContain("+earth");
  });

  it("returns empty for identical strings", () => {
    expect(unifiedDiff("same", "same")).toBe("");
  });
});
