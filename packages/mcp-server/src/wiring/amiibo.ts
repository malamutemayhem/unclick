// wiring/amiibo.ts
// Per-app MCP wiring for the amiibo connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { amiiboSearch, amiiboBySeries, amiiboTypes } from "../amiibo-tool.js";

export const amiiboTools = [
  // ── amiibo-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "amiibo_search",
    description: "Search Nintendo Amiibo figures by character name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Character name to search" },
      },
      required: ["name"],
    },
  },
  {
    name: "amiibo_by_series",
    description: "List Amiibo figures in a game series.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        series: { type: "string", description: "Amiibo series name (e.g. Super Mario, Zelda)" },
      },
      required: ["series"],
    },
  },
  {
    name: "amiibo_types",
    description: "List all Amiibo product types (figure, card, yarn, etc.).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const amiiboHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // amiibo-tool.ts
  amiibo_search:           (args) => amiiboSearch(args),
  amiibo_by_series:        (args) => amiiboBySeries(args),
  amiibo_types:            (args) => amiiboTypes(args),
};
