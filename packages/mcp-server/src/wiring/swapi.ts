// wiring/swapi.ts
// Per-app MCP wiring for the swapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { swapiGetPerson, swapiSearchPeople, swapiGetPlanet, swapiSearchPlanets, swapiGetStarship, swapiSearchStarships } from "../swapi-tool.js";

export const swapiTools = [
  // ── swapi-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "swapi_get_person",
    description: "Get a Star Wars character by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Character ID (e.g. 1 for Luke Skywalker)" },
      },
      required: ["id"],
    },
  },
  {
    name: "swapi_search_people",
    description: "Search Star Wars characters by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (e.g. 'luke')" },
      },
      required: ["query"],
    },
  },
  {
    name: "swapi_get_planet",
    description: "Get a Star Wars planet by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Planet ID (e.g. 1 for Tatooine)" },
      },
      required: ["id"],
    },
  },
  {
    name: "swapi_search_planets",
    description: "Search Star Wars planets by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (e.g. 'tatooine')" },
      },
      required: ["query"],
    },
  },
  {
    name: "swapi_get_starship",
    description: "Get a Star Wars starship by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Starship ID (e.g. 10 for Millennium Falcon)" },
      },
      required: ["id"],
    },
  },
  {
    name: "swapi_search_starships",
    description: "Search Star Wars starships by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (e.g. 'falcon')" },
      },
      required: ["query"],
    },
  },
] as const;

export const swapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // swapi-tool.ts
  swapi_get_person:        (args) => swapiGetPerson(args),
  swapi_search_people:     (args) => swapiSearchPeople(args),
  swapi_get_planet:        (args) => swapiGetPlanet(args),
  swapi_search_planets:    (args) => swapiSearchPlanets(args),
  swapi_get_starship:      (args) => swapiGetStarship(args),
  swapi_search_starships:  (args) => swapiSearchStarships(args),
};
