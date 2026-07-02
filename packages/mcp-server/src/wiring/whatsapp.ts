// wiring/whatsapp.ts
// Per-app MCP wiring for the whatsapp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Messaging

import { whatsappSendText, whatsappSendTemplate, whatsappSendMedia, whatsappGetMedia, whatsappUploadMedia } from "../whatsapp-tool.js";

export const whatsappTools = [
  // ── whatsapp-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "whatsapp_send_text",
    description: "Send a text message via WhatsApp Business Cloud API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        phone_number_id: { type: "string", description: "Your WhatsApp phone number ID from Meta for Developers" },
        to: { type: "string", description: "Recipient phone number in E.164 format" },
        body: { type: "string", description: "Message text" },
        preview_url: { type: "boolean" },
      },
      required: ["bearer_token", "phone_number_id", "to", "body"],
    },
  },
  {
    name: "whatsapp_send_template",
    description: "Send a WhatsApp template message (required for first contact or >24h since last message).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        phone_number_id: { type: "string" },
        to: { type: "string" },
        template_name: { type: "string" },
        language: { type: "string", description: "Language code, e.g. en_US (default)" },
        components: { description: "Array of template component objects for variable substitution" },
      },
      required: ["bearer_token", "phone_number_id", "to", "template_name"],
    },
  },
  {
    name: "whatsapp_send_media",
    description: "Send a media message (image, video, audio, document, sticker) via WhatsApp.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        phone_number_id: { type: "string" },
        to: { type: "string" },
        media_type: { type: "string", enum: ["image", "video", "audio", "document", "sticker"], description: "image, video, audio, document, or sticker" },
        media_id: { type: "string", description: "ID of a previously uploaded media object" },
        media_link: { type: "string", description: "URL of the media to send" },
        caption: { type: "string" },
        filename: { type: "string", description: "For documents: the display filename" },
      },
      required: ["bearer_token", "phone_number_id", "to", "media_type"],
    },
  },
  {
    name: "whatsapp_get_media",
    description: "Get the download URL and metadata for a WhatsApp media object by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        media_id: { type: "string" },
      },
      required: ["bearer_token", "media_id"],
    },
  },
  {
    name: "whatsapp_upload_media",
    description: "Upload a media file to WhatsApp and get a media ID for use in messages.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        phone_number_id: { type: "string" },
        media_url: { type: "string", description: "URL to fetch the media from" },
        mime_type: { type: "string", description: "MIME type, e.g. image/jpeg, video/mp4" },
        filename: { type: "string" },
      },
      required: ["bearer_token", "phone_number_id", "media_url", "mime_type"],
    },
  },
] as const;

export const whatsappHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // whatsapp-tool.ts
  whatsapp_send_text:      (args) => whatsappSendText(args),
  whatsapp_send_template:  (args) => whatsappSendTemplate(args),
  whatsapp_send_media:     (args) => whatsappSendMedia(args),
  whatsapp_get_media:      (args) => whatsappGetMedia(args),
  whatsapp_upload_media:   (args) => whatsappUploadMedia(args),
};
