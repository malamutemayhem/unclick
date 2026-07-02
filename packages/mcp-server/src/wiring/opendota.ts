// wiring/opendota.ts
// Per-app MCP wiring for the opendota connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { opendotaHeroes, opendotaHeroStats, opendotaProMatches } from "../opendota-tool.js";

export const opendotaTools = [
  // ── opendota-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "opendota_heroes",
    description: "List all Dota 2 heroes with roles and attack types from OpenDota.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "opendota_hero_stats",
    description: "Get Dota 2 hero statistics including pick/win rates per bracket.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "opendota_pro_matches",
    description: "Get recent professional Dota 2 match results from OpenDota.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const opendotaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // opendota-tool.ts
  opendota_heroes:           (args) => opendotaHeroes(args),
  opendota_hero_stats:       (args) => opendotaHeroStats(args),
  opendota_pro_matches:      (args) => opendotaProMatches(args),};
