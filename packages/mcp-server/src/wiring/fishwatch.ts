// wiring/fishwatch.ts
// Per-app MCP wiring for the fishwatch connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { fishwatchSpecies, fishwatchSpeciesDetail } from "../fishwatch-tool.js";

export const fishwatchTools = [
  // ── fishwatch-tool.ts ────────────────────────────────────────────────────────
  {
    name: "fishwatch_species",
    description: "List all fish species with sustainability data from NOAA FishWatch.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "fishwatch_species_detail",
    description: "Get detailed info about a specific fish species from NOAA FishWatch.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Species name with hyphens (e.g. atlantic-salmon, pacific-cod)." },
      },
      required: ["name"],
    },
  },
] as const;

export const fishwatchHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // fishwatch-tool.ts
  fishwatch_species:         (args) => fishwatchSpecies(args),
  fishwatch_species_detail:  (args) => fishwatchSpeciesDetail(args),};
