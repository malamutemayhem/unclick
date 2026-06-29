// wiring/pascaltri.ts
// Per-app MCP wiring for the pascaltri connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { pascaltriGenerate } from "../pascaltri-tool.js";

export const pascaltriTools = [
  // ── pascaltri-tool.ts ───────────────────────────────────────────────────────
  {
    name: "pascaltri_generate",
    description: "Generate rows of Pascal's triangle, optionally return a specific row.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        rows: { type: "number" as const, description: "Number of rows to generate (1-50, default 10)." },
        nth_row: { type: "number" as const, description: "Return a specific row (0-indexed)." },
      },
    },
  },
] as const;

export const pascaltriHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pascaltri-tool.ts
  pascaltri_generate:        (args) => pascaltriGenerate(args),
};
