import { describe, it, expect } from "vitest";
import {
  escape, unescape, bold, italic, code, codeBlock,
  link, heading, blockquote, unorderedList, orderedList,
  strikethrough, table
} from "../markdown-escape.js";

describe("markdown-escape", () => {
  it("escapes special chars", () => {
    expect(escape("hello *world*")).toBe("hello \\*world\\*");
  });

  it("unescapes", () => {
    expect(unescape("hello \\*world\\*")).toBe("hello *world*");
  });

  it("bold wraps text", () => {
    expect(bold("hi")).toBe("**hi**");
  });

  it("italic wraps text", () => {
    expect(italic("hi")).toBe("*hi*");
  });

  it("code wraps in backticks", () => {
    expect(code("x")).toBe("`x`");
  });

  it("code handles backticks in content", () => {
    expect(code("a`b")).toContain("``");
  });

  it("codeBlock formats with language", () => {
    const result = codeBlock("const x = 1;", "ts");
    expect(result).toContain("```ts");
    expect(result).toContain("const x = 1;");
  });

  it("link formats correctly", () => {
    expect(link("click", "http://example.com")).toBe("[click](http://example.com)");
  });

  it("heading generates correct level", () => {
    expect(heading("Title", 2)).toBe("## Title");
  });

  it("blockquote prefixes lines", () => {
    expect(blockquote("a\nb")).toBe("> a\n> b");
  });

  it("unorderedList", () => {
    expect(unorderedList(["a", "b"])).toBe("- a\n- b");
  });

  it("orderedList", () => {
    expect(orderedList(["a", "b"])).toBe("1. a\n2. b");
  });

  it("strikethrough", () => {
    expect(strikethrough("old")).toBe("~~old~~");
  });

  it("table formats", () => {
    const result = table(["A", "B"], [["1", "2"]]);
    expect(result).toContain("| A | B |");
    expect(result).toContain("| --- | --- |");
  });
});
