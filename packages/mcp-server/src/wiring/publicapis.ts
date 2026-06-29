// wiring/publicapis.ts
// Per-app MCP wiring for the publicapis connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { publicapisSearch, publicapisCategories, publicapisRandom } from "../publicapis-tool.js";

export const publicapisTools = [
  // ── publicapis-tool.ts ──────────────────────────────────────────────────────
  {
    name: "publicapis_search",
    description: "Search the Public APIs directory for free APIs by name or category.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        title: { type: "string", description: "API name to search for" },
        category: { type: "string", description: "Category filter (use publicapis_categories for list)" },
        https: { type: "boolean", description: "Filter HTTPS-only APIs" },
        auth: { type: "string", description: "Auth type filter: apiKey, OAuth, or empty for none" },
      },
    },
  },
  {
    name: "publicapis_categories",
    description: "List all categories in the Public APIs directory.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "publicapis_random",
    description: "Get a random API from the Public APIs directory.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },

  // ── wger-tool.ts (workout database) ──────────────────────────────────────────
  {
    name: "wger_exercises",
    description: "Search and browse exercises from the wger workout database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        search: { type: "string", description: "Exercise name to search for" },
        category: { type: "number", description: "Category ID (use wger_categories for list)" },
        limit: { type: "number", description: "Results per page (default 20)" },
      },
    },
  },
  {
    name: "wger_categories",
    description: "List exercise categories from the wger workout database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "wger_muscles",
    description: "List muscle groups from the wger workout database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
] as const;

export const publicapisHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // publicapis-tool.ts
  publicapis_search:       (args) => publicapisSearch(args),
  publicapis_categories:   (args) => publicapisCategories(args),
  publicapis_random:       (args) => publicapisRandom(args),
};
