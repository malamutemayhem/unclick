import { describe, it, expect } from "vitest";
import { StringBuilder } from "../string-builder.js";

describe("StringBuilder", () => {
  it("appends strings", () => {
    const sb = new StringBuilder();
    sb.append("hello").append(" world");
    expect(sb.toString()).toBe("hello world");
  });

  it("appendLine adds newline", () => {
    const sb = new StringBuilder();
    sb.appendLine("line1").appendLine("line2");
    expect(sb.toString()).toBe("line1\nline2\n");
  });

  it("appendLine with no arg adds empty line", () => {
    const sb = new StringBuilder();
    sb.appendLine();
    expect(sb.toString()).toBe("\n");
  });

  it("appendIf only appends when true", () => {
    const sb = new StringBuilder();
    sb.append("start").appendIf(true, "-yes").appendIf(false, "-no");
    expect(sb.toString()).toBe("start-yes");
  });

  it("prepend adds to beginning", () => {
    const sb = new StringBuilder();
    sb.append("world").prepend("hello ");
    expect(sb.toString()).toBe("hello world");
  });

  it("clear resets", () => {
    const sb = new StringBuilder();
    sb.append("stuff").clear();
    expect(sb.toString()).toBe("");
    expect(sb.length).toBe(0);
  });

  it("join uses separator", () => {
    const sb = new StringBuilder();
    sb.append("a").append("b").append("c");
    expect(sb.join(", ")).toBe("a, b, c");
  });

  it("tracks length and partCount", () => {
    const sb = new StringBuilder();
    sb.append("abc").append("de");
    expect(sb.length).toBe(5);
    expect(sb.partCount).toBe(2);
  });

  it("isEmpty reports correctly", () => {
    const sb = new StringBuilder();
    expect(sb.isEmpty()).toBe(true);
    sb.append("x");
    expect(sb.isEmpty()).toBe(false);
  });

  it("supports chaining", () => {
    const result = new StringBuilder()
      .append("a")
      .appendLine("b")
      .appendIf(true, "c")
      .toString();
    expect(result).toBe("ab\nc");
  });
});
