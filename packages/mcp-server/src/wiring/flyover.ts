// wiring/flyover.ts
// Per-app MCP wiring for the flyover connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { issFlyover } from "../flyover-tool.js";

export const flyoverTools = [
  // ── flyover-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "iss_flyover",
    description: "Get upcoming ISS flyover times for a location (lat/lon).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        lat: { type: "number" as const, description: "Latitude." },
        lon: { type: "number" as const, description: "Longitude." },
        count: { type: "number" as const, description: "Number of flyovers (max 20, default 5)." },
      }, required: ["lat", "lon"],
    },
  },
] as const;

export const flyoverHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // flyover-tool.ts
  iss_flyover:               (args) => issFlyover(args),
};
