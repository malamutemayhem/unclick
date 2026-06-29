// wiring/textwrap.ts
// Per-app MCP wiring for the textwrap connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { textWrap } from "../textwrap-tool.js";

export const textwrapTools = [
  // ── textwrap-tool.ts ───────────────────────────────────────────────────────
  {
    name: "text_wrap",
    description: "Hard-wrap text to a specified column width.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to wrap." },
        width: { type: "number" as const, description: "Column width (10-200, default 80)." },
      }, required: ["text"],
    },
  },
] as const;

export const textwrapHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // textwrap-tool.ts
  text_wrap:                 (args) => textWrap(args),
};
