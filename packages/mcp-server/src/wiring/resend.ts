// wiring/resend.ts
// Per-app MCP wiring for the resend connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Dev / Infra

import { sendEmailResend, getEmailResend, listDomainsResend } from "../resend-tool.js";

export const resendTools = [
  // ── resend-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "resend_send_email",
    description: "Send an email using Resend.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from: { type: "string" },
        to: { type: "string" },
        subject: { type: "string" },
        html: { type: "string" },
        text: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["from", "to", "subject"],
    },
  },
  {
    name: "resend_get_email",
    description: "Get a sent email by ID from Resend.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        email_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["email_id"],
    },
  },
  {
    name: "resend_list_domains",
    description: "List domains configured in Resend.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
] as const;

export const resendHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // resend-tool.ts
  resend_send_email:    (args) => sendEmailResend(args),
  resend_get_email:     (args) => getEmailResend(args),
  resend_list_domains:  (args) => listDomainsResend(args),
};
