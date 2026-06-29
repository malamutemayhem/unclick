// wiring/binaryconv.ts
// Per-app MCP wiring for the binaryconv connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { numberBaseConvert } from "../binaryconv-tool.js";

export const binaryconvTools = [
  // ── binaryconv-tool.ts ─────────────────────────────────────────────────────
  {
    name: "number_base_convert",
    description: "Convert numbers between binary, octal, decimal, hex, and any base 2-36.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        value: { type: "string" as const, description: "Number to convert." },
        from_base: { type: "number" as const, description: "Input base (2-36, default 10)." },
        to_base: { type: "number" as const, description: "Optional custom output base (2-36)." },
      }, required: ["value"],
    },
  },
] as const;

export const binaryconvHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // binaryconv-tool.ts
  number_base_convert:       (args) => numberBaseConvert(args),
};
