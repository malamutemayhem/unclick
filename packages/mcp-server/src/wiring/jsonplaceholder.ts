// wiring/jsonplaceholder.ts
// Per-app MCP wiring for the jsonplaceholder connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { jpListPosts, jpGetPost, jpListComments, jpListUsers } from "../jsonplaceholder-tool.js";

export const jsonplaceholderTools = [
  // ── jsonplaceholder-tool.ts ─────────────────────────────────────────────────
  {
    name: "jp_list_posts",
    description: "List posts from JSONPlaceholder (fake REST API). Optionally filter by userId.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        userId: { type: "number", description: "Filter by user ID (1-10)" },
      },
    },
  },
  {
    name: "jp_get_post",
    description: "Get a single post by ID from JSONPlaceholder.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Post ID (1-100)" },
      },
      required: ["id"],
    },
  },
  {
    name: "jp_list_comments",
    description: "List comments on a post from JSONPlaceholder.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        postId: { type: "number", description: "Post ID to get comments for" },
      },
      required: ["postId"],
    },
  },
  {
    name: "jp_list_users",
    description: "List all users from JSONPlaceholder (fake test data).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
] as const;

export const jsonplaceholderHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // jsonplaceholder-tool.ts
  jp_list_posts:           (args) => jpListPosts(args),
  jp_get_post:             (args) => jpGetPost(args),
  jp_list_comments:        (args) => jpListComments(args),
  jp_list_users:           (args) => jpListUsers(args),
};
