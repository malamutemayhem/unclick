// wiring/frequency.ts
// Per-app MCP wiring for the frequency connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { frequencyAnalyse } from "../frequency-tool.js";

export const frequencyTools = [
  // ── frequency-tool.ts ────────────────────────────────────────────────────────
  {
    name: "frequency_analyse",
    description: "Analyse character or bigram frequencies in text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to analyse." },
        mode: { type: "string" as const, description: "'character' (default) or 'bigram'." },
        top: { type: "number" as const, description: "Number of top entries to return (default 10)." },
      }, required: ["text"],
    },
  },
] as const;

export const frequencyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // frequency-tool.ts
  frequency_analyse:         (args) => frequencyAnalyse(args),
};
