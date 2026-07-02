// wiring/luhn.ts
// Per-app MCP wiring for the luhn connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { luhnValidate } from "../luhn-tool.js";

export const luhnTools = [
  // ── luhn-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "luhn_validate",
    description: "Validate or generate a Luhn check digit (credit cards, IMEI, etc.).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        number: { type: "string" as const, description: "Digit string to validate or partial number for generation." },
        mode: { type: "string" as const, description: "'validate' (default) or 'generate' to compute check digit." },
      }, required: ["number"],
    },
  },
] as const;

export const luhnHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // luhn-tool.ts
  luhn_validate:             (args) => luhnValidate(args),
};
