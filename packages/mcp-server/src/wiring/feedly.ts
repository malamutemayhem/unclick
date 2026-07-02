// wiring/feedly.ts
// Per-app MCP wiring for the feedly connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity

import { feedlyAction } from "../feedly-tool.js";

export const feedlyTools = [
  // ── feedly-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "feedly_action",
    description: "Perform a Feedly action: get_feedly_feeds, get_feedly_streams, search_feedly, get_feedly_categories, mark_as_read.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        stream_id: { type: "string" },
        query: { type: "string" },
        count: { type: "number" },
        entry_ids: { type: "array", items: {} },
      },
      required: ["action"],
    },
  },
] as const;

export const feedlyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // feedly-tool.ts
  feedly_action:           (args) => feedlyAction(String(args.action ?? ""), args),
};
