// wiring/nhtsa.ts
// Per-app MCP wiring for the nhtsa connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { nhtsaDecodeVin, nhtsaRecalls } from "../nhtsa-tool.js";

export const nhtsaTools = [
  // ── nhtsa-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "nhtsa_decode_vin",
    description: "Decode a vehicle VIN to get make, model, year, and specifications from NHTSA.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        vin: { type: "string" as const, description: "17-character Vehicle Identification Number." },
      }, required: ["vin"],
    },
  },
  {
    name: "nhtsa_recalls",
    description: "Search NHTSA vehicle safety recalls by make, model, and year.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        make: { type: "string" as const, description: "Vehicle make (e.g. Toyota)." },
        model: { type: "string" as const, description: "Vehicle model (e.g. Camry)." },
        year: { type: "string" as const, description: "Model year (e.g. 2020)." },
      }, required: ["make", "year"],
    },
  },
] as const;

export const nhtsaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // nhtsa-tool.ts
  nhtsa_decode_vin:          (args) => nhtsaDecodeVin(args),
  nhtsa_recalls:             (args) => nhtsaRecalls(args),
};
