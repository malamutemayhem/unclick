// wiring/excuser.ts
// Per-app MCP wiring for the excuser connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { excuserRandom } from "../excuser-tool.js";

export const excuserTools = [
  // ── excuser-tool.ts ────────────────────────────────────────────────────────
  {
    name: "excuser_random",
    description: "Get a random excuse, optionally by category.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        category: { type: "string", description: "Category: family, office, college, party, or unspecified" },
      },
    },
  },
] as const;

export const excuserHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // excuser-tool.ts
  excuser_random:          (args) => excuserRandom(args),
};
