// wiring/pushover.ts
// Per-app MCP wiring for the pushover connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Messaging

import { pushoverSendNotification, pushoverGetReceipt, pushoverCancelEmergency, pushoverListSounds, pushoverValidateUser } from "../pushover-tool.js";

export const pushoverTools = [
  // ── pushover-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "pushover_send_notification",
    description: "Send a push notification via Pushover.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_token: { type: "string" },
        user_key: { type: "string" },
        message: { type: "string" },
        title: { type: "string" },
        url: { type: "string" },
        url_title: { type: "string" },
        priority: { type: "number", description: "-2 (lowest) to 2 (emergency)" },
        sound: { type: "string" },
        device: { type: "string" },
        html: { type: "boolean" },
        retry: { type: "number", description: "Emergency only: retry interval in seconds (min 30)" },
        expire: { type: "number", description: "Emergency only: expiry in seconds (max 10800)" },
      },
      required: ["app_token", "user_key", "message"],
    },
  },
  {
    name: "pushover_get_receipt",
    description: "Get acknowledgment status for an emergency Pushover notification.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_token: { type: "string" },
        receipt: { type: "string", description: "Receipt token returned from an emergency notification" },
      },
      required: ["app_token", "receipt"],
    },
  },
  {
    name: "pushover_cancel_emergency",
    description: "Cancel an outstanding emergency Pushover notification before it expires.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_token: { type: "string" },
        user_key: { type: "string" },
        receipt: { type: "string" },
      },
      required: ["app_token", "user_key", "receipt"],
    },
  },
  {
    name: "pushover_list_sounds",
    description: "List all available notification sounds in Pushover.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_token: { type: "string" },
      },
      required: ["app_token"],
    },
  },
  {
    name: "pushover_validate_user",
    description: "Validate a Pushover user or group key and list their registered devices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_token: { type: "string" },
        user_key: { type: "string" },
        device: { type: "string", description: "Optional: validate only for a specific device name" },
      },
      required: ["app_token", "user_key"],
    },
  },
] as const;

export const pushoverHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // pushover-tool.ts
  pushover_send_notification: (args) => pushoverSendNotification(args),
  pushover_get_receipt:       (args) => pushoverGetReceipt(args),
  pushover_cancel_emergency:  (args) => pushoverCancelEmergency(args),
  pushover_list_sounds:       (args) => pushoverListSounds(args),
  pushover_validate_user:     (args) => pushoverValidateUser(args),
};
