// wiring/line.ts
// Per-app MCP wiring for the line connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { lineSendMessage, lineSendFlexMessage, lineGetProfile, lineGetGroupSummary, lineReplyMessage, lineBroadcast } from "../line-tool.js";

export const lineTools = [
  // ── line-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "line_send_message",
    description: "Send a text message to a LINE user, group, or room.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        to: { type: "string", description: "User ID, group ID, or room ID" },
        message: { type: "string" },
      },
      required: ["channel_access_token", "to", "message"],
    },
  },
  {
    name: "line_send_flex_message",
    description: "Send a rich Flex Message to a LINE user or group.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        to: { type: "string" },
        alt_text: { type: "string", description: "Fallback text shown in push notifications" },
        contents: { description: "Flex Message container as JSON object or string" },
      },
      required: ["channel_access_token", "to", "alt_text", "contents"],
    },
  },
  {
    name: "line_get_profile",
    description: "Get a LINE user's display name, profile picture, and status message.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        user_id: { type: "string" },
      },
      required: ["channel_access_token", "user_id"],
    },
  },
  {
    name: "line_get_group_summary",
    description: "Get a LINE group's name and picture URL.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        group_id: { type: "string" },
      },
      required: ["channel_access_token", "group_id"],
    },
  },
  {
    name: "line_reply_message",
    description: "Reply to a LINE message using a reply token from a webhook event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        reply_token: { type: "string" },
        messages: { description: "Array of LINE message objects (max 5), or use message for a single text reply" },
        message: { type: "string", description: "Convenience: single text message to reply with" },
      },
      required: ["channel_access_token", "reply_token"],
    },
  },
  {
    name: "line_broadcast",
    description: "Broadcast a text message to all followers of your LINE Official Account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        message: { type: "string" },
      },
      required: ["channel_access_token", "message"],
    },
  },
] as const;

export const lineHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // line-tool.ts
  line_send_message:       (args) => lineSendMessage(args),
  line_send_flex_message:  (args) => lineSendFlexMessage(args),
  line_get_profile:        (args) => lineGetProfile(args),
  line_get_group_summary:  (args) => lineGetGroupSummary(args),
  line_reply_message:      (args) => lineReplyMessage(args),
  line_broadcast:          (args) => lineBroadcast(args),
};
