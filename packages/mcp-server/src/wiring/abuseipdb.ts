// wiring/abuseipdb.ts
// Per-app MCP wiring for the abuseipdb connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Security

import { checkIpAbuse, reportIpAbuse, getBlacklistAbuseipdb } from "../abuseipdb-tool.js";

export const abuseipdbTools = [
  // ── abuseipdb-tool.ts ────────────────────────────────────────────────────────
  {
    name: "abuseipdb_check_ip",
    description: "Check if an IP address has been reported for abuse.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string" },
        maxAgeInDays: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["ip"],
    },
  },
  {
    name: "abuseipdb_report_ip",
    description: "Report an abusive IP address to AbuseIPDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string" },
        categories: { type: "string" },
        comment: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["ip", "categories"],
    },
  },
  {
    name: "abuseipdb_blacklist",
    description: "Get the AbuseIPDB blacklist.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        confidenceMinimum: { type: "number" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const abuseipdbHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // abuseipdb-tool.ts
  abuseipdb_check_ip:   (args) => checkIpAbuse(args),
  abuseipdb_report_ip:  (args) => reportIpAbuse(args),
  abuseipdb_blacklist:  (args) => getBlacklistAbuseipdb(args),
};
