// wiring/virustotal.ts
// Per-app MCP wiring for the virustotal connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Security

import { scanUrlVirustotal, getUrlReport, scanIpVirustotal, scanDomainVirustotal } from "../virustotal-tool.js";

export const virustotalTools = [
  // ── virustotal-tool.ts ───────────────────────────────────────────────────────
  {
    name: "virustotal_scan_url",
    description: "Submit a URL for scanning on VirusTotal.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["url"],
    },
  },
  {
    name: "virustotal_url_report",
    description: "Get a VirusTotal report for a URL.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["url"],
    },
  },
  {
    name: "virustotal_scan_ip",
    description: "Get a VirusTotal report for an IP address.",
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
    name: "virustotal_scan_domain",
    description: "Get a VirusTotal report for a domain.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        domain: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["domain"],
    },
  },
] as const;

export const virustotalHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // virustotal-tool.ts
  virustotal_scan_url:  (args) => scanUrlVirustotal(args),
  virustotal_url_report:(args) => getUrlReport(args),
  virustotal_scan_ip:   (args) => scanIpVirustotal(args),
  virustotal_scan_domain:(args) => scanDomainVirustotal(args),
};
