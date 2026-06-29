// wiring/difftext.ts
// Per-app MCP wiring for the difftext connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { diffText } from "../difftext-tool.js";

export const difftextTools = [
  // ── difftext-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "diff_text",
    description: "Compare two texts line by line and show added/removed lines.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text_a: { type: "string" as const, description: "First text (original)." },
        text_b: { type: "string" as const, description: "Second text (modified)." },
      }, required: ["text_a", "text_b"],
    },
  },
] as const;

export const difftextHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // difftext-tool.ts
  diff_text:                 (args) => diffText(args),
};
