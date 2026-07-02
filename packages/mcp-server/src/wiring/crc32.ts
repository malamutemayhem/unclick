// wiring/crc32.ts
// Per-app MCP wiring for the crc32 connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { crc32Calculate } from "../crc32-tool.js";

export const crc32Tools = [
  // ── crc32-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "crc32_calculate",
    description: "Calculate CRC32 checksum for text input.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to checksum." },
      }, required: ["text"],
    },
  },
] as const;

export const crc32Handlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // crc32-tool.ts
  crc32_calculate:           (args) => crc32Calculate(args),
};
