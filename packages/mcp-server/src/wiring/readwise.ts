// wiring/readwise.ts
// Per-app MCP wiring for the readwise connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity

import { readwiseAction } from "../readwise-tool.js";

export const readwiseTools = [
  // ── readwise-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "readwise_action",
    description: "Perform a Readwise action: get_readwise_highlights, get_readwise_books, get_daily_review, search_highlights, create_highlight.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        query: { type: "string" },
        page: { type: "number" },
        book_id: { type: "number" },
        highlights: { type: "array", items: {} },
      },
      required: ["action"],
    },
  },
] as const;

export const readwiseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // readwise-tool.ts
  readwise_action:         (args) => readwiseAction(String(args.action ?? ""), args),
};
