// wiring/iban.ts
// Per-app MCP wiring for the iban connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ibanValidate } from "../iban-tool.js";

export const ibanTools = [
  // ── iban-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "iban_validate",
    description: "Validate an IBAN and get bank/BIC info via OpenIBAN.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        iban: { type: "string" as const, description: "IBAN to validate." },
      }, required: ["iban"],
    },
  },
] as const;

export const ibanHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // iban-tool.ts
  iban_validate:             (args) => ibanValidate(args),
};
