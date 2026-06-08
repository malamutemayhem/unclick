import { describe, it, expect } from "vitest";
import { MarkdownBuilder } from "../markdown-builder.js";

describe("MarkdownBuilder", () => {
  it("creates headings", () => {
    const md = new MarkdownBuilder().heading("Title", 1).build();
    expect(md).toBe("# Title");
  });

  it("creates different heading levels", () => {
    const md = new MarkdownBuilder().heading("H2", 2).heading("H3", 3).build();
    expect(md).toContain("## H2");
    expect(md).toContain("### H3");
  });

  it("creates paragraphs", () => {
    const md = new MarkdownBuilder().paragraph("Hello world").build();
    expect(md).toContain("Hello world");
  });

  it("creates bullet lists", () => {
    const md = new MarkdownBuilder().bulletList(["a", "b", "c"]).build();
    expect(md).toContain("- a");
    expect(md).toContain("- b");
  });

  it("creates numbered lists", () => {
    const md = new MarkdownBuilder().numberedList(["first", "second"]).build();
    expect(md).toContain("1. first");
    expect(md).toContain("2. second");
  });

  it("creates tables", () => {
    const md = new MarkdownBuilder().table(["Name", "Age"], [["Alice", "30"], ["Bob", "25"]]).build();
    expect(md).toContain("| Name | Age |");
    expect(md).toContain("| Alice | 30 |");
  });

  it("creates code blocks", () => {
    const md = new MarkdownBuilder().codeBlock("const x = 1;", "ts").build();
    expect(md).toContain("```ts");
    expect(md).toContain("const x = 1;");
  });

  it("formats inline elements", () => {
    const mb = new MarkdownBuilder();
    expect(mb.bold("text")).toBe("**text**");
    expect(mb.italic("text")).toBe("*text*");
    expect(mb.code("text")).toBe("`text`");
    expect(mb.link("click", "url")).toBe("[click](url)");
    expect(mb.image("alt", "url")).toBe("![alt](url)");
  });

  it("creates blockquotes", () => {
    const md = new MarkdownBuilder().blockquote("quote").build();
    expect(md).toContain("> quote");
  });

  it("creates hr", () => {
    const md = new MarkdownBuilder().hr().build();
    expect(md).toContain("---");
  });

  it("clear resets builder", () => {
    const mb = new MarkdownBuilder();
    mb.heading("Title");
    mb.clear();
    expect(mb.build()).toBe("");
  });

  it("chains calls fluently", () => {
    const md = new MarkdownBuilder()
      .heading("Report", 1)
      .paragraph("Summary here.")
      .bulletList(["item 1", "item 2"])
      .build();
    expect(md).toContain("# Report");
    expect(md).toContain("Summary here.");
    expect(md).toContain("- item 1");
  });
});
