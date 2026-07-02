// wiring/ipvalidate.ts
// Per-app MCP wiring for the ipvalidate connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ipValidate } from "../ipvalidate-tool.js";

export const ipvalidateTools = [
  // ── ipvalidate-tool.ts ─────────────────────────────────────────────────────
  {
    name: "ip_validate",
    description: "Validate and classify an IP address (IPv4/IPv6, public/private/loopback).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        ip: { type: "string" as const, description: "IP address to validate." },
      }, required: ["ip"],
    },
  },
] as const;

export const ipvalidateHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ipvalidate-tool.ts
  ip_validate:               (args) => ipValidate(args),
};
