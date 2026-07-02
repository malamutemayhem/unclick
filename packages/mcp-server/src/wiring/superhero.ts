// wiring/superhero.ts
// Per-app MCP wiring for the superhero connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { heroGetById, heroAll, heroPowerstats } from "../superhero-tool.js";

export const superheroTools = [
  // ── superhero-tool.ts ───────────────────────────────────────────────────────
  {
    name: "hero_get_by_id",
    description: "Get a superhero/villain by ID from the comic book database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Character ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "hero_all",
    description: "List all superheroes and villains (returns first 50 with IDs).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "hero_powerstats",
    description: "Get power statistics for a superhero/villain.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Character ID" },
      },
      required: ["id"],
    },
  },
] as const;

export const superheroHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // superhero-tool.ts
  hero_get_by_id:          (args) => heroGetById(args),
  hero_all:                (args) => heroAll(args),
  hero_powerstats:         (args) => heroPowerstats(args),
};
