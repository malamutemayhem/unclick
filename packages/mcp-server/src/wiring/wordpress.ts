// wiring/wordpress.ts
// Per-app MCP wiring for the wordpress connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { wordpressListPosts, wordpressGetPost, wordpressListPages } from "../wordpress-tool.js";

export const wordpressTools = [
  // ── wordpress-tool.ts ─────────────────────────────────────────────────────────
  { name: "wordpress_list_posts", description: "List WordPress posts, optionally by search term.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "WordPress site URL" },
    username: { type: "string", description: "WordPress username" },
    app_password: { type: "string", description: "WordPress application password" },
    search: { type: "string", description: "Search term" },
    status: { type: "string", description: "Filter by status (publish, draft, ...)" },
    limit: { type: "number", description: "Posts to return (max 100, default 10)" },
  }, required: ["site_url", "username", "app_password"] } },
  { name: "wordpress_get_post", description: "Get a single WordPress post by id.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "WordPress site URL" },
    username: { type: "string", description: "WordPress username" },
    app_password: { type: "string", description: "WordPress application password" },
    post_id: { type: "string", description: "Post id" },
  }, required: ["site_url", "username", "app_password", "post_id"] } },
  { name: "wordpress_list_pages", description: "List WordPress pages.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "WordPress site URL" },
    username: { type: "string", description: "WordPress username" },
    app_password: { type: "string", description: "WordPress application password" },
    search: { type: "string", description: "Search term" },
    limit: { type: "number", description: "Pages to return (max 100, default 10)" },
  }, required: ["site_url", "username", "app_password"] } },
] as const;

export const wordpressHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // wordpress-tool.ts
  wordpress_list_posts:    (args) => wordpressListPosts(args),
  wordpress_get_post:      (args) => wordpressGetPost(args),
  wordpress_list_pages:    (args) => wordpressListPages(args),
};
