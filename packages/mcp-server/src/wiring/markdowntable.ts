// wiring/markdowntable.ts
// Per-app MCP wiring for the markdowntable connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { markdowntableConvert } from "../markdowntable-tool.js";

export const markdowntableTools = [
  // ── markdowntable-tool.ts ────────────────────────────────────────────────────
  {
    name: "markdowntable_convert",
    description: "Convert CSV or TSV text into a Markdown table.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        input: { type: "string" as const, description: "CSV or TSV text." },
        delimiter: { type: "string" as const, description: "',' (default) or 'tab'." },
        has_header: { type: "boolean" as const, description: "First row is header (default true)." },
      }, required: ["input"],
    },
  },
] as const;

export const markdowntableHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // markdowntable-tool.ts
  markdowntable_convert:     (args) => markdowntableConvert(args),
};
