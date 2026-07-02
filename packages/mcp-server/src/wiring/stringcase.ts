// wiring/stringcase.ts
// Per-app MCP wiring for the stringcase connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { stringCase } from "../stringcase-tool.js";

export const stringcaseTools = [
  // ── stringcase-tool.ts ─────────────────────────────────────────────────────
  {
    name: "string_case",
    description: "Convert text between camelCase, snake_case, kebab-case, PascalCase, and more.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        text: { type: "string" as const, description: "Text to convert." },
      }, required: ["text"],
    },
  },
] as const;

export const stringcaseHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // stringcase-tool.ts
  string_case:               (args) => stringCase(args),
};
