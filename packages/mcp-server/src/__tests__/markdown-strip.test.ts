import { describe, it, expect } from "vitest";
import { stripMarkdown, extractHeadings, extractLinks, extractCodeBlocks, wordCount } from "../markdown-strip.js";

describe("stripMarkdown", () => {
  it("removes headers", () => {
    expect(stripMarkdown("# Hello\n## World")).toBe("Hello\nWorld");
  });

  it("removes bold and italic", () => {
    expect(stripMarkdown("**bold** and *italic*")).toBe("bold and italic");
  });

  it("removes links", () => {
    expect(stripMarkdown("[click](http://example.com)")).toBe("click");
  });

  it("removes code blocks", () => {
    expect(stripMarkdown("before\n```js\ncode\n```\nafter")).toBe("before\n\nafter");
  });

  it("removes inline code", () => {
    expect(stripMarkdown("use `code` here")).toBe("use code here");
  });

  it("removes list markers", () => {
    expect(stripMarkdown("- item one\n- item two")).toBe("item one\nitem two");
  });
});

describe("extractHeadings", () => {
  it("finds headings with levels", () => {
    const headings = extractHeadings("# Title\n## Section\n### Sub");
    expect(headings).toEqual([
      { level: 1, text: "Title" },
      { level: 2, text: "Section" },
      { level: 3, text: "Sub" },
    ]);
  });
});

describe("extractLinks", () => {
  it("finds links", () => {
    const links = extractLinks("[A](http://a.com) and [B](http://b.com)");
    expect(links.length).toBe(2);
    expect(links[0].text).toBe("A");
  });
});

describe("extractCodeBlocks", () => {
  it("extracts with language", () => {
    const blocks = extractCodeBlocks("```ts\nconst x = 1\n```");
    expect(blocks[0].language).toBe("ts");
    expect(blocks[0].code).toBe("const x = 1");
  });
});

describe("wordCount", () => {
  it("counts words in plain text", () => {
    expect(wordCount("# Hello **World**\n\nThis is a test.")).toBe(6);
  });
});
