// wiring/ipaustralia.ts
// Per-app MCP wiring for the ipaustralia connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Australian / Local

import { searchTrademarks, getTrademarkDetails, searchPatents } from "../ipaustralia-tool.js";

export const ipaustraliaTools = [
  // ── ipaustralia-tool.ts ──────────────────────────────────────────────────────
  {
    name: "search_trademarks",
    description: "Search Australian trademarks via IP Australia.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        status: { type: "string" },
        type: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_trademark_details",
    description: "Get details for a specific Australian trademark.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        applicationNumber: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["applicationNumber"],
    },
  },
  {
    name: "search_patents",
    description: "Search Australian patents via IP Australia.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        status: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
] as const;

export const ipaustraliaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ipaustralia-tool.ts
  search_trademarks:    (args) => searchTrademarks(args),
  get_trademark_details:(args) => getTrademarkDetails(args),
  search_patents:       (args) => searchPatents(args),
};
