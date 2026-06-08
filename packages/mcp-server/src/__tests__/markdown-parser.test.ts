import { describe, it, expect } from "vitest";
import { parseMarkdown, extractHeadings, extractLinks } from "../markdown-parser.js";

describe("parseMarkdown", () => {
  it("parses headings", () => {
    const tokens = parseMarkdown("# Hello\n## World");
    expect(tokens[0]).toEqual({ type: "heading", content: "Hello", level: 1 });
    expect(tokens[1]).toEqual({ type: "heading", content: "World", level: 2 });
  });

  it("parses paragraphs", () => {
    const tokens = parseMarkdown("Some text here.");
    expect(tokens[0].type).toBe("paragraph");
    expect(tokens[0].content).toBe("Some text here.");
  });

  it("parses code blocks", () => {
    const tokens = parseMarkdown("```js\nconsole.log('hi');\n```");
    expect(tokens[0].type).toBe("code");
    expect(tokens[0].language).toBe("js");
    expect(tokens[0].content).toBe("console.log('hi');");
  });

  it("parses blockquotes", () => {
    const tokens = parseMarkdown("> quoted text\n> more");
    expect(tokens[0].type).toBe("blockquote");
    expect(tokens[0].content).toBe("quoted text\nmore");
  });

  it("parses unordered lists", () => {
    const tokens = parseMarkdown("- item 1\n- item 2\n- item 3");
    expect(tokens[0].type).toBe("list");
    expect(tokens[0].ordered).toBe(false);
    expect(tokens[0].items).toEqual(["item 1", "item 2", "item 3"]);
  });

  it("parses ordered lists", () => {
    const tokens = parseMarkdown("1. first\n2. second");
    expect(tokens[0].type).toBe("list");
    expect(tokens[0].ordered).toBe(true);
    expect(tokens[0].items).toEqual(["first", "second"]);
  });

  it("parses horizontal rules", () => {
    const tokens = parseMarkdown("---");
    expect(tokens[0].type).toBe("hr");
  });

  it("handles blank lines", () => {
    const tokens = parseMarkdown("text\n\nmore text");
    expect(tokens.some((t) => t.type === "blank")).toBe(true);
  });
});

describe("extractHeadings", () => {
  it("extracts headings with levels", () => {
    const headings = extractHeadings("# Title\n## Section\n### Sub");
    expect(headings).toEqual([
      { level: 1, text: "Title" },
      { level: 2, text: "Section" },
      { level: 3, text: "Sub" },
    ]);
  });

  it("returns empty for no headings", () => {
    expect(extractHeadings("just text")).toEqual([]);
  });
});

describe("extractLinks", () => {
  it("extracts markdown links", () => {
    const links = extractLinks("Check [Google](https://google.com) and [GitHub](https://github.com)");
    expect(links).toEqual([
      { text: "Google", url: "https://google.com" },
      { text: "GitHub", url: "https://github.com" },
    ]);
  });

  it("returns empty for no links", () => {
    expect(extractLinks("no links here")).toEqual([]);
  });
});
