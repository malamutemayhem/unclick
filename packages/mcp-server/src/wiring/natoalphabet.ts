// wiring/natoalphabet.ts
// Per-app MCP wiring for the natoalphabet connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { natoConvert } from "../natoalphabet-tool.js";

export const natoalphabetTools = [
  // ── natoalphabet-tool.ts ───────────────────────────────────────────────────
  {
    name: "nato_convert",
    description: "Convert text to NATO phonetic alphabet or decode NATO words back to text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text or NATO words to convert." },
      }, required: ["text"],
    },
  },
] as const;

export const natoalphabetHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // natoalphabet-tool.ts
  nato_convert:              (args) => natoConvert(args),
};
