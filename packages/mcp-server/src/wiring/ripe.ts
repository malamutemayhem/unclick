// wiring/ripe.ts
// Per-app MCP wiring for the ripe connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ripeNetworkInfo, ripeAsnNeighbours } from "../ripe-tool.js";

export const ripeTools = [
  // ── ripe-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "ripe_network_info",
    description: "Get network information for an IP or prefix from RIPE NCC.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        resource: { type: "string" as const, description: "IP address or prefix." },
      }, required: ["resource"],
    },
  },
  {
    name: "ripe_asn_neighbours",
    description: "Get peering neighbours for an ASN from RIPE NCC.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        asn: { type: "string" as const, description: "ASN (e.g. AS13335)." },
      }, required: ["asn"],
    },
  },
] as const;

export const ripeHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ripe-tool.ts
  ripe_network_info:         (args) => ripeNetworkInfo(args),
  ripe_asn_neighbours:       (args) => ripeAsnNeighbours(args),
};
