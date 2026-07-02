// wiring/twitch.ts
// Per-app MCP wiring for the twitch connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { twitchSearchStreams, twitchGetStream, twitchSearchGames, twitchGetTopGames, twitchGetClips, twitchGetChannelInfo, twitchGetSchedule } from "../twitch-tool.js";

export const twitchTools = [
  // ── twitch-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "twitch_search_streams",
    description: "Search for live streams on Twitch.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string" },
        user_login: { type: "string" },
        first: { type: "number" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "twitch_get_stream",
    description: "Get a specific Twitch stream by user login.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        user_login: { type: "string" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["user_login"],
    },
  },
  {
    name: "twitch_search_games",
    description: "Search for games on Twitch.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["name"],
    },
  },
  {
    name: "twitch_top_games",
    description: "Get top games currently streaming on Twitch.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        first: { type: "number" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "twitch_get_clips",
    description: "Get clips for a Twitch broadcaster.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        broadcaster_id: { type: "string" },
        game_id: { type: "string" },
        first: { type: "number" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "twitch_channel_info",
    description: "Get information about a Twitch channel by its login name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel: { type: "string", description: "Twitch channel login name, e.g. 'shroud'" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["channel"],
    },
  },
  {
    name: "twitch_schedule",
    description: "Get a Twitch channel's streaming schedule by its login name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel: { type: "string", description: "Twitch channel login name, e.g. 'shroud'" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["channel"],
    },
  },
] as const;

export const twitchHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // twitch-tool.ts
  twitch_search_streams:   (args) => twitchSearchStreams(args),
  twitch_get_stream:       (args) => twitchGetStream(args),
  twitch_search_games:     (args) => twitchSearchGames(args),
  twitch_top_games:        (args) => twitchGetTopGames(args),
  twitch_get_clips:        (args) => twitchGetClips(args),
  twitch_channel_info:     (args) => twitchGetChannelInfo(args),
  twitch_schedule:         (args) => twitchGetSchedule(args),
};
