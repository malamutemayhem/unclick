// wiring/cidr.ts
// Per-app MCP wiring for the cidr connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { cidrCalculate } from "../cidr-tool.js";

export const cidrTools = [
  // ── cidr-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "cidr_calculate",
    description: "Calculate subnet details from a CIDR notation (network, broadcast, mask, host count).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        cidr: { type: "string" as const, description: "CIDR notation (e.g. 192.168.1.0/24)." },
      }, required: ["cidr"],
    },
  },
] as const;

export const cidrHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // cidr-tool.ts
  cidr_calculate:            (args) => cidrCalculate(args),
};
