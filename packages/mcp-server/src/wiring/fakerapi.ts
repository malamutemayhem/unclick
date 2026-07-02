// wiring/fakerapi.ts
// Per-app MCP wiring for the fakerapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { fakerPersons, fakerCompanies, fakerTexts } from "../fakerapi-tool.js";

export const fakerapiTools = [
  // ── fakerapi-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "faker_persons",
    description: "Generate fake person data (name, email, phone, address) for testing.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        quantity: { type: "number" as const, description: "Number of persons (max 100, default 5)." },
        locale: { type: "string" as const, description: "Locale code (default: en_US)." },
      },
    },
  },
  {
    name: "faker_companies",
    description: "Generate fake company data for testing.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        quantity: { type: "number" as const, description: "Number of companies (max 100, default 5)." },
        locale: { type: "string" as const, description: "Locale code (default: en_US)." },
      },
    },
  },
  {
    name: "faker_texts",
    description: "Generate fake text/article data for testing.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        quantity: { type: "number" as const, description: "Number of texts (max 100, default 3)." },
        characters: { type: "number" as const, description: "Approx characters per text (default 200)." },
      },
    },
  },
] as const;

export const fakerapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // fakerapi-tool.ts
  faker_persons:             (args) => fakerPersons(args),
  faker_companies:           (args) => fakerCompanies(args),
  faker_texts:               (args) => fakerTexts(args),
};
