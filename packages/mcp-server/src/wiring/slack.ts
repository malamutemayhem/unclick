// wiring/slack.ts
// Per-app MCP wiring for the slack connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { slackAction } from "../slack-tool.js";

export const slackTools = [
  // ── slack-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "slack_action",
    description: "Perform a Slack action: slack_send, slack_read, slack_search, slack_thread_reply, slack_channels, slack_react, slack_upload.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        bot_token: { type: "string" },
        channel: { type: "string" },
        text: { type: "string" },
        thread_ts: { type: "string" },
        query: { type: "string" },
        emoji: { type: "string" },
        timestamp: { type: "string" },
        limit: { type: "number" },
      },
      required: ["action", "bot_token"],
    },
  },
] as const;

export const slackHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // slack-tool.ts
  slack_action:            (args) => slackAction(String(args.action ?? ""), args),
};
