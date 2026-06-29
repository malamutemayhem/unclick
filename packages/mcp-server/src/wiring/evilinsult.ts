// wiring/evilinsult.ts
// Per-app MCP wiring for the evilinsult connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { evilInsultRandom } from "../evilinsult-tool.js";

export const evilinsultTools = [
  // ── evilinsult-tool.ts ─────────────────────────────────────────────────────
  {
    name: "evil_insult_random",
    description: "Get a random insult (for entertainment only).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        lang: { type: "string", description: "Language code (default: en). Supports en, es, de, etc." },
      },
    },
  },
] as const;

export const evilinsultHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // evilinsult-tool.ts
  evil_insult_random:      (args) => evilInsultRandom(args),
};
