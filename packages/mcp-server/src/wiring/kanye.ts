// wiring/kanye.ts
// Per-app MCP wiring for the kanye connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { kanyeQuote } from "../kanye-tool.js";

export const kanyeTools = [
  // ── kanye-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "kanye_quote",
    description: "Get a random Kanye West quote.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const kanyeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // kanye-tool.ts
  kanye_quote:             (args) => kanyeQuote(args),
};
