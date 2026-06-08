import { describe, it, expect } from "vitest";
import { diff, diffArrays, unifiedDiff } from "../diff.js";

describe("diffArrays", () => {
  it("detects no changes", () => {
    const result = diffArrays(["a", "b"], ["a", "b"]);
    expect(result.every((c) => c.type === "equal")).toBe(true);
  });

  it("detects additions", () => {
    const result = diffArrays(["a"], ["a", "b"]);
    expect(result).toContainEqual({ type: "equal", value: "a" });
    expect(result).toContainEqual({ type: "add", value: "b" });
  });

  it("detects removals", () => {
    const result = diffArrays(["a", "b"], ["a"]);
    expect(result).toContainEqual({ type: "equal", value: "a" });
    expect(result).toContainEqual({ type: "remove", value: "b" });
  });

  it("detects replacements", () => {
    const result = diffArrays(["a", "b", "c"], ["a", "x", "c"]);
    const types = result.map((c) => c.type);
    expect(types).toContain("remove");
    expect(types).toContain("add");
  });

  it("handles empty arrays", () => {
    expect(diffArrays([], [])).toEqual([]);
    const addAll = diffArrays([], ["a", "b"]);
    expect(addAll.every((c) => c.type === "add")).toBe(true);
  });
});

describe("diff", () => {
  it("diffs strings by line", () => {
    const result = diff("a\nb\nc", "a\nx\nc");
    expect(result).toContainEqual({ type: "equal", value: "a" });
    expect(result).toContainEqual({ type: "remove", value: "b" });
    expect(result).toContainEqual({ type: "add", value: "x" });
    expect(result).toContainEqual({ type: "equal", value: "c" });
  });
});

describe("unifiedDiff", () => {
  it("produces unified format", () => {
    const result = unifiedDiff("a\nb\nc", "a\nx\nc");
    expect(result).toContain(" a");
    expect(result).toContain("-b");
    expect(result).toContain("+x");
    expect(result).toContain(" c");
  });
});
