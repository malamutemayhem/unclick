// wiring/australiapost.ts
// Per-app MCP wiring for the australiapost connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Australian / Local

import { trackAuspostParcel, getAuspostPostcode, getAuspostDeliveryTimes } from "../australiapost-tool.js";

export const australiapostTools = [
  // ── australiapost-tool.ts ────────────────────────────────────────────────────
  {
    name: "auspost_track_parcel",
    description: "Track an Australia Post parcel by tracking number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        tracking_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["tracking_id"],
    },
  },
  {
    name: "auspost_get_postcode",
    description: "Look up an Australian postcode or suburb.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string", description: "Suburb name or postcode" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "auspost_delivery_times",
    description: "Get Australia Post estimated delivery times.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from_postcode: { type: "string" },
        to_postcode: { type: "string" },
        service_code: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["from_postcode", "to_postcode"],
    },
  },
] as const;

export const australiapostHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // australiapost-tool.ts
  auspost_track_parcel: (args) => trackAuspostParcel(args),
  auspost_get_postcode: (args) => getAuspostPostcode(args),
  auspost_delivery_times:(args) => getAuspostDeliveryTimes(args),
};
