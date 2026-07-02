// wiring/telegram.ts
// Per-app MCP wiring for the telegram connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { telegramSend, telegramRead, telegramSearch, telegramSendMedia, telegramGetUpdates, telegramManageChat } from "../telegram-tool.js";

export const telegramTools = [
  // ── telegram-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "telegram_send",
    description: "Send a Telegram message.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        chat_id: { type: "string" },
        text: { type: "string" },
        parse_mode: { type: "string" },
        reply_to_message_id: { type: "number" },
      },
      required: ["bot_token", "chat_id", "text"],
    },
  },
  {
    name: "telegram_read",
    description: "Read Telegram messages/updates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        offset: { type: "number" },
        limit: { type: "number" },
      },
      required: ["bot_token"],
    },
  },
  {
    name: "telegram_search",
    description: "Search Telegram messages in a chat.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        chat_id: { type: "string" },
        query: { type: "string" },
      },
      required: ["bot_token", "chat_id", "query"],
    },
  },
  {
    name: "telegram_send_media",
    description: "Send media (photo/document/video) via Telegram.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        chat_id: { type: "string" },
        media_type: { type: "string", enum: ["photo", "document", "audio", "video", "animation"], description: "photo, document, video, audio" },
        media_url: { type: "string" },
        caption: { type: "string" },
      },
      required: ["bot_token", "chat_id", "media_type", "media_url"],
    },
  },
  {
    name: "telegram_get_updates",
    description: "Get Telegram bot updates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        offset: { type: "number" },
        limit: { type: "number" },
        timeout: { type: "number" },
      },
      required: ["bot_token"],
    },
  },
  {
    name: "telegram_manage_chat",
    description: "Manage a Telegram chat (get info, ban, kick, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        chat_id: { type: "string" },
        action: { type: "string" },
        user_id: { type: "number" },
      },
      required: ["bot_token", "chat_id", "action"],
    },
  },
] as const;

export const telegramHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // telegram-tool.ts
  telegram_send:           (args) => telegramSend(args),
  telegram_read:           (args) => telegramRead(args),
  telegram_search:         (args) => telegramSearch(args),
  telegram_send_media:     (args) => telegramSendMedia(args),
  telegram_get_updates:    (args) => telegramGetUpdates(args),
  telegram_manage_chat:    (args) => telegramManageChat(args),
};
