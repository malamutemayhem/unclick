import { describe, it, expect } from "vitest";
import { MarkdownTokenizer } from "../markdown-tokenizer.js";

describe("MarkdownTokenizer", () => {
  const tokenizer = new MarkdownTokenizer();

  it("tokenizes headings", () => {
    const tokens = tokenizer.tokenize("# Hello\n## World");
    expect(tokens[0].type).toBe("heading");
    expect(tokens[0].level).toBe(1);
    expect(tokens[0].content).toBe("Hello");
    expect(tokens[1].type).toBe("heading");
    expect(tokens[1].level).toBe(2);
  });

  it("tokenizes code blocks", () => {
    const tokens = tokenizer.tokenize("```js\nconst x = 1;\n```");
    expect(tokens[0].type).toBe("code_block");
    expect(tokens[0].lang).toBe("js");
    expect(tokens[0].content).toBe("const x = 1;");
  });

  it("tokenizes blockquotes", () => {
    const tokens = tokenizer.tokenize("> quoted text");
    expect(tokens[0].type).toBe("blockquote");
    expect(tokens[0].content).toBe("quoted text");
  });

  it("tokenizes list items", () => {
    const tokens = tokenizer.tokenize("- item one\n- item two");
    expect(tokens[0].type).toBe("list_item");
    expect(tokens[0].content).toBe("item one");
    expect(tokens[1].type).toBe("list_item");
  });

  it("tokenizes horizontal rules", () => {
    const tokens = tokenizer.tokenize("---");
    expect(tokens[0].type).toBe("hr");
  });

  it("tokenizes paragraphs", () => {
    const tokens = tokenizer.tokenize("Just some text");
    expect(tokens[0].type).toBe("paragraph");
    expect(tokens[0].content).toBe("Just some text");
  });

  it("tokenizes inline bold", () => {
    const tokens = tokenizer.tokenizeInline("**bold** text");
    expect(tokens[0].type).toBe("bold");
    expect(tokens[0].content).toBe("bold");
  });

  it("tokenizes inline links", () => {
    const tokens = tokenizer.tokenizeInline("[click](http://example.com)");
    expect(tokens[0].type).toBe("link");
    expect(tokens[0].content).toBe("click");
    expect(tokens[0].url).toBe("http://example.com");
  });

  it("extractHeadings filters headings", () => {
    const tokens = tokenizer.tokenize("# Title\nparagraph\n## Sub");
    const headings = MarkdownTokenizer.extractHeadings(tokens);
    expect(headings.length).toBe(2);
  });

  it("wordCount counts words", () => {
    const tokens = tokenizer.tokenize("# Hello World\nThis is a test");
    expect(MarkdownTokenizer.wordCount(tokens)).toBe(6);
  });
});
