// wiring/bgpview.ts
// Per-app MCP wiring for the bgpview connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { bgpviewAsn, bgpviewAsnPrefixes, bgpviewIp } from "../bgpview-tool.js";

export const bgpviewTools = [
  // ── bgpview-tool.ts ────────────────────────────────────────────────────────
  {
    name: "bgpview_asn",
    description: "Look up an Autonomous System Number (ASN) on BGPView.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        asn: { type: "string" as const, description: "ASN number (e.g. 13335 for Cloudflare)." },
      }, required: ["asn"],
    },
  },
  {
    name: "bgpview_asn_prefixes",
    description: "Get IP prefixes announced by an ASN from BGPView.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        asn: { type: "string" as const, description: "ASN number." },
      }, required: ["asn"],
    },
  },
  {
    name: "bgpview_ip",
    description: "Look up IP address details (PTR, prefix, ASN) on BGPView.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        ip: { type: "string" as const, description: "IP address to look up." },
      }, required: ["ip"],
    },
  },
] as const;

export const bgpviewHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bgpview-tool.ts
  bgpview_asn:               (args) => bgpviewAsn(args),
  bgpview_asn_prefixes:      (args) => bgpviewAsnPrefixes(args),
  bgpview_ip:                (args) => bgpviewIp(args),};
