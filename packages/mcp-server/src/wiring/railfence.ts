// wiring/railfence.ts
// Per-app MCP wiring for the railfence connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { railfenceProcess } from "../railfence-tool.js";

export const railfenceTools = [
  // ── railfence-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "railfence_process",
    description: "Encrypt or decrypt text using the rail fence (zigzag) cipher.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to process." },
        rails: { type: "number" as const, description: "Number of rails (default 3)." },
        decrypt: { type: "boolean" as const, description: "Decrypt instead of encrypt (default false)." },
      }, required: ["text"],
    },
  },
] as const;

export const railfenceHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // railfence-tool.ts
  railfence_process:         (args) => railfenceProcess(args),
};
