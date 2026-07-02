// wiring/lorem2.ts
// Per-app MCP wiring for the lorem2 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { loremGenerate } from "../lorem2-tool.js";

export const lorem2Tools = [
  // ── lorem2-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "lorem_generate",
    description: "Generate lorem ipsum placeholder text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        paragraphs: { type: "number" as const, description: "Number of paragraphs (1-20, default 3)." },
        sentences: { type: "number" as const, description: "Sentences per paragraph (1-15, default 5)." },
      },
    },
  },
] as const;

export const lorem2Handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // lorem2-tool.ts
  lorem_generate:            (args) => loremGenerate(args),
};
