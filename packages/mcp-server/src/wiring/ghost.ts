// wiring/ghost.ts
// Per-app MCP wiring for the ghost connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { ghostListPosts, ghostListPages, ghostListTags } from "../ghost-tool.js";

export const ghostTools = [
  // ── ghost-tool.ts ─────────────────────────────────────────────────────────────
  { name: "ghost_list_posts", description: "List published Ghost posts.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "Ghost site URL" },
    content_key: { type: "string", description: "Ghost Content API key" },
    filter: { type: "string", description: "Ghost filter (e.g. tag:news)" },
    limit: { type: "number", description: "Posts to return (max 100, default 15)" },
  }, required: ["site_url", "content_key"] } },
  { name: "ghost_list_pages", description: "List Ghost pages.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "Ghost site URL" },
    content_key: { type: "string", description: "Ghost Content API key" },
    limit: { type: "number", description: "Pages to return (max 100, default 15)" },
  }, required: ["site_url", "content_key"] } },
  { name: "ghost_list_tags", description: "List Ghost tags.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "Ghost site URL" },
    content_key: { type: "string", description: "Ghost Content API key" },
    limit: { type: "number", description: "Tags to return (max 100, default 50)" },
  }, required: ["site_url", "content_key"] } },
] as const;

export const ghostHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // ghost-tool.ts
  ghost_list_posts:        (args) => ghostListPosts(args),
  ghost_list_pages:        (args) => ghostListPages(args),
  ghost_list_tags:         (args) => ghostListTags(args),
};
