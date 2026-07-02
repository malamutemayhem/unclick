// wiring/dropbox.ts
// Per-app MCP wiring for the dropbox connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { dropboxListFolder, dropboxSearch, dropboxGetAccount } from "../dropbox-tool.js";

export const dropboxTools = [
  // ── dropbox-tool.ts ───────────────────────────────────────────────────────────
  { name: "dropbox_list_folder", description: "List files and folders in a Dropbox path (empty path = root).", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Dropbox access token" },
    path: { type: "string", description: "Folder path (empty string for root)" },
    limit: { type: "number", description: "Entries to return (max 2000, default 100)" },
  } } },
  { name: "dropbox_search", description: "Search Dropbox for files and folders by name.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Dropbox access token" },
    query: { type: "string", description: "File or folder name to search for" },
    limit: { type: "number", description: "Results to return (max 1000, default 25)" },
  }, required: ["query"] } },
  { name: "dropbox_get_account", description: "Get the current Dropbox account profile.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Dropbox access token" },
  } } },
] as const;

export const dropboxHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dropbox-tool.ts
  dropbox_list_folder:     (args) => dropboxListFolder(args),
  dropbox_search:          (args) => dropboxSearch(args),
  dropbox_get_account:     (args) => dropboxGetAccount(args),
};
