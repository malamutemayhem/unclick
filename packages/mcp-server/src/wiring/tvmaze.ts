// wiring/tvmaze.ts
// Per-app MCP wiring for the tvmaze connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { tvmazeSearch, tvmazeShow, tvmazeSchedule } from "../tvmaze-tool.js";

export const tvmazeTools = [
  // ── tvmaze-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "tvmaze_search",
    description: "Search for TV shows by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Show name to search for" },
      },
      required: ["query"],
    },
  },
  {
    name: "tvmaze_show",
    description: "Get full details for a TV show by its TVmaze ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "number", description: "TVmaze show ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "tvmaze_schedule",
    description: "Get the TV schedule for a country and date.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        country: { type: "string", description: "ISO 3166-1 country code (default US)" },
        date: { type: "string", description: "Date in YYYY-MM-DD format (default today)" },
      },
    },
  },
] as const;

export const tvmazeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // tvmaze-tool.ts
  tvmaze_search:           (args) => tvmazeSearch(args),
  tvmaze_show:             (args) => tvmazeShow(args),
  tvmaze_schedule:         (args) => tvmazeSchedule(args),
};
