// wiring/colr.ts
// Per-app MCP wiring for the colr connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { colrRandomPalette } from "../colr-tool.js";

export const colrTools = [
  // ── colr-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "colr_random_palette",
    description: "Get a random color palette from colr.org.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const colrHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // colr-tool.ts
  colr_random_palette:       (args) => colrRandomPalette(args),};
