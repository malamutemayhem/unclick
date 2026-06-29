// wiring/spaceflight.ts
// Per-app MCP wiring for the spaceflight connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { spaceflightArticles, spaceflightBlogs, spaceflightReports } from "../spaceflight-tool.js";

export const spaceflightTools = [
  // ── spaceflight-tool.ts ────────────────────────────────────────────────────
  {
    name: "spaceflight_articles",
    description: "Get latest spaceflight news articles.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of articles (max 20, default 10)" },
        search: { type: "string", description: "Search keyword" },
      },
    },
  },
  {
    name: "spaceflight_blogs",
    description: "Get latest spaceflight blog posts.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of posts (max 20, default 10)" },
        search: { type: "string", description: "Search keyword" },
      },
    },
  },
  {
    name: "spaceflight_reports",
    description: "Get latest spaceflight technical reports.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { limit: { type: "number", description: "Number of reports (max 20, default 10)" } },
    },
  },
] as const;

export const spaceflightHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // spaceflight-tool.ts
  spaceflight_articles:    (args) => spaceflightArticles(args),
  spaceflight_blogs:       (args) => spaceflightBlogs(args),
  spaceflight_reports:     (args) => spaceflightReports(args),
};
