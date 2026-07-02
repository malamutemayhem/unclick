// wiring/bandsintown.ts
// Per-app MCP wiring for the bandsintown connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { bandsintownArtist, bandsintownEvents, bandsintownRecommended } from "../bandsintown-tool.js";

export const bandsintownTools = [
  // ── bandsintown-tool.ts ──────────────────────────────────────────────────────
  {
    name: "bandsintown_artist",
    description: "Get an artist profile from Bandsintown.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        app_id: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "bandsintown_events",
    description: "Get upcoming events for an artist on Bandsintown.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        date: { type: "string" },
        app_id: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "bandsintown_recommended",
    description: "Get recommended events for an artist on Bandsintown.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        location: { type: "string" },
        app_id: { type: "string" },
      },
      required: ["artist"],
    },
  },
] as const;

export const bandsintownHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bandsintown-tool.ts
  bandsintown_artist:      (args) => bandsintownArtist(args),
  bandsintown_events:      (args) => bandsintownEvents(args),
  bandsintown_recommended: (args) => bandsintownRecommended(args),
};
