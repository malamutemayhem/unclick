// wiring/geomseries.ts
// Per-app MCP wiring for the geomseries connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { geometricSeries } from "../geomseries-tool.js";

export const geomseriesTools = [
  // ── geomseries-tool.ts ────────────────────────────────────────────────────────
  {
    name: "geometric_series",
    description: "Calculate finite and infinite sums of a geometric series: a, ar, ar^2, ...",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        a: { type: "number" as const, description: "First term." },
        r: { type: "number" as const, description: "Common ratio." },
        n: { type: "number" as const, description: "Number of terms (1-1000)." },
      }, required: ["a", "r", "n"],
    },
  },
] as const;

export const geomseriesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // geomseries-tool.ts
  geometric_series:          (args) => geometricSeries(args),
};
