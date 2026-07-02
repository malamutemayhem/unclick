// wiring/lego.ts
// Per-app MCP wiring for the lego connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Gaming

import { legoSearchSets, legoGetSet, legoSetParts, legoSearchParts, legoThemes, bricksetSearch, bricksetGetSet } from "../lego-tool.js";

export const legoTools = [
  // ── lego-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "lego_search_sets",
    description: "Search LEGO sets by name/theme (Rebrickable).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string" },
        theme_id: { type: "number" },
        min_year: { type: "number" },
        max_year: { type: "number" },
        page_size: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "lego_get_set",
    description: "Get details for a specific LEGO set by set number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        set_num: { type: "string", description: "e.g. 75192-1" },
        api_key: { type: "string" },
      },
      required: ["set_num"],
    },
  },
  {
    name: "lego_set_parts",
    description: "Get the parts list for a LEGO set.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        set_num: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["set_num"],
    },
  },
  {
    name: "lego_search_parts",
    description: "Search LEGO parts by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["search"],
    },
  },
  {
    name: "lego_themes",
    description: "List all LEGO themes from Rebrickable.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "brickset_search",
    description: "Search LEGO sets via Brickset API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        year: { type: "string" },
        theme: { type: "string" },
        pageSize: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "brickset_get_set",
    description: "Get a specific LEGO set from Brickset by set number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        setNumber: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["setNumber"],
    },
  },
] as const;

export const legoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // lego-tool.ts
  lego_search_sets:     (args) => legoSearchSets(args),
  lego_get_set:         (args) => legoGetSet(args),
  lego_set_parts:       (args) => legoSetParts(args),
  lego_search_parts:    (args) => legoSearchParts(args),
  lego_themes:          (args) => legoThemes(args),
  brickset_search:      (args) => bricksetSearch(args),
  brickset_get_set:     (args) => bricksetGetSet(args),
};
