// wiring/entropy.ts
// Per-app MCP wiring for the entropy connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { entropyCalculate } from "../entropy-tool.js";

export const entropyTools = [
  // ── entropy-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "entropy_calculate",
    description: "Calculate Shannon entropy of text (measures randomness/information density).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to measure." },
      }, required: ["text"],
    },
  },
] as const;

export const entropyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // entropy-tool.ts
  entropy_calculate:         (args) => entropyCalculate(args),
};
