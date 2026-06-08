import { describe, it, expect } from "vitest";
import { diffLines, formatUnified, countChanges, hasChanges } from "../diff.js";

describe("diff", () => {
  it("equal strings produce no changes", () => {
    const changes = diffLines("a\nb\nc", "a\nb\nc");
    expect(changes.every((c) => c.type === "equal")).toBe(true);
  });

  it("detects additions", () => {
    const changes = diffLines("a\nc", "a\nb\nc");
    const additions = changes.filter((c) => c.type === "add");
    expect(additions).toHaveLength(1);
    expect(additions[0].value).toBe("b");
  });

  it("detects removals", () => {
    const changes = diffLines("a\nb\nc", "a\nc");
    const removals = changes.filter((c) => c.type === "remove");
    expect(removals).toHaveLength(1);
    expect(removals[0].value).toBe("b");
  });

  it("handles complete replacement", () => {
    const changes = diffLines("a\nb", "c\nd");
    const adds = changes.filter((c) => c.type === "add");
    const removes = changes.filter((c) => c.type === "remove");
    expect(adds.length).toBeGreaterThan(0);
    expect(removes.length).toBeGreaterThan(0);
  });

  it("handles empty strings", () => {
    const changes = diffLines("", "a");
    expect(changes.filter((c) => c.type === "add")).toHaveLength(1);
  });

  it("formatUnified produces diff format", () => {
    const changes = diffLines("a\nb", "a\nc");
    const output = formatUnified(changes);
    expect(output).toContain(" a");
    expect(output).toContain("-b");
    expect(output).toContain("+c");
  });

  it("countChanges tallies correctly", () => {
    const changes = diffLines("a\nb", "a\nc");
    const counts = countChanges(changes);
    expect(counts.unchanged).toBe(1);
    expect(counts.additions).toBe(1);
    expect(counts.deletions).toBe(1);
  });

  it("hasChanges detects differences", () => {
    expect(hasChanges("abc", "abc")).toBe(false);
    expect(hasChanges("abc", "def")).toBe(true);
  });
});
