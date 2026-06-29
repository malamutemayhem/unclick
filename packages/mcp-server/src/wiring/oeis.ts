// wiring/oeis.ts
// Per-app MCP wiring for the oeis connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { oeisSearch } from "../oeis-tool.js";

export const oeisTools = [
  // ── oeis-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "oeis_search",
    description: "Search the Online Encyclopedia of Integer Sequences (OEIS) by sequence or keyword.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        query: { type: "string" as const, description: "Sequence (e.g. '1,1,2,3,5,8') or keyword." },
        start: { type: "number" as const, description: "Result offset for pagination." },
      }, required: ["query"],
    },
  },
] as const;

export const oeisHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // oeis-tool.ts
  oeis_search:               (args) => oeisSearch(args),
};
