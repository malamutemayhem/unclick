// wiring/hackernews.ts
// Per-app MCP wiring for the hackernews connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { hnTopStories, hnNewStories, hnBestStories, hnAskHn, hnShowHn, hnItem, hnUser } from "../hackernews-tool.js";

export const hackernewsTools = [
  // ── hackernews-tool.ts ───────────────────────────────────────────────────────
  {
    name: "hn_top_stories",
    description: "Get the top stories from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_new_stories",
    description: "Get the newest stories from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_best_stories",
    description: "Get the best stories from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_ask_hn",
    description: "Get Ask HN posts from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_show_hn",
    description: "Get Show HN posts from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_item",
    description: "Get a specific Hacker News item by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  },
  {
    name: "hn_user",
    description: "Get a Hacker News user profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
      },
      required: ["username"],
    },
  },
] as const;

export const hackernewsHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // hackernews-tool.ts
  hn_top_stories:          (args) => hnTopStories(args),
  hn_new_stories:          (args) => hnNewStories(args),
  hn_best_stories:         (args) => hnBestStories(args),
  hn_ask_hn:               (args) => hnAskHn(args),
  hn_show_hn:              (args) => hnShowHn(args),
  hn_item:                 (args) => hnItem(args),
  hn_user:                 (args) => hnUser(args),
};
