// wiring/notion.ts
// Per-app MCP wiring for the notion connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity

import { notionAction } from "../notion-tool.js";

export const notionTools = [
  // ── notion-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "notion_action",
    description: "Perform a Notion action: search_notion, get_notion_page, get_notion_database, query_notion_database, create_notion_page, update_notion_page.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        query: { type: "string" },
        page_id: { type: "string" },
        database_id: { type: "string" },
        filter: { type: "object", additionalProperties: true },
        properties: { type: "object", additionalProperties: true },
        parent: { type: "object", additionalProperties: true },
      },
      required: ["action"],
    },
  },
] as const;

export const notionHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // notion-tool.ts
  notion_action:           (args) => notionAction(String(args.action ?? ""), args),
};
