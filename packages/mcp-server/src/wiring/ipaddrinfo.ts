// wiring/ipaddrinfo.ts
// Per-app MCP wiring for the ipaddrinfo connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ipAddressLookup } from "../ipaddrinfo-tool.js";

export const ipaddrinfoTools = [
  // ── ipaddrinfo-tool.ts ───────────────────────────────────────────────────────
  {
    name: "ip_address_lookup",
    description: "Look up geolocation, ISP, and timezone for an IP address.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        ip: { type: "string" as const, description: "IP address to look up (omit for current server IP)." },
      },
    },
  },
] as const;

export const ipaddrinfoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ipaddrinfo-tool.ts
  ip_address_lookup:         (args) => ipAddressLookup(args),};
