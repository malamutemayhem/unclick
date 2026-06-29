// wiring/runlength.ts
// Per-app MCP wiring for the runlength connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { runlengthProcess } from "../runlength-tool.js";

export const runlengthTools = [
  // ── runlength-tool.ts ────────────────────────────────────────────────────────
  {
    name: "runlength_process",
    description: "Run-length encode or decode text (e.g. aaabbb to 3a3b).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to encode or encoded text to decode." },
        decode: { type: "boolean" as const, description: "Decode instead of encode (default false)." },
      }, required: ["text"],
    },
  },
] as const;

export const runlengthHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // runlength-tool.ts
  runlength_process:         (args) => runlengthProcess(args),
};
