// wiring/universities.ts
// Per-app MCP wiring for the universities connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { universitiesSearch } from "../universities-tool.js";

export const universitiesTools = [
  // ── universities-tool.ts ─────────────────────────────────────────────────────
  {
    name: "universities_search",
    description: "Search world universities by name and/or country.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "University name to search (partial match)." },
        country: { type: "string" as const, description: "Country name (e.g. 'Australia', 'United States')." },
        limit: { type: "number" as const, description: "Max results (default 25)." },
      },
    },
  },
] as const;

export const universitiesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // universities-tool.ts
  universities_search:       (args) => universitiesSearch(args),};
