// wiring/nobelprize.ts
// Per-app MCP wiring for the nobelprize connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { nobelPrizes, nobelLaureates } from "../nobelprize-tool.js";

export const nobelprizeTools = [
  // ── nobelprize-tool.ts ───────────────────────────────────────────────────────
  {
    name: "nobel_prizes",
    description: "Search Nobel Prize data by year and/or category.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        year: { type: "number" as const, description: "Award year (e.g. 2023)." },
        category: { type: "string" as const, description: "Category code: che, eco, lit, pea, phy, med." },
        limit: { type: "number" as const, description: "Max results (default 10)." },
      },
    },
  },
  {
    name: "nobel_laureates",
    description: "Search Nobel laureates by name, year, or category.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Laureate name to search." },
        year: { type: "number" as const, description: "Award year." },
        category: { type: "string" as const, description: "Category code: che, eco, lit, pea, phy, med." },
        limit: { type: "number" as const, description: "Max results (default 10)." },
      },
    },
  },
] as const;

export const nobelprizeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // nobelprize-tool.ts
  nobel_prizes:              (args) => nobelPrizes(args),
  nobel_laureates:           (args) => nobelLaureates(args),};
