// wiring/pokeapi.ts
// Per-app MCP wiring for the pokeapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { pokeGetPokemon, pokeSearchPokemon, pokeGetType, pokeGetAbility, pokeGetGeneration } from "../pokeapi-tool.js";

export const pokeapiTools = [
  // ── pokeapi-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "poke_get_pokemon",
    description: "Get Pokemon data by name or ID from PokeAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Pokemon name or ID (e.g. pikachu, 25)" },
      },
      required: ["name"],
    },
  },
  {
    name: "poke_search_pokemon",
    description: "List Pokemon with pagination from PokeAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Results per page (max 100, default 20)" },
        offset: { type: "number", description: "Offset for pagination" },
      },
    },
  },
  {
    name: "poke_get_type",
    description: "Get Pokemon type info and which Pokemon have that type.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        type: { type: "string", description: "Type name or ID (e.g. electric, fire, 10)" },
      },
      required: ["type"],
    },
  },
  {
    name: "poke_get_ability",
    description: "Get Pokemon ability info and which Pokemon have it.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ability: { type: "string", description: "Ability name or ID (e.g. static, levitate)" },
      },
      required: ["ability"],
    },
  },
  {
    name: "poke_get_generation",
    description: "Get Pokemon generation info, region, and species list.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        generation: { type: "string", description: "Generation ID (1-9) or name" },
      },
      required: ["generation"],
    },
  },
] as const;

export const pokeapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pokeapi-tool.ts
  poke_get_pokemon:        (args) => pokeGetPokemon(args),
  poke_search_pokemon:     (args) => pokeSearchPokemon(args),
  poke_get_type:           (args) => pokeGetType(args),
  poke_get_ability:        (args) => pokeGetAbility(args),
  poke_get_generation:     (args) => pokeGetGeneration(args),
};
