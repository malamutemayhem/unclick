// wiring/sendle.ts
// Per-app MCP wiring for the sendle connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Australian / Local

import { getSendleQuote, createSendleOrder, trackSendleParcel } from "../sendle-tool.js";

export const sendleTools = [
  // ── sendle-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "sendle_get_quote",
    description: "Get a shipping quote from Sendle.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pickup_suburb: { type: "string" },
        pickup_postcode: { type: "string" },
        pickup_country: { type: "string" },
        delivery_suburb: { type: "string" },
        delivery_postcode: { type: "string" },
        delivery_country: { type: "string" },
        weight_value: { type: "number" },
        weight_units: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["pickup_postcode", "delivery_postcode", "weight_value"],
    },
  },
  {
    name: "sendle_create_order",
    description: "Create a Sendle shipping order.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sender: { type: "object", additionalProperties: true },
        receiver: { type: "object", additionalProperties: true },
        parcel_contents: { type: "array", items: {} },
        api_key: { type: "string" },
      },
      required: ["sender", "receiver"],
    },
  },
  {
    name: "sendle_track_parcel",
    description: "Track a Sendle parcel by tracking number.",
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
] as const;

export const sendleHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // sendle-tool.ts
  sendle_get_quote:     (args) => getSendleQuote(args),
  sendle_create_order:  (args) => createSendleOrder(args),
  sendle_track_parcel:  (args) => trackSendleParcel(args),
};
