// wiring/standardform.ts
// Per-app MCP wiring for the standardform connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { standardForm } from "../standardform-tool.js";

export const standardformTools = [
  // ── standardform-tool.ts ──────────────────────────────────────────────────────
  {
    name: "standard_form",
    description: "Convert a number to scientific and engineering notation.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        value: { type: "number" as const, description: "Number to convert." },
      }, required: ["value"],
    },
  },
] as const;

export const standardformHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // standardform-tool.ts
  standard_form:             (args) => standardForm(args),
};
