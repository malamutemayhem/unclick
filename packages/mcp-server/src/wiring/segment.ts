// wiring/segment.ts
// Per-app MCP wiring for the segment connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Monitoring / CI / CDP / Email / Commerce / Inference

import { segment_track_event, segment_identify_user, segment_list_sources, segment_list_destinations, segment_get_source } from "../segment-tool.js";

export const segmentTools = [
  // ── segment-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "segment_track_event",
    description: "Track a custom event in Segment. Use for recording user actions like 'Signed Up', 'Item Purchased', etc.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        write_key: { type: "string", description: "Segment source write key" },
        event: { type: "string", description: "Event name (e.g. 'Item Purchased')" },
        user_id: { type: "string", description: "Unique user identifier" },
        anonymous_id: { type: "string", description: "Anonymous ID if user is not logged in" },
        properties: { type: "object", description: "Event properties as key-value pairs" },
        timestamp: { type: "string", description: "ISO 8601 timestamp (defaults to now)" },
      },
      required: ["write_key", "event"],
    },
  },
  {
    name: "segment_identify_user",
    description: "Identify a user in Segment with traits. Links an anonymous ID to a known user ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        write_key: { type: "string", description: "Segment source write key" },
        user_id: { type: "string", description: "Unique user identifier" },
        anonymous_id: { type: "string", description: "Anonymous ID to link to the user" },
        traits: { type: "object", additionalProperties: true, description: "User traits as key-value pairs (e.g. name, email, plan)" },
        timestamp: { type: "string", description: "ISO 8601 timestamp (defaults to now)" },
      },
      required: ["write_key"],
    },
  },
  {
    name: "segment_list_sources",
    description: "List all Segment sources in a workspace using the Segment Public API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Segment Public API token" },
        workspace_id: { type: "string", description: "Segment workspace ID" },
      },
      required: ["api_key", "workspace_id"],
    },
  },
  {
    name: "segment_list_destinations",
    description: "List all destinations connected to a Segment source.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Segment Public API token" },
        source_id: { type: "string", description: "Segment source ID" },
      },
      required: ["api_key", "source_id"],
    },
  },
  {
    name: "segment_get_source",
    description: "Get details for a single Segment source including settings and enabled state.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Segment Public API token" },
        source_id: { type: "string", description: "Segment source ID" },
      },
      required: ["api_key", "source_id"],
    },
  },
] as const;

export const segmentHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // segment-tool.ts
  segment_track_event:      (args) => segment_track_event(args),
  segment_identify_user:    (args) => segment_identify_user(args),
  segment_list_sources:     (args) => segment_list_sources(args),
  segment_list_destinations:(args) => segment_list_destinations(args),
  segment_get_source:       (args) => segment_get_source(args),
};
