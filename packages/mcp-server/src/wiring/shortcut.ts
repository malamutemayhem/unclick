// wiring/shortcut.ts
// Per-app MCP wiring for the shortcut connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { shortcutSearchStories, shortcutGetStory, shortcutListProjects, shortcutListEpics } from "../shortcut-tool.js";

export const shortcutTools = [
  // ── shortcut-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "shortcut_search_stories",
    description: "Search Shortcut stories with the search syntax.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Shortcut API token" },
      query: { type: "string", description: "Search query (e.g. 'state:\"In Progress\" owner:me')" },
      limit: { type: "number", description: "Results to return (max 25, default 25)" },
    }, required: ["api_token", "query"] },
  },
  {
    name: "shortcut_get_story",
    description: "Get a single Shortcut story by id.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Shortcut API token" },
      story_id: { type: "string", description: "Shortcut story id" },
    }, required: ["api_token", "story_id"] },
  },
  {
    name: "shortcut_list_projects",
    description: "List Shortcut projects.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Shortcut API token" },
    }, required: ["api_token"] },
  },
  {
    name: "shortcut_list_epics",
    description: "List Shortcut epics.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Shortcut API token" },
    }, required: ["api_token"] },
  },
] as const;

export const shortcutHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // shortcut-tool.ts
  shortcut_search_stories: (args) => shortcutSearchStories(args),
  shortcut_get_story:      (args) => shortcutGetStory(args),
  shortcut_list_projects:  (args) => shortcutListProjects(args),
  shortcut_list_epics:     (args) => shortcutListEpics(args),
};
