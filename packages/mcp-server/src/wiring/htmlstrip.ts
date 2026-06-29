// wiring/htmlstrip.ts
// Per-app MCP wiring for the htmlstrip connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { htmlStrip } from "../htmlstrip-tool.js";

export const htmlstripTools = [
  // ── htmlstrip-tool.ts ──────────────────────────────────────────────────────
  {
    name: "html_strip",
    description: "Strip HTML tags and decode entities to plain text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        html: { type: "string" as const, description: "HTML text to strip." },
        preserve_line_breaks: { type: "boolean" as const, description: "Keep line breaks from block elements (default true)." },
      }, required: ["html"],
    },
  },
] as const;

export const htmlstripHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // htmlstrip-tool.ts
  html_strip:                (args) => htmlStrip(args),
};
