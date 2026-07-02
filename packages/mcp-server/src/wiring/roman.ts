// wiring/roman.ts
// Per-app MCP wiring for the roman connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { romanConvert } from "../roman-tool.js";

export const romanTools = [
  // ── roman-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "roman_convert",
    description: "Convert between Roman numerals and decimal numbers.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        value: { type: "string" as const, description: "Integer 1-3999 or Roman numeral string." },
      }, required: ["value"],
    },
  },
] as const;

export const romanHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // roman-tool.ts
  roman_convert:             (args) => romanConvert(args),
};
