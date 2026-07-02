// wiring/ipapi.ts
// Per-app MCP wiring for the ipapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ipLookup, ipBatch } from "../ipapi-tool.js";

export const ipapiTools = [
  // ── ipapi-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "ip_lookup",
    description: "Look up geolocation for an IP address.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["ip"],
    },
  },
  {
    name: "ip_batch",
    description: "Batch IP address geolocation lookup.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ips: { type: "array", items: {}, description: "Array of IP address strings" },
        api_key: { type: "string" },
      },
      required: ["ips"],
    },
  },
] as const;

export const ipapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ipapi-tool.ts
  ip_lookup:               (args) => ipLookup(args),
  ip_batch:                (args) => ipBatch(args),
};
