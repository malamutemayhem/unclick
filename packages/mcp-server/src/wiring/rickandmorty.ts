// wiring/rickandmorty.ts
// Per-app MCP wiring for the rickandmorty connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ramGetCharacter, ramSearchCharacters, ramGetEpisode, ramSearchEpisodes, ramGetLocation } from "../rickandmorty-tool.js";

export const rickandmortyTools = [
  // ── rickandmorty-tool.ts ─────────────────────────────────────────────────────
  {
    name: "ram_get_character",
    description: "Get a Rick and Morty character by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Character ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "ram_search_characters",
    description: "Search Rick and Morty characters by name, status, species, or gender.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        status: { type: "string", enum: ["alive", "dead", "unknown"] },
        species: { type: "string" },
        gender: { type: "string", enum: ["female", "male", "genderless", "unknown"] },
        page: { type: "number" },
      },
    },
  },
  {
    name: "ram_get_episode",
    description: "Get a Rick and Morty episode by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Episode ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "ram_search_episodes",
    description: "Search Rick and Morty episodes by name or episode code.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        episode_code: { type: "string", description: "e.g. S01E01" },
        page: { type: "number" },
      },
    },
  },
  {
    name: "ram_get_location",
    description: "Get a Rick and Morty location by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Location ID" },
      },
      required: ["id"],
    },
  },
] as const;

export const rickandmortyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // rickandmorty-tool.ts
  ram_get_character:       (args) => ramGetCharacter(args),
  ram_search_characters:   (args) => ramSearchCharacters(args),
  ram_get_episode:         (args) => ramGetEpisode(args),
  ram_search_episodes:     (args) => ramSearchEpisodes(args),
  ram_get_location:        (args) => ramGetLocation(args),
};
