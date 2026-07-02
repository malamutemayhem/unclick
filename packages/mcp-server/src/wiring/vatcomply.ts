// wiring/vatcomply.ts
// Per-app MCP wiring for the vatcomply connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { vatcomplyRates, vatcomplyCountries } from "../vatcomply-tool.js";

export const vatcomplyTools = [
  // ── vatcomply-tool.ts ─────────────────────────────────────────────────────
  {
    name: "vatcomply_rates",
    description: "Get EU VAT rates (standard, reduced, super-reduced) per country.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        country_code: { type: "string" as const, description: "ISO 2-letter country code (omit for all EU countries)." },
      },
    },
  },
  {
    name: "vatcomply_countries",
    description: "List EU member states with country name and code.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const vatcomplyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // vatcomply-tool.ts
  vatcomply_rates:           (args) => vatcomplyRates(args),
  vatcomply_countries:       (args) => vatcomplyCountries(args),};
