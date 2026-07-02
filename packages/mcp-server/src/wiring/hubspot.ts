// wiring/hubspot.ts
// Per-app MCP wiring for the hubspot connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { hubspotListContacts, hubspotGetContact, hubspotSearchContacts, hubspotListCompanies, hubspotListDeals, hubspotCreateContact } from "../hubspot-tool.js";

export const hubspotTools = [
  // ── hubspot-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "hubspot_list_contacts",
    description: "List HubSpot CRM contacts (most recently created first).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        limit: { type: "number", description: "Contacts to return (max 100, default 25)" },
        after: { type: "string", description: "Pagination cursor from a previous response" },
        properties: { type: "string", description: "Comma-separated properties to return" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "hubspot_get_contact",
    description: "Get a single HubSpot contact by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        contact_id: { type: "string", description: "HubSpot contact id" },
        properties: { type: "string", description: "Comma-separated properties to return" },
      },
      required: ["access_token", "contact_id"],
    },
  },
  {
    name: "hubspot_search_contacts",
    description: "Search HubSpot contacts by name, email, or company.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        query: { type: "string", description: "Search term (name, email, or company)" },
        limit: { type: "number", description: "Results to return (max 100, default 25)" },
        properties: { type: "string", description: "Comma-separated properties to return" },
      },
      required: ["access_token", "query"],
    },
  },
  {
    name: "hubspot_list_companies",
    description: "List HubSpot CRM companies.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        limit: { type: "number", description: "Companies to return (max 100, default 25)" },
        after: { type: "string", description: "Pagination cursor from a previous response" },
        properties: { type: "string", description: "Comma-separated properties to return" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "hubspot_list_deals",
    description: "List HubSpot CRM deals.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        limit: { type: "number", description: "Deals to return (max 100, default 25)" },
        after: { type: "string", description: "Pagination cursor from a previous response" },
        properties: { type: "string", description: "Comma-separated properties to return" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "hubspot_create_contact",
    description: "Create a HubSpot contact.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        email: { type: "string", description: "Contact email address" },
        properties: { type: "object", description: "Additional contact properties (firstname, lastname, company, phone, ...)" },
      },
      required: ["access_token"],
    },
  },
] as const;

export const hubspotHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // hubspot-tool.ts
  hubspot_list_contacts:   (args) => hubspotListContacts(args),
  hubspot_get_contact:     (args) => hubspotGetContact(args),
  hubspot_search_contacts: (args) => hubspotSearchContacts(args),
  hubspot_list_companies:  (args) => hubspotListCompanies(args),
  hubspot_list_deals:      (args) => hubspotListDeals(args),
  hubspot_create_contact:  (args) => hubspotCreateContact(args),
};
