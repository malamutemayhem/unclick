// wiring/zenquotes.ts
// Per-app MCP wiring for the zenquotes connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { zenQuoteRandom, zenQuoteToday, zenQuotes } from "../zenquotes-tool.js";

export const zenquotesTools = [
  // ── zenquotes-tool.ts ──────────────────────────────────────────────────────
  {
    name: "zen_quote_random",
    description: "Get a random inspirational quote from Zen Quotes.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "zen_quote_today",
    description: "Get today's quote of the day from Zen Quotes.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "zen_quotes",
    description: "Get a batch of inspirational quotes from Zen Quotes (returns up to 20).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const zenquotesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // zenquotes-tool.ts
  zen_quote_random:        (args) => zenQuoteRandom(args),
  zen_quote_today:         (args) => zenQuoteToday(args),
  zen_quotes:              (args) => zenQuotes(args),
};
