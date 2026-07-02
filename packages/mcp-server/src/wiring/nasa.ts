// wiring/nasa.ts
// Per-app MCP wiring for the nasa connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { nasaApod, nasaAsteroids, nasaMarsPhotos, nasaEarthImagery, nasaEpic } from "../nasa-tool.js";

export const nasaTools = [
  // ── nasa-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "nasa_apod",
    description: "Get NASA Astronomy Picture of the Day.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        count: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "nasa_asteroids",
    description: "Get NASA Near Earth Object (asteroid) data.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        start_date: { type: "string" },
        end_date: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "nasa_mars_photos",
    description: "Get NASA Mars rover photos.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        rover: { type: "string", enum: ["curiosity", "opportunity", "spirit", "perseverance"], description: "curiosity, opportunity, spirit" },
        sol: { type: "number" },
        earth_date: { type: "string" },
        camera: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "nasa_earth_imagery",
    description: "Get NASA Earth satellite imagery.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        lat: { type: "number" },
        lon: { type: "number" },
        date: { type: "string" },
        dim: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["lat", "lon"],
    },
  },
  {
    name: "nasa_epic",
    description: "Get NASA EPIC Earth imagery.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
] as const;

export const nasaHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // nasa-tool.ts
  nasa_apod:               (args) => nasaApod(args),
  nasa_asteroids:          (args) => nasaAsteroids(args),
  nasa_mars_photos:        (args) => nasaMarsPhotos(args),
  nasa_earth_imagery:      (args) => nasaEarthImagery(args),
  nasa_epic:               (args) => nasaEpic(args),
};
