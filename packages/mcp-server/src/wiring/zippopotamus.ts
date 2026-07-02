// wiring/zippopotamus.ts
// Per-app MCP wiring for the zippopotamus connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { zipLookup, zipByCity } from "../zippopotamus-tool.js";

export const zippopotamusTools = [
  // ── zippopotamus-tool.ts ───────────────────────────────────────────────────
  {
    name: "zip_lookup",
    description: "Look up location info for a zip/postal code.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        code: { type: "string", description: "Zip or postal code" },
        country: { type: "string", description: "Country code (default: us). Supports us, gb, au, ca, de, fr, etc." },
      },
      required: ["code"],
    },
  },
  {
    name: "zip_by_city",
    description: "Look up zip/postal codes for a city and state.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        state: { type: "string", description: "State abbreviation (e.g. CA, NY)" },
        city: { type: "string", description: "City name" },
        country: { type: "string", description: "Country code (default: us)" },
      },
      required: ["state", "city"],
    },
  },
] as const;

export const zippopotamusHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // zippopotamus-tool.ts
  zip_lookup:              (args) => zipLookup(args),
  zip_by_city:             (args) => zipByCity(args),
};
