// wiring/miro.ts
// Per-app MCP wiring for the miro connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { miroListBoards, miroGetBoard, miroListItems } from "../miro-tool.js";

export const miroTools = [
  // ── miro-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "miro_list_boards",
    description: "List Miro boards.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_token: { type: "string", description: "Miro access token" },
      query: { type: "string", description: "Filter boards by name" },
      limit: { type: "number", description: "Boards to return (max 50, default 25)" },
    }, required: ["access_token"] },
  },
  {
    name: "miro_get_board",
    description: "Get a single Miro board by id.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_token: { type: "string", description: "Miro access token" },
      board_id: { type: "string", description: "Miro board id" },
    }, required: ["access_token", "board_id"] },
  },
  {
    name: "miro_list_items",
    description: "List the items (notes, shapes, text) on a Miro board.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_token: { type: "string", description: "Miro access token" },
      board_id: { type: "string", description: "Miro board id" },
      type: { type: "string", description: "Filter by item type (e.g. sticky_note, shape, text)" },
      limit: { type: "number", description: "Items to return (max 50, default 25)" },
    }, required: ["access_token", "board_id"] },
  },
] as const;

export const miroHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // miro-tool.ts
  miro_list_boards:        (args) => miroListBoards(args),
  miro_get_board:          (args) => miroGetBoard(args),
  miro_list_items:         (args) => miroListItems(args),
};
