// wiring/ipify.ts
// Per-app MCP wiring for the ipify connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ipifyGetIp } from "../ipify-tool.js";

export const ipifyTools = [
  // ── ipify-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "ipify_get_ip",
    description: "Get your public IP address via ipify.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { ipv6: { type: "boolean", description: "Use IPv6 endpoint" } },
    },
  },
] as const;

export const ipifyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ipify-tool.ts
  ipify_get_ip:            (args) => ipifyGetIp(args),
};
