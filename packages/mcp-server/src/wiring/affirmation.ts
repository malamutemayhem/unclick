// wiring/affirmation.ts
// Per-app MCP wiring for the affirmation connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { affirmationRandom } from "../affirmation-tool.js";

export const affirmationTools = [
  // ── affirmation-tool.ts ─────────────────────────────────────────────────────
  {
    name: "affirmation_random",
    description: "Get a random positive affirmation.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const affirmationHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // affirmation-tool.ts
  affirmation_random:      (args) => affirmationRandom(args),
};
