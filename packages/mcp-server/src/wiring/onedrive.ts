// wiring/onedrive.ts
// Per-app MCP wiring for the onedrive connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Marketing / Communication / Data

import { onedriveList, onedriveSearch, onedriveRead } from "../onedrive-tool.js";

export const onedriveTools = [
  // ── onedrive-tool.ts ──────────────────────────────────────────────────────────
  { name: "onedrive_list", description: "List files and folders from OneDrive.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "OneDrive access token" },
    folder_id: { type: "string", description: "Folder item id (omit for root)" },
    limit: { type: "number", description: "Items to return (max 200, default 50)" },
  } } },
  { name: "onedrive_search", description: "Search OneDrive files and folders by name.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "OneDrive access token" },
    query: { type: "string", description: "File or folder name to search for" },
    limit: { type: "number", description: "Items to return (max 100, default 25)" },
  }, required: ["query"] } },
  { name: "onedrive_read", description: "Read OneDrive file metadata and a safe text preview when available.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "OneDrive access token" },
    item_id: { type: "string", description: "OneDrive item id" },
  }, required: ["item_id"] } },
] as const;

export const onedriveHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // onedrive-tool.ts
  onedrive_list:           (args) => onedriveList(args),
  onedrive_search:         (args) => onedriveSearch(args),
  onedrive_read:           (args) => onedriveRead(args),
};
