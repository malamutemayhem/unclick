// wiring/thelott.ts
// Per-app MCP wiring for the thelott connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Australian / Local

import { getLottResults, getLottJackpots } from "../thelott-tool.js";

export const thelottTools = [
  // ── thelott-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "lott_results",
    description: "Get Australian lottery results from The Lott.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string", description: "e.g. TattsLotto, Powerball" },
        draw_number: { type: "number" },
      },
    },
  },
  {
    name: "lott_jackpots",
    description: "Get current Australian lottery jackpots from The Lott.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
] as const;

export const thelottHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // thelott-tool.ts
  lott_results:         (args) => getLottResults(args),
  lott_jackpots:        (args) => getLottJackpots(args),
};
