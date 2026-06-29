// wiring/citybikes.ts
// Per-app MCP wiring for the citybikes connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { citybikesNetworks, citybikesNetwork } from "../citybikes-tool.js";

export const citybikesTools = [
  // ── citybikes-tool.ts ────────────────────────────────────────────────────────
  {
    name: "citybikes_networks",
    description: "List all bike-sharing networks worldwide from CityBikes.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "citybikes_network",
    description: "Get station details for a specific bike-sharing network.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "string" as const, description: "Network ID (e.g. citi-bike-nyc, velib-metropole)." },
      },
      required: ["id"],
    },
  },
] as const;

export const citybikesHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // citybikes-tool.ts
  citybikes_networks:        (args) => citybikesNetworks(args),
  citybikes_network:         (args) => citybikesNetwork(args),};
