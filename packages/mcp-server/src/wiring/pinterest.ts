// wiring/pinterest.ts
// Per-app MCP wiring for the pinterest connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Productivity / Social / Misc

import { listPinterestBoards, getPinterestBoard, listPinterestPins, createPinterestPin, searchPinterestPins, getPinterestUser } from "../pinterest-tool.js";

export const pinterestTools = [
  // ── pinterest-tool.ts ────────────────────────────────────────────────────────
  {
    name: "list_pinterest_boards",
    description: "List Pinterest boards for the authenticated user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page_size: { type: "number" },
        bookmark: { type: "string", description: "Pagination cursor" },
        privacy: { type: "string", description: "PUBLIC, PROTECTED, or SECRET" },
        access_token: { type: "string", description: "Pinterest access token (or set PINTEREST_ACCESS_TOKEN)" },
      },
    },
  },
  {
    name: "get_pinterest_board",
    description: "Get details of a specific Pinterest board.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID" },
        access_token: { type: "string" },
      },
      required: ["board_id"],
    },
  },
  {
    name: "list_pinterest_pins",
    description: "List pins on a Pinterest board.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID" },
        page_size: { type: "number" },
        bookmark: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["board_id"],
    },
  },
  {
    name: "create_pinterest_pin",
    description: "Create a new Pinterest pin from an image URL.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID to pin to" },
        media_source_url: { type: "string", description: "Public image URL" },
        title: { type: "string" },
        description: { type: "string" },
        link: { type: "string", description: "Destination URL when pin is clicked" },
        board_section_id: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["board_id", "media_source_url"],
    },
  },
  {
    name: "search_pinterest_pins",
    description: "Search Pinterest pins by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query" },
        page_size: { type: "number" },
        bookmark: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_pinterest_user",
    description: "Get the authenticated Pinterest user account info.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
      },
    },
  },
] as const;

export const pinterestHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pinterest-tool.ts
  list_pinterest_boards:   (args) => listPinterestBoards(args),
  get_pinterest_board:     (args) => getPinterestBoard(args),
  list_pinterest_pins:     (args) => listPinterestPins(args),
  create_pinterest_pin:    (args) => createPinterestPin(args),
  search_pinterest_pins:   (args) => searchPinterestPins(args),
  get_pinterest_user:      (args) => getPinterestUser(args),
};
