// wiring/dogfacts.ts
// Per-app MCP wiring for the dogfacts connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { dogFactRandom } from "../dogfacts-tool.js";

export const dogfactsTools = [
  // ── dogfacts-tool.ts ───────────────────────────────────────────────────────
  {
    name: "dog_fact_random",
    description: "Get a random dog fact.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const dogfactsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dogfacts-tool.ts
  dog_fact_random:         (args) => dogFactRandom(args),
};
