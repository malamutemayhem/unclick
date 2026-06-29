// wiring/sortlines.ts
// Per-app MCP wiring for the sortlines connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { sortLines } from "../sortlines-tool.js";

export const sortlinesTools = [
  // ── sortlines-tool.ts ──────────────────────────────────────────────────────
  {
    name: "sort_lines",
    description: "Sort, deduplicate, or reverse lines of text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Multi-line text to sort." },
        reverse: { type: "boolean" as const, description: "Sort descending (default false)." },
        deduplicate: { type: "boolean" as const, description: "Remove duplicate lines (default false)." },
        numeric: { type: "boolean" as const, description: "Sort numerically (default false)." },
        case_insensitive: { type: "boolean" as const, description: "Case-insensitive sort (default false)." },
      }, required: ["text"],
    },
  },
] as const;

export const sortlinesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // sortlines-tool.ts
  sort_lines:                (args) => sortLines(args),
};
