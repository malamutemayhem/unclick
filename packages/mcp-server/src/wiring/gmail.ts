// wiring/gmail.ts
// Per-app MCP wiring for the gmail connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { gmailSearch, gmailRead, gmailSend } from "../gmail-tool.js";

export const gmailTools = [
  // ── gmail-tool.ts ─────────────────────────────────────────────────────────────
  { name: "gmail_search", description: "Search Gmail messages in the connected mailbox.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Gmail access token" },
    query: { type: "string", description: "Gmail search query, such as from:alice newer_than:7d" },
    limit: { type: "number", description: "Messages to return (max 100, default 10)" },
    page_token: { type: "string", description: "Gmail page token from a previous response" },
  } } },
  { name: "gmail_read", description: "Read a Gmail message by id.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Gmail access token" },
    message_id: { type: "string", description: "Gmail message id" },
    format: { type: "string", enum: ["minimal", "metadata", "full", "raw"], description: "Gmail response format (default metadata)" },
  }, required: ["message_id"] } },
  { name: "gmail_send", description: "Send a plain-text Gmail message.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Gmail access token" },
    to: { type: "string", description: "Recipient email address" },
    subject: { type: "string", description: "Email subject" },
    body: { type: "string", description: "Plain-text email body" },
    from: { type: "string", description: "Optional From header (defaults to me)" },
  }, required: ["to", "subject", "body"] } },
] as const;

export const gmailHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // gmail-tool.ts
  gmail_search:            (args) => gmailSearch(args),
  gmail_read:              (args) => gmailRead(args),
  gmail_send:              (args) => gmailSend(args),
};
