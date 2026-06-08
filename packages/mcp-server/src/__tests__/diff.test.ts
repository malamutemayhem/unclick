import { describe, it, expect } from "vitest";
import { diffLines, unifiedDiff, applyPatch, Change } from "../diff.js";

describe("diffLines", () => {
  it("equal texts produce all equal changes", () => {
    const result = diffLines("a\nb\nc", "a\nb\nc");
    expect(result.every((c) => c.type === "equal")).toBe(true);
    expect(result).toHaveLength(3);
  });

  it("detects added lines", () => {
    const result = diffLines("a\nc", "a\nb\nc");
    const added = result.filter((c) => c.type === "add");
    expect(added).toHaveLength(1);
    expect(added[0].value).toBe("b");
  });

  it("detects removed lines", () => {
    const result = diffLines("a\nb\nc", "a\nc");
    const removed = result.filter((c) => c.type === "remove");
    expect(removed).toHaveLength(1);
    expect(removed[0].value).toBe("b");
  });

  it("handles completely different content", () => {
    const result = diffLines("a\nb", "x\ny");
    expect(result.some((c) => c.type === "add")).toBe(true);
    expect(result.some((c) => c.type === "remove")).toBe(true);
  });
});

describe("unifiedDiff", () => {
  it("produces unified format", () => {
    const result = unifiedDiff("a\nb\nc", "a\nx\nc");
    expect(result).toContain("-b");
    expect(result).toContain("+x");
    expect(result).toContain(" a");
  });
});

describe("applyPatch", () => {
  it("reconstructs target from changes", () => {
    const changes = diffLines("hello\nworld", "hello\nthere\nworld");
    const result = applyPatch("hello\nworld", changes);
    expect(result).toBe("hello\nthere\nworld");
  });
});
