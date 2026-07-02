// wiring/mtg.ts
// Per-app MCP wiring for the mtg connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { mtgSearchCards, mtgGetCard, mtgSets } from "../mtg-tool.js";

export const mtgTools = [
  // ── mtg-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "mtg_search_cards",
    description: "Search Magic: The Gathering cards by name, color, type, set, or rarity.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Card name to search." },
        colors: { type: "string" as const, description: "Color filter (W, U, B, R, G or combinations)." },
        type: { type: "string" as const, description: "Card type (e.g. Instant, Creature, Sorcery)." },
        set: { type: "string" as const, description: "Set code (e.g. LEA, M21)." },
        rarity: { type: "string" as const, description: "Rarity: common, uncommon, rare, mythic." },
        limit: { type: "number" as const, description: "Max results (default 10)." },
      },
    },
  },
  {
    name: "mtg_get_card",
    description: "Get a specific MTG card by its multiverse ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "string" as const, description: "Multiverse ID of the card." },
      }, required: ["id"],
    },
  },
  {
    name: "mtg_sets",
    description: "List or search Magic: The Gathering sets.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Set name to search." },
        limit: { type: "number" as const, description: "Max results (default 10)." },
      },
    },
  },
] as const;

export const mtgHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // mtg-tool.ts
  mtg_search_cards:          (args) => mtgSearchCards(args),
  mtg_get_card:              (args) => mtgGetCard(args),
  mtg_sets:                  (args) => mtgSets(args),};
