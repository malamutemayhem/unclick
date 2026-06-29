// wiring/discord.ts
// Per-app MCP wiring for the discord connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { discordSend, discordRead, discordThread, discordReact, discordChannels, discordMembers, discordSearch } from "../discord-tool.js";

export const discordTools = [
  // ── discord-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "discord_send",
    description: "Send a message to a Discord channel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        channel_id: { type: "string" },
        content: { type: "string" },
        embeds: { type: "array", items: {} },
      },
      required: ["bot_token", "channel_id", "content"],
    },
  },
  {
    name: "discord_read",
    description: "Read messages from a Discord channel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        channel_id: { type: "string" },
        limit: { type: "number" },
        before: { type: "string" },
      },
      required: ["bot_token", "channel_id"],
    },
  },
  {
    name: "discord_thread",
    description: "Create a Discord thread.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        channel_id: { type: "string" },
        name: { type: "string" },
        message: { type: "string" },
        message_id: { type: "string" },
      },
      required: ["bot_token", "channel_id", "name"],
    },
  },
  {
    name: "discord_react",
    description: "Add a reaction to a Discord message.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        channel_id: { type: "string" },
        message_id: { type: "string" },
        emoji: { type: "string" },
      },
      required: ["bot_token", "channel_id", "message_id", "emoji"],
    },
  },
  {
    name: "discord_channels",
    description: "List channels in a Discord guild.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        guild_id: { type: "string" },
      },
      required: ["bot_token", "guild_id"],
    },
  },
  {
    name: "discord_members",
    description: "List members of a Discord guild.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        guild_id: { type: "string" },
        limit: { type: "number" },
      },
      required: ["bot_token", "guild_id"],
    },
  },
  {
    name: "discord_search",
    description: "Search messages in a Discord guild.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        guild_id: { type: "string" },
        content: { type: "string" },
        author_id: { type: "string" },
        channel_id: { type: "string" },
      },
      required: ["bot_token", "guild_id"],
    },
  },
] as const;

export const discordHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // discord-tool.ts
  discord_send:            (args) => discordSend(args),
  discord_read:            (args) => discordRead(args),
  discord_thread:          (args) => discordThread(args),
  discord_react:           (args) => discordReact(args),
  discord_channels:        (args) => discordChannels(args),
  discord_members:         (args) => discordMembers(args),
  discord_search:          (args) => discordSearch(args),
};
