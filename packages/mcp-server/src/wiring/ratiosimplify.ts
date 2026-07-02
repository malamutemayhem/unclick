// wiring/ratiosimplify.ts
// Per-app MCP wiring for the ratiosimplify connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ratioSimplify } from "../ratiosimplify-tool.js";

export const ratiosimplifyTools = [
  // ── ratiosimplify-tool.ts ─────────────────────────────────────────────────────
  {
    name: "ratio_simplify",
    description: "Simplify a ratio a:b to its lowest terms. Returns decimal and percentage forms.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        a: { type: "number" as const, description: "First value." },
        b: { type: "number" as const, description: "Second value (non-zero)." },
      }, required: ["a", "b"],
    },
  },
] as const;

export const ratiosimplifyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ratiosimplify-tool.ts
  ratio_simplify:            (args) => ratioSimplify(args),
};
