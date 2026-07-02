// wiring/adviceslip.ts
// Per-app MCP wiring for the adviceslip connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { adviceRandom, adviceSearch, adviceById } from "../adviceslip-tool.js";

export const adviceslipTools = [
  // ── adviceslip-tool.ts ──────────────────────────────────────────────────────
  {
    name: "advice_random",
    description: "Get a random piece of advice.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "advice_search",
    description: "Search advice slips by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search keyword" },
      },
      required: ["query"],
    },
  },
  {
    name: "advice_by_id",
    description: "Get a specific advice slip by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Advice slip ID" },
      },
      required: ["id"],
    },
  },
] as const;

export const adviceslipHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // adviceslip-tool.ts
  advice_random:           (args) => adviceRandom(args),
  advice_search:           (args) => adviceSearch(args),
  advice_by_id:            (args) => adviceById(args),
};
