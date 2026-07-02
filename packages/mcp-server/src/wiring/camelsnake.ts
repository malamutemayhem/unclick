// wiring/camelsnake.ts
// Per-app MCP wiring for the camelsnake connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { camelsnakeConvert } from "../camelsnake-tool.js";

export const camelsnakeTools = [
  // ── camelsnake-tool.ts ───────────────────────────────────────────────────────
  {
    name: "camelsnake_convert",
    description: "Convert between camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Identifier or text to convert." },
        target: { type: "string" as const, description: "Target case: camel, pascal, snake, kebab, constant. Omit for all." },
      }, required: ["text"],
    },
  },
] as const;

export const camelsnakeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // camelsnake-tool.ts
  camelsnake_convert:        (args) => camelsnakeConvert(args),
};
