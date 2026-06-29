// wiring/unitpressure.ts
// Per-app MCP wiring for the unitpressure connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { pressureConvert } from "../unitpressure-tool.js";

export const unitpressureTools = [
  // ── unitpressure-tool.ts ───────────────────────────────────────────────────
  {
    name: "pressure_convert",
    description: "Convert pressure between Pa, hPa, kPa, bar, atm, psi, torr, mmHg, inHg.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        value: { type: "number" as const, description: "Pressure value to convert." },
        from: { type: "string" as const, description: "Source unit (default pa)." },
        to: { type: "string" as const, description: "Target unit (omit for all)." },
      }, required: ["value"],
    },
  },
] as const;

export const unitpressureHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // unitpressure-tool.ts
  pressure_convert:          (args) => pressureConvert(args),
};
