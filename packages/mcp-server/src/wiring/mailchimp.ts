// wiring/mailchimp.ts
// Per-app MCP wiring for the mailchimp connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { mailchimpListAudiences, mailchimpListCampaigns, mailchimpGetCampaign, mailchimpCreateCampaign, mailchimpListMembers, mailchimpAddMember, mailchimpSearchMembers } from "../mailchimp-tool.js";

export const mailchimpTools = [
  // ── mailchimp-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "mailchimp_list_audiences",
    description: "List all Mailchimp audiences (lists) in the account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key (format: key-dc e.g. abc123-us21)" },
        count: { type: "number", description: "Number of audiences to return (default: 10, max: 1000)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "mailchimp_list_campaigns",
    description: "List Mailchimp email campaigns, optionally filtered by status or audience.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        count: { type: "number", description: "Number of campaigns (default: 10)" },
        status: { type: "string", enum: ["save", "paused", "schedule", "sending", "sent"], description: "Filter by campaign status" },
        list_id: { type: "string", description: "Filter by audience ID" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "mailchimp_get_campaign",
    description: "Get details for a specific Mailchimp campaign by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        campaign_id: { type: "string", description: "Campaign ID" },
      },
      required: ["api_key", "campaign_id"],
    },
  },
  {
    name: "mailchimp_create_campaign",
    description: "Create a new Mailchimp email campaign.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        list_id: { type: "string", description: "Audience (list) ID to send to" },
        subject_line: { type: "string", description: "Email subject line" },
        type: { type: "string", enum: ["regular", "plaintext", "absplit", "rss", "variate"], description: "Campaign type (default: regular)" },
        from_name: { type: "string", description: "Sender display name" },
        reply_to: { type: "string", description: "Reply-to email address" },
      },
      required: ["api_key", "list_id", "subject_line"],
    },
  },
  {
    name: "mailchimp_list_members",
    description: "List members (subscribers) in a Mailchimp audience.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        list_id: { type: "string", description: "Audience ID" },
        count: { type: "number", description: "Number of members to return (default: 10)" },
        status: { type: "string", enum: ["subscribed", "unsubscribed", "cleaned", "pending", "transactional"], description: "Filter by subscription status" },
      },
      required: ["api_key", "list_id"],
    },
  },
  {
    name: "mailchimp_add_member",
    description: "Add or update a subscriber in a Mailchimp audience.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        list_id: { type: "string", description: "Audience ID" },
        email: { type: "string", description: "Subscriber email address" },
        status: { type: "string", enum: ["subscribed", "unsubscribed", "cleaned", "pending"], description: "Subscription status (default: subscribed)" },
        first_name: { type: "string", description: "Subscriber first name" },
        last_name: { type: "string", description: "Subscriber last name" },
      },
      required: ["api_key", "list_id", "email"],
    },
  },
  {
    name: "mailchimp_search_members",
    description: "Search for subscribers across all or a specific Mailchimp audience.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        query: { type: "string", description: "Search query (email address, name, etc.)" },
        list_id: { type: "string", description: "Limit search to a specific audience ID" },
      },
      required: ["api_key", "query"],
    },
  },
] as const;

export const mailchimpHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // mailchimp-tool.ts
  mailchimp_list_audiences:  (args) => mailchimpListAudiences(args),
  mailchimp_list_campaigns:  (args) => mailchimpListCampaigns(args),
  mailchimp_get_campaign:    (args) => mailchimpGetCampaign(args),
  mailchimp_create_campaign: (args) => mailchimpCreateCampaign(args),
  mailchimp_list_members:    (args) => mailchimpListMembers(args),
  mailchimp_add_member:      (args) => mailchimpAddMember(args),
  mailchimp_search_members:  (args) => mailchimpSearchMembers(args),
};
