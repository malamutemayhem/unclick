// wiring/shodan.ts
// Per-app MCP wiring for the shodan connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Security

import { searchShodan, getHostInfo, getShodanStats } from "../shodan-tool.js";

export const shodanTools = [
  // ── shodan-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "shodan_search",
    description: "Search Shodan for internet-connected devices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "shodan_host_info",
    description: "Get Shodan information for a specific IP address.",
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
    name: "shodan_stats",
    description: "Get aggregated statistics for a Shodan query.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        facets: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
] as const;

export const shodanHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // shodan-tool.ts
  shodan_search:        (args) => searchShodan(args),
  shodan_host_info:     (args) => getHostInfo(args),
  shodan_stats:         (args) => getShodanStats(args),
};
