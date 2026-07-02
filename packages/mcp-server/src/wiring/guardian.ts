// wiring/guardian.ts
// Per-app MCP wiring for the guardian connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { guardianSearchArticles, guardianGetArticle, guardianGetSections, guardianGetTags, guardianGetEdition } from "../guardian-tool.js";

export const guardianTools = [
  // ── guardian-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "guardian_search_articles",
    description: "Search for articles on The Guardian.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        section: { type: "string" },
        from_date: { type: "string" },
        to_date: { type: "string" },
        page_size: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "guardian_get_article",
    description: "Get a specific Guardian article by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        article_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["article_id"],
    },
  },
  {
    name: "guardian_get_sections",
    description: "Get all Guardian sections.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "guardian_get_tags",
    description: "Get Guardian tags.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "guardian_get_edition",
    description: "Get a Guardian edition by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        edition_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["edition_id"],
    },
  },
] as const;

export const guardianHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // guardian-tool.ts
  guardian_search_articles:(args) => guardianSearchArticles(args),
  guardian_get_article:    (args) => guardianGetArticle(args),
  guardian_get_sections:   (args) => guardianGetSections(args),
  guardian_get_tags:       (args) => guardianGetTags(args),
  guardian_get_edition:    (args) => guardianGetEdition(args),
};
