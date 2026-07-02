// wiring/email.ts
// Per-app MCP wiring for the email connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Email

import { sendEmail, readInbox, searchEmail, getEmail, markRead, deleteEmail } from "../email-tool.js";

export const emailTools = [
  // ── email-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "email_send",
    description: "Send an email via Gmail/IMAP.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        to: { type: "string" },
        subject: { type: "string" },
        body: { type: "string" },
        cc: { type: "string" },
        bcc: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["to", "subject", "body"],
    },
  },
  {
    name: "email_read_inbox",
    description: "Read emails from an inbox.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        folder: { type: "string" },
        limit: { type: "number" },
        email: { type: "string" },
        password: { type: "string" },
      },
    },
  },
  {
    name: "email_search",
    description: "Search emails in an inbox.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        folder: { type: "string" },
        limit: { type: "number" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "email_get",
    description: "Get a specific email by UID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        uid: { type: "string" },
        folder: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["uid"],
    },
  },
  {
    name: "email_mark_read",
    description: "Mark an email as read.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        uid: { type: "string" },
        folder: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["uid"],
    },
  },
  {
    name: "email_delete",
    description: "Delete an email by UID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        uid: { type: "string" },
        folder: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["uid"],
    },
  },
] as const;

export const emailHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // email-tool.ts
  email_send:           (args) => sendEmail(args),
  email_read_inbox:     (args) => readInbox(args),
  email_search:         (args) => searchEmail(args),
  email_get:            (args) => getEmail(args),
  email_mark_read:      (args) => markRead(args),
  email_delete:         (args) => deleteEmail(args),
};
