// wiring/wheretheiss.ts
// Per-app MCP wiring for the wheretheiss connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { issPosition, issPassTimes } from "../wheretheiss-tool.js";

export const wheretheissTools = [
  // ── wheretheiss-tool.ts ──────────────────────────────────────────────────────
  {
    name: "iss_position",
    description: "Get the current position of the International Space Station.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "iss_pass_times",
    description: "Get ISS position relative to an observer location.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        latitude: { type: "number" as const, description: "Observer latitude." },
        longitude: { type: "number" as const, description: "Observer longitude." },
      },
      required: ["latitude", "longitude"],
    },
  },
] as const;

export const wheretheissHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wheretheiss-tool.ts
  iss_position:              (args) => issPosition(args),
  iss_pass_times:            (args) => issPassTimes(args),};
