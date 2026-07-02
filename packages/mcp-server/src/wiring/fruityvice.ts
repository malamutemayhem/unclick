// wiring/fruityvice.ts
// Per-app MCP wiring for the fruityvice connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { fruityviceAll, fruityviceByName } from "../fruityvice-tool.js";

export const fruityviceTools = [
  // ── fruityvice-tool.ts ───────────────────────────────────────────────────────
  {
    name: "fruityvice_all",
    description: "List all fruits with nutrition facts from Fruityvice.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "fruityvice_by_name",
    description: "Get detailed nutrition info for a specific fruit from Fruityvice.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        name: { type: "string" as const, description: "Fruit name (e.g. banana, apple, strawberry)." },
      },
      required: ["name"],
    },
  },
] as const;

export const fruityviceHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // fruityvice-tool.ts
  fruityvice_all:            (args) => fruityviceAll(args),
  fruityvice_by_name:        (args) => fruityviceByName(args),};
