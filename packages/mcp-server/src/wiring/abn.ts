// wiring/abn.ts
// Per-app MCP wiring for the abn connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Australian / Local

import { abnLookup, abnSearch } from "../abn-tool.js";

export const abnTools = [
  // ── abn-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "abn_lookup",
    description: "Look up an Australian Business Number (ABN).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        abn: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["abn"],
    },
  },
  {
    name: "abn_search",
    description: "Search for Australian businesses by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["name"],
    },
  },
] as const;

export const abnHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // abn-tool.ts
  abn_lookup:           (args) => abnLookup(args),
  abn_search:           (args) => abnSearch(args),
};
