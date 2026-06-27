import { describe, it, expect } from "vitest";
import { wrap, truncate, pad, columns, indent, dedent, box, stripAnsi, center } from "../text-wrap.js";

describe("TextWrap", () => {
  it("wraps text at width", () => {
    const result = wrap("the quick brown fox jumps over the lazy dog", { width: 20 });
    const lines = result.split("\n");
    expect(lines.length).toBeGreaterThan(1);
    for (const line of lines) {
      expect(line.length).toBeLessThanOrEqual(20);
    }
  });

  it("preserves newlines by default", () => {
    const result = wrap("line one\nline two", { width: 80 });
    expect(result.split("\n")).toHaveLength(2);
  });

  it("applies indent", () => {
    const result = wrap("hello world", { width: 80, indent: "  " });
    expect(result.startsWith("  ")).toBe(true);
  });

  it("does not wrap short text", () => {
    const result = wrap("short", { width: 80 });
    expect(result).toBe("short");
  });
});

describe("truncate", () => {
  it("truncates long text", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
  });

  it("keeps short text", () => {
    expect(truncate("hi", 10)).toBe("hi");
  });

  it("custom suffix", () => {
    expect(truncate("hello world", 8, "~")).toBe("hello w~");
  });
});

describe("pad", () => {
  it("pads left (right-aligns text)", () => {
    expect(pad("hi", 5, "right")).toBe("   hi");
  });

  it("pads right (left-aligns text)", () => {
    expect(pad("hi", 5, "left")).toBe("hi   ");
  });

  it("pads center", () => {
    expect(pad("hi", 6, "center")).toBe("  hi  ");
  });

  it("custom pad char", () => {
    expect(pad("hi", 5, "left", "-")).toBe("hi---");
  });
});

describe("columns", () => {
  it("formats columnar data", () => {
    const result = columns([
      ["Name", "Age"],
      ["Alice", "30"],
      ["Bob", "25"],
    ]);
    expect(result.split("\n")).toHaveLength(3);
  });
});

describe("indent/dedent", () => {
  it("indents text", () => {
    expect(indent("a\nb", 4)).toBe("    a\n    b");
  });

  it("dedents text", () => {
    expect(dedent("  a\n  b")).toBe("a\nb");
  });
});

describe("box", () => {
  it("draws box around text", () => {
    const result = box("hello");
    const lines = result.split("\n");
    expect(lines[0]).toMatch(/^\*+$/);
    expect(lines[lines.length - 1]).toMatch(/^\*+$/);
    expect(result).toContain("hello");
  });
});

describe("stripAnsi", () => {
  it("removes ANSI codes", () => {
    expect(stripAnsi("\x1b[31mred\x1b[0m")).toBe("red");
  });
});

describe("center", () => {
  it("centers text", () => {
    expect(center("hi", 6)).toBe("  hi  ");
  });
});
