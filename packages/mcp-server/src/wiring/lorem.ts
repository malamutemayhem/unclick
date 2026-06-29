// wiring/lorem.ts
// Per-app MCP wiring for the lorem connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { baconIpsum } from "../lorem-tool.js";

export const loremTools = [
  // ── lorem-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "bacon_ipsum",
    description: "Generate meat-themed placeholder text (Bacon Ipsum).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        paragraphs: { type: "number", description: "Number of paragraphs (max 10, default 3)" },
        type: { type: "string", enum: ["meat-and-filler", "all-meat"], description: "Text type (default: meat-and-filler)" },
      },
    },
  },
] as const;

export const loremHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // lorem-tool.ts
  bacon_ipsum:             (args) => baconIpsum(args),
};
