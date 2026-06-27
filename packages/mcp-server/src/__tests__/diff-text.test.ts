import { describe, it, expect } from "vitest";
import { diffLines, applyPatch } from "../diff-text.js";

describe("diff-text", () => {
  describe("diffLines", () => {
    it("returns empty for equal strings", () => {
      const chunks = diffLines("hello\nworld", "hello\nworld");
      expect(chunks.every((c) => c.type === "equal")).toBe(true);
    });

    it("detects added lines", () => {
      const chunks = diffLines("a\nb", "a\nb\nc");
      expect(chunks.some((c) => c.type === "add" && c.value === "c")).toBe(true);
    });

    it("detects removed lines", () => {
      const chunks = diffLines("a\nb\nc", "a\nc");
      expect(chunks.some((c) => c.type === "remove" && c.value === "b")).toBe(true);
    });

    it("detects replaced lines", () => {
      const chunks = diffLines("a\nb\nc", "a\nx\nc");
      expect(chunks.some((c) => c.type === "remove" && c.value === "b")).toBe(true);
      expect(chunks.some((c) => c.type === "add" && c.value === "x")).toBe(true);
    });
  });

  describe("applyPatch", () => {
    it("reconstructs target from diff", () => {
      const a = "line1\nline2\nline3";
      const b = "line1\nchanged\nline3\nline4";
      const chunks = diffLines(a, b);
      expect(applyPatch(a, chunks)).toBe(b);
    });

    it("handles empty to non-empty", () => {
      const chunks = diffLines("", "hello");
      expect(applyPatch("", chunks)).toBe("hello");
    });

    it("handles identical strings", () => {
      const text = "same\nlines";
      const chunks = diffLines(text, text);
      expect(applyPatch(text, chunks)).toBe(text);
    });
  });
});
