// wiring/logbase.ts
// Per-app MCP wiring for the logbase connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { logBase } from "../logbase-tool.js";

export const logbaseTools = [
  // ── logbase-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "log_base",
    description: "Compute logarithm with any base. Also returns ln, log10, and log2.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        value: { type: "number" as const, description: "Positive number to compute log of." },
        base: { type: "number" as const, description: "Logarithm base (default 10, must be positive and not 1)." },
      }, required: ["value"],
    },
  },
] as const;

export const logbaseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // logbase-tool.ts
  log_base:                  (args) => logBase(args),
};
