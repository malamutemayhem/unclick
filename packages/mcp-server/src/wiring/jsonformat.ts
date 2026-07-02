// wiring/jsonformat.ts
// Per-app MCP wiring for the jsonformat connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { jsonFormat } from "../jsonformat-tool.js";

export const jsonformatTools = [
  // ── jsonformat-tool.ts ─────────────────────────────────────────────────────
  {
    name: "json_prettify",
    description: "Prettify or minify JSON text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        json: { type: "string" as const, description: "JSON text to format." },
        indent: { type: "number" as const, description: "Indent spaces (default 2)." },
        minify: { type: "boolean" as const, description: "Minify instead of prettify (default false)." },
      }, required: ["json"],
    },
  },
] as const;

export const jsonformatHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // jsonformat-tool.ts
  json_prettify:             (args) => jsonFormat(args),
};
