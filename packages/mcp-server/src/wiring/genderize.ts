// wiring/genderize.ts
// Per-app MCP wiring for the genderize connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { genderizePredict } from "../genderize-tool.js";

export const genderizeTools = [
  // ── genderize-tool.ts ────────────────────────────────────────────────────────
  {
    name: "genderize_predict",
    description: "Predict gender from a first name with probability score.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "First name to predict gender for." },
        country_id: { type: "string" as const, description: "ISO 3166-1 alpha-2 country code for localized prediction." },
      }, required: ["name"],
    },
  },
] as const;

export const genderizeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // genderize-tool.ts
  genderize_predict:         (args) => genderizePredict(args),};
