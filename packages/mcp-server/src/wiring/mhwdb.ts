// wiring/mhwdb.ts
// Per-app MCP wiring for the mhwdb connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { mhwMonsters, mhwWeapons } from "../mhwdb-tool.js";

export const mhwdbTools = [
  // ── mhwdb-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "mhw_monsters",
    description: "Search Monster Hunter World monsters by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Monster name to search." },
        limit: { type: "number" as const, description: "Max results (default 10)." },
      },
    },
  },
  {
    name: "mhw_weapons",
    description: "Browse Monster Hunter World weapons by type.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        type: { type: "string" as const, description: "Weapon type (e.g. great-sword, long-sword, bow, hammer)." },
        limit: { type: "number" as const, description: "Max results (default 10)." },
      },
    },
  },
] as const;

export const mhwdbHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // mhwdb-tool.ts
  mhw_monsters:              (args) => mhwMonsters(args),
  mhw_weapons:               (args) => mhwWeapons(args),};
