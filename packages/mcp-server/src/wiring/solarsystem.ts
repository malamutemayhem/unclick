// wiring/solarsystem.ts
// Per-app MCP wiring for the solarsystem connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { solarsystemBodies, solarsystemBody } from "../solarsystem-tool.js";

export const solarsystemTools = [
  // ── solarsystem-tool.ts ──────────────────────────────────────────────────────
  {
    name: "solarsystem_bodies",
    description: "List solar system bodies (planets, moons, asteroids, comets).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        filter: { type: "string" as const, description: "Body type filter: Star, Planet, Dwarf Planet, Asteroid, Comet, Moon." },
        limit: { type: "number" as const, description: "Max results to return." },
      },
    },
  },
  {
    name: "solarsystem_body",
    description: "Get detailed info about a specific solar system body.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        id: { type: "string" as const, description: "Body ID (e.g. 'terre' for Earth, 'mars', 'jupiter', 'lune' for Moon)." },
      }, required: ["id"],
    },
  },
] as const;

export const solarsystemHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // solarsystem-tool.ts
  solarsystem_bodies:        (args) => solarsystemBodies(args),
  solarsystem_body:          (args) => solarsystemBody(args),};
