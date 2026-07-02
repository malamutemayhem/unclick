// wiring/tarot.ts
// Per-app MCP wiring for the tarot connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { tarotAllCards, tarotDraw, tarotSearch } from "../tarot-tool.js";

export const tarotTools = [
  // ── tarot-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "tarot_all_cards",
    description: "List all tarot cards in the deck.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "tarot_draw",
    description: "Draw random tarot cards for a reading.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        count: { type: "number", description: "Number of cards to draw (default 3)" },
      },
    },
  },
  {
    name: "tarot_search",
    description: "Search for a specific tarot card by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Card name (e.g. 'The Fool', 'Death', 'Ace of Cups')" },
      },
      required: ["query"],
    },
  },
] as const;

export const tarotHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // tarot-tool.ts
  tarot_all_cards:         (args) => tarotAllCards(args),
  tarot_draw:              (args) => tarotDraw(args),
  tarot_search:            (args) => tarotSearch(args),
};
