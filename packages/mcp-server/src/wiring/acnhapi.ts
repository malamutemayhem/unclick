// wiring/acnhapi.ts
// Per-app MCP wiring for the acnhapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { acnhVillagers, acnhFish, acnhBugs } from "../acnhapi-tool.js";

export const acnhapiTools = [
  // ── acnhapi-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "acnh_villagers",
    description: "List all Animal Crossing: New Horizons villagers.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "acnh_fish",
    description: "List all Animal Crossing: New Horizons fish with availability and prices.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "acnh_bugs",
    description: "List all Animal Crossing: New Horizons bugs with availability and prices.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const acnhapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // acnhapi-tool.ts
  acnh_villagers:            (args) => acnhVillagers(args),
  acnh_fish:                 (args) => acnhFish(args),
  acnh_bugs:                 (args) => acnhBugs(args),};
