import { describe, it, expect } from "vitest";
import { diffLines, formatDiff, stats } from "../diff-text.js";

describe("diff-text", () => {
  it("detects added lines", () => {
    const diffs = diffLines("a\nb", "a\nb\nc");
    expect(diffs.some((d) => d.type === "added" && d.line === "c")).toBe(true);
  });

  it("detects removed lines", () => {
    const diffs = diffLines("a\nb\nc", "a\nc");
    expect(diffs.some((d) => d.type === "removed" && d.line === "b")).toBe(true);
  });

  it("marks unchanged lines", () => {
    const diffs = diffLines("a\nb", "a\nb");
    expect(diffs.every((d) => d.type === "unchanged")).toBe(true);
  });

  it("handles empty before", () => {
    const diffs = diffLines("", "a\nb");
    expect(diffs.filter((d) => d.type === "added").length).toBeGreaterThan(0);
  });

  it("formatDiff uses +/- prefix", () => {
    const diffs = diffLines("old", "new");
    const formatted = formatDiff(diffs);
    expect(formatted).toContain("- old");
    expect(formatted).toContain("+ new");
  });

  it("stats counts by type", () => {
    const diffs = diffLines("a\nb\nc", "a\nd");
    const s = stats(diffs);
    expect(s.unchanged).toBeGreaterThanOrEqual(1);
    expect(s.added + s.removed).toBeGreaterThan(0);
  });

  it("identical text has no changes", () => {
    const text = "line1\nline2\nline3";
    const s = stats(diffLines(text, text));
    expect(s.added).toBe(0);
    expect(s.removed).toBe(0);
  });
});
