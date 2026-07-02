// wiring/atbash.ts
// Per-app MCP wiring for the atbash connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { atbashProcess } from "../atbash-tool.js";

export const atbashTools = [
  // ── atbash-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "atbash_process",
    description: "Apply the Atbash cipher (A=Z, B=Y, ...) to text. Self-inverse.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to encode/decode." },
      }, required: ["text"],
    },
  },
] as const;

export const atbashHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // atbash-tool.ts
  atbash_process:            (args) => atbashProcess(args),
};
