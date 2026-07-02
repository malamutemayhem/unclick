// wiring/jsoncrack.ts
// Per-app MCP wiring for the jsoncrack connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { jsoncrackFormat } from "../jsoncrack-tool.js";

export const jsoncrackTools = [
  // ── jsoncrack-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "json_format",
    description: "Parse, format, and analyze a JSON string. Returns pretty-printed output and structure stats.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        json: { type: "string" as const, description: "Raw JSON string to parse and format." },
      }, required: ["json"],
    },
  },
] as const;

export const jsoncrackHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // jsoncrack-tool.ts
  json_format:               (args) => jsoncrackFormat(args),
};
