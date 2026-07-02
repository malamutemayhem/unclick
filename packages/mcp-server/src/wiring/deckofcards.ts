// wiring/deckofcards.ts
// Per-app MCP wiring for the deckofcards connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { deckNew, deckDraw, deckShuffle } from "../deckofcards-tool.js";

export const deckofcardsTools = [
  // ── deckofcards-tool.ts ─────────────────────────────────────────────────────
  {
    name: "deck_new",
    description: "Create and shuffle a new deck of cards.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        deck_count: { type: "number", description: "Number of decks (default 1)" },
      },
    },
  },
  {
    name: "deck_draw",
    description: "Draw cards from a deck.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        deck_id: { type: "string", description: "Deck ID from deck_new" },
        count: { type: "number", description: "Number of cards to draw (default 1)" },
      },
      required: ["deck_id"],
    },
  },
  {
    name: "deck_shuffle",
    description: "Reshuffle an existing deck.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        deck_id: { type: "string", description: "Deck ID to reshuffle" },
      },
      required: ["deck_id"],
    },
  },
] as const;

export const deckofcardsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // deckofcards-tool.ts
  deck_new:                (args) => deckNew(args),
  deck_draw:               (args) => deckDraw(args),
  deck_shuffle:            (args) => deckShuffle(args),
};
