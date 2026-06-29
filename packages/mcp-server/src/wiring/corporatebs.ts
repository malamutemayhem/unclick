// wiring/corporatebs.ts
// Per-app MCP wiring for the corporatebs connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { corporateBsPhrase } from "../corporatebs-tool.js";

export const corporatebsTools = [
  // ── corporatebs-tool.ts ────────────────────────────────────────────────────
  {
    name: "corporate_bs_phrase",
    description: "Generate a random corporate buzzword phrase.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const corporatebsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // corporatebs-tool.ts
  corporate_bs_phrase:     (args) => corporateBsPhrase(args),
};
