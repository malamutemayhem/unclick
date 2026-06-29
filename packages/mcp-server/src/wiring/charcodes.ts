// wiring/charcodes.ts
// Per-app MCP wiring for the charcodes connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { charcodesConvert } from "../charcodes-tool.js";

export const charcodesTools = [
  // ── charcodes-tool.ts ────────────────────────────────────────────────────────
  {
    name: "charcodes_convert",
    description: "Convert characters to Unicode code points in decimal, hex, or binary.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to convert." },
        format: { type: "string" as const, description: "'decimal' (default), 'hex', or 'binary'." },
      }, required: ["text"],
    },
  },
] as const;

export const charcodesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // charcodes-tool.ts
  charcodes_convert:         (args) => charcodesConvert(args),
};
