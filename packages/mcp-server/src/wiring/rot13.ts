// wiring/rot13.ts
// Per-app MCP wiring for the rot13 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { rot13Convert } from "../rot13-tool.js";

export const rot13Tools = [
  // ── rot13-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "rot13_convert",
    description: "Apply ROT13 (or ROT-N) cipher to text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to encode/decode." },
        shift: { type: "number" as const, description: "Rotation amount (default 13)." },
      }, required: ["text"],
    },
  },
] as const;

export const rot13Handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // rot13-tool.ts
  rot13_convert:             (args) => rot13Convert(args),
};
