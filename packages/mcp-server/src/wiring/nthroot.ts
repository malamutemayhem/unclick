// wiring/nthroot.ts
// Per-app MCP wiring for the nthroot connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { nthRoot } from "../nthroot-tool.js";

export const nthrootTools = [
  // ── nthroot-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "nth_root",
    description: "Calculate the nth root of a number. Default is square root (n=2).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        value: { type: "number" as const, description: "Number to find root of." },
        n: { type: "number" as const, description: "Root degree (default 2 for square root)." },
      }, required: ["value"],
    },
  },
] as const;

export const nthrootHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // nthroot-tool.ts
  nth_root:                  (args) => nthRoot(args),
};
