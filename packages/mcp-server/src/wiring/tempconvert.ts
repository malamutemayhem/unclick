// wiring/tempconvert.ts
// Per-app MCP wiring for the tempconvert connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { temperatureConvert } from "../tempconvert-tool.js";

export const tempconvertTools = [
  // ── tempconvert-tool.ts ────────────────────────────────────────────────────
  {
    name: "temperature_convert",
    description: "Convert temperature between Celsius, Fahrenheit, Kelvin, and Rankine.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        value: { type: "number" as const, description: "Temperature value." },
        from: { type: "string" as const, description: "Source unit: c, f, k, or r (default c)." },
      }, required: ["value"],
    },
  },
] as const;

export const tempconvertHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // tempconvert-tool.ts
  temperature_convert:       (args) => temperatureConvert(args),
};
