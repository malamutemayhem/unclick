// wiring/digimon.ts
// Per-app MCP wiring for the digimon connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { digimonAll, digimonByName, digimonByLevel } from "../digimon-tool.js";

export const digimonTools = [
  // ── digimon-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "digimon_all",
    description: "List all Digimon with names, images, and levels.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "digimon_by_name",
    description: "Look up a specific Digimon by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Digimon name (e.g. Agumon, Greymon)" },
      },
      required: ["name"],
    },
  },
  {
    name: "digimon_by_level",
    description: "List Digimon filtered by evolution level.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        level: { type: "string", description: "Level: Fresh, In Training, Rookie, Champion, Ultimate, or Mega" },
      },
      required: ["level"],
    },
  },

  // ── stapi-tool.ts (Star Trek) ───────────────────────────────────────────────
  {
    name: "stapi_search_character",
    description: "Search Star Trek characters by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Character name to search for" },
      },
      required: ["name"],
    },
  },
  {
    name: "stapi_search_species",
    description: "Search Star Trek species by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Species name (e.g. Vulcan, Klingon)" },
      },
      required: ["name"],
    },
  },
  {
    name: "stapi_search_starship",
    description: "Search Star Trek starships/spacecraft by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Starship name (e.g. Enterprise)" },
      },
      required: ["name"],
    },
  },
] as const;

export const digimonHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // digimon-tool.ts
  digimon_all:             (args) => digimonAll(args),
  digimon_by_name:         (args) => digimonByName(args),
  digimon_by_level:        (args) => digimonByLevel(args),
};
