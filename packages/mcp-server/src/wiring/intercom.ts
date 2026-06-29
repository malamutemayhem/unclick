// wiring/intercom.ts
// Per-app MCP wiring for the intercom connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { intercomListConversations, intercomGetConversation, intercomListContacts, intercomSearchContacts } from "../intercom-tool.js";

export const intercomTools = [
  // ── intercom-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "intercom_list_conversations",
    description: "List recent Intercom conversations.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Intercom access token" },
        limit: { type: "number", description: "Conversations to return (max 150, default 20)" },
        starting_after: { type: "string", description: "Pagination cursor from a previous response" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "intercom_get_conversation",
    description: "Get a single Intercom conversation by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Intercom access token" },
        conversation_id: { type: "string", description: "Conversation id" },
      },
      required: ["access_token", "conversation_id"],
    },
  },
  {
    name: "intercom_list_contacts",
    description: "List Intercom contacts.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Intercom access token" },
        limit: { type: "number", description: "Contacts to return (max 150, default 25)" },
        starting_after: { type: "string", description: "Pagination cursor from a previous response" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "intercom_search_contacts",
    description: "Search Intercom contacts by email.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Intercom access token" },
        query: { type: "string", description: "Email (or partial email) to match" },
      },
      required: ["access_token", "query"],
    },
  },
] as const;

export const intercomHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // intercom-tool.ts
  intercom_list_conversations: (args) => intercomListConversations(args),
  intercom_get_conversation:   (args) => intercomGetConversation(args),
  intercom_list_contacts:      (args) => intercomListContacts(args),
  intercom_search_contacts:    (args) => intercomSearchContacts(args),
};
