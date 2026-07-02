// wiring/openchargemap.ts
// Per-app MCP wiring for the openchargemap connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { openchargemapSearch } from "../openchargemap-tool.js";

export const openchargemapTools = [
  // ── openchargemap-tool.ts ─────────────────────────────────────────────────
  {
    name: "openchargemap_search",
    description: "Find EV charging stations near a location from Open Charge Map.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Latitude." },
        longitude: { type: "number" as const, description: "Longitude." },
        distance: { type: "number" as const, description: "Search radius in km (default 10)." },
        max_results: { type: "number" as const, description: "Max stations (default 10, max 50)." },
      }, required: ["latitude", "longitude"],
    },
  },
] as const;

export const openchargemapHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // openchargemap-tool.ts
  openchargemap_search:      (args) => openchargemapSearch(args),};
