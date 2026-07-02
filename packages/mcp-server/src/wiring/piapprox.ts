// wiring/piapprox.ts
// Per-app MCP wiring for the piapprox connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { piApprox } from "../piapprox-tool.js";

export const piapproxTools = [
  // ── piapprox-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "pi_approx",
    description: "Approximate pi using Leibniz, Nilakantha, and Wallis formulas. Compare convergence rates.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        terms: { type: "number" as const, description: "Number of terms (default 1000, max 1000000)." },
      },
    },
  },
] as const;

export const piapproxHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // piapprox-tool.ts
  pi_approx:                 (args) => piApprox(args),
};
