// wiring/lyrics.ts
// Per-app MCP wiring for the lyrics connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { lyricsGet } from "../lyrics-tool.js";

export const lyricsTools = [
  // ── lyrics-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "lyrics_get",
    description: "Get song lyrics by artist and title.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        artist: { type: "string", description: "Artist/band name" },
        title: { type: "string", description: "Song title" },
      },
      required: ["artist", "title"],
    },
  },
] as const;

export const lyricsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // lyrics-tool.ts
  lyrics_get:                (args) => lyricsGet(args),};
