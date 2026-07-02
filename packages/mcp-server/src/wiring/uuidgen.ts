// wiring/uuidgen.ts
// Per-app MCP wiring for the uuidgen connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { uuidGenerate } from "../uuidgen-tool.js";

export const uuidgenTools = [
  // ── uuidgen-tool.ts ───────────────────────────────────────────────────────
  {
    name: "uuid_generate",
    description: "Generate one or more cryptographically random UUID v4 strings.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        count: { type: "number" as const, description: "Number of UUIDs (1-100, default 1)." },
        uppercase: { type: "boolean" as const, description: "Output in uppercase (default false)." },
      },
    },
  },
] as const;

export const uuidgenHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // uuidgen-tool.ts
  uuid_generate:             (args) => uuidGenerate(args),
};
