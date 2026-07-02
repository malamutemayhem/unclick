// wiring/nationalize.ts
// Per-app MCP wiring for the nationalize connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { nationalizePredict } from "../nationalize-tool.js";

export const nationalizeTools = [
  // ── nationalize-tool.ts ──────────────────────────────────────────────────────
  {
    name: "nationalize_predict",
    description: "Predict likely nationalities from a first name with probability scores.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "First name to predict nationality for." },
      }, required: ["name"],
    },
  },
] as const;

export const nationalizeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // nationalize-tool.ts
  nationalize_predict:       (args) => nationalizePredict(args),};
