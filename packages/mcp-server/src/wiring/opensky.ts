// wiring/opensky.ts
// Per-app MCP wiring for the opensky connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { openskyStates, openskyFlights } from "../opensky-tool.js";

export const openskyTools = [
  // ── opensky-tool.ts ────────────────────────────────────────────────────────
  {
    name: "opensky_states",
    description: "Get live aircraft states (position, altitude, velocity) from OpenSky Network.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        icao24: { type: "string" as const, description: "Filter by ICAO24 transponder address." },
        lamin: { type: "number" as const, description: "Bounding box min latitude." },
        lomin: { type: "number" as const, description: "Bounding box min longitude." },
        lamax: { type: "number" as const, description: "Bounding box max latitude." },
        lomax: { type: "number" as const, description: "Bounding box max longitude." },
      },
    },
  },
  {
    name: "opensky_flights",
    description: "Get flight history from OpenSky Network for a time range (max 2 hours).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        begin: { type: "number" as const, description: "Start time (Unix timestamp)." },
        end: { type: "number" as const, description: "End time (Unix timestamp)." },
        icao24: { type: "string" as const, description: "Filter by ICAO24 transponder address." },
      }, required: ["begin", "end"],
    },
  },
] as const;

export const openskyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // opensky-tool.ts
  opensky_states:            (args) => openskyStates(args),
  opensky_flights:           (args) => openskyFlights(args),};
