// wiring/disneyapi.ts
// Per-app MCP wiring for the disneyapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { disneyCharacterSearch, disneyAllCharacters } from "../disneyapi-tool.js";

export const disneyapiTools = [
  // ── disneyapi-tool.ts ──────────────────────────────────────────────────────
  {
    name: "disney_character_search",
    description: "Search Disney characters by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Character name to search" },
      },
      required: ["name"],
    },
  },
  {
    name: "disney_all_characters",
    description: "Browse all Disney characters (paginated).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
      },
    },
  },
] as const;

export const disneyapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // disneyapi-tool.ts
  disney_character_search: (args) => disneyCharacterSearch(args),
  disney_all_characters:   (args) => disneyAllCharacters(args),
};
