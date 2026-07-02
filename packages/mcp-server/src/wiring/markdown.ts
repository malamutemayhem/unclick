// wiring/markdown.ts
// Per-app MCP wiring for the markdown connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { markdownToHtml, markdownStats } from "../markdown-tool.js";

export const markdownTools = [
  // ── markdown-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "markdown_to_html",
    description: "Convert Markdown text to HTML (headings, bold, italic, links, lists, code).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        markdown: { type: "string" as const, description: "Markdown text to convert." },
      }, required: ["markdown"],
    },
  },
  {
    name: "markdown_stats",
    description: "Analyze Markdown text: count headings, links, code blocks, words, and more.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        markdown: { type: "string" as const, description: "Markdown text to analyze." },
      }, required: ["markdown"],
    },
  },
] as const;

export const markdownHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // markdown-tool.ts
  markdown_to_html:          (args) => markdownToHtml(args),
  markdown_stats:            (args) => markdownStats(args),
};
