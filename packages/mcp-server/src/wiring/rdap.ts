// wiring/rdap.ts
// Per-app MCP wiring for the rdap connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { rdapDomain, rdapIp } from "../rdap-tool.js";

export const rdapTools = [
  // ── rdap-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "rdap_domain",
    description: "Look up domain registration data via RDAP (WHOIS replacement).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        domain: { type: "string" as const, description: "Domain name to look up." },
      }, required: ["domain"],
    },
  },
  {
    name: "rdap_ip",
    description: "Look up IP address registration data via RDAP.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        ip: { type: "string" as const, description: "IP address to look up." },
      }, required: ["ip"],
    },
  },
] as const;

export const rdapHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // rdap-tool.ts
  rdap_domain:               (args) => rdapDomain(args),
  rdap_ip:                   (args) => rdapIp(args),
};
