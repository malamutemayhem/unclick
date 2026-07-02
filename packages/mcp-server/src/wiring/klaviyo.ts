// wiring/klaviyo.ts
// Per-app MCP wiring for the klaviyo connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { klaviyoListLists, klaviyoListSegments, klaviyoListMetrics, klaviyoListProfiles } from "../klaviyo-tool.js";

export const klaviyoTools = [
  // ── klaviyo-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "klaviyo_list_lists",
    description: "List Klaviyo lists.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Klaviyo private API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "klaviyo_list_segments",
    description: "List Klaviyo segments (dynamic groups).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Klaviyo private API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "klaviyo_list_metrics",
    description: "List Klaviyo metrics (tracked events).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Klaviyo private API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "klaviyo_list_profiles",
    description: "List Klaviyo profiles (subscribers).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Klaviyo private API key" },
        filter: { type: "string", description: "Klaviyo filter expression (e.g. equals(email,'a@b.com'))" },
        limit: { type: "number", description: "Profiles to return (max 100, default 20)" },
      },
      required: ["api_key"],
    },
  },
] as const;

export const klaviyoHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // klaviyo-tool.ts
  klaviyo_list_lists:      (args) => klaviyoListLists(args),
  klaviyo_list_segments:   (args) => klaviyoListSegments(args),
  klaviyo_list_metrics:    (args) => klaviyoListMetrics(args),
  klaviyo_list_profiles:   (args) => klaviyoListProfiles(args),
};
