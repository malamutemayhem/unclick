// wiring/mastodon.ts
// Per-app MCP wiring for the mastodon connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { mastodonAction } from "../mastodon-tool.js";

export const mastodonTools = [
  // ── mastodon-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "mastodon_action",
    description: "Perform a Mastodon action: mastodon_post, mastodon_read_timeline, mastodon_reply, mastodon_boost, mastodon_favorite, mastodon_search, mastodon_profile, mastodon_follow, mastodon_notifications.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        instance_url: { type: "string" },
        access_token: { type: "string" },
        status: { type: "string" },
        in_reply_to_id: { type: "string" },
        id: { type: "string" },
        q: { type: "string" },
        acct: { type: "string" },
      },
      required: ["action"],
    },
  },
] as const;

export const mastodonHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // mastodon-tool.ts
  mastodon_action:         (args) => mastodonAction(String(args.action ?? ""), args),
};
