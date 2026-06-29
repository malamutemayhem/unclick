// wiring/countryis.ts
// Per-app MCP wiring for the countryis connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { countryByIp } from "../countryis-tool.js";

export const countryisTools = [
  // ── countryis-tool.ts ────────────────────────────────────────────────────────
  {
    name: "country_by_ip",
    description: "Detect country from an IP address using country.is.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        ip: { type: "string" as const, description: "IP address to look up (omit for auto-detect)." },
      },
    },
  },
] as const;

export const countryisHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // countryis-tool.ts
  country_by_ip:             (args) => countryByIp(args),};
