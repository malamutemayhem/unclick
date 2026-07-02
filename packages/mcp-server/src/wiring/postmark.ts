// wiring/postmark.ts
// Per-app MCP wiring for the postmark connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Monitoring / CI / CDP / Email / Commerce / Inference

import { postmark_send_email, postmark_send_batch, postmark_get_delivery_stats, postmark_list_templates, postmark_get_template, postmark_search_messages } from "../postmark-tool.js";

export const postmarkTools = [
  // ── postmark-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "postmark_send_email",
    description: "Send a transactional email via Postmark. Supports HTML and plain text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
        from: { type: "string", description: "Sender email address (must be verified in Postmark)" },
        to: { type: "string", description: "Recipient email address" },
        subject: { type: "string", description: "Email subject line" },
        html_body: { type: "string", description: "HTML email body" },
        text_body: { type: "string", description: "Plain text email body" },
        reply_to: { type: "string", description: "Reply-to email address" },
        cc: { type: "string", description: "CC email address(es)" },
        bcc: { type: "string", description: "BCC email address(es)" },
        tag: { type: "string", description: "Tag for categorizing messages" },
        message_stream: { type: "string", description: "Message stream ID (default: outbound)" },
      },
      required: ["api_key", "from", "to", "subject"],
    },
  },
  {
    name: "postmark_send_batch",
    description: "Send multiple emails in a single Postmark API call (up to 500 messages).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
        messages: { type: "array", items: {}, description: "Array of email message objects (same fields as send_email)" },
      },
      required: ["api_key", "messages"],
    },
  },
  {
    name: "postmark_get_delivery_stats",
    description: "Get delivery statistics from Postmark including bounces, spam complaints, and open rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "postmark_list_templates",
    description: "List email templates stored in Postmark.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
        count: { type: "number", description: "Number of templates to return (default 100)" },
        offset: { type: "number", description: "Pagination offset" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "postmark_get_template",
    description: "Get a single Postmark email template by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
        template_id: { type: "string", description: "Template ID or alias" },
      },
      required: ["api_key", "template_id"],
    },
  },
  {
    name: "postmark_search_messages",
    description: "Search sent messages in Postmark by recipient, sender, tag, or status.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
        count: { type: "number", description: "Number of messages to return (default 25)" },
        offset: { type: "number", description: "Pagination offset" },
        recipient: { type: "string", description: "Filter by recipient email" },
        from_email: { type: "string", description: "Filter by sender email" },
        tag: { type: "string", description: "Filter by tag" },
        status: { type: "string", description: "Filter by status: queued, sent, bounced, etc." },
      },
      required: ["api_key"],
    },
  },
] as const;

export const postmarkHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // postmark-tool.ts
  postmark_send_email:       (args) => postmark_send_email(args),
  postmark_send_batch:       (args) => postmark_send_batch(args),
  postmark_get_delivery_stats:(args) => postmark_get_delivery_stats(args),
  postmark_list_templates:   (args) => postmark_list_templates(args),
  postmark_get_template:     (args) => postmark_get_template(args),
  postmark_search_messages:  (args) => postmark_search_messages(args),
};
