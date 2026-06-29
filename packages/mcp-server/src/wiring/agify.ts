// wiring/agify.ts
// Per-app MCP wiring for the agify connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { agifyAge, genderizeName, nationalizeName } from "../agify-tool.js";

export const agifyTools = [
  // ── agify-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "agify_age",
    description: "Predict the age of a person based on their first name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "First name to analyze" },
        country_id: { type: "string", description: "ISO 3166-1 alpha-2 country code for localization" },
      },
      required: ["name"],
    },
  },
  {
    name: "genderize_name",
    description: "Predict the gender of a person based on their first name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "First name to analyze" },
        country_id: { type: "string", description: "ISO 3166-1 alpha-2 country code for localization" },
      },
      required: ["name"],
    },
  },
  {
    name: "nationalize_name",
    description: "Predict the nationality of a person based on their first name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "First name to analyze" },
      },
      required: ["name"],
    },
  },
] as const;

export const agifyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // agify-tool.ts
  agify_age:               (args) => agifyAge(args),
  genderize_name:          (args) => genderizeName(args),
  nationalize_name:        (args) => nationalizeName(args),
};
