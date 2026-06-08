import { describe, it, expect } from "vitest";
import { bold, italic, code, codeBlock, link, image, heading, blockquote, orderedList, unorderedList, taskList, hr, table, stripMarkdown, extractLinks } from "../markdown.js";

describe("markdown", () => {
  it("bold", () => { expect(bold("hi")).toBe("**hi**"); });
  it("italic", () => { expect(italic("hi")).toBe("*hi*"); });
  it("code", () => { expect(code("x")).toBe("`x`"); });
  it("codeBlock", () => { expect(codeBlock("code", "ts")).toContain("```ts"); });
  it("link", () => { expect(link("text", "url")).toBe("[text](url)"); });
  it("image", () => { expect(image("alt", "url")).toBe("![alt](url)"); });
  it("heading", () => { expect(heading("Title", 2)).toBe("## Title"); });
  it("blockquote", () => { expect(blockquote("quote")).toBe("> quote"); });
  it("orderedList", () => { expect(orderedList(["a", "b"])).toBe("1. a\n2. b"); });
  it("unorderedList", () => { expect(unorderedList(["a", "b"])).toBe("- a\n- b"); });
  it("taskList", () => {
    const result = taskList([{ text: "done", done: true }, { text: "todo", done: false }]);
    expect(result).toContain("[x]");
    expect(result).toContain("[ ]");
  });
  it("hr", () => { expect(hr()).toBe("---"); });
  it("table", () => {
    const result = table(["A", "B"], [["1", "2"]]);
    expect(result).toContain("| A | B |");
    expect(result).toContain("| 1 | 2 |");
  });
  it("stripMarkdown", () => {
    expect(stripMarkdown("**bold** and *italic*")).toBe("bold and italic");
  });
  it("extractLinks", () => {
    const links = extractLinks("See [here](https://example.com) and [there](https://test.com)");
    expect(links).toHaveLength(2);
    expect(links[0].text).toBe("here");
  });
});
