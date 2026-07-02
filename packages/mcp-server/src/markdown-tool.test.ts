import { describe, it, expect } from "vitest";
import { markdownToHtml, markdownStats } from "./markdown-tool.js";

describe("markdown-tool", () => {
  it("converts markdown to HTML", async () => {
    const r = await markdownToHtml({ markdown: "# Hello\n\n**bold** text" }) as Record<string, unknown>;
    expect(r.html).toContain("<h1>Hello</h1>");
    expect(r.html).toContain("<strong>bold</strong>");
    expect(r.unclick_meta).toBeDefined();
  });

  it("analyzes markdown stats", async () => {
    const r = await markdownStats({ markdown: "# Title\n\n- item 1\n- item 2\n\n**bold**" }) as Record<string, unknown>;
    expect(r.headings).toBe(1);
    expect(r.list_items).toBe(2);
    expect(r.bold_phrases).toBe(1);
    expect(r.unclick_meta).toBeDefined();
  });

  it("rejects missing markdown", async () => {
    const r = await markdownToHtml({}) as Record<string, unknown>;
    expect(r.error).toMatch(/markdown/i);
  });
});
