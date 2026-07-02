// wiring/csvparse.ts
// Per-app MCP wiring for the csvparse connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { csvParse } from "../csvparse-tool.js";

export const csvparseTools = [
  // ── csvparse-tool.ts ───────────────────────────────────────────────────────
  {
    name: "csv_parse",
    description: "Parse CSV text into structured JSON rows.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        csv: { type: "string" as const, description: "Raw CSV text to parse." },
        delimiter: { type: "string" as const, description: "Column delimiter (default comma)." },
      }, required: ["csv"],
    },
  },
] as const;

export const csvparseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // csvparse-tool.ts
  csv_parse:                 (args) => csvParse(args),
};
