// wiring/github-emoji.ts
// Per-app MCP wiring for the github-emoji connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { githubEmojis } from "../github-emoji-tool.js";

export const githubEmojiTools = [
  // ── github-emoji-tool.ts ───────────────────────────────────────────────────
  {
    name: "github_emojis",
    description: "List all GitHub emojis with their image URLs.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const githubEmojiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // github-emoji-tool.ts
  github_emojis:           (args) => githubEmojis(args),
};
