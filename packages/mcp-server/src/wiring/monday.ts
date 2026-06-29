// wiring/monday.ts
// Per-app MCP wiring for the monday connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity / Social / Misc

import { listMondayBoards, getMondayBoard, listMondayItems, createMondayItem, updateMondayItem, searchMondayItems } from "../monday-tool.js";

export const mondayTools = [
  // ── monday-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "list_monday_boards",
    description: "List boards in a Monday.com account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max boards to return (default 25)" },
        api_key: { type: "string", description: "Monday.com API token (or set MONDAY_API_KEY)" },
      },
    },
  },
  {
    name: "get_monday_board",
    description: "Get details of a specific Monday.com board including columns and groups.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID" },
        api_key: { type: "string" },
      },
      required: ["board_id"],
    },
  },
  {
    name: "list_monday_items",
    description: "List items (rows) in a Monday.com board.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID" },
        limit: { type: "number", description: "Max items (default 50)" },
        api_key: { type: "string" },
      },
      required: ["board_id"],
    },
  },
  {
    name: "create_monday_item",
    description: "Create a new item in a Monday.com board.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID" },
        item_name: { type: "string", description: "Item name" },
        group_id: { type: "string", description: "Group ID to add the item to" },
        column_values: { type: "object", additionalProperties: true, description: "Column values as JSON object" },
        api_key: { type: "string" },
      },
      required: ["board_id", "item_name"],
    },
  },
  {
    name: "update_monday_item",
    description: "Update a column value on a Monday.com item.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string" },
        item_id: { type: "string" },
        column_id: { type: "string", description: "Column ID to update" },
        value: { description: "New value (string or JSON)" },
        api_key: { type: "string" },
      },
      required: ["board_id", "item_id", "column_id", "value"],
    },
  },
  {
    name: "search_monday_items",
    description: "Search items by name in a Monday.com board.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string" },
        query: { type: "string", description: "Search text" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["board_id", "query"],
    },
  },
] as const;

export const mondayHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // monday-tool.ts
  list_monday_boards:      (args) => listMondayBoards(args),
  get_monday_board:        (args) => getMondayBoard(args),
  list_monday_items:       (args) => listMondayItems(args),
  create_monday_item:      (args) => createMondayItem(args),
  update_monday_item:      (args) => updateMondayItem(args),
  search_monday_items:     (args) => searchMondayItems(args),
};
