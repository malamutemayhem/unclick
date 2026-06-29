// wiring/opennotify.ts
// Per-app MCP wiring for the opennotify connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { issLocation, issAstronauts } from "../opennotify-tool.js";

export const opennotifyTools = [
  // ── opennotify-tool.ts ──────────────────────────────────────────────────────
  {
    name: "iss_location",
    description: "Get the current location of the International Space Station.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "iss_astronauts",
    description: "Get the list of astronauts currently in space.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const opennotifyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // opennotify-tool.ts
  iss_location:            (args) => issLocation(args),
  iss_astronauts:          (args) => issAstronauts(args),
};
