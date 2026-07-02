// wiring/ipinfo.ts
// Per-app MCP wiring for the ipinfo connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ipInfoLookup } from "../ipinfo-tool.js";

export const ipinfoTools = [
  // ── ipinfo-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "ipinfo_lookup",
    description: "Get geolocation and ISP info for an IP address (or your own).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        ip: { type: "string", description: "IP address to look up (omit for your own)" },
      },
    },
  },
] as const;

export const ipinfoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ipinfo-tool.ts
  ipinfo_lookup:           (args) => ipInfoLookup(args),
};
