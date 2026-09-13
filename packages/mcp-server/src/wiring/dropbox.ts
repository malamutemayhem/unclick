// wiring/dropbox.ts
// Per-app MCP wiring for the dropbox connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import {
  dropboxListFolder,
  dropboxSearch,
  dropboxGetAccount,
  unclickWorkspaceList,
  unclickWorkspaceRead,
  unclickWorkspaceWrite,
} from "../dropbox-tool.js";

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
  { name: "unclick_workspace_list", description: "Superuser/God only: list the shared UnClick Dropbox workspace. No personal Dropbox connection is used. area is strictly Context or System Information.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    area: { type: "string", enum: ["context", "system_information"], description: "The approved shared workspace area" },
    relative_path: { type: "string", description: "Optional folder path below that area; never an absolute path" },
    limit: { type: "number", description: "Entries to return (max 200, default 100)" },
  }, required: ["area"] } },
  { name: "unclick_workspace_read", description: "Superuser/God only: read a UTF-8 text file from the shared UnClick Dropbox workspace. No personal Dropbox connection is used; paths are hard-limited to Context or System Information.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    area: { type: "string", enum: ["context", "system_information"], description: "The approved shared workspace area" },
    relative_path: { type: "string", description: "Required file path below that area; never an absolute path" },
  }, required: ["area", "relative_path"] } },
  { name: "unclick_workspace_write", description: "Superuser/God only: create a UTF-8 text file in the shared UnClick Dropbox workspace. No delete operation exists. Set overwrite=true only to replace an existing file.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    area: { type: "string", enum: ["context", "system_information"], description: "The approved shared workspace area" },
    relative_path: { type: "string", description: "Required file path below that area; never an absolute path" },
    content: { type: "string", description: "UTF-8 text content (max 500,000 bytes)" },
    overwrite: { type: "boolean", description: "False by default; true explicitly replaces an existing file" },
  }, required: ["area", "relative_path", "content"] } },
] as const;

export const dropboxHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // dropbox-tool.ts
  dropbox_list_folder:     (args) => dropboxListFolder(args),
  dropbox_search:          (args) => dropboxSearch(args),
  dropbox_get_account:     (args) => dropboxGetAccount(args),
  unclick_workspace_list:  (args) => unclickWorkspaceList(args),
  unclick_workspace_read:  (args) => unclickWorkspaceRead(args),
  unclick_workspace_write: (args) => unclickWorkspaceWrite(args),
};
