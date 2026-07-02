// wiring/breakingbad.ts
// Per-app MCP wiring for the breakingbad connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { breakingBadQuote } from "../breakingbad-tool.js";

export const breakingbadTools = [
  // ── breakingbad-tool.ts ─────────────────────────────────────────────────────
  {
    name: "breaking_bad_quote",
    description: "Get random Breaking Bad quotes.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        count: { type: "number", description: "Number of quotes (default 1)" },
      },
    },
  },
] as const;

export const breakingbadHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // breakingbad-tool.ts
  breaking_bad_quote:      (args) => breakingBadQuote(args),
};
