// wiring/bluesky.ts
// Per-app MCP wiring for the bluesky connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { blueskyAction } from "../bluesky-tool.js";

export const blueskyTools = [
  // ── bluesky-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "bluesky_action",
    description: "Perform a Bluesky action: bluesky_post, bluesky_read_feed, bluesky_reply, bluesky_like, bluesky_repost, bluesky_search, bluesky_profile, bluesky_follow.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        identifier: { type: "string", description: "Bluesky handle or DID" },
        password: { type: "string", description: "App password" },
        text: { type: "string" },
        uri: { type: "string" },
        cid: { type: "string" },
        query: { type: "string" },
        actor: { type: "string" },
        limit: { type: "number" },
      },
      required: ["action"],
    },
  },
] as const;

export const blueskyHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // bluesky-tool.ts
  bluesky_action:          (args) => blueskyAction(String(args.action ?? ""), args),
};
