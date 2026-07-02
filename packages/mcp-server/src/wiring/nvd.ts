// wiring/nvd.ts
// Per-app MCP wiring for the nvd connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Security

import { getCveDetail, searchCve, getRecentCves } from "../nvd-tool.js";

export const nvdTools = [
  // ── nvd-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "get_cve_detail",
    description: "Get details for a specific CVE by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        cve_id: { type: "string", description: "e.g. CVE-2023-12345" },
      },
      required: ["cve_id"],
    },
  },
  {
    name: "search_cve",
    description: "Search the NVD CVE database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keyword: { type: "string" },
        cvssV3Severity: { type: "string", description: "LOW, MEDIUM, HIGH, CRITICAL" },
        resultsPerPage: { type: "number" },
        startIndex: { type: "number" },
      },
      required: ["keyword"],
    },
  },
  {
    name: "get_recent_cves",
    description: "Get recently published CVEs from NVD.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        resultsPerPage: { type: "number" },
      },
    },
  },
] as const;

export const nvdHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // nvd-tool.ts
  get_cve_detail:       (args) => getCveDetail(args),
  search_cve:           (args) => searchCve(args),
  get_recent_cves:      (args) => getRecentCves(args),
};
