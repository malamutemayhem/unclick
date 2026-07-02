// wiring/tacofancy.ts
// Per-app MCP wiring for the tacofancy connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { randomTaco } from "../tacofancy-tool.js";

export const tacofancyTools = [
  // ── tacofancy-tool.ts ───────────────────────────────────────────────────────
  {
    name: "random_taco",
    description: "Generate a random taco recipe with base, seasoning, condiment, and shell.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const tacofancyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // tacofancy-tool.ts
  random_taco:             (args) => randomTaco(args),
};
