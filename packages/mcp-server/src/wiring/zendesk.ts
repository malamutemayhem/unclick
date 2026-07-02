// wiring/zendesk.ts
// Per-app MCP wiring for the zendesk connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { zendeskSearch, zendeskListTickets, zendeskGetTicket, zendeskAddComment } from "../zendesk-tool.js";

export const zendeskTools = [
  // ── zendesk-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "zendesk_search",
    description: "Search Zendesk with the query DSL (e.g. 'type:ticket status:open priority:urgent').",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        subdomain: { type: "string", description: "Zendesk subdomain (e.g. mycompany)" },
        email: { type: "string", description: "Agent email address" },
        api_token: { type: "string", description: "Zendesk API token" },
        query: { type: "string", description: "Zendesk search query" },
      },
      required: ["subdomain", "email", "api_token", "query"],
    },
  },
  {
    name: "zendesk_list_tickets",
    description: "List recent Zendesk tickets (signals when any are still new).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        subdomain: { type: "string", description: "Zendesk subdomain" },
        email: { type: "string", description: "Agent email address" },
        api_token: { type: "string", description: "Zendesk API token" },
        sort_by: { type: "string", description: "Sort field (e.g. created_at, updated_at)" },
        limit: { type: "number", description: "Tickets to return (max 100, default 25)" },
      },
      required: ["subdomain", "email", "api_token"],
    },
  },
  {
    name: "zendesk_get_ticket",
    description: "Get a single Zendesk ticket by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        subdomain: { type: "string", description: "Zendesk subdomain" },
        email: { type: "string", description: "Agent email address" },
        api_token: { type: "string", description: "Zendesk API token" },
        ticket_id: { type: "string", description: "Ticket id" },
      },
      required: ["subdomain", "email", "api_token", "ticket_id"],
    },
  },
  {
    name: "zendesk_add_comment",
    description: "Add a public or internal comment to a Zendesk ticket.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        subdomain: { type: "string", description: "Zendesk subdomain" },
        email: { type: "string", description: "Agent email address" },
        api_token: { type: "string", description: "Zendesk API token" },
        ticket_id: { type: "string", description: "Ticket id" },
        body: { type: "string", description: "Comment text" },
        public: { type: "boolean", description: "Public reply (default true) or internal note (false)" },
      },
      required: ["subdomain", "email", "api_token", "ticket_id", "body"],
    },
  },
] as const;

export const zendeskHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // zendesk-tool.ts
  zendesk_search:          (args) => zendeskSearch(args),
  zendesk_list_tickets:    (args) => zendeskListTickets(args),
  zendesk_get_ticket:      (args) => zendeskGetTicket(args),
  zendesk_add_comment:     (args) => zendeskAddComment(args),
};
