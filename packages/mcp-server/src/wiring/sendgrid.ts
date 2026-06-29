// wiring/sendgrid.ts
// Per-app MCP wiring for the sendgrid connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { sendgridSendEmail, sendgridListTemplates, sendgridGetTemplate, sendgridListContacts, sendgridAddContact, sendgridGetStats } from "../sendgrid-tool.js";

export const sendgridTools = [
  // ── sendgrid-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "sendgrid_send_email",
    description: "Send a transactional email via SendGrid.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key from app.sendgrid.com" },
        to: { type: "string", description: "Recipient email address" },
        from: { type: "string", description: "Sender email address (must be verified in SendGrid)" },
        subject: { type: "string", description: "Email subject line" },
        text: { type: "string", description: "Plain text content" },
        html: { type: "string", description: "HTML content" },
        to_name: { type: "string", description: "Recipient display name" },
        from_name: { type: "string", description: "Sender display name" },
        reply_to: { type: "string", description: "Reply-to email address" },
        template_id: { type: "string", description: "SendGrid dynamic template ID" },
      },
      required: ["api_key", "to", "from", "subject"],
    },
  },
  {
    name: "sendgrid_list_templates",
    description: "List dynamic email templates in SendGrid.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key" },
        page_size: { type: "number", description: "Number of templates (default: 10, max: 200)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "sendgrid_get_template",
    description: "Get a specific SendGrid email template by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key" },
        template_id: { type: "string", description: "Template ID" },
      },
      required: ["api_key", "template_id"],
    },
  },
  {
    name: "sendgrid_list_contacts",
    description: "List all marketing contacts in SendGrid.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "sendgrid_add_contact",
    description: "Add or update a marketing contact in SendGrid.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key" },
        email: { type: "string", description: "Contact email address" },
        first_name: { type: "string", description: "First name" },
        last_name: { type: "string", description: "Last name" },
        phone_number: { type: "string", description: "Phone number" },
        list_ids: { type: "array", items: { type: "string" }, description: "List IDs to add the contact to" },
      },
      required: ["api_key", "email"],
    },
  },
  {
    name: "sendgrid_get_stats",
    description: "Get SendGrid email sending statistics for a date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key" },
        start_date: { type: "string", description: "Start date (YYYY-MM-DD). Defaults to 7 days ago." },
        end_date: { type: "string", description: "End date (YYYY-MM-DD)" },
        aggregated_by: { type: "string", enum: ["day", "week", "month"], description: "Aggregation period (default: day)" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const sendgridHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // sendgrid-tool.ts
  sendgrid_send_email:     (args) => sendgridSendEmail(args),
  sendgrid_list_templates: (args) => sendgridListTemplates(args),
  sendgrid_get_template:   (args) => sendgridGetTemplate(args),
  sendgrid_list_contacts:  (args) => sendgridListContacts(args),
  sendgrid_add_contact:    (args) => sendgridAddContact(args),
  sendgrid_get_stats:      (args) => sendgridGetStats(args),
};
