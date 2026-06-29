// wiring/freetogame.ts
// Per-app MCP wiring for the freetogame connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { freetogameList, freetogameDetail } from "../freetogame-tool.js";

export const freetogameTools = [
  // ── freetogame-tool.ts ──────────────────────────────────────────────────────
  {
    name: "freetogame_list",
    description: "Browse free-to-play games, optionally filtered by platform or category.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        platform: { type: "string", description: "Filter: pc, browser, or all (default all)" },
        category: { type: "string", description: "Filter: mmorpg, shooter, moba, strategy, etc." },
        sort_by: { type: "string", description: "Sort: relevance, popularity, release-date, alphabetical" },
      },
    },
  },
  {
    name: "freetogame_detail",
    description: "Get full details for a specific free-to-play game.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "number", description: "Game ID from freetogame" },
      },
      required: ["id"],
    },
  },
] as const;

export const freetogameHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // freetogame-tool.ts
  freetogame_list:         (args) => freetogameList(args),
  freetogame_detail:       (args) => freetogameDetail(args),
};
