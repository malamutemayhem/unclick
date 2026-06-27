import { describe, it, expect } from "vitest";
import { diffLines, diffWords, formatUnifiedDiff, applyPatch } from "../diff.js";

describe("diffLines", () => {
  it("detects no changes", () => {
    const result = diffLines("a\nb\nc", "a\nb\nc");
    expect(result.every((r) => r.type === "equal")).toBe(true);
  });

  it("detects additions", () => {
    const result = diffLines("a\nc", "a\nb\nc");
    const adds = result.filter((r) => r.type === "add");
    expect(adds.length).toBeGreaterThan(0);
    expect(adds.some((a) => a.value === "b")).toBe(true);
  });

  it("detects removals", () => {
    const result = diffLines("a\nb\nc", "a\nc");
    const removes = result.filter((r) => r.type === "remove");
    expect(removes.length).toBeGreaterThan(0);
  });

  it("handles empty strings", () => {
    const result = diffLines("", "a");
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("diffWords", () => {
  it("detects word changes", () => {
    const result = diffWords("hello world", "hello there");
    const changes = result.filter((r) => r.type !== "equal");
    expect(changes.length).toBeGreaterThan(0);
  });

  it("identical strings have no changes", () => {
    const result = diffWords("same same", "same same");
    expect(result.every((r) => r.type === "equal")).toBe(true);
  });
});

describe("formatUnifiedDiff", () => {
  it("formats with +/-/space prefixes", () => {
    const diffs = [
      { type: "equal" as const, value: "a" },
      { type: "remove" as const, value: "b" },
      { type: "add" as const, value: "c" },
    ];
    const out = formatUnifiedDiff(diffs);
    expect(out).toContain(" a");
    expect(out).toContain("-b");
    expect(out).toContain("+c");
  });
});

describe("applyPatch", () => {
  it("applies diffs to reconstruct", () => {
    const original = "a\nb\nc";
    const target = "a\nx\nc";
    const diffs = diffLines(original, target);
    const result = applyPatch(original, diffs);
    expect(result).toBe(target);
  });
});
