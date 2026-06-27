import { describe, it, expect } from "vitest";
import { StringBuilder, sb } from "../string-builder.js";

describe("StringBuilder", () => {
  it("appends strings", () => {
    const b = new StringBuilder();
    b.append("hello").append(" world");
    expect(b.toString()).toBe("hello world");
  });

  it("appendLine adds newline", () => {
    const b = new StringBuilder();
    b.appendLine("line1").appendLine("line2");
    expect(b.toString()).toBe("line1\nline2\n");
  });

  it("prepend adds to front", () => {
    const b = new StringBuilder();
    b.append("world").prepend("hello ");
    expect(b.toString()).toBe("hello world");
  });

  it("insert at position", () => {
    const b = new StringBuilder();
    b.append("helloworld").insert(5, " ");
    expect(b.toString()).toBe("hello world");
  });

  it("replace first occurrence", () => {
    const b = new StringBuilder();
    b.append("foo bar foo").replace("foo", "baz");
    expect(b.toString()).toBe("baz bar foo");
  });

  it("replaceAll occurrences", () => {
    const b = new StringBuilder();
    b.append("foo bar foo").replaceAll("foo", "baz");
    expect(b.toString()).toBe("baz bar baz");
  });

  it("tracks length", () => {
    const b = new StringBuilder();
    b.append("hello");
    expect(b.length).toBe(5);
  });

  it("isEmpty", () => {
    const b = new StringBuilder();
    expect(b.isEmpty()).toBe(true);
    b.append("x");
    expect(b.isEmpty()).toBe(false);
  });

  it("clear empties content", () => {
    const b = new StringBuilder();
    b.append("hello").clear();
    expect(b.isEmpty()).toBe(true);
    expect(b.toString()).toBe("");
  });

  it("toLines splits on newline", () => {
    const b = new StringBuilder();
    b.append("a\nb\nc");
    expect(b.toLines()).toEqual(["a", "b", "c"]);
  });

  it("indent adds spaces", () => {
    const b = new StringBuilder();
    b.append("line1\nline2").indent(4);
    expect(b.toString()).toBe("    line1\n    line2");
  });

  it("wrap respects max width", () => {
    const b = new StringBuilder();
    b.append("the quick brown fox jumps").wrap(15);
    const lines = b.toLines();
    for (const line of lines) {
      expect(line.length).toBeLessThanOrEqual(15);
    }
  });

  it("sb factory creates empty builder", () => {
    const b = sb();
    expect(b.isEmpty()).toBe(true);
    b.append("test");
    expect(b.toString()).toBe("test");
  });

  it("chaining works fluently", () => {
    const result = sb().append("a").appendLine("b").append("c").toString();
    expect(result).toBe("ab\nc");
  });
});
