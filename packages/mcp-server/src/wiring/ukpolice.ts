// wiring/ukpolice.ts
// Per-app MCP wiring for the ukpolice connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { ukPoliceForces, ukPoliceCrimes } from "../ukpolice-tool.js";

export const ukpoliceTools = [
  // ── ukpolice-tool.ts ───────────────────────────────────────────────────────
  {
    name: "uk_police_forces",
    description: "List all UK police forces with id and name.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "uk_police_crimes",
    description: "Get reported crimes at a UK location from data.police.uk.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Latitude of the location." },
        longitude: { type: "number" as const, description: "Longitude of the location." },
        date: { type: "string" as const, description: "Month in YYYY-MM format (default: latest)." },
      }, required: ["latitude", "longitude"],
    },
  },
] as const;

export const ukpoliceHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ukpolice-tool.ts
  uk_police_forces:          (args) => ukPoliceForces(args),
  uk_police_crimes:          (args) => ukPoliceCrimes(args),};
