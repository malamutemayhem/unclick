// wiring/brevo.ts
// Per-app MCP wiring for the brevo connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { brevoListContacts, brevoListCampaigns, brevoGetAccount } from "../brevo-tool.js";

export const brevoTools = [
  // ── brevo-tool.ts ─────────────────────────────────────────────────────────────
  { name: "brevo_list_contacts", description: "List Brevo contacts.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_key: { type: "string", description: "Brevo API key" },
    limit: { type: "number", description: "Contacts to return (max 1000, default 50)" },
    offset: { type: "number", description: "Pagination offset" },
  }, required: ["api_key"] } },
  { name: "brevo_list_campaigns", description: "List Brevo email campaigns.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_key: { type: "string", description: "Brevo API key" },
    status: { type: "string", description: "Filter by status (sent, draft, queued, ...)" },
    limit: { type: "number", description: "Campaigns to return (max 100, default 25)" },
  }, required: ["api_key"] } },
  { name: "brevo_get_account", description: "Get the Brevo account profile and plan.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_key: { type: "string", description: "Brevo API key" },
  }, required: ["api_key"] } },
] as const;

export const brevoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // brevo-tool.ts
  brevo_list_contacts:     (args) => brevoListContacts(args),
  brevo_list_campaigns:    (args) => brevoListCampaigns(args),
  brevo_get_account:       (args) => brevoGetAccount(args),
};
