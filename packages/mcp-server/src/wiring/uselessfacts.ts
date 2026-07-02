// wiring/uselessfacts.ts
// Per-app MCP wiring for the uselessfacts connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { uselessFactRandom, uselessFactToday } from "../uselessfacts-tool.js";

export const uselessfactsTools = [
  // ── uselessfacts-tool.ts ───────────────────────────────────────────────────
  {
    name: "useless_fact_random",
    description: "Get a random useless fact.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "useless_fact_today",
    description: "Get today's useless fact of the day.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const uselessfactsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // uselessfacts-tool.ts
  useless_fact_random:     (args) => uselessFactRandom(args),
  useless_fact_today:      (args) => uselessFactToday(args),
};
