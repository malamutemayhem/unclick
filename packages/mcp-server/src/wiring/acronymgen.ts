// wiring/acronymgen.ts
// Per-app MCP wiring for the acronymgen connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { acronymGenerate } from "../acronymgen-tool.js";

export const acronymgenTools = [
  // ── acronymgen-tool.ts ─────────────────────────────────────────────────────
  {
    name: "acronym_generate",
    description: "Generate an acronym from a phrase, optionally skipping small words.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Phrase to create acronym from." },
        include_small_words: { type: "boolean" as const, description: "Include small words like the, of, and (default false)." },
      }, required: ["text"],
    },
  },
] as const;

export const acronymgenHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // acronymgen-tool.ts
  acronym_generate:          (args) => acronymGenerate(args),
};
