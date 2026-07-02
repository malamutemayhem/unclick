// wiring/pokemontcg.ts
// Per-app MCP wiring for the pokemontcg connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { pokemonTcgSearchCards, pokemonTcgSets } from "../pokemontcg-tool.js";

export const pokemontcgTools = [
  // ── pokemontcg-tool.ts ───────────────────────────────────────────────────────
  {
    name: "pokemon_tcg_search_cards",
    description: "Search Pokemon Trading Card Game cards by name, type, set, or rarity.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Card name to search." },
        type: { type: "string" as const, description: "Pokemon type (e.g. Fire, Water, Grass)." },
        set: { type: "string" as const, description: "Set name to search within." },
        rarity: { type: "string" as const, description: "Card rarity (e.g. Rare, Common)." },
        limit: { type: "number" as const, description: "Max results (default 10)." },
      },
    },
  },
  {
    name: "pokemon_tcg_sets",
    description: "List or search Pokemon TCG card sets.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Set name to search." },
        limit: { type: "number" as const, description: "Max results (default 10)." },
      },
    },
  },
] as const;

export const pokemontcgHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pokemontcg-tool.ts
  pokemon_tcg_search_cards:  (args) => pokemonTcgSearchCards(args),
  pokemon_tcg_sets:          (args) => pokemonTcgSets(args),
};
